import React from 'react';
import { Shield, Zap, Download, CheckCircle } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          NFT Certificate of
          <span className="text-blue-600"> Authenticity</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Generate professional, printable certificates for your NFTs. Verify ownership, 
          display metadata, and create official documentation for your digital assets.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            ✓ Free to use
          </div>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            ✓ No registration required
          </div>
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
            ✓ Supports all EVM chains
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Blockchain Verified</h3>
          <p className="text-gray-600">
            All certificates include blockchain verification with QR codes linking to 
            block explorers for instant verification.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Generation</h3>
          <p className="text-gray-600">
            Simply enter your contract address and token ID to generate a professional 
            certificate in seconds.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Download className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Print Ready</h3>
          <p className="text-gray-600">
            Download high-quality PDFs optimized for printing or share certificates 
            digitally with others.
          </p>
        </div>
      </div>

      {/* Supported Networks */}
      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Supported Blockchain Networks
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'Ethereum',
            'Polygon',
            'BSC',
            'Arbitrum',
            'Optimism',
            'Avalanche',
            'Base',
            'Custom RPC'
          ].map((network) => (
            <div key={network} className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-gray-700">{network}</span>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Network</h3>
            <p className="text-gray-600">
              Choose from supported EVM-compatible blockchain networks
            </p>
          </div>
          <div className="p-6">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Enter Details</h3>
            <p className="text-gray-600">
              Input your NFT contract address and token ID
            </p>
          </div>
          <div className="p-6">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate & Download</h3>
            <p className="text-gray-600">
              Get your professional certificate as a PDF or print directly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
