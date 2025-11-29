# HashLock Media NFT - Smart Contract

**ERC-721 NFT Smart Contract for Tokenizing Media Licenses**

## Project Overview

HashLock Media NFT is a production-ready smart contract system for creating and managing NFTs that represent licenses for media content (videos, audio, images, etc.). Built on Ethereum using Solidity and the battle-tested OpenZeppelin framework.

## Quick Info

- **Contract Name:** HashLockMediaNFT
- **Symbol:** HLMNFT
- **Token Standard:** ERC-721
- **Solidity Version:** ^0.8.20
- **License:** MIT

## Features

✅ **ERC-721 Compliant** - Standard NFT implementation
✅ **Metadata Storage** - IPFS/Arweave URI support
✅ **Owner-Controlled Minting** - Secure minting controls
✅ **Batch Minting** - Mint up to 100 NFTs at once
✅ **Burnable Tokens** - Destroy licenses when needed
✅ **URI Updates** - Update metadata post-mint
✅ **Auto Token IDs** - Sequential ID generation
✅ **Event Logging** - Complete audit trail
✅ **Gas Optimized** - Efficient operations

## Files Included

```
contracts/
└── HashLockMediaNFT.sol       # Main smart contract

scripts/
├── deploy-hashlock.js         # Deployment script
└── mint-hashlock.js          # Minting script

test/
└── HashLockMediaNFT.test.js  # Complete test suite (30+ tests)
```

## Installation

### Prerequisites

```bash
node >= 16.0.0
npm >= 8.0.0
```

### Setup Hardhat Project

```bash
# Create project
mkdir hashlock-media-nft
cd hashlock-media-nft

# Initialize
npm init -y
npm install --save-dev hardhat
npx hardhat init  # Select "Create a JavaScript project"

# Install dependencies
npm install @openzeppelin/contracts
npm install --save-dev @nomicfoundation/hardhat-toolbox
npm install --save-dev dotenv
```

### Add Contract Files

1. Copy `HashLockMediaNFT.sol` to `contracts/`
2. Copy `deploy-hashlock.js` to `scripts/deploy.js`
3. Copy `mint-hashlock.js` to `scripts/mint.js`
4. Copy `HashLockMediaNFT.test.js` to `test/`

## Usage

### 1. Compile

```bash
npx hardhat compile
```

### 2. Run Tests

```bash
npx hardhat test
```

Expected: All 30+ tests pass ✅

### 3. Deploy Locally

**Terminal 1:**
```bash
npx hardhat node
```

**Terminal 2:**
```bash
npx hardhat run scripts/deploy.js --network localhost
```

Save the contract address from the output!

### 4. Mint NFT

Edit `scripts/mint.js`:
- Update `CONTRACT_ADDRESS`
- Update `tokenURI` with your IPFS metadata

```bash
npx hardhat run scripts/mint.js --network localhost
```

## Smart Contract Functions

### Minting Functions

```solidity
// Mint single NFT
function safeMint(address to, string memory uri) 
    public onlyOwner returns (uint256)

// Mint multiple NFTs (up to 100)
function batchMint(address[] memory recipients, string[] memory uris) 
    public onlyOwner returns (uint256[] memory)
```

### Management Functions

```solidity
// Burn (destroy) NFT
function burn(uint256 tokenId) public

// Update metadata URI
function updateTokenURI(uint256 tokenId, string memory uri) 
    public onlyOwner
```

### View Functions

```solidity
// Get next token ID
function getCurrentTokenId() public view returns (uint256)

// Get total minted (including burned)
function getTotalMinted() public view returns (uint256)

// Standard ERC-721 functions
ownerOf(tokenId)
balanceOf(address)
tokenURI(tokenId)
```

## Metadata Structure

Upload this JSON to IPFS:

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
    },
    {
      "trait_type": "Territory",
      "value": "Worldwide"
    },
    {
      "trait_type": "Exclusive",
      "value": "Yes"
    }
  ],
  "properties": {
    "media_hash": "QmMediaContentHash",
    "license_terms": "ipfs://QmLicenseDocHash",
    "created_date": "2025-01-01",
    "creator": "HashLock Media"
  }
}
```

## Deploy to Testnet

### 1. Setup Environment

Create `.env`:

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### 2. Get Testnet ETH

- Sepolia: https://sepoliafaucet.com
- Goerli: https://goerlifaucet.com

### 3. Deploy

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 4. Verify on Etherscan

```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS "OWNER_ADDRESS"
```

## Security Features

✅ **Access Control** - Only owner can mint
✅ **Safe Transfers** - Prevents token loss
✅ **Input Validation** - Checks for zero addresses & empty URIs
✅ **OpenZeppelin Base** - Audited, battle-tested code
✅ **Event Logging** - Full transparency
✅ **Reentrancy Safe** - Protected against attacks

## Gas Costs (Approximate)

- Deploy: ~2,500,000 gas
- Single Mint: ~150,000 gas
- Batch Mint (10): ~1,200,000 gas
- Transfer: ~50,000 gas
- Burn: ~30,000 gas

## Use Cases

- 🎬 Video licensing and distribution rights
- 🎵 Music licensing NFTs
- 📸 Photography licenses
- 🎨 Digital art licenses
- 📺 Streaming rights management
- 🎓 Educational content access
- 🎮 Gaming asset licenses

## Network Compatibility

- ✅ Ethereum Mainnet
- ✅ Goerli Testnet
- ✅ Sepolia Testnet
- ✅ Polygon (MATIC)
- ✅ Mumbai (Polygon Testnet)
- ✅ Arbitrum
- ✅ Optimism
- ✅ Any EVM-compatible chain

## Hardhat Commands

```bash
# Compile
npx hardhat compile

# Test
npx hardhat test
REPORT_GAS=true npx hardhat test

# Deploy
npx hardhat run scripts/deploy.js --network <network>

# Verify
npx hardhat verify --network <network> <address> <constructor-args>

# Console
npx hardhat console --network localhost

# Clean
npx hardhat clean
```

## Testing

30+ comprehensive tests covering:
- ✅ Deployment
- ✅ Minting (single & batch)
- ✅ Burning
- ✅ URI updates
- ✅ Ownership transfers
- ✅ Access control
- ✅ ERC-721 compliance
- ✅ Edge cases

Run tests:
```bash
npx hardhat test
```

## Deployment Checklist

Before mainnet:

- [ ] All tests passing
- [ ] Deployed to testnet
- [ ] Verified on Etherscan
- [ ] Security audit completed
- [ ] Frontend integration tested
- [ ] Metadata uploaded to IPFS
- [ ] Legal review done
- [ ] Community testing complete

## Support & Resources

- **OpenZeppelin Docs:** https://docs.openzeppelin.com
- **Hardhat Docs:** https://hardhat.org/docs
- **ERC-721 Standard:** https://eips.ethereum.org/EIPS/eip-721
- **IPFS Docs:** https://docs.ipfs.io

## License

MIT License - See LICENSE file

---

## Quick Start Commands

```bash
# 1. Install
npm install @openzeppelin/contracts
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# 2. Compile
npx hardhat compile

# 3. Test
npx hardhat test

# 4. Deploy
npx hardhat node  # Terminal 1
npx hardhat run scripts/deploy.js --network localhost  # Terminal 2

# 5. Mint
# Update scripts/mint.js with contract address
npx hardhat run scripts/mint.js --network localhost
```

---

**HashLock Media NFT** - Tokenizing the future of media licensing 🎬🔗

Built with Solidity, OpenZeppelin, and Hardhat.
