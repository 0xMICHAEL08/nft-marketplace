import useSWR from 'swr';

/* 函数工厂，用来初始化hooks */
// hookFactory接收一个参数deps，返回一个接收params参数的匿名函数，最终返回useSWR hook的结果
export const hookFactory = (deps: any) => (params: any) => {
	// useSWR 用于数据获取和缓存(数据源标识符,可选配置对象)
	const swrRes = useSWR('web3/useAccount', () => {
		debugger;
		// 用于配置缓存行为
		console.log(deps);
		console.log(params);
		return 'Test User';
	});
	// 返回值是一个对象，其中最常用的是data属性，它表示从数据源获取到的数据。
	return swrRes;
};

export const useAccount = hookFactory({ ethereum: null, provider: null });
