const getSupportedFileTypes = (accept) => {
    if (!accept || typeof accept !== 'string') {
        return '';
    }

    const formats = accept.replace(/\s/g, '').split(',');

    const genericTypes = {
        'image/*': 'Images',
        'video/*': 'Videos',
        'audio/*': 'Audio files',
        'application/*': 'Applications',
        'text/*': 'Text files',
    };

    if (formats.length === 1 && genericTypes[formats[0]]) {
        return `Supported format: ${genericTypes[formats[0]]}`;
    }
    const fileExtensions = formats
        .filter((format) => format.startsWith('.'))
        .map((format) => format.substring(1).toUpperCase())
        .filter((ext) => ext.length > 0);

    const mimeToExtension = {
        'application/pdf': 'PDF',
        'application/msword': 'DOC',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
        'application/vnd.ms-excel': 'XLS',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
        'application/vnd.ms-powerpoint': 'PPT',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
        'text/plain': 'TXT',
        'text/csv': 'CSV',
        'image/jpeg': 'JPEG',
        'image/jpg': 'JPG',
        'image/png': 'PNG',
        'image/gif': 'GIF',
        'image/webp': 'WEBP',
        'image/svg+xml': 'SVG',
    };

    const mimeExtensions = formats
        .filter((format) => !format.startsWith('.') && !format.includes('*'))
        .map((format) => mimeToExtension[format])
        .filter((ext) => ext);

    const allExtensions = [...fileExtensions, ...mimeExtensions];

    if (allExtensions.length === 0) {
        return '';
    }

    const uniqueExtensions = [...new Set(allExtensions)].sort();

    const formatText = uniqueExtensions.length === 1 ? 'format' : 'formats';

    return `Supported ${formatText}: ${uniqueExtensions.join(', ')}`;
};

export default getSupportedFileTypes;
