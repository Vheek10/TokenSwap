/** @format */

"use client";

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	Slider,
	FormControlLabel,
	Switch,
	Box,
	Divider,
	TextField,
} from "@mui/material";
import { Settings, AlertTriangle } from "lucide-react";

const SettingsPanel = ({
	open,
	onClose,
	slippage,
	onSlippageChange,
	expertMode,
	onExpertModeChange,
	darkMode,
}) => {
	const quickSlippageOptions = [0.1, 0.5, 1.0, 3.0];

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="sm"
			fullWidth
			PaperProps={{
				className: `rounded-3xl transition-colors duration-300 ${
					darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
				}`,
			}}>
			<DialogTitle
				className={`flex items-center space-x-2 border-b transition-colors duration-300 ${
					darkMode ? "border-gray-700" : "border-gray-200"
				}`}>
				<Settings
					size={20}
					className={darkMode ? "text-cyan-400" : "text-purple-600"}
				/>
				<Typography
					variant="h6"
					className="font-semibold">
					Settings
				</Typography>
			</DialogTitle>

			<DialogContent className="pt-4">
				{/* Slippage Tolerance */}
				<Box className="mb-6">
					<Typography
						variant="subtitle1"
						className="font-semibold mb-3 transition-colors duration-300">
						Slippage Tolerance
					</Typography>

					{/* Quick Options */}
					<Box className="flex space-x-2 mb-4">
						{quickSlippageOptions.map((option) => (
							<Button
								key={option}
								variant={slippage === option ? "contained" : "outlined"}
								onClick={() => onSlippageChange(option)}
								className={`rounded-xl transition-colors duration-300 ${
									slippage === option
										? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white"
										: darkMode
										? "border-gray-600 text-gray-300 hover:border-cyan-400"
										: "border-gray-300 text-gray-700 hover:border-cyan-400"
								}`}
								size="small">
								{option}%
							</Button>
						))}
					</Box>

					{/* Custom Slippage */}
					<Box className="flex items-center space-x-2">
						<Slider
							value={slippage}
							onChange={(_, newValue) => onSlippageChange(newValue)}
							min={0.1}
							max={5}
							step={0.1}
							valueLabelDisplay="auto"
							valueLabelFormat={(value) => `${value}%`}
							className="flex-1"
							color="primary"
						/>
						<Box className="w-16">
							<TextField
								size="small"
								value={slippage}
								onChange={(e) => {
									const value = parseFloat(e.target.value);
									if (!isNaN(value) && value >= 0.1 && value <= 50) {
										onSlippageChange(value);
									}
								}}
								InputProps={{
									endAdornment: "%",
									className: `rounded-lg transition-colors duration-300 ${
										darkMode
											? "bg-gray-700 text-white border-gray-600"
											: "bg-gray-50 text-gray-900 border-gray-200"
									}`,
								}}
								className="rounded-lg"
							/>
						</Box>
					</Box>

					{slippage > 3 && (
						<Box
							className={`flex items-center space-x-2 mt-2 p-2 rounded-lg border transition-colors duration-300 ${
								darkMode
									? "bg-yellow-900/20 border-yellow-800"
									: "bg-yellow-50 border-yellow-200"
							}`}>
							<AlertTriangle
								size={16}
								className="text-yellow-600"
							/>
							<Typography
								variant="body2"
								className={darkMode ? "text-yellow-300" : "text-yellow-700"}>
								High slippage increases the risk of price manipulation
							</Typography>
						</Box>
					)}
				</Box>

				<Divider
					className={`my-4 transition-colors duration-300 ${
						darkMode ? "bg-gray-700" : "bg-gray-200"
					}`}
				/>

				{/* Expert Mode */}
				<FormControlLabel
					control={
						<Switch
							checked={expertMode}
							onChange={(e) => onExpertModeChange(e.target.checked)}
							color="primary"
						/>
					}
					label={
						<Box>
							<Typography
								variant="subtitle1"
								className="font-semibold">
								Expert Mode
							</Typography>
							<Typography
								variant="body2"
								className={darkMode ? "text-gray-400" : "text-gray-600"}>
								Allow high price impact trades and skip confirmation screens
							</Typography>
						</Box>
					}
				/>

				{expertMode && (
					<Box
						className={`flex items-center space-x-2 mt-2 p-2 rounded-lg border transition-colors duration-300 ${
							darkMode
								? "bg-red-900/20 border-red-800"
								: "bg-red-50 border-red-200"
						}`}>
						<AlertTriangle
							size={16}
							className="text-red-600"
						/>
						<Typography
							variant="body2"
							className={darkMode ? "text-red-300" : "text-red-700"}>
							Expert mode enabled. Use at your own risk.
						</Typography>
					</Box>
				)}
			</DialogContent>

			<DialogActions
				className={`p-4 border-t transition-colors duration-300 ${
					darkMode ? "border-gray-700" : "border-gray-200"
				}`}>
				<Button
					onClick={onClose}
					className={
						darkMode
							? "text-gray-300 hover:text-white"
							: "text-gray-600 hover:text-gray-800"
					}>
					Cancel
				</Button>
				<Button
					onClick={onClose}
					variant="contained"
					className="bg-gradient-to-r from-cyan-400 to-purple-500">
					Save Settings
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default SettingsPanel;
