import { Box } from '@mui/material';
import { useMemo, useState } from 'react';
import AnalyzerHeader from '../components/AnalyzerHeader';
import AnalyzerUploadPanel from '../components/AnalyzerUploadPanel';
import AnalyzerResultsPanel from '../components/AnalyzerResultsPanel';
import { analyzeTaxReturn } from '../analyzerApi';
import {
  AnalysisResult,
  AnalyzerTab,
  mapProcessTextReturnToAnalysisResult,
} from '../data/analysisModel';

function TaxReturnAnalyzerPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<AnalyzerTab>('analysis');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canRun = useMemo(() => Boolean(uploadedFile && prompt.trim()), [uploadedFile, prompt]);

  const handleRunAnalysis = async () => {
    if (!canRun || !uploadedFile) {
      return;
    }

    const startTime = Date.now();
    setIsAnalyzing(true);
    setResult(null);
    setErrorMessage(null);

    try {
      const payload = await analyzeTaxReturn({
        prompt: prompt.trim(),
        file: uploadedFile,
      });
      const mapped = mapProcessTextReturnToAnalysisResult(payload, Date.now() - startTime);
      setResult(mapped);
      setActiveTab('analysis');
      if (payload.processing_status !== 'SUCCESS') {
        setErrorMessage(payload.error_message ?? 'Analysis failed to complete. Please try again.');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to process tax return.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = async () => {
    if (!result) {
      return;
    }
    const text =
      activeTab === 'json'
        ? JSON.stringify(result.json, null, 2)
        : activeTab === 'analysis'
          ? result.rawText || result.sections.map((section) => `${section.title}\n${section.body}`).join('\n\n')
          : result.insights.map((item) => `${item.title}: ${item.body}`).join('\n\n');
    await navigator.clipboard.writeText(text);
  };

  const handleExport = () => {
    if (!result) {
      return;
    }
    const blob = new Blob([JSON.stringify(result.json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tax_analysis_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ pb: 4 }}>
      <AnalyzerHeader />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.5fr 1fr' },
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <AnalyzerUploadPanel
          uploadedFile={uploadedFile}
          prompt={prompt}
          isAnalyzing={isAnalyzing}
          onFileChange={setUploadedFile}
          onPromptChange={setPrompt}
          onRunAnalysis={handleRunAnalysis}
        />
        <AnalyzerResultsPanel
          isAnalyzing={isAnalyzing}
          result={result}
          errorMessage={errorMessage}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCopy={handleCopy}
          onExport={handleExport}
        />
      </Box>
    </Box>
  );
}

export default TaxReturnAnalyzerPage;
