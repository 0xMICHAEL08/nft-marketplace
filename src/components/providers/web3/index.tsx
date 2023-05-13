import {
	createContext,
	useContext,
	FunctionComponent,
	useState,
	useEffect,
	ReactNode
} from 'react';
import { Web3State, createDefaultState, loadContract } from './utils';
import { ethers } from 'ethers';

/* 在组件树中传递web3Api */
const Web3Context = createContext<Web3State>(createDefaultState()); // 上下文对象

/* 提供web3Api */
const Web3Provider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
	const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

	// 由于第二个参数为[]，initWeb3只会在组件挂载完成时执行一次，而不会在组件更新时执行
	useEffect(() => {
		async function initWeb3() {
			try {
				// provider: 使用哪个API访问以太坊网络
				const provider = new ethers.BrowserProvider(window.ethereum);
				const contract = await loadContract('NftMarket', provider);

				/* 用户签名 */
				await provider.getSigner();
				setWeb3Api({
					ethereum: window.ethereum, // 由于window.ethereum依赖于metamask插件，所以要在组件挂载后能才正确获取window.ethereum，仅使用createDefaultState是拿不到window.ethereum的
					provider,
					contract,
					isLoading: true
				});
			} catch (error) {
				console.log(error);
			}
		}
		initWeb3();
	}, []);

	return <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>;
};

// <Web3Provider>组件将web3Api对象作为值传递给<Web3Context.Provider>组件，这样在组件树中的任何地方都可以使用 useWeb3 钩子来访问 web3Api 对象
export function useWeb3() {
	return useContext(Web3Context);
}

export default Web3Provider;
