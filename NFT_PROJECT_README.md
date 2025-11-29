# Video License NFT - Smart Contract Documentation

Complete ERC-721 NFT smart contract for tokenizing video licenses on Ethereum.

## Overview

This project provides a production-ready smart contract for creating NFTs that represent licenses for video content. Each NFT represents ownership or rights to a specific video with defined license terms stored in the metadata.

## Files Included

```
contracts/
└── VideoLicenseNFT.sol          # Main ERC-721 NFT contract

scripts/
├── deploy.js                     # Deployment script
└── mint.js                       # Minting script

test/
└── VideoLicenseNFT.test.js      # Test suite
```

## Features

### Smart Contract Features

✅ **ERC-721 Compliant**: Standard NFT implementation
✅ **Metadata Storage**: URI storage for video details and license terms
✅ **Owner-Controlled Minting**: Only owner can mint new licenses
✅ **Automatic Token IDs**: Sequential ID generation
✅ **Batch Minting**: Mint multiple NFTs efficiently
✅ **Burnable**: Tokens can be burned (destroyed)
✅ **URI Updates**: Owner can update metadata URIs
✅ **Event Logging**: Comprehensive event emissions

### Contract Functions

#### Core Functions

```solidity
// Mint a single NFT
function safeMint(address to, string memory uri) public onlyOwner returns (uint256)

// Batch mint multiple NFTs
function batchMint(address[] memory recipients, string[] memory uris) public onlyOwner returns (uint256[] memory)

// Burn (destroy) an NFT
function burn(uint256 tokenId) public

// Update token metadata
function updateTokenURI(uint256 tokenId, string memory uri) public onlyOwner

// Get current token ID
function getCurrentTokenId() public view returns (uint256)

// Get total minted count
function getTotalMinted() public view returns (uint256)
```

#### Inherited ERC-721 Functions

```solidity
ownerOf(tokenId)           // Get owner of token
balanceOf(address)         // Get number of tokens owned
approve(address, tokenId)  // Approve transfer
transferFrom(from, to, tokenId)  // Transfer token
tokenURI(tokenId)          // Get metadata URI
```

## Setup Instructions

### Prerequisites

```bash
node >= 16.0.0
npm >= 8.0.0
```

### 1. Initialize Hardhat Project

```bash
# Create project directory
mkdir nft-video-licensing
cd nft-video-licensing

# Initialize npm
npm init -y

# Install Hardhat
npm install --save-dev hardhat

# Initialize Hardhat
npx hardhat init
# Select: "Create a JavaScript project"
```

### 2. Install Dependencies

```bash
# Install OpenZeppelin contracts
npm install @openzeppelin/contracts

# Install Hardhat plugins
npm install --save-dev @nomicfoundation/hardhat-toolbox
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

### 3. Add Contract Files

Copy the provided files to your project:

```bash
# Copy smart contract
contracts/VideoLicenseNFT.sol

# Copy scripts
scripts/deploy.js
scripts/mint.js
```

### 4. Configure Hardhat

Update `hardhat.config.js`:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    // Uncomment for testnets (requires .env setup)
    // goerli: {
    //   url: process.env.GOERLI_RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY]
    // },
    // sepolia: {
    //   url: process.env.SEPOLIA_RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY]
    // }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
```

## Usage Guide

### Compile Contract

```bash
npx hardhat compile
```

Expected output:
```
Compiled 1 Solidity file successfully
```

### Deploy Locally

#### Option 1: Hardhat Network (In-Memory)

```bash
# Terminal 1: Start local node
npx hardhat node

# Terminal 2: Deploy
npx hardhat run scripts/deploy.js --network localhost
```

#### Option 2: Hardhat Console

```bash
npx hardhat console --network localhost
> const VideoLicenseNFT = await ethers.getContractFactory("VideoLicenseNFT");
> const [owner] = await ethers.getSigners();
> const contract = await VideoLicenseNFT.deploy(owner.address);
> await contract.waitForDeployment();
> console.log("Deployed to:", await contract.getAddress());
```

### Mint NFTs

1. **Update contract address** in `scripts/mint.js`:
   ```javascript
   const CONTRACT_ADDRESS = "0xYourDeployedContractAddress";
   ```

2. **Update metadata URI** (upload your metadata to IPFS first):
   ```javascript
   const tokenURI = "ipfs://QmYourIPFSHash/metadata.json";
   ```

3. **Run minting script**:
   ```bash
   npx hardhat run scripts/mint.js --network localhost
   ```

### Run Tests

```bash
npx hardhat test
```

