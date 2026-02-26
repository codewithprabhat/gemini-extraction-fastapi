import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './layout/AppShell';
import SelectDocumentPage from '../features/document-selection/pages/SelectDocumentPage';
import UploadExtractPage from '../features/document-upload/pages/UploadExtractPage';
import PromptSchemaConfigPage from '../features/document-config/pages/PromptSchemaConfigPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/extract/select-document" replace />} />
          <Route path="/extract/select-document" element={<SelectDocumentPage />} />
          <Route path="/extract/upload" element={<UploadExtractPage />} />
          <Route path="/extract/config" element={<PromptSchemaConfigPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
