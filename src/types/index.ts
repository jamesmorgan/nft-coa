export interface BlockchainNetwork {
  id: string;
  name: string;
  chainId: number;
  rpcUrl: string;
  blockExplorer: string;
  symbol: string;
  decimals: number;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
  external_url?: string;
  animation_url?: string;
}

export interface NFTData {
  contractAddress: string;
  tokenId: string;
  owner: string;
  name: string;
  symbol: string;
  metadata: NFTMetadata;
  network: BlockchainNetwork;
  blockExplorerUrl: string;
}

export interface CertificateData {
  nftData: NFTData;
  generatedAt: Date;
  certificateId: string;
}

export interface FormData {
  network: string;
  contractAddress: string;
  tokenId: string;
}
