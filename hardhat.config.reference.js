// hardhat.config.js
/**
 * Hardhat configuration file for VideoLicenseNFT project
 *
 * Copy this to your project root as "hardhat.config.js"
 * Install required dependencies first:
 *   npm install --save-dev @nomicfoundation/hardhat-toolbox
 *   npm install --save-dev dotenv
 */

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
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
    // Local development network
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },

    // Hardhat built-in network (default)
    hardhat: {
      chainId: 31337
    },

    // Ethereum Mainnet (⚠️ Use with caution!)
    // mainnet: {
    //   url: process.env.MAINNET_RPC_URL || "",
    //   accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    //   chainId: 1,
    //   gasPrice: "auto"
    // },

    // Goerli Testnet (deprecated but still available)
    goerli: {
      url: process.env.GOERLI_RPC_URL || "https://goerli.infura.io/v3/YOUR_INFURA_KEY",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 5,
      gasPrice: "auto"
    },

    // Sepolia Testnet (recommended testnet)
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
      gasPrice: "auto"
    },

    // Mumbai Testnet (Polygon)
    mumbai: {
      url: process.env.MUMBAI_RPC_URL || "https://rpc-mumbai.maticvigil.com",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 80001,
      gasPrice: "auto"
    },

    // Polygon Mainnet
    polygon: {
      url: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 137,
      gasPrice: "auto"
    }
  },

  // Etherscan verification config
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      goerli: process.env.ETHERSCAN_API_KEY || "",
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      polygon: process.env.POLYGONSCAN_API_KEY || "",
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || ""
    }
  },

  // Gas reporter config (for testing)
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY || ""
  },

  // Path configuration
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },

  // Mocha timeout for tests
  mocha: {
    timeout: 40000
  }
};

/**
 * Environment Variables Setup:
 *
 * Create a .env file in your project root with:
 *
 * # RPC URLs (get from Infura, Alchemy, or other providers)
 * MAINNET_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
 * GOERLI_RPC_URL=https://goerli.infura.io/v3/YOUR_INFURA_KEY
 * SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
 * MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
 * POLYGON_RPC_URL=https://polygon-rpc.com
 *
 * # Private Key (⚠️ NEVER commit this!)
 * PRIVATE_KEY=your_private_key_without_0x_prefix
 *
 * # API Keys for verification
 * ETHERSCAN_API_KEY=your_etherscan_api_key
 * POLYGONSCAN_API_KEY=your_polygonscan_api_key
 *
 * # Optional
 * REPORT_GAS=true
 * COINMARKETCAP_API_KEY=your_coinmarketcap_api_key
 */

/**
 * Usage Examples:
 *
 * Compile:
 *   npx hardhat compile
 *
 * Test:
 *   npx hardhat test
 *   npx hardhat test --network hardhat
 *   REPORT_GAS=true npx hardhat test
 *
 * Deploy:
 *   npx hardhat run scripts/deploy.js --network localhost
 *   npx hardhat run scripts/deploy.js --network goerli
 *   npx hardhat run scripts/deploy.js --network sepolia
 *
 * Verify:
 *   npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS "OWNER_ADDRESS"
 *
 * Console:
 *   npx hardhat console --network localhost
 *
 * Clean:
 *   npx hardhat clean
 *
 * Node:
 *   npx hardhat node
 */
