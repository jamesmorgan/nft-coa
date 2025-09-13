// RPC Configuration
// You can customize these URLs or add your own API keys

export const RPC_CONFIG = {
  // Public Infura API key (rate limited)
  INFURA_API_KEY: 'dc735662ed3a4f4cbcc1952b5ba45fa5',
  
  // Custom API keys from environment variables (if available)
  CUSTOM_INFURA_KEY: import.meta.env.VITE_INFURA_API_KEY,
};

export const getInfuraUrl = (network: string, customKey?: string): string => {
  const apiKey = customKey || RPC_CONFIG.CUSTOM_INFURA_KEY || RPC_CONFIG.INFURA_API_KEY;
  
  const endpoints: Record<string, string> = {
    ethereum: `https://mainnet.infura.io/v3/${apiKey}`,
    polygon: `https://polygon-mainnet.infura.io/v3/${apiKey}`,
    arbitrum: `https://arbitrum-mainnet.infura.io/v3/${apiKey}`,
    optimism: `https://optimism-mainnet.infura.io/v3/${apiKey}`,
    avalanche: `https://avalanche-mainnet.infura.io/v3/${apiKey}`,
    base: `https://base-mainnet.infura.io/v3/${apiKey}`,
  };
  
  return endpoints[network] || '';
};
