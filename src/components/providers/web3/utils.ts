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
	provider: BrowserProvider | null; // 提供者
	contract: Contract | null; // 智能合约
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

// 从环境变量中获取 NEXT_PUBLIC_NETWORK_ID
const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

/* 加载智能合约 */
export const loadContract = async (
	name: string, // NftMarket
	provider: BrowserProvider
): Promise<Contract> => {
	if (!NETWORK_ID) {
		return Promise.reject('Network ID is not defined');
	}

	const res = await fetch(`/contracts/${name}.json`);
	const Artifact = await res.json();

	if (Artifact.networks[NETWORK_ID].address) {
		const contract = new Contract(
			Artifact.networks[NETWORK_ID].address, // 合约地址
			Artifact.abi, // 合约abi
			provider // 提供者
		);

		return contract;
	} else {
		return Promise.reject(`Contract:[${name}] cannot be loaded!`);
	}
};
