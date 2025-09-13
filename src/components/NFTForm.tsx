import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronDown, Loader2 } from 'lucide-react';
import type { FormData } from '../types';
import { NETWORKS } from '../services/blockchain';

const formSchema = z.object({
  network: z.string().min(1, 'Please select a network'),
  contractAddress: z.string()
    .min(42, 'Contract address must be 42 characters')
    .max(42, 'Contract address must be 42 characters')
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid contract address format'),
  tokenId: z.string()
    .min(1, 'Token ID is required')
    .regex(/^\d+$/, 'Token ID must be a number'),
});

interface NFTFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export const NFTForm: React.FC<NFTFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      network: 'ethereum',
      contractAddress: '',
      tokenId: '',
    },
  });

  const selectedNetwork = watch('network');
  const network = NETWORKS.find(n => n.id === selectedNetwork);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Generate NFT Certificate
        </h2>
        <p className="text-gray-600">
          Enter your NFT details to create a certificate of authenticity
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Network Selection */}
        <div>
          <label htmlFor="network" className="block text-sm font-medium text-gray-700 mb-1">
            Blockchain Network
          </label>
          <div className="relative">
            <select
              {...register('network')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              {NETWORKS.map((network) => (
                <option key={network.id} value={network.id}>
                  {network.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          {errors.network && (
            <p className="mt-1 text-sm text-red-600">{errors.network.message}</p>
          )}
        </div>

        {/* Contract Address */}
        <div>
          <label htmlFor="contractAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Contract Address
          </label>
          <input
            {...register('contractAddress')}
            type="text"
            placeholder="0x..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          />
          {errors.contractAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.contractAddress.message}</p>
          )}
        </div>

        {/* Token ID */}
        <div>
          <label htmlFor="tokenId" className="block text-sm font-medium text-gray-700 mb-1">
            Token ID
          </label>
          <input
            {...register('tokenId')}
            type="text"
            placeholder="123"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.tokenId && (
            <p className="mt-1 text-sm text-red-600">{errors.tokenId.message}</p>
          )}
        </div>

        {/* Network Info */}
        {network && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-800">
                  {network.name}
                </p>
                <p className="text-xs text-blue-600">
                  Chain ID: {network.chainId} • Symbol: {network.symbol}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Generating Certificate...
            </>
          ) : (
            'Generate Certificate'
          )}
        </button>
      </form>
    </div>
  );
};
