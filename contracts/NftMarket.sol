// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';

contract NftMarket is ERC721URIStorage {
	// 调用构造函数，以'CreaturesNFT'和'CNFT'作为参数，分别为该代币设置了name和symbol
	constructor() ERC721('CreaturesNFT', 'CNFT') {}
}
