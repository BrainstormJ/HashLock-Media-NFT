# Quick Setup Guide - Video License NFT

## Files Created for Your NFT Project

All files are ready to copy into your Hardhat project!

### 📁 File Locations

```
Your NFT Project Files:
├── contracts/
│   └── VideoLicenseNFT.sol           ✅ Main smart contract
├── scripts/
│   ├── deploy.js                     ✅ Deployment script
│   └── mint.js                       ✅ Minting script
├── test/
│   └── VideoLicenseNFT.test.js      ✅ Test suite
├── hardhat.config.reference.js       ✅ Configuration template
└── NFT_PROJECT_README.md             ✅ Complete documentation
```

## 🚀 Quick Start (5 Minutes)

### Step 1: Create Hardhat Project

```bash
# Create project directory
mkdir nft-video-licensing
cd nft-video-licensing

# Initialize npm
npm init -y

# Install Hardhat
npm install --save-dev hardhat

# Initialize Hardhat project
npx hardhat init
# Select: "Create a JavaScript project"
# Press Enter for all defaults
```

### Step 2: Install Dependencies

```bash
# Install OpenZeppelin contracts
npm install @openzeppelin/contracts

# Install Hardhat toolbox (includes ethers, chai, etc.)
npm install --save-dev @nomicfoundation/hardhat-toolbox

# Install dotenv for environment variables
npm install --save-dev dotenv
```

### Step 3: Copy Contract Files

Copy these files from the location shown below:

**From:**
```
/mnt/c/Users/jaxim/Desktop/claudi/quran-video-creator/
```

**To your Hardhat project:**

```bash
# Copy smart contract
cp /path/to/contracts/VideoLicenseNFT.sol ./contracts/

# Copy scripts
cp /path/to/scripts/deploy.js ./scripts/
cp /path/to/scripts/mint.js ./scripts/

# Copy test file
cp /path/to/test/VideoLicenseNFT.test.js ./test/

# Copy hardhat config (rename it)
cp /path/to/hardhat.config.reference.js ./hardhat.config.js
```

**Or manually copy:**
1. Open each file from the quran-video-creator folder
2. Create the corresponding file in your Hardhat project
3. Copy and paste the contents

### Step 4: Compile

```bash
npx hardhat compile
```

Expected output:
```
Compiled 1 Solidity file successfully (evm target: paris).
```

### Step 5: Run Tests

```bash
npx hardhat test
```

You should see all tests passing! ✅

### Step 6: Deploy Locally

**Terminal 1 - Start local node:**
```bash
npx hardhat node
```

**Terminal 2 - Deploy:**
```bash
npx hardhat run scripts/deploy.js --network localhost
```

Save the contract address shown in the output!

### Step 7: Mint Your First NFT

1. Edit `scripts/mint.js`
2. Replace `YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE` with your contract address
3. Update the `tokenURI` with your metadata URI
4. Run:
   ```bash
   npx hardhat run scripts/mint.js --network localhost
   ```

## 📝 Next Steps

### Create Metadata

Your metadata should be JSON format:

```json
{
  "name": "Video License #1",
  "description": "Commercial license for video content",
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
    }
  ]
}
```

### Upload to IPFS

**Option 1: Pinata (Easiest)**
1. Go to https://pinata.cloud
2. Sign up for free account
3. Upload your JSON file
4. Get the IPFS URL: `ipfs://QmYourHash/metadata.json`

**Option 2: NFT.Storage (Free)**
1. Go to https://nft.storage
2. Upload via web interface
3. Get the CID

### Deploy to Testnet

1. **Get testnet ETH:**
   - Sepolia: https://sepoliafaucet.com
   - Goerli: https://goerlifaucet.com

2. **Create .env file:**
   ```env
   SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
   PRIVATE_KEY=your_private_key_here
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

3. **Deploy:**
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

4. **Verify on Etherscan:**
   ```bash
   npx hardhat verify --network sepolia CONTRACT_ADDRESS "OWNER_ADDRESS"
   ```

## 🛠️ Project Structure

Your complete Hardhat project should look like:

```
nft-video-licensing/
├── contracts/
│   └── VideoLicenseNFT.sol
├── scripts/
│   ├── deploy.js
│   └── mint.js
├── test/
│   └── VideoLicenseNFT.test.js
├── node_modules/
├── cache/
├── artifacts/
├── deployments/               (created by deploy script)
├── .env                       (create this - never commit!)
├── .gitignore
├── hardhat.config.js
├── package.json
└── README.md
```

## 🔧 Common Commands

```bash
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Run specific test file
npx hardhat test test/VideoLicenseNFT.test.js

# Start local node
npx hardhat node

# Deploy to network
npx hardhat run scripts/deploy.js --network <network>

# Verify contract
npx hardhat verify --network <network> <contract-address> <constructor-args>

# Open Hardhat console
npx hardhat console --network localhost

# Clean build artifacts
npx hardhat clean

# Get gas report
REPORT_GAS=true npx hardhat test
```

## 🎯 Contract Features

Your VideoLicenseNFT contract includes:

✅ **Core NFT Functions:**
- `safeMint(address, uri)` - Mint single NFT
- `batchMint(addresses[], uris[])` - Mint multiple NFTs
- `burn(tokenId)` - Destroy NFT
- `updateTokenURI(tokenId, uri)` - Update metadata

✅ **View Functions:**
- `getCurrentTokenId()` - Next token ID
- `getTotalMinted()` - Total minted count
- `ownerOf(tokenId)` - Get token owner
- `tokenURI(tokenId)` - Get metadata URI

✅ **Security Features:**
- Owner-only minting
- Safe transfer checks
- Input validation
- Event logging

## 📚 Additional Resources

- **Complete Documentation:** See NFT_PROJECT_README.md
- **OpenZeppelin Docs:** https://docs.openzeppelin.com
- **Hardhat Docs:** https://hardhat.org/docs
- **ERC-721 Standard:** https://eips.ethereum.org/EIPS/eip-721

## ❓ Troubleshooting

### "Cannot find module '@openzeppelin/contracts'"
```bash
npm install @openzeppelin/contracts
```

### "HH12: Hardhat Network chain ID is 31337"
This is normal for local development!

### "Deployment failed"
- Check you have ETH in your account
- Verify network configuration
- Ensure contract compiles without errors

### "Only owner can mint"
Make sure you're using the same account that deployed the contract

## 🎓 Learning Path

1. ✅ Deploy locally
2. ✅ Run tests
3. ✅ Mint a test NFT
4. 📝 Deploy to testnet (Sepolia)
5. 📝 Verify on Etherscan
6. 📝 Build a frontend (React + ethers.js)
7. 📝 List on OpenSea testnet
8. 📝 Security audit
9. 📝 Mainnet deployment

## 🚨 Security Reminders

⚠️ **NEVER commit your .env file!**
⚠️ **Keep your private keys secure**
⚠️ **Test thoroughly on testnet first**
⚠️ **Get a security audit before mainnet**
⚠️ **Start with small amounts**

## ✅ Checklist

Before deploying to mainnet:

- [ ] All tests passing
- [ ] Contract compiled successfully
- [ ] Deployed and tested on testnet
- [ ] Verified on Etherscan
- [ ] Frontend integration tested
- [ ] Security audit completed
- [ ] Metadata uploaded to IPFS
- [ ] Documentation complete
- [ ] Community testing done
- [ ] Legal review (if needed)

---

**Ready to tokenize video licenses!** 🎬🔗

Your files are located at:
```
/mnt/c/Users/jaxim/Desktop/claudi/quran-video-creator/
```

Copy them to your Hardhat project and start building!
