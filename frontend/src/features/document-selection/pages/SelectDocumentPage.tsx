import { Box } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import HeroSection from '../components/HeroSection';
import StepIndicator from '../components/StepIndicator';
import DocumentGrid from '../components/DocumentGrid';
import SelectionBottomBar from '../components/SelectionBottomBar';
import { documentTypes } from '../data/documentTypes';
import { DocumentType, FilterCategory } from '../types';

function SelectDocumentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(null);
  const navigate = useNavigate();

  const filteredDocuments = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return documentTypes.filter((document) => {
      const categoryMatches = activeCategory === 'all' || document.category === activeCategory;
      const textMatches =
        !normalizedQuery ||
        document.name.toLowerCase().includes(normalizedQuery) ||
        document.description.toLowerCase().includes(normalizedQuery);

      return categoryMatches && textMatches;
    });
  }, [activeCategory, searchQuery]);

  const selectedLabel = selectedDocument
    ? `${selectedDocument.name} — ${selectedDocument.description}`
    : null;

  const handleSelectDocument = (document: DocumentType) => {
    if (document.disabled) {
      return;
    }
    setSelectedDocument(document);
  };

  const handleContinue = () => {
    if (!selectedDocument) {
      return;
    }
    navigate(`/extract/upload?docId=${encodeURIComponent(selectedDocument.id)}`);
  };

  return (
    <Box sx={{ pb: 4 }}>
      <HeroSection />
      <StepIndicator currentStep={1} />
      <FilterBar
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onAnalyzeTaxReturnClick={() => navigate('/extract/tax-return-analyzer')}
      />
      <DocumentGrid
        documents={filteredDocuments}
        selectedDocumentName={selectedDocument?.name ?? null}
        onSelect={handleSelectDocument}
      />
      <SelectionBottomBar selectedLabel={selectedLabel} onContinue={handleContinue} />
    </Box>
  );
}

export default SelectDocumentPage;
