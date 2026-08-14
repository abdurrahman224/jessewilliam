/**
 * Download text file
 */
export const downloadTextFile = (content, filename, type = 'text/plain') => {
  try {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('✅ Text file downloaded:', filename);
  } catch (error) {
    console.error('❌ Text file download failed:', error);
    throw error;
  }
};

/**
 * Download file from base64 data
 */
export const downloadBase64File = (base64Data, filename, mimeType) => {
  try {
    console.log('🔽 Downloading:', filename);
    
    // Decode base64
    const fileBytes = atob(base64Data);
    const byteArray = new Uint8Array(fileBytes.length);
    
    for (let i = 0; i < fileBytes.length; i++) {
      byteArray[i] = fileBytes.charCodeAt(i);
    }
    
    // Create blob and download
    const blob = new Blob([byteArray], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    console.log('✅ File downloaded successfully');
    return true;
  } catch (error) {
    console.error('❌ File download failed:', error);
    alert('Failed to download file. Please try again.');
    return false;
  }
};

/**
 * Convert text to base64
 */
export const textToBase64 = (text = '') => {
  return btoa(unescape(encodeURIComponent(text)));
};

/**
 * Get file size in KB from base64
 */
export const getFileSizeFromBase64 = (base64Data) => {
  try {
    const sizeInBytes = atob(base64Data).length;
    return (sizeInBytes / 1024).toFixed(1);
  } catch (error) {
    console.error('Failed to calculate file size:', error);
    return '0';
  }
};