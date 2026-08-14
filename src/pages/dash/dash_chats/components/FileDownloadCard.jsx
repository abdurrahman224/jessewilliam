// FileDownloadCard.jsx - CLEANED VERSION (No Console Spam)

import React from 'react';
import { Download, FileText } from 'lucide-react';

const FileDownloadCard = ({ message }) => {
  // DEFENSIVE CHECKS - Silent version (only log actual renders)

  // Check 1: Must be assistant message
  if (message.role !== 'assistant') return null;

  // Check 2: Must have file flag OR file data
  if (!message.isFile && !message.hasFile) return null;

  // Check 3: Must have actual file data
  if (!message.fileData) return null;

  // Check 4: Must have file name
  if (!message.fileName) return null;

  // Only log when actually rendering (not spam console)
  if (process.env.NODE_ENV === 'development') {
    console.log('📎 File card rendered:', message.fileName);
  }

  const handleFileDownload = () => {
    try {
      // Decode base64
      const fileBytes = atob(message.fileData);
      const byteArray = new Uint8Array(fileBytes.length);

      for (let i = 0; i < fileBytes.length; i++) {
        byteArray[i] = fileBytes.charCodeAt(i);
      }

      // Create blob and download
      const blob = new Blob([byteArray], {
        type: message.mimeType || 'application/octet-stream',
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = message.fileName;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => URL.revokeObjectURL(url), 100);

      console.log('✅ Downloaded:', message.fileName);
    } catch (error) {
      console.error('❌ Download failed:', error);
      alert(`Failed to download file: ${error.message}. Please try again.`);
    }
  };

  // Calculate file size safely
  const getFileSizeKB = () => {
    try {
      return (atob(message.fileData).length / 1024).toFixed(1);
    } catch (error) {
      return '0';
    }
  };

  const fileSizeKB = getFileSizeKB();

  // Determine file type label
  const getFileTypeLabel = () => {
    const fileName = message.fileName.toLowerCase();
    if (fileName.includes('.xlsx') || fileName.includes('.xls')) return 'Spreadsheet';
    if (fileName.includes('.docx') || fileName.includes('.doc')) return 'Document';
    if (fileName.includes('.pptx') || fileName.includes('.ppt')) return 'Presentation';
    if (fileName.includes('.pdf')) return 'PDF';
    return 'File';
  };

  return (
    <div className="mb-2 ml-12 max-w-md rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
      {/* Icon */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
          <FileText className="h-5 w-5 text-blue-500" />
        </div>

        {/* File Info */}
        <div className="min-w-0 flex-1">
          <p className="text-base font-medium text-green-600">Ready for Download</p>
          <p className="truncate text-sm text-gray-700">
            {message.fileName} ({fileSizeKB} KB)
          </p>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleFileDownload}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-400 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        <Download className="h-4 w-4" />
        Download {getFileTypeLabel()}
      </button>
    </div>
  );
};

export default FileDownloadCard;
