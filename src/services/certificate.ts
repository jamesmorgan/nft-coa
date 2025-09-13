import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import type { CertificateData } from '../types';

export class CertificateService {
  async generatePDF(certificateData: CertificateData): Promise<Blob> {
    const { nftData } = certificateData;
    // Use A4 dimensions: 8.27 x 11.69 inches
    const doc = new jsPDF('portrait', 'in', 'a4');
    
    // Set up fonts and colors
    doc.setFont('helvetica');
    
    // Add border with proper A4 margins
    doc.setDrawColor(139, 115, 85); // certificate.border color
    doc.setLineWidth(0.02);
    doc.rect(0.5, 0.5, 7.27, 10.69); // A4 dimensions minus margins
    
    // Add inner border
    doc.setLineWidth(0.01);
    doc.rect(0.6, 0.6, 7.07, 10.49);
    
    // Header
    doc.setFontSize(20); // Reduced from 24
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(212, 175, 55); // certificate.gold color
    doc.text('CERTIFICATE OF AUTHENTICITY', 4.135, 1.2, { align: 'center' });
    
    // Subtitle
    doc.setFontSize(12); // Reduced from 14
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('Digital Artwork (NFT) COA', 4.135, 1.5, { align: 'center' });
    
    // NFT Image - maintain aspect ratio
    if (nftData.metadata.image) {
      try {
        const img = await this.loadImage(nftData.metadata.image);
        const maxWidth = 2.0; // Maximum width in inches
        const maxHeight = 2.0; // Maximum height in inches
        
        // Calculate aspect ratio preserving dimensions
        const { width: imgWidth, height: imgHeight } = this.calculateImageDimensions(
          img, 
          maxWidth, 
          maxHeight
        );
        
        // Convert image to data URL for jsPDF
        const imgDataUrl = this.imageToDataUrl(img);
        
        const imgX = (8.27 - imgWidth) / 2;
        const imgY = 2.0;
        
        doc.addImage(imgDataUrl, 'JPEG', imgX, imgY, imgWidth, imgHeight);
      } catch (error) {
        console.error('Error loading NFT image:', error);
        // Add placeholder text
        doc.setFontSize(10);
        doc.setTextColor(128, 128, 128);
        doc.text('Image not available', 4.135, 3.0, { align: 'center' });
      }
    }
    
    // NFT Information - better layout
    doc.setFontSize(10); // Reduced from 12
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    
    const infoY = 4.2; // Moved up slightly
    const lineHeight = 0.18; // Reduced from 0.2
    
    doc.text('Token Information:', 1, infoY);
    doc.setFont('helvetica', 'normal');
    
    // Wrap long text to prevent overflow
    const nameText = this.wrapText(nftData.metadata.name, 50);
    doc.text(`Name: ${nameText}`, 1, infoY + lineHeight);
    
    const symbolText = this.wrapText(nftData.symbol, 50);
    doc.text(`Symbol: ${symbolText}`, 1, infoY + lineHeight * 2);
    
    doc.text(`Token ID: ${nftData.tokenId}`, 1, infoY + lineHeight * 3);
    
    // Contract address - wrap if too long
    const contractText = this.wrapText(nftData.contractAddress, 50);
    doc.text(`Contract: ${contractText}`, 1, infoY + lineHeight * 4);
    
    const networkText = this.wrapText(nftData.network.name, 50);
    doc.text(`Network: ${networkText}`, 1, infoY + lineHeight * 5);
    
    // Owner address - wrap if too long
    const ownerText = this.wrapText(nftData.owner, 50);
    doc.text(`Owner: ${ownerText}`, 1, infoY + lineHeight * 6);
    
    // Description - if it exists, with proper spacing
    if (nftData.metadata.description) {
      const descriptionStartY = infoY + lineHeight * 7.5; // More space before description
      const description = this.wrapText(nftData.metadata.description, 50);
      const descriptionLines = this.splitTextIntoLines(doc, `Description: ${description}`, 6.5); // Max width
      
      let currentY = descriptionStartY;
      for (const line of descriptionLines) {
        if (currentY > 8.0) break; // Don't go beyond QR code area
        doc.text(line, 1, currentY);
        currentY += lineHeight;
      }
    }
    
    // QR Code - positioned to avoid description overlap
    try {
      const qrDataURL = await QRCode.toDataURL(nftData.blockExplorerUrl);
      doc.addImage(qrDataURL, 'PNG', 5.5, 8.0, 1.2, 1.2); // Moved down to avoid description
      doc.setFontSize(8);
      doc.text('Scan to verify', 6.1, 9.4, { align: 'center' });
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
    
    // Footer - positioned for A4
    doc.setFontSize(9); // Reduced from 10
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on: ${certificateData.generatedAt.toLocaleDateString()}`, 1, 9.8);
    doc.text(`Certificate ID: ${certificateData.certificateId}`, 1, 10.1);
    doc.text('nft-coa.github.io', 6.5, 10.1, { align: 'right' });
    
    return doc.output('blob');
  }
  
  private async loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  private calculateImageDimensions(
    img: HTMLImageElement, 
    maxWidth: number, 
    maxHeight: number
  ): { width: number; height: number } {
    const aspectRatio = img.width / img.height;
    
    let width = maxWidth;
    let height = maxHeight;
    
    // If image is wider than it is tall
    if (aspectRatio > 1) {
      height = maxWidth / aspectRatio;
      if (height > maxHeight) {
        height = maxHeight;
        width = maxHeight * aspectRatio;
      }
    } else {
      // If image is taller than it is wide
      width = maxHeight * aspectRatio;
      if (width > maxWidth) {
        width = maxWidth;
        height = maxWidth / aspectRatio;
      }
    }
    
    return { width, height };
  }

  private imageToDataUrl(img: HTMLImageElement): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx?.drawImage(img, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.8);
  }
  
  private wrapText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    
    const words = text.split(' ');
    let result = '';
    let currentLine = '';
    
    for (const word of words) {
      if ((currentLine + word).length <= maxLength) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        result += (result ? ' ' : '') + currentLine;
        currentLine = word;
      }
    }
    
    return result + (currentLine ? ' ' + currentLine : '');
  }

  private splitTextIntoLines(doc: jsPDF, text: string, maxWidth: number): string[] {
    const lines: string[] = [];
    const words = text.split(' ');
    let currentLine = '';
    
    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const textWidth = doc.getTextWidth(testLine);
      
      if (textWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          // Single word is too long, force it
          lines.push(word);
        }
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines;
  }
  
  generateCertificateId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `COA-${timestamp}-${random}`.toUpperCase();
  }
}
