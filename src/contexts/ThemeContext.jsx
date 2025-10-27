/** @format */

"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
	const [darkMode, setDarkMode] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		// Check system preference or saved theme
		const savedTheme = localStorage.getItem("pancake-theme");
		const systemPrefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;

		if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
			setDarkMode(true);
		}
	}, []);

	useEffect(() => {
		if (!mounted) return;

		// Update DOM and localStorage when theme changes
		if (darkMode) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("pancake-theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("pancake-theme", "light");
		}
	}, [darkMode, mounted]);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	// Prevent flash of unstyled content
	if (!mounted) {
		return <>{children}</>;
	}

	return (
		<ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