## Metadata Structure

Your token metadata should follow this JSON structure:

```json
{
  "name": "Video License #1",
  "description": "Exclusive commercial license for video content",
  "image": "ipfs://QmImageHash/thumbnail.jpg",
  "animation_url": "ipfs://QmVideoHash/video.mp4",
  "attributes": [
    {
      "trait_type": "License Type",
      "value": "Commercial"
    },
    {
      "trait_type": "Duration",
      "value": "Perpetual"
    },
    {
      "trait_type": "Territory",
      "value": "Worldwide"
    },
    {
      "trait_type": "Exclusive",
      "value": "Yes"
    },
    {
      "trait_type": "Usage Rights",
      "value": "Broadcast, Streaming, Social Media"
    }
  ],
  "properties": {
    "video_hash": "QmVideoContentHash",
    "video_format": "MP4",
    "resolution": "4K",
    "duration": "120 seconds",
    "license_terms": "ipfs://QmLicenseDocHash",
    "created_date": "2025-01-01",
    "creator": "0xCreatorAddress",
    "royalty_percentage": 10
  }
}
```

### Uploading Metadata to IPFS

**Option 1: Pinata (Recommended)**
```bash
# 1. Sign up at https://pinata.cloud
# 2. Upload your JSON file
# 3. Get the IPFS hash
# 4. Use: ipfs://QmYourHash/metadata.json
```

**Option 2: NFT.Storage (Free)**
```bash
# 1. Sign up at https://nft.storage
# 2. Upload via web interface or API
# 3. Get the IPFS CID
```

**Option 3: Local IPFS Node**
```bash
ipfs add metadata.json
# Returns: QmHash
```

## Deployment to Testnets

### Setup Environment Variables

Create `.env` file:

```env
# RPC URLs
GOERLI_RPC_URL=https://goerli.infura.io/v3/YOUR_INFURA_KEY
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Private key (NEVER commit this!)
PRIVATE_KEY=your_private_key_here

# Etherscan API (for verification)
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### Deploy to Goerli Testnet

```bash
npx hardhat run scripts/deploy.js --network goerli
```

### Verify Contract on Etherscan

```bash
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS "OWNER_ADDRESS"
```

## Gas Optimization Tips

1. **Batch Minting**: Use `batchMint()` for multiple NFTs to save gas
2. **EIP-2309**: Consider implementing for large batch mints
3. **Token IDs**: Sequential IDs are gas-efficient
4. **Metadata**: Store on IPFS to minimize on-chain data

## Security Considerations

✅ **Ownership Control**: Only owner can mint
✅ **Safe Transfers**: Uses `_safeMint` to prevent lost tokens
✅ **Input Validation**: Checks for zero addresses and empty URIs
✅ **OpenZeppelin**: Built on audited, battle-tested contracts
✅ **Access Control**: Ownable pattern for admin functions

### Recommended Audits

Before mainnet deployment:
- [ ] Internal code review
- [ ] Professional security audit
- [ ] Testnet deployment and testing
- [ ] Community bug bounty

## Common Use Cases

### 1. Stock Video Licensing
Tokenize licenses for stock footage with usage rights

### 2. Film Rights Management
NFTs representing distribution rights for films

### 3. Music Video Licenses
Tokenized sync licenses for music videos

### 4. Educational Content
Licensed access to educational video courses

### 5. User-Generated Content
Platform for creators to license their videos

## Troubleshooting

### "Contract deployment failed"
- Check your account has enough ETH
- Verify network configuration
- Ensure contract compiles without errors

### "Only owner can mint"
- Verify you're using the owner account
- Check contract ownership with `contract.owner()`

### "Token URI cannot be empty"
- Provide a valid metadata URI
- Upload metadata to IPFS first

### "Transaction underpriced"
- Increase gas price in network config
- Check current network gas prices

## Next Steps

1. **Deploy to testnet** (Goerli or Sepolia)
2. **Build frontend** (React + ethers.js or wagmi)
3. **Implement royalties** (ERC-2981)
4. **Add marketplace** (OpenSea, Rarible)
5. **Security audit** before mainnet
6. **Set up metadata server** or IPFS pinning

## Resources

- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [ERC-721 Standard](https://eips.ethereum.org/EIPS/eip-721)
- [NFT Metadata Standard](https://docs.opensea.io/docs/metadata-standards)
- [IPFS Documentation](https://docs.ipfs.io/)

## License

MIT License - See LICENSE file for details

---

**Ready to tokenize video licenses!** 🎬🔗

For questions or support, open an issue on GitHub.
