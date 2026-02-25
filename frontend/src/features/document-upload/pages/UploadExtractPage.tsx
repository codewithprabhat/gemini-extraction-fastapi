import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { appColors } from '../../../theme/tokens';
import StepIndicator from '../../document-selection/components/StepIndicator';
import { documentTypes } from '../../document-selection/data/documentTypes';
import ExtractionResultPanel from '../components/ExtractionResultPanel';
import FileQueueList from '../components/FileQueueList';
import PreviewPanel from '../components/PreviewPanel';
import UploadDropzone from '../components/UploadDropzone';
import UploadHeader from '../components/UploadHeader';
import { extractDocuments } from '../extractionApi';
import { ExtractedPayload, QueuedFile } from '../types';

const DOCUMENT_TYPE_TO_API_TYPE: Record<string, string> = {
  w2: 'w2-form',
  '1099-sa': '1099-sa',
};
const INPUT_COST_PER_MILLION_USD = 0.3;
const OUTPUT_COST_PER_MILLION_USD = 2.5;

function UploadExtractPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [files, setFiles] = useState<QueuedFile[]>([]);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [resultJson, setResultJson] = useState<ExtractedPayload | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedDocument = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const docId = params.get('docId');
    const legacyType = params.get('type');

    if (docId) {
      return documentTypes.find((item) => item.id === docId) ?? null;
    }

    if (legacyType) {
      return documentTypes.find((item) => item.name === legacyType) ?? null;
    }

    return null;
  }, [location.search]);

  useEffect(() => {
    if (!selectedDocument) {
      navigate('/extract/select-document', { replace: true });
    }
  }, [navigate, selectedDocument]);

  const handleFilesAdd = (incomingFiles: FileList | File[]) => {
    const list = Array.from(incomingFiles);
    if (!list.length) {
      return;
    }

    setFiles((previous) => {
      const next = [...previous];
      list.forEach((file) => {
        const exists = next.some(
          (item) => item.file.name === file.name && item.file.size === file.size
        );
        if (!exists) {
          next.push({
            id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            file,
            status: 'ready',
          });
        }
      });
      return next;
    });
  };

  const handleRemoveFile = (id: string) => {
    setFiles((previous) => {
      const updated = previous.filter((item) => item.id !== id);
      setActiveFileIndex((index) => Math.max(0, Math.min(index, updated.length - 1)));
      if (!updated.length) {
        setResultJson(null);
      }
      return updated;
    });
  };

  const handleClearFiles = () => {
    setFiles([]);
    setActiveFileIndex(0);
    setResultJson(null);
    setErrorMessage(null);
  };

  const runExtraction = async () => {
    if (!files.length || !selectedDocument) {
      return;
    }

    const apiType = DOCUMENT_TYPE_TO_API_TYPE[selectedDocument.id];
    if (!apiType) {
      setResultJson(null);
      setFiles((previous) => previous.map((item) => ({ ...item, status: 'error' })));
      setErrorMessage(
        `${selectedDocument.name} extraction is not supported yet. Please select W-2 or 1099-SA.`
      );
      return;
    }

    setCopied(false);
    setIsExtracting(true);
    setResultJson(null);
    setErrorMessage(null);
    setFiles((previous) => previous.map((item) => ({ ...item, status: 'processing' })));

    try {
      const payload = await extractDocuments({
        type: apiType,
        files: files.map((item) => item.file),
      });
      setResultJson(payload);
      setFiles((previous) => previous.map((item) => ({ ...item, status: 'extracted' })));
    } catch (error) {
      setResultJson(null);
      setFiles((previous) => previous.map((item) => ({ ...item, status: 'error' })));
      setErrorMessage(error instanceof Error ? error.message : 'Extraction failed. Please try again.');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleCopyJson = async () => {
    if (!resultJson) {
      return;
    }
    await navigator.clipboard.writeText(JSON.stringify(resultJson, null, 2));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleExportJson = () => {
    if (!resultJson || !selectedDocument) {
      return;
    }
    const blob = new Blob([JSON.stringify(resultJson, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedDocument.id}_extraction_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const confidencePercent = useMemo(() => {
    if (!resultJson) {
      return null;
    }
    const raw = resultJson.confidence_score;
    if (typeof raw === 'number') {
      return Math.round(raw * 100);
    }
    return null;
  }, [resultJson]);

  const totalCostUsd = useMemo(() => {
    if (!resultJson?.request_usage) {
      return null;
    }

    const inputTokens =
      typeof resultJson.request_usage.input_tokens === 'number'
        ? resultJson.request_usage.input_tokens
        : 0;
    const outputTokens =
      typeof resultJson.request_usage.output_tokens === 'number'
        ? resultJson.request_usage.output_tokens
        : 0;

    const inputCost = (inputTokens / 1_000_000) * INPUT_COST_PER_MILLION_USD;
    const outputCost = (outputTokens / 1_000_000) * OUTPUT_COST_PER_MILLION_USD;

    return inputCost + outputCost;
  }, [resultJson]);

  if (!selectedDocument) {
    return null;
  }

  return (
    <Box sx={{ pb: 4 }}>
      <UploadHeader documentName={selectedDocument.name} />
      <StepIndicator currentStep={2} />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 0,
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 2,
          overflow: 'hidden',
          minHeight: 620,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: appColors.bgVoid, borderRight: { md: '1px solid rgba(255,255,255,0.05)' } }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ px: 2.5, py: 1.5, borderBottom: '1px solid rgba(255,255,255,0.04)', bgcolor: 'rgba(8,8,8,0.6)' }}
          >
            <Typography sx={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: appColors.textSecondary }}>
              Upload Documents
            </Typography>
            <Box
              sx={{
                px: 1,
                py: 0.3,
                borderRadius: 0.8,
                fontFamily: "'Fira Code', monospace",
                fontSize: 9,
                color: appColors.goldDim,
                border: `1px solid ${appColors.border}`,
                backgroundColor: 'rgba(201,168,76,0.1)',
              }}
            >
              {selectedDocument.name} MODE
            </Box>
          </Stack>

          <UploadDropzone
            isDragOver={isDragOver}
            onDragOverChange={setIsDragOver}
            onFilesAdd={handleFilesAdd}
          />
          <FileQueueList
            files={files}
            activeFileIndex={activeFileIndex}
            onSelectFile={setActiveFileIndex}
            onRemoveFile={handleRemoveFile}
            onClearFiles={handleClearFiles}
          />
          <PreviewPanel
            files={files}
            activeFileIndex={activeFileIndex}
            documentName={selectedDocument.name}
            onSelectFile={setActiveFileIndex}
          />
        </Box>

        <ExtractionResultPanel
          isExtracting={isExtracting}
          canExtract={files.length > 0}
          resultJson={resultJson}
          errorMessage={errorMessage}
          confidencePercent={confidencePercent}
          totalCostUsd={totalCostUsd}
          copied={copied}
          onExtract={runExtraction}
          onCopy={handleCopyJson}
          onExport={handleExportJson}
        />
      </Box>
    </Box>
  );
}

export default UploadExtractPage;
