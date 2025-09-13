import { useState } from 'react';
import { BlockchainService } from '../services/blockchain';
import { CertificateService } from '../services/certificate';
import { NETWORKS } from '../services/blockchain';
import type { FormData, CertificateData } from '../types';

export const useNFTData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);

  const fetchNFTData = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const network = NETWORKS.find(n => n.id === formData.network);
      if (!network) {
        throw new Error('Invalid network selected');
      }

      const blockchainService = new BlockchainService(network);
      const nftData = await blockchainService.getNFTData(
        formData.contractAddress,
        formData.tokenId,
        network
      );

      // Resolve ENS name for owner if on Ethereum
      if (network.id === 'ethereum') {
        nftData.owner = await blockchainService.resolveENS(nftData.owner);
      }

      const certificateService = new CertificateService();
      const certificateId = certificateService.generateCertificateId();

      const newCertificateData: CertificateData = {
        nftData,
        generatedAt: new Date(),
        certificateId,
      };

      setCertificateData(newCertificateData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setCertificateData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!certificateData) return;

    try {
      const certificateService = new CertificateService();
      const pdfBlob = await certificateService.generatePDF(certificateData);
      
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `nft-certificate-${certificateData.certificateId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Failed to generate PDF');
    }
  };

  const printCertificate = () => {
    window.print();
  };

  const reset = () => {
    setCertificateData(null);
    setError(null);
  };

  return {
    isLoading,
    error,
    certificateData,
    fetchNFTData,
    downloadPDF,
    printCertificate,
    reset,
  };
};
