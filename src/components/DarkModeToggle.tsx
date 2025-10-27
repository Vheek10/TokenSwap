/** @format */

"use client";

import { IconButton, Tooltip } from "@mui/material";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const DarkModeToggle = () => {
	const { darkMode, toggleDarkMode } = useTheme();

	return (
		<Tooltip title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
			<IconButton
				onClick={toggleDarkMode}
				className={`
          transition-all duration-300 ease-in-out
          ${
						darkMode
							? "text-yellow-400 hover:bg-yellow-400/10"
							: "text-purple-600 hover:bg-purple-600/10"
					}
        `}
				size="small">
				{darkMode ? (
					<Sun
						size={20}
						className="transition-transform hover:rotate-45"
					/>
				) : (
					<Moon
						size={20}
						className="transition-transform hover:rotate-12"
					/>
				)}
			</IconButton>
		</Tooltip>
	);
};

export default DarkModeToggle;
