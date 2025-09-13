import React from 'react';
import { Download, Printer, Share2, ExternalLink, Copy } from 'lucide-react';
import type { CertificateData } from '../types';

interface CertificatePreviewProps {
  certificateData: CertificateData;
  onDownloadPDF: () => void;
  onPrint: () => void;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  certificateData,
  onDownloadPDF,
  onPrint,
}) => {
  const { nftData } = certificateData;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const shareCertificate = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Certificate of Authenticity - ${nftData.metadata.name}`,
          text: `NFT Certificate: ${nftData.metadata.name} on ${nftData.network.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Action Buttons */}
      <div className="no-print flex flex-wrap gap-3 mb-6 justify-center">
        <button
          onClick={onDownloadPDF}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </button>
        <button
          onClick={onPrint}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <Printer className="h-4 w-4" />
          Print Certificate
        </button>
        <button
          onClick={shareCertificate}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>

      {/* Certificate Preview */}
      <div className="certificate-container bg-white border-2 border-certificate-border rounded-lg shadow-lg overflow-hidden">
        {/* Certificate Header */}
        <div className="certificate-header bg-gradient-to-r from-certificate-gold to-certificate-dark-gold text-white text-center py-6">
          <h1 className="text-3xl font-bold mb-2">CERTIFICATE OF AUTHENTICITY</h1>
          <p className="text-lg opacity-90">Digital Artwork (NFT) COA</p>
        </div>

        {/* Certificate Body */}
        <div className="certificate-body p-8">
          {/* NFT Image */}
          <div className="text-center mb-8">
            {nftData.metadata.image ? (
              <img
                src={nftData.metadata.image}
                alt={nftData.metadata.name}
                className="nft-image mx-auto max-h-64 max-w-64 object-contain rounded-lg shadow-md"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjggMTI4TDEwNiAxMDZMMTI4IDg0TDE1MCAxMDZMMTI4IDEyOFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2Zz4K';
                }}
              />
            ) : (
              <div className="mx-auto w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
          </div>

          {/* NFT Information */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="nft-info">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Token Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-700">Name:</span>
                  <span className="ml-2 text-gray-900">{nftData.metadata.name}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Symbol:</span>
                  <span className="ml-2 text-gray-900">{nftData.symbol}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Token ID:</span>
                  <span className="ml-2 text-gray-900">{nftData.tokenId}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Network:</span>
                  <span className="ml-2 text-gray-900">{nftData.network.name}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Chain ID:</span>
                  <span className="ml-2 text-gray-900">{nftData.network.chainId}</span>
                </div>
              </div>
            </div>

            <div className="nft-info">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Blockchain Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-700">Contract:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="contract-address text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                      {nftData.contractAddress}
                    </code>
                    <button
                      onClick={() => copyToClipboard(nftData.contractAddress)}
                      className="text-blue-600 hover:text-blue-800 no-print"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Owner:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="owner-address text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                      {nftData.owner}
                    </code>
                    <button
                      onClick={() => copyToClipboard(nftData.owner)}
                      className="text-blue-600 hover:text-blue-800 no-print"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Block Explorer:</span>
                  <a
                    href={nftData.blockExplorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    View on Explorer
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {nftData.metadata.description && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">{nftData.metadata.description}</p>
            </div>
          )}

          {/* Attributes */}
          {nftData.metadata.attributes && nftData.metadata.attributes.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Attributes</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {nftData.metadata.attributes.map((attr, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm font-semibold text-gray-600">{attr.trait_type}</div>
                    <div className="text-gray-900">{attr.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificate Footer */}
          <div className="certificate-footer mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div>
                <div>Generated: {certificateData.generatedAt.toLocaleString()}</div>
                <div>Certificate ID: {certificateData.certificateId}</div>
              </div>
              <div className="text-right">
                <div>nft-coa.github.io</div>
                <div>© 2024 NFT Certificate Generator</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
