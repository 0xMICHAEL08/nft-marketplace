/* 放一些公共方法 */
import { MetaMaskInpageProvider } from '@metamask/providers';
import { Contract, BrowserProvider } from 'ethers';

// 允许跨组件访问window.ethereum变量
declare global {
	interface Window {
		ethereum: MetaMaskInpageProvider;
	}
}

export type Web3Params = {
	ethereum: MetaMaskInpageProvider | null; // MetaMask插件提供的以太坊JSON-RPC接口
	provider: BrowserProvider | null;	// 提供者
	contract: Contract | null;	// 智能合约
};

/* web3Api对象 与 createDefaultState返回值的类型定义 */
export type Web3State = {
	isLoading: boolean; // true while loading web3State
} & Web3Params; // 包含Web3Params类型的所有属性

export const createDefaultState = () => {
	return {
		ethereum: null,
		provider: null,
		contract: null,
		isLoading: true
	};
};
