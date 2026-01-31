import React from 'react';
import type { FileUploadType } from '../types';
import { KDG_NAVY } from '../constants/colors';

interface FileUploadCardProps {
  title: string;
  step: number;
  type: FileUploadType;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>, type: FileUploadType) => void;
  isLoaded: boolean;
  itemCount: number;
}

export const FileUploadCard: React.FC<FileUploadCardProps> = ({ 
  title, 
  step, 
  type, 
  onUpload, 
  isLoaded, 
  itemCount 
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpload(e, type);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <h3 
        className="text-lg font-bold mb-4 flex items-center"
        style={{ color: KDG_NAVY }}
      >
        <span 
          className="text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2"
          style={{ backgroundColor: KDG_NAVY }}
        >
          {step}
        </span>
        {title}
      </h3>
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer relative"
        tabIndex={0}
        role="button"
        aria-label={`Upload ${title}`}
      >
        <input 
          type="file" 
          accept="application/pdf"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-hidden="true"
        />
        <p className="text-sm text-gray-500">
          Click or drag your <strong>{type === 'past' ? 'Studieoverzicht PDF' : 'Resultaten PDF'}</strong> here
        </p>
      </div>
      {isLoaded && (
        <p className="mt-3 text-sm font-medium text-emerald-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {itemCount} subjects loaded
        </p>
      )}
    </div>
  );
};

