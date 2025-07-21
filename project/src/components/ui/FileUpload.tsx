import React, { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  acceptedTypes = ['.csv', '.xlsx', '.sql'],
  maxSize = 10,
  className = ''
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): string | null => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!acceptedTypes.includes(fileExtension)) {
      return `Desteklenmeyen dosya türü. Kabul edilen türler: ${acceptedTypes.join(', ')}`;
    }
    
    if (file.size > maxSize * 1024 * 1024) {
      return `Dosya boyutu çok büyük. Maksimum ${maxSize}MB olabilir.`;
    }
    
    return null;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    const validationError = validateFile(file);
    
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError('');
    setUploadedFile(file);
    onFileUpload(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      {!uploadedFile ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
            dragActive 
              ? 'border-teal-500 bg-teal-50' 
              : error
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 hover:border-teal-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={acceptedTypes.join(',')}
            onChange={handleInputChange}
          />
          
          <div className="flex flex-col items-center space-y-4">
            <div className={`p-4 rounded-full ${
              error ? 'bg-red-100' : 'bg-teal-100'
            }`}>
              {error ? (
                <AlertCircle size={32} className="text-red-600" />
              ) : (
                <Upload size={32} className="text-teal-600" />
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Dosyanızı buraya sürükleyin
              </h3>
              <p className="text-gray-600 mb-2">
                veya <span className="text-teal-600 font-medium">göz atmak için tıklayın</span>
              </p>
              <p className="text-sm text-gray-500">
                Desteklenen formatlar: {acceptedTypes.join(', ')} (max {maxSize}MB)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle size={20} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">{uploadedFile.name}</h4>
                <p className="text-sm text-gray-600">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;