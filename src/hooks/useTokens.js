/** @format */

import { useState, useEffect } from "react";
import { fetchTopTokens, fetchTokenPrice } from "@/utils/coinGecko";

export const useTokens = () => {
	const [tokens, setTokens] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadTokens = async () => {
			try {
				setLoading(true);
				const tokenData = await fetchTopTokens();
				setTokens(tokenData);
				setError(null);
			} catch (err) {
				setError(err.message);
				console.error("Failed to load tokens:", err);
			} finally {
				setLoading(false);
			}
		};

		loadTokens();

		// Refresh every 30 seconds
		const interval = setInterval(loadTokens, 30000);
		return () => clearInterval(interval);
	}, []);

	return { tokens, loading, error };
};

export const useTokenPrice = (fromToken, toToken) => {
	const [exchangeRate, setExchangeRate] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRate = async () => {
			if (!fromToken || !toToken) return;

			setLoading(true);
			setError(null);
			try {
				const rate = await fetchTokenPrice(fromToken, toToken);
				setExchangeRate(rate);
			} catch (err) {
				setError(err.message);
				console.error("Failed to fetch exchange rate:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchRate();

		// Refresh every 15 seconds
		const interval = setInterval(fetchRate, 15000);
		return () => clearInterval(interval);
	}, [fromToken, toToken]);

	return { exchangeRate, loading, error };
};
