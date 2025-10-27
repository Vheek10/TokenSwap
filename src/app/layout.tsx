/** @format */

import { Kanit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import CustomThemeProvider from "@/providers/ThemeProvider";

const kanit = Kanit({
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin", "thai"],
});

export const metadata = {
	title: "PancakeSwap - Trade, Earn, Win",
	description: "The most popular DeFi exchange on BNB Chain",
};

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			suppressHydrationWarning>
			<head>
				<link
					rel="preconnect"
					href="https://fonts.googleapis.com"
				/>
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
			</head>
			<body className={kanit.className}>
				<ThemeProvider>
					<CustomThemeProvider>{children}</CustomThemeProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
