import { MetaMaskInpageProvider } from '@metamask/providers';
import { BrowserProvider, Contract } from 'ethers';
import { SWRResponse } from 'swr';

export type Web3Dependencies = {
	provider: BrowserProvider;
	contract: Contract;
	ethereum: MetaMaskInpageProvider;
};

// SWRResponse是一个泛型类型，表示一个SWR hook的返回值，其中包含了数据、错误和重新验证数据的方法。
export type CryptoSWRResponse = SWRResponse;

export type CryptoHandlerHook = (params: string) => CryptoSWRResponse;

export type CryptoHookFactory = {
	// 接收一个Web3Dependencies类型的d属性，并返回CryptoHandlerHook类型
	(d: Partial<Web3Dependencies>): CryptoHandlerHook;
};
