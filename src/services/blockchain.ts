import { ethers } from 'ethers';
import type { BlockchainNetwork, NFTData, NFTMetadata } from '../types';
import { getInfuraUrl } from '../config/rpc';

export const NETWORKS: BlockchainNetwork[] = [
  {
    id: 'ethereum',
    name: 'Ethereum Mainnet',
    chainId: 1,
    rpcUrl: getInfuraUrl('ethereum'),
    blockExplorer: 'https://etherscan.io',
    symbol: 'ETH',
    decimals: 18,
  },
  {
    id: 'polygon',
    name: 'Polygon',
    chainId: 137,
    rpcUrl: getInfuraUrl('polygon'),
    blockExplorer: 'https://polygonscan.com',
    symbol: 'MATIC',
    decimals: 18,
  },
  {
    id: 'bsc',
    name: 'BSC (Binance Smart Chain)',
    chainId: 56,
    rpcUrl: 'https://bsc-dataseed.binance.org',
    blockExplorer: 'https://bscscan.com',
    symbol: 'BNB',
    decimals: 18,
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum One',
    chainId: 42161,
    rpcUrl: getInfuraUrl('arbitrum'),
    blockExplorer: 'https://arbiscan.io',
    symbol: 'ETH',
    decimals: 18,
  },
  {
    id: 'optimism',
    name: 'Optimism',
    chainId: 10,
    rpcUrl: getInfuraUrl('optimism'),
    blockExplorer: 'https://optimistic.etherscan.io',
    symbol: 'ETH',
    decimals: 18,
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    chainId: 43114,
    rpcUrl: getInfuraUrl('avalanche'),
    blockExplorer: 'https://snowtrace.io',
    symbol: 'AVAX',
    decimals: 18,
  },
  {
    id: 'base',
    name: 'Base',
    chainId: 8453,
    rpcUrl: getInfuraUrl('base'),
    blockExplorer: 'https://basescan.org',
    symbol: 'ETH',
    decimals: 18,
  },
];

// ERC721 ABI for basic functions
const ERC721_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function tokenURI(uint256 tokenId) view returns (string)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function totalSupply() view returns (uint256)',
];

export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private network: BlockchainNetwork;
  private fallbackUrls: string[];

  constructor(network: BlockchainNetwork) {
    this.network = network;
    this.fallbackUrls = this.getFallbackUrls(network);
    this.provider = new ethers.JsonRpcProvider(network.rpcUrl);
  }

  private getFallbackUrls(network: BlockchainNetwork): string[] {
    const fallbacks: Record<string, string[]> = {
      'ethereum': [
        'https://cloudflare-eth.com',
        'https://rpc.ankr.com/eth'
      ],
      'polygon': [
        'https://polygon-rpc.com',
        'https://rpc.ankr.com/polygon'
      ],
      'arbitrum': [
        'https://arb1.arbitrum.io/rpc',
        'https://rpc.ankr.com/arbitrum'
      ],
      'optimism': [
        'https://mainnet.optimism.io',
        'https://rpc.ankr.com/optimism'
      ],
      'avalanche': [
        'https://api.avax.network/ext/bc/C/rpc',
        'https://rpc.ankr.com/avalanche'
      ],
      'base': [
        'https://mainnet.base.org',
        'https://rpc.ankr.com/base'
      ],
      'bsc': [
        'https://bsc-dataseed1.binance.org',
        'https://bsc-dataseed2.binance.org',
        'https://rpc.ankr.com/bsc'
      ]
    };
    
    return fallbacks[network.id] || [];
  }

  async getNFTData(
    contractAddress: string,
    tokenId: string,
    network: BlockchainNetwork
  ): Promise<NFTData> {
    let lastError: Error | null = null;
    
    // Try primary provider first
    try {
      return await this.fetchWithProvider(this.provider, contractAddress, tokenId, network);
    } catch (error) {
      console.warn('Primary provider failed, trying fallbacks:', error);
      lastError = error as Error;
    }

    // Try fallback providers
    for (const fallbackUrl of this.fallbackUrls) {
      try {
        const fallbackProvider = new ethers.JsonRpcProvider(fallbackUrl);
        return await this.fetchWithProvider(fallbackProvider, contractAddress, tokenId, network);
      } catch (error) {
        console.warn(`Fallback provider ${fallbackUrl} failed:`, error);
        lastError = error as Error;
      }
    }

    // If all providers fail, throw the last error
    console.error('All RPC providers failed:', lastError);
    throw new Error('Failed to fetch NFT data. All RPC endpoints are unavailable. Please try again later.');
  }

  private async fetchWithProvider(
    provider: ethers.JsonRpcProvider,
    contractAddress: string,
    tokenId: string,
    network: BlockchainNetwork
  ): Promise<NFTData> {
    const contract = new ethers.Contract(contractAddress, ERC721_ABI, provider);
    
    // Fetch contract data in parallel
    const [name, symbol, tokenURI, owner] = await Promise.all([
      contract.name().catch(() => 'Unknown'),
      contract.symbol().catch(() => 'Unknown'),
      contract.tokenURI(tokenId),
      contract.ownerOf(tokenId),
    ]);

    // Fetch metadata
    const metadata = await this.fetchMetadata(tokenURI);

    const blockExplorerUrl = `${network.blockExplorer}/token/${contractAddress}?a=${tokenId}`;

    return {
      contractAddress,
      tokenId,
      owner,
      name,
      symbol,
      metadata,
      network,
      blockExplorerUrl,
    };
  }

  private async fetchMetadata(tokenURI: string): Promise<NFTMetadata> {
    try {
      let url = tokenURI;
      
      // Handle IPFS URLs
      if (tokenURI.startsWith('ipfs://')) {
        url = `https://ipfs.io/ipfs/${tokenURI.slice(7)}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch metadata');
      }
      
      const metadata = await response.json();
      
      // Handle IPFS image URLs
      if (metadata.image && metadata.image.startsWith('ipfs://')) {
        metadata.image = `https://ipfs.io/ipfs/${metadata.image.slice(7)}`;
      }
      
      return metadata;
    } catch (error) {
      console.error('Error fetching metadata:', error);
      return {
        name: 'Unknown',
        description: 'Metadata not available',
        image: '',
      };
    }
  }

  async resolveENS(address: string): Promise<string> {
    try {
      // Only resolve ENS on Ethereum mainnet
      if (this.network.id !== 'ethereum') {
        return address;
      }
      
      // Try primary provider first
      try {
        const ensName = await this.provider.lookupAddress(address);
        return ensName || address;
      } catch (error) {
        console.warn('Primary provider ENS resolution failed, trying fallbacks:', error);
      }

      // Try fallback providers for ENS resolution
      for (const fallbackUrl of this.fallbackUrls) {
        try {
          const fallbackProvider = new ethers.JsonRpcProvider(fallbackUrl);
          const ensName = await fallbackProvider.lookupAddress(address);
          return ensName || address;
        } catch (error) {
          console.warn(`Fallback provider ${fallbackUrl} ENS resolution failed:`, error);
        }
      }
      
      return address;
    } catch (error) {
      console.error('Error resolving ENS:', error);
      return address;
    }
  }
}
