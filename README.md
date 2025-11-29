# HashLock Media NFT

**ERC-721 Smart Contract for Tokenizing Media Licenses**

## Overview

HashLock Media NFT is a production-ready ERC-721 smart contract for creating and managing NFTs that represent licenses for media content (videos, audio, images, etc.).

## Quick Info

- **Contract:** HashLockMediaNFT
- **Symbol:** HLMNFT
- **Standard:** ERC-721
- **Solidity:** ^0.8.20
- **License:** MIT

## Features

✅ ERC-721 compliant NFT implementation
✅ Metadata storage (IPFS/Arweave URI support)
✅ Owner-controlled minting
✅ Batch minting (up to 100 NFTs)
✅ Burnable tokens
✅ URI updates
✅ Automatic token IDs
✅ Event logging
✅ Gas optimized

## Installation

### Prerequisites

```bash
node >= 16.0.0
npm >= 8.0.0
```

### Setup

```bash
# Install dependencies
npm install

# Install OpenZeppelin contracts
npm install @openzeppelin/contracts

# Install Hardhat toolbox
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

## Usage

### Compile

```bash
npx hardhat compile
```

### Test

```bash
npx hardhat test
```

### Deploy Locally

**Terminal 1:**
```bash
npx hardhat node
```

**Terminal 2:**
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Mint NFT

1. Update `scripts/mint.js` with contract address
2. Update `tokenURI` with your IPFS metadata
3. Run:

```bash
npx hardhat run scripts/mint.js --network localhost
```

## Contract Functions

### Minting

```solidity
// Mint single NFT
safeMint(address to, string uri) returns (uint256)

// Batch mint (up to 100)
batchMint(address[] recipients, string[] uris) returns (uint256[])
```

### Management

```solidity
// Burn token
burn(uint256 tokenId)

// Update metadata
updateTokenURI(uint256 tokenId, string uri)
```

### View Functions

```solidity
getCurrentTokenId() returns (uint256)
getTotalMinted() returns (uint256)
ownerOf(tokenId) returns (address)
tokenURI(tokenId) returns (string)
```

## Metadata Example

```json
{
  "name": "HashLock Media License #1",
  "description": "Premium media license from HashLock Media",
  "image": "ipfs://QmImageHash/thumbnail.jpg",
  "animation_url": "ipfs://QmMediaHash/media.mp4",
  "attributes": [
    {
      "trait_type": "License Type",
      "value": "Commercial"
    },
    {
      "trait_type": "Duration",
      "value": "Perpetual"
    }
  ],
  "properties": {
    "media_hash": "QmMediaHash",
    "creator": "HashLock Media"
  }
}
```

## Deploy to Testnet

1. Create `.env` file:

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_api_key
```

2. Get testnet ETH from faucet

3. Deploy:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

4. Verify:

```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS "OWNER_ADDRESS"
```

## Security

✅ Owner-only minting
✅ Safe transfer checks
✅ Input validation
✅ OpenZeppelin audited contracts
✅ Event logging
✅ Reentrancy safe

## Gas Costs (Approximate)

- Deploy: ~2,500,000 gas
- Single Mint: ~150,000 gas
- Batch Mint (10): ~1,200,000 gas
- Transfer: ~50,000 gas
- Burn: ~30,000 gas

## Commands

```bash
npm test                    # Run tests
npm run compile             # Compile contracts
npm run deploy:local        # Deploy locally
npm run deploy:sepolia      # Deploy to Sepolia
npm run mint:local          # Mint NFT locally
npm run node                # Start local node
npm run clean               # Clean artifacts
```

## Resources

- [OpenZeppelin Docs](https://docs.openzeppelin.com)
- [Hardhat Docs](https://hardhat.org/docs)
- [ERC-721 Standard](https://eips.ethereum.org/EIPS/eip-721)

## License

MIT License

---

**HashLock Media NFT** - Tokenizing the future of media licensing 🎬🔗
