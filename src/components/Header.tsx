import React from 'react';
import { FileText, Github } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">NFT Certificate Generator</h1>
              <p className="text-sm text-gray-600">Create printable certificates of authenticity</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/jamesmorgan/nft-coa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
