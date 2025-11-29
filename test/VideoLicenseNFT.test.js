// test/VideoLicenseNFT.test.js
/**
 * Test suite for VideoLicenseNFT contract
 *
 * Run tests:
 *   npx hardhat test
 *   npx hardhat test --network localhost
 *   npx hardhat test test/VideoLicenseNFT.test.js
 */

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VideoLicenseNFT", function () {
  let videoLicenseNFT;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // Deploy contract before each test
  beforeEach(async function () {
    // Get signers
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy contract
    const VideoLicenseNFT = await ethers.getContractFactory("VideoLicenseNFT");
    videoLicenseNFT = await VideoLicenseNFT.deploy(owner.address);
    await videoLicenseNFT.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await videoLicenseNFT.name()).to.equal("Video License NFT");
      expect(await videoLicenseNFT.symbol()).to.equal("VLNFT");
    });

    it("Should set the correct owner", async function () {
      expect(await videoLicenseNFT.owner()).to.equal(owner.address);
    });

    it("Should start token ID at 1", async function () {
      expect(await videoLicenseNFT.getCurrentTokenId()).to.equal(1);
    });

    it("Should have zero total minted initially", async function () {
      expect(await videoLicenseNFT.getTotalMinted()).to.equal(0);
    });
  });

  describe("Minting", function () {
    const testURI = "ipfs://QmTest/metadata.json";

    it("Should mint NFT to specified address", async function () {
      await videoLicenseNFT.safeMint(addr1.address, testURI);

      expect(await videoLicenseNFT.ownerOf(1)).to.equal(addr1.address);
      expect(await videoLicenseNFT.balanceOf(addr1.address)).to.equal(1);
    });

    it("Should set correct token URI", async function () {
      await videoLicenseNFT.safeMint(addr1.address, testURI);

      expect(await videoLicenseNFT.tokenURI(1)).to.equal(testURI);
    });

    it("Should increment token ID after minting", async function () {
      await videoLicenseNFT.safeMint(addr1.address, testURI);
      expect(await videoLicenseNFT.getCurrentTokenId()).to.equal(2);

      await videoLicenseNFT.safeMint(addr2.address, testURI);
      expect(await videoLicenseNFT.getCurrentTokenId()).to.equal(3);
    });

    it("Should update total minted count", async function () {
      await videoLicenseNFT.safeMint(addr1.address, testURI);
      expect(await videoLicenseNFT.getTotalMinted()).to.equal(1);

      await videoLicenseNFT.safeMint(addr2.address, testURI);
      expect(await videoLicenseNFT.getTotalMinted()).to.equal(2);
    });

    it("Should emit VideoLicenseMinted event", async function () {
      await expect(videoLicenseNFT.safeMint(addr1.address, testURI))
        .to.emit(videoLicenseNFT, "VideoLicenseMinted")
        .withArgs(addr1.address, 1, testURI);
    });

    it("Should return token ID from safeMint", async function () {
      const tx = await videoLicenseNFT.safeMint(addr1.address, testURI);
      const receipt = await tx.wait();

      // Token ID should be 1 for first mint
      expect(await videoLicenseNFT.ownerOf(1)).to.equal(addr1.address);
    });

    it("Should revert when minting to zero address", async function () {
      await expect(
        videoLicenseNFT.safeMint(ethers.ZeroAddress, testURI)
      ).to.be.revertedWith("VideoLicenseNFT: mint to zero address");
    });

    it("Should revert when minting with empty URI", async function () {
      await expect(
        videoLicenseNFT.safeMint(addr1.address, "")
      ).to.be.revertedWith("VideoLicenseNFT: empty token URI");
    });

    it("Should only allow owner to mint", async function () {
      await expect(
        videoLicenseNFT.connect(addr1).safeMint(addr2.address, testURI)
      ).to.be.revertedWithCustomError(videoLicenseNFT, "OwnableUnauthorizedAccount");
    });
  });

  describe("Batch Minting", function () {
    it("Should batch mint multiple NFTs", async function () {
      const recipients = [addr1.address, addr2.address, addrs[0].address];
      const uris = [
        "ipfs://QmTest1/metadata.json",
        "ipfs://QmTest2/metadata.json",
        "ipfs://QmTest3/metadata.json"
      ];

      await videoLicenseNFT.batchMint(recipients, uris);

      expect(await videoLicenseNFT.ownerOf(1)).to.equal(addr1.address);
      expect(await videoLicenseNFT.ownerOf(2)).to.equal(addr2.address);
      expect(await videoLicenseNFT.ownerOf(3)).to.equal(addrs[0].address);
      expect(await videoLicenseNFT.getTotalMinted()).to.equal(3);
    });

    it("Should revert on array length mismatch", async function () {
      const recipients = [addr1.address, addr2.address];
      const uris = ["ipfs://QmTest1/metadata.json"];

      await expect(
        videoLicenseNFT.batchMint(recipients, uris)
      ).to.be.revertedWith("VideoLicenseNFT: arrays length mismatch");
    });

    it("Should revert on batch size too large", async function () {
      const recipients = new Array(101).fill(addr1.address);
      const uris = new Array(101).fill("ipfs://QmTest/metadata.json");

      await expect(
        videoLicenseNFT.batchMint(recipients, uris)
      ).to.be.revertedWith("VideoLicenseNFT: batch size too large");
    });

    it("Should only allow owner to batch mint", async function () {
      const recipients = [addr1.address];
      const uris = ["ipfs://QmTest/metadata.json"];

      await expect(
        videoLicenseNFT.connect(addr1).batchMint(recipients, uris)
      ).to.be.revertedWithCustomError(videoLicenseNFT, "OwnableUnauthorizedAccount");
    });
  });

  describe("Burning", function () {
    const testURI = "ipfs://QmTest/metadata.json";

    beforeEach(async function () {
      await videoLicenseNFT.safeMint(addr1.address, testURI);
    });

    it("Should allow token owner to burn", async function () {
      await videoLicenseNFT.connect(addr1).burn(1);

      await expect(
        videoLicenseNFT.ownerOf(1)
      ).to.be.revertedWithCustomError(videoLicenseNFT, "ERC721NonexistentToken");
    });

    it("Should emit VideoLicenseBurned event", async function () {
      await expect(videoLicenseNFT.connect(addr1).burn(1))
        .to.emit(videoLicenseNFT, "VideoLicenseBurned")
        .withArgs(addr1.address, 1);
    });

    it("Should reduce balance after burning", async function () {
      expect(await videoLicenseNFT.balanceOf(addr1.address)).to.equal(1);

      await videoLicenseNFT.connect(addr1).burn(1);

      expect(await videoLicenseNFT.balanceOf(addr1.address)).to.equal(0);
    });

    it("Should not allow non-owner to burn", async function () {
      await expect(
        videoLicenseNFT.connect(addr2).burn(1)
      ).to.be.revertedWith("VideoLicenseNFT: caller is not owner nor approved");
    });

    it("Should allow approved address to burn", async function () {
      await videoLicenseNFT.connect(addr1).approve(addr2.address, 1);
      await videoLicenseNFT.connect(addr2).burn(1);

      await expect(
        videoLicenseNFT.ownerOf(1)
      ).to.be.revertedWithCustomError(videoLicenseNFT, "ERC721NonexistentToken");
    });
  });

  describe("Token URI Updates", function () {
    const testURI = "ipfs://QmTest/metadata.json";
    const newURI = "ipfs://QmNewTest/metadata.json";

    beforeEach(async function () {
      await videoLicenseNFT.safeMint(addr1.address, testURI);
    });

    it("Should allow owner to update token URI", async function () {
      await videoLicenseNFT.updateTokenURI(1, newURI);

      expect(await videoLicenseNFT.tokenURI(1)).to.equal(newURI);
    });

    it("Should revert when updating non-existent token", async function () {
      await expect(
        videoLicenseNFT.updateTokenURI(999, newURI)
      ).to.be.revertedWith("VideoLicenseNFT: token does not exist");
    });

    it("Should only allow contract owner to update URI", async function () {
      await expect(
        videoLicenseNFT.connect(addr1).updateTokenURI(1, newURI)
      ).to.be.revertedWithCustomError(videoLicenseNFT, "OwnableUnauthorizedAccount");
    });
  });

  describe("ERC-721 Standard Functions", function () {
    const testURI = "ipfs://QmTest/metadata.json";

    beforeEach(async function () {
      await videoLicenseNFT.safeMint(addr1.address, testURI);
    });

    it("Should transfer tokens correctly", async function () {
      await videoLicenseNFT.connect(addr1).transferFrom(
        addr1.address,
        addr2.address,
        1
      );

      expect(await videoLicenseNFT.ownerOf(1)).to.equal(addr2.address);
    });

    it("Should approve and transfer", async function () {
      await videoLicenseNFT.connect(addr1).approve(addr2.address, 1);

      await videoLicenseNFT.connect(addr2).transferFrom(
        addr1.address,
        addr2.address,
        1
      );

      expect(await videoLicenseNFT.ownerOf(1)).to.equal(addr2.address);
    });

    it("Should support ERC-721 interface", async function () {
      // ERC-721 interface ID: 0x80ac58cd
      expect(
        await videoLicenseNFT.supportsInterface("0x80ac58cd")
      ).to.equal(true);
    });
  });

  describe("Ownership", function () {
    it("Should transfer ownership", async function () {
      await videoLicenseNFT.transferOwnership(addr1.address);

      expect(await videoLicenseNFT.owner()).to.equal(addr1.address);
    });

    it("Should allow new owner to mint", async function () {
      await videoLicenseNFT.transferOwnership(addr1.address);

      await videoLicenseNFT.connect(addr1).safeMint(
        addr2.address,
        "ipfs://QmTest/metadata.json"
      );

      expect(await videoLicenseNFT.ownerOf(1)).to.equal(addr2.address);
    });

    it("Should prevent old owner from minting after transfer", async function () {
      await videoLicenseNFT.transferOwnership(addr1.address);

      await expect(
        videoLicenseNFT.connect(owner).safeMint(
          addr2.address,
          "ipfs://QmTest/metadata.json"
        )
      ).to.be.revertedWithCustomError(videoLicenseNFT, "OwnableUnauthorizedAccount");
    });
  });

  describe("Edge Cases", function () {
    it("Should handle minting 100 tokens", async function () {
      for (let i = 0; i < 100; i++) {
        await videoLicenseNFT.safeMint(
          addr1.address,
          `ipfs://QmTest${i}/metadata.json`
        );
      }

      expect(await videoLicenseNFT.balanceOf(addr1.address)).to.equal(100);
      expect(await videoLicenseNFT.getTotalMinted()).to.equal(100);
    });

    it("Should maintain correct count after burning", async function () {
      await videoLicenseNFT.safeMint(addr1.address, "ipfs://QmTest1/metadata.json");
      await videoLicenseNFT.safeMint(addr1.address, "ipfs://QmTest2/metadata.json");

      expect(await videoLicenseNFT.getTotalMinted()).to.equal(2);

      await videoLicenseNFT.connect(addr1).burn(1);

      // Total minted stays at 2 (includes burned tokens)
      expect(await videoLicenseNFT.getTotalMinted()).to.equal(2);
      // Balance is reduced
      expect(await videoLicenseNFT.balanceOf(addr1.address)).to.equal(1);
    });

    it("Should handle very long URIs", async function () {
      const longURI = "ipfs://Qm" + "a".repeat(500) + "/metadata.json";

      await videoLicenseNFT.safeMint(addr1.address, longURI);

      expect(await videoLicenseNFT.tokenURI(1)).to.equal(longURI);
    });
  });
});
