// scripts/deploy.js
/**
 * Deployment script for VideoLicenseNFT contract
 *
 * Usage:
 *   Local deployment:  npx hardhat run scripts/deploy.js --network localhost
 *   Testnet:          npx hardhat run scripts/deploy.js --network goerli
 *   Mainnet:          npx hardhat run scripts/deploy.js --network mainnet
 */

const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting VideoLicenseNFT deployment...\n");

  // Get deployment account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📍 Deploying from account:", deployer.address);

  // Check account balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH\n");

  // Get the contract factory
  console.log("📦 Getting VideoLicenseNFT contract factory...");
  const VideoLicenseNFT = await hre.ethers.getContractFactory("VideoLicenseNFT");

  // Deploy the contract
  console.log("⚙️  Deploying contract...");
  console.log("   Initial owner:", deployer.address);

  const videoLicenseNFT = await VideoLicenseNFT.deploy(deployer.address);

  // Wait for deployment to complete
  await videoLicenseNFT.waitForDeployment();

  const contractAddress = await videoLicenseNFT.getAddress();

  console.log("\n✅ VideoLicenseNFT deployed successfully!");
  console.log("📍 Contract address:", contractAddress);
  console.log("👤 Contract owner:", deployer.address);

  // Verify deployment by calling contract functions
  console.log("\n🔍 Verifying deployment...");

  try {
    const name = await videoLicenseNFT.name();
    const symbol = await videoLicenseNFT.symbol();
    const owner = await videoLicenseNFT.owner();
    const currentTokenId = await videoLicenseNFT.getCurrentTokenId();

    console.log("   Name:", name);
    console.log("   Symbol:", symbol);
    console.log("   Owner:", owner);
    console.log("   Next Token ID:", currentTokenId.toString());
    console.log("✅ Verification successful!\n");
  } catch (error) {
    console.log("⚠️  Verification failed:", error.message);
  }

  // Display next steps
  console.log("📝 Next steps:");
  console.log("   1. Save the contract address:", contractAddress);
  console.log("   2. Verify on block explorer (if on testnet/mainnet)");
  console.log("   3. Test minting with: npx hardhat run scripts/mint.js --network <network>");
  console.log("   4. Update your frontend with the contract address\n");

  // Save deployment info to a file
  const fs = require('fs');
  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: contractAddress,
    deployer: deployer.address,
    deploymentTime: new Date().toISOString(),
    blockNumber: await hre.ethers.provider.getBlockNumber(),
    contractName: "VideoLicenseNFT",
    symbol: "VLNFT"
  };

  const deploymentPath = `./deployments/${hre.network.name}-deployment.json`;

  // Create deployments directory if it doesn't exist
  if (!fs.existsSync('./deployments')) {
    fs.mkdirSync('./deployments');
  }

  fs.writeFileSync(
    deploymentPath,
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("💾 Deployment info saved to:", deploymentPath);
  console.log("\n🎉 Deployment complete!\n");

  return {
    contract: videoLicenseNFT,
    address: contractAddress,
    deployer: deployer.address
  };
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });

// Export for use in tests or other scripts
module.exports = { main };
