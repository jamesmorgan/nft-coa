# NFT Certificate of Authenticity Generator

A web application that generates professional, printable certificates of authenticity for NFTs. Simply enter your blockchain network, contract address, and token ID to create a beautiful certificate with blockchain verification.

## Features

- 🎨 **Professional Design**: Clean, print-ready certificate layout
- 🔗 **Multi-Chain Support**: Ethereum, Polygon, BSC, Arbitrum, Optimism, Avalanche, Base
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🖨️ **Print Optimized**: High-quality PDF generation for printing
- 🔍 **Blockchain Verification**: QR codes linking to block explorers
- 🚀 **No Registration**: Free to use, no account required
- 📊 **Complete Metadata**: Displays all NFT attributes and information

## Live Demo

Visit the live application at: [https://jamesmorgan.github.io/nft-coa/](https://jamesmorgan.github.io/nft-coa/)

## How to Use

1. **Select Network**: Choose from supported EVM-compatible blockchains
2. **Enter Details**: Input your NFT contract address and token ID
3. **Generate**: Click to create your certificate
4. **Download/Print**: Save as PDF or print directly

## Supported Networks

- Ethereum Mainnet
- Polygon
- BSC (Binance Smart Chain)
- Arbitrum One
- Optimism
- Avalanche
- Base
- Custom RPC endpoints

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: ethers.js v6
- **RPC Providers**: Infura (primary), Alchemy (fallback), Public endpoints
- **PDF Generation**: jsPDF
- **QR Codes**: qrcode.js
- **Deployment**: GitHub Pages

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/jamesmorgan/nft-coa.git
cd nft-coa

# Install dependencies
npm install

# Start development server
npm run dev
```

### Custom API Keys (Optional)

For better performance and higher rate limits, you can add your own API keys:

1. Create a `.env.local` file in the project root
2. Add your API keys:

```bash
# Infura API Key (recommended)
VITE_INFURA_API_KEY=your_infura_api_key_here

The app will automatically use these keys if available, otherwise it falls back to public endpoints.

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components with [Tailwind CSS](https://tailwindcss.com/)
- Blockchain integration with [ethers.js](https://docs.ethers.org/)
- Icons by [Lucide](https://lucide.dev/)

## Support

If you encounter any issues or have questions, please open an issue on GitHub.