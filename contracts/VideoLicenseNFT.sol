// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title VideoLicenseNFT
 * @dev ERC-721 NFT contract for tokenizing video licenses
 * @notice This contract allows minting of NFTs that represent licenses for video content
 *
 * Features:
 * - ERC-721 compliant NFT implementation
 * - URI storage for metadata (video details, license terms)
 * - Owner-controlled minting
 * - Automatic token ID management
 * - Burnable tokens (optional)
 */
contract VideoLicenseNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    // Token ID counter for automatic incremental IDs
    Counters.Counter private _tokenIdCounter;

    // Events
    event VideoLicenseMinted(
        address indexed recipient,
        uint256 indexed tokenId,
        string tokenURI
    );

    event VideoLicenseBurned(
        address indexed owner,
        uint256 indexed tokenId
    );

    /**
     * @dev Constructor initializes the NFT collection
     * @param initialOwner Address of the contract owner
     */
    constructor(address initialOwner)
        ERC721("Video License NFT", "VLNFT")
        Ownable(initialOwner)
    {
        // Token IDs start from 1 (0 is reserved/invalid)
        _tokenIdCounter.increment();
    }

    /**
     * @dev Safely mints a new video license NFT
     * @param to Recipient address
     * @param uri Token URI pointing to metadata (IPFS, Arweave, or centralized storage)
     * @return tokenId The ID of the newly minted token
     *
     * Requirements:
     * - Only contract owner can mint
     * - Recipient address must be valid
     * - Token URI should point to valid metadata
     */
    function safeMint(address to, string memory uri)
        public
        onlyOwner
        returns (uint256)
    {
        require(to != address(0), "VideoLicenseNFT: mint to zero address");
        require(bytes(uri).length > 0, "VideoLicenseNFT: empty token URI");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit VideoLicenseMinted(to, tokenId, uri);

        return tokenId;
    }

    /**
     * @dev Burns (destroys) a video license NFT
     * @param tokenId ID of the token to burn
     *
     * Requirements:
     * - Only token owner or approved address can burn
     */
    function burn(uint256 tokenId) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "VideoLicenseNFT: caller is not owner nor approved"
        );

        address owner = ownerOf(tokenId);
        _burn(tokenId);

        emit VideoLicenseBurned(owner, tokenId);
    }

    /**
     * @dev Returns the current token ID (next token to be minted will have this ID)
     * @return Current token ID counter value
     */
    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    /**
     * @dev Returns the total number of tokens minted (including burned tokens)
     * @return Total minted count
     */
    function getTotalMinted() public view returns (uint256) {
        return _tokenIdCounter.current() - 1;
    }

    /**
     * @dev Batch minting function for efficiency
     * @param recipients Array of recipient addresses
     * @param uris Array of token URIs (must match recipients length)
     * @return tokenIds Array of minted token IDs
     *
     * Requirements:
     * - Only owner can batch mint
     * - Arrays must have same length
     * - Maximum 100 tokens per batch
     */
    function batchMint(
        address[] memory recipients,
        string[] memory uris
    )
        public
        onlyOwner
        returns (uint256[] memory)
    {
        require(
            recipients.length == uris.length,
            "VideoLicenseNFT: arrays length mismatch"
        );
        require(
            recipients.length <= 100,
            "VideoLicenseNFT: batch size too large"
        );

        uint256[] memory tokenIds = new uint256[](recipients.length);

        for (uint256 i = 0; i < recipients.length; i++) {
            tokenIds[i] = safeMint(recipients[i], uris[i]);
        }

        return tokenIds;
    }

    /**
     * @dev Updates the token URI for an existing token
     * @param tokenId Token ID to update
     * @param uri New token URI
     *
     * Requirements:
     * - Only owner can update URIs
     * - Token must exist
     */
    function updateTokenURI(uint256 tokenId, string memory uri)
        public
        onlyOwner
    {
        require(_exists(tokenId), "VideoLicenseNFT: token does not exist");
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }
}
