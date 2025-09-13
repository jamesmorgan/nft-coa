import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { NFTForm } from './components/NFTForm';
import { CertificatePreview } from './components/CertificatePreview';
import { useNFTData } from './hooks/useNFTData';
import { AlertCircle, ArrowLeft } from 'lucide-react';

function App() {
  const {
    isLoading,
    error,
    certificateData,
    fetchNFTData,
    downloadPDF,
    printCertificate,
    reset,
  } = useNFTData();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        {!certificateData ? (
          <div className="max-w-4xl mx-auto px-4">
            {/* Landing Page */}
            <LandingPage />
            
            {/* Form Section */}
            <div className="mt-16">
              <NFTForm onSubmit={fetchNFTData} isLoading={isLoading} />
              
              {/* Error Display */}
              {error && (
                <div className="max-w-md mx-auto mt-6">
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          Error
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          {error}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4">
            {/* Back Button */}
            <div className="mb-6">
              <button
                onClick={reset}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Generate Another Certificate
              </button>
            </div>
            
            {/* Certificate Preview */}
            <CertificatePreview
              certificateData={certificateData}
              onDownloadPDF={downloadPDF}
              onPrint={printCertificate}
            />
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              NFT Certificate Generator - Create professional certificates of authenticity
            </p>
            <p className="text-sm">
              © 2024 • Open source • 
              <a 
                href="https://github.com/jamesmorgan/nft-coa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 ml-1"
              >
                View on GitHub
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;