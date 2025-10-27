/** @format */

const COINGECKO_API = "https://api.coingecko.com/api/v3";

const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);

	try {
		const response = await fetch(url, {
			...options,
			signal: controller.signal,
		});
		clearTimeout(id);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		clearTimeout(id);
		throw error;
	}
};

export const fetchTopTokens = async () => {
	try {
		const data = await fetchWithTimeout(
			`${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`,
		);

		return data.map((token) => ({
			id: token.id,
			symbol: token.symbol.toUpperCase(),
			name: token.name,
			logo: token.image,
			price: token.current_price,
			priceChange24h: token.price_change_percentage_24h,
			marketCap: token.market_cap,
			volume24h: token.total_volume,
		}));
	} catch (error) {
		console.error("Error fetching tokens:", error);
		// Return some default tokens as fallback
		return getDefaultTokens();
	}
};

export const fetchTokenPrice = async (fromToken, toToken) => {
	try {
		const fromId = fromToken.toLowerCase();
		const toId = toToken.toLowerCase();

		const data = await fetchWithTimeout(
			`${COINGECKO_API}/simple/price?ids=${fromId},${toId}&vs_currencies=usd`,
		);

		const fromPrice = data[fromId]?.usd;
		const toPrice = data[toId]?.usd;

		if (fromPrice && toPrice) {
			return fromPrice / toPrice;
		}

		return null;
	} catch (error) {
		console.error("Error fetching token price:", error);
		// Return default exchange rates as fallback
		return getDefaultExchangeRate(fromToken, toToken);
	}
};

export const fetchHistoricalPrice = async (tokenId, days = 7) => {
	try {
		const data = await fetchWithTimeout(
			`${COINGECKO_API}/coins/${tokenId}/market_chart?vs_currency=usd&days=${days}`,
		);

		return data.prices || [];
	} catch (error) {
		console.error("Error fetching historical data:", error);
		return [];
	}
};

// Fallback default tokens in case API fails
const getDefaultTokens = () => [
	{
		id: "ethereum",
		symbol: "ETH",
		name: "Ethereum",
		logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
		price: 3500.0,
		priceChange24h: 2.5,
		marketCap: 420000000000,
		volume24h: 15000000000,
	},
	{
		id: "usd-coin",
		symbol: "USDC",
		name: "USD Coin",
		logo: "https://assets.coingecko.com/coins/images/6319/small/usdc.png?1696506694",
		price: 1.0,
		priceChange24h: 0.01,
		marketCap: 25000000000,
		volume24h: 5000000000,
	},
	{
		id: "binancecoin",
		symbol: "BNB",
		name: "BNB",
		logo: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1696501970",
		price: 600.0,
		priceChange24h: 1.2,
		marketCap: 90000000000,
		volume24h: 2000000000,
	},
	{
		id: "matic-network",
		symbol: "MATIC",
		name: "Polygon",
		logo: "https://assets.coingecko.com/coins/images/4713/small/polygon.png?1698233745",
		price: 0.85,
		priceChange24h: -0.5,
		marketCap: 8000000000,
		volume24h: 400000000,
	},
	{
		id: "dai",
		symbol: "DAI",
		name: "Dai",
		logo: "https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1696509996",
		price: 1.0,
		priceChange24h: 0.02,
		marketCap: 5000000000,
		volume24h: 300000000,
	},
	{
		id: "bitcoin",
		symbol: "BTC",
		name: "Bitcoin",
		logo: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1696501400",
		price: 65000.0,
		priceChange24h: 1.8,
		marketCap: 1280000000000,
		volume24h: 25000000000,
	},
];

// Fallback exchange rates
const getDefaultExchangeRate = (fromToken, toToken) => {
	const rates = {
		"ethereum-usd-coin": 3500,
		"ethereum-binancecoin": 5.83,
		"ethereum-matic-network": 4117,
		"ethereum-dai": 3500,
		"usd-coin-ethereum": 0.000285,
		"binancecoin-ethereum": 0.171,
		"matic-network-ethereum": 0.000243,
		"dai-ethereum": 0.000285,
	};

	return rates[`${fromToken}-${toToken}`] || 1;
};
