// scripts/mint.js
/**
 * Script to mint a Video License NFT
 *
 * Usage:
 *   npx hardhat run scripts/mint.js --network localhost
 *
 * Make sure to update CONTRACT_ADDRESS with your deployed contract address
 */

const hre = require("hardhat");

async function main() {
  // ⚠️ UPDATE THIS with your deployed contract address
  const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";

  console.log("🎨 Starting NFT minting process...\n");

  // Get signer (minter must be contract owner)
  const [minter] = await hre.ethers.getSigners();
  console.log("👤 Minting from account:", minter.address);

  // Get contract instance
  console.log("📡 Connecting to VideoLicenseNFT at:", CONTRACT_ADDRESS);
  const VideoLicenseNFT = await hre.ethers.getContractFactory("VideoLicenseNFT");
  const contract = VideoLicenseNFT.attach(CONTRACT_ADDRESS);

  // Verify we're connected
  try {
    const owner = await contract.owner();
    console.log("✅ Contract owner:", owner);

    if (owner.toLowerCase() !== minter.address.toLowerCase()) {
      console.log("⚠️  Warning: You are not the contract owner!");
      console.log("   Only the owner can mint NFTs");
      return;
    }
  } catch (error) {
    console.error("❌ Failed to connect to contract:", error.message);
    return;
  }

  // NFT metadata
  // In production, this should point to IPFS, Arweave, or your metadata server
  const recipient = minter.address; // Minting to ourselves for demo
  const tokenURI = "ipfs://QmYourIPFSHashHere/metadata.json";

  // Sample metadata structure (upload this JSON to IPFS):
  /*
  {
    "name": "Video License #1",
    "description": "License for video: My Awesome Video",
    "image": "ipfs://QmImageHash/video-thumbnail.jpg",
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
      }
    ],
    "properties": {
      "video_hash": "QmVideoHash",
      "license_terms": "ipfs://QmLicenseTermsHash",
      "created_date": "2025-01-01",
      "creator": "0xCreatorAddress"
    }
  }
  */

  console.log("\n📝 Minting details:");
  console.log("   Recipient:", recipient);
  console.log("   Token URI:", tokenURI);

  try {
    // Mint the NFT
    console.log("\n⚙️  Minting NFT...");
    const tx = await contract.safeMint(recipient, tokenURI);

    console.log("⏳ Transaction submitted:", tx.hash);
    console.log("   Waiting for confirmation...");

    // Wait for transaction confirmation
    const receipt = await tx.wait();

    console.log("✅ Transaction confirmed!");
    console.log("   Block number:", receipt.blockNumber);
    console.log("   Gas used:", receipt.gasUsed.toString());

    // Get the minted token ID from events
    const mintEvent = receipt.logs.find(
      log => log.fragment && log.fragment.name === "VideoLicenseMinted"
    );

    if (mintEvent) {
      const tokenId = mintEvent.args.tokenId;
      console.log("\n🎉 NFT Minted Successfully!");
      console.log("   Token ID:", tokenId.toString());
      console.log("   Owner:", recipient);
      console.log("   Token URI:", tokenURI);

      // Verify the mint
      const tokenOwner = await contract.ownerOf(tokenId);
      const retrievedURI = await contract.tokenURI(tokenId);

      console.log("\n🔍 Verification:");
      console.log("   Token owner:", tokenOwner);
      console.log("   Token URI:", retrievedURI);

      // Get total minted
      const totalMinted = await contract.getTotalMinted();
      console.log("   Total minted:", totalMinted.toString());
    }

    console.log("\n✅ Minting complete!\n");

  } catch (error) {
    console.error("\n❌ Minting failed:");
    console.error(error.message);

    if (error.message.includes("empty token URI")) {
      console.log("\n💡 Tip: Make sure to provide a valid token URI");
    } else if (error.message.includes("owner")) {
      console.log("\n💡 Tip: Only the contract owner can mint NFTs");
    }
  }
}

// Batch minting example
async function batchMint() {
  const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";

  console.log("🎨 Starting batch NFT minting...\n");

  const [minter] = await hre.ethers.getSigners();
  const VideoLicenseNFT = await hre.ethers.getContractFactory("VideoLicenseNFT");
  const contract = VideoLicenseNFT.attach(CONTRACT_ADDRESS);

  // Define recipients and URIs
  const recipients = [
    "0xRecipient1Address",
    "0xRecipient2Address",
    "0xRecipient3Address"
  ];

  const uris = [
    "ipfs://QmHash1/metadata1.json",
    "ipfs://QmHash2/metadata2.json",
    "ipfs://QmHash3/metadata3.json"
  ];

  console.log("📝 Batch minting", recipients.length, "NFTs...");

  try {
    const tx = await contract.batchMint(recipients, uris);
    console.log("⏳ Transaction:", tx.hash);

    const receipt = await tx.wait();
    console.log("✅ Batch mint complete!");
    console.log("   Gas used:", receipt.gasUsed.toString());

  } catch (error) {
    console.error("❌ Batch mint failed:", error.message);
  }
}

// Execute single mint
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// Uncomment to use batch mint instead:
// batchMint()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

module.exports = { main, batchMint };
