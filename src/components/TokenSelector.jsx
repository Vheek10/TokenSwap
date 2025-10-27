/** @format */

"use client";

import { useState, useMemo } from "react";
import {
	Button,
	Menu,
	MenuItem,
	Typography,
	Box,
	TextField,
	InputAdornment,
	CircularProgress,
} from "@mui/material";
import { Search, ArrowDown } from "lucide-react";

const TokenSelector = ({ token, tokens, onTokenSelect, loading, darkMode }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");

	const filteredTokens = useMemo(() => {
		if (!searchQuery) return tokens;
		return tokens.filter(
			(t) =>
				t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				t.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [tokens, searchQuery]);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setSearchQuery("");
	};

	const handleSelect = (selectedToken) => {
		onTokenSelect(selectedToken.id);
		handleClose();
	};

	const selectedToken = tokens.find((t) => t.id === token);

	return (
		<>
			<Button
				variant="outlined"
				onClick={handleClick}
				className={`rounded-2xl min-w-[120px] transition-colors duration-300 ${
					darkMode
						? "border-gray-600 text-gray-200 hover:border-cyan-400 hover:text-cyan-400"
						: "border-gray-300 text-gray-700 hover:border-cyan-400 hover:text-cyan-400"
				}`}
				startIcon={
					selectedToken?.logo ? (
						<img
							src={selectedToken.logo}
							alt={selectedToken.symbol}
							className="w-6 h-6 rounded-full"
						/>
					) : (
						<Box
							className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors duration-300 ${
								darkMode
									? "bg-gradient-to-r from-cyan-400 to-purple-400"
									: "bg-gradient-to-r from-cyan-400 to-purple-500"
							}`}>
							{selectedToken?.symbol?.charAt(0) || "?"}
						</Box>
					)
				}
				endIcon={<ArrowDown size={16} />}>
				{selectedToken?.symbol || "Select"}
			</Button>

			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				className="mt-2"
				PaperProps={{
					className: `rounded-2xl max-h-96 w-80 transition-colors duration-300 ${
						darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
					}`,
				}}>
				<div
					className={`p-3 border-b transition-colors duration-300 ${
						darkMode ? "border-gray-700" : "border-gray-200"
					}`}>
					<TextField
						fullWidth
						placeholder="Search name or paste address"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Search
										size={18}
										className={darkMode ? "text-gray-400" : "text-gray-400"}
									/>
								</InputAdornment>
							),
							className: `rounded-xl transition-colors duration-300 ${
								darkMode
									? "bg-gray-700 text-white border-gray-600"
									: "bg-gray-50 text-gray-900 border-gray-200"
							}`,
						}}
						className="rounded-xl"
					/>
				</div>

				<div className="max-h-64 overflow-y-auto">
					{loading ? (
						<div className="flex justify-center p-4">
							<CircularProgress size={24} />
						</div>
					) : filteredTokens.length === 0 ? (
						<Typography
							className={`p-4 text-center transition-colors duration-300 ${
								darkMode ? "text-gray-400" : "text-gray-500"
							}`}>
							No tokens found
						</Typography>
					) : (
						filteredTokens.map((tokenItem) => (
							<MenuItem
								key={tokenItem.id}
								onClick={() => handleSelect(tokenItem)}
								className={`py-3 px-4 transition-colors duration-300 ${
									darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
								}`}>
								<div className="flex items-center justify-between w-full">
									<div className="flex items-center space-x-3">
										<img
											src={tokenItem.logo}
											alt={tokenItem.symbol}
											className="w-8 h-8 rounded-full"
										/>
										<div className="text-left">
											<Typography
												variant="body1"
												className="font-semibold">
												{tokenItem.symbol}
											</Typography>
											<Typography
												variant="body2"
												className={
													darkMode ? "text-gray-400" : "text-gray-500"
												}>
												{tokenItem.name}
											</Typography>
										</div>
									</div>
									<div className="text-right">
										<Typography
											variant="body2"
											className="font-semibold">
											$
											{tokenItem.price?.toLocaleString("en-US", {
												minimumFractionDigits: 2,
												maximumFractionDigits: 6,
											})}
										</Typography>
										<Typography
											variant="body2"
											className={`${
												tokenItem.priceChange24h >= 0
													? "text-green-600"
													: "text-red-600"
											}`}>
											{tokenItem.priceChange24h >= 0 ? "+" : ""}
											{tokenItem.priceChange24h?.toFixed(2)}%
										</Typography>
									</div>
								</div>
							</MenuItem>
						))
					)}
				</div>
			</Menu>
		</>
	);
};

export default TokenSelector;
