/**
 * File Utilities
 * Functions for file handling, download, and upload operations
 */

/**
 * Handle file download
 */
export const handleFileDownload = (fileData, fileName, mimeType) => {
  try {
    if (!fileData || !fileName) {
      console.warn('Invalid file data or name');
      return;
    }

    const fileBytes = atob(fileData);
    const arrayBuffer = new ArrayBuffer(fileBytes.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < fileBytes.length; i++) {
      uint8Array[i] = fileBytes.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: mimeType || 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw new Error('Failed to download file');
  }
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    if (!text) {
      throw new Error('No text provided');
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    throw new Error('Failed to copy to clipboard');
  }
};

/**
 * Encode file to base64
 */
export const encodeFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

/**
 * Validate file before upload
 */
export const validateFile = (file, maxSizeMB = 10) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (file.size > maxSizeBytes) {
    return { valid: false, error: `File size exceeds ${maxSizeMB}MB limit` };
  }

  if (!file.type) {
    return { valid: false, error: 'Invalid file type' };
  }

  return { valid: true };
};

/**
 * Get file extension
 */
export const getFileExtension = (fileName) => {
  if (!fileName) return '';
  return fileName.split('.').pop().toLowerCase();
};

/**
 * Get file type icon
 */
export const getFileTypeIcon = (fileName) => {
  const ext = getFileExtension(fileName);
  const iconMap = {
    pdf: '📄',
    doc: '📝',
    docx: '📝',
    xls: '📊',
    xlsx: '📊',
    txt: '📄',
    csv: '📊',
    json: '⚙️',
    zip: '📦',
    image: '🖼️',
  };

  return iconMap[ext] || '📎';
};
