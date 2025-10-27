/** @format */

"use client";

import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { useTheme } from "@/contexts/ThemeContext";

// Light theme (PancakeSwap-like)
const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#1FC7D4",
			light: "#53DEE9",
			dark: "#1AA9B2",
		},
		secondary: {
			main: "#7645D9",
			light: "#9A6AFF",
			dark: "#5121B4",
		},
		background: {
			default: "#FAF9FA",
			paper: "#FFFFFF",
		},
		text: {
			primary: "#280D5F",
			secondary: "#7A6EAA",
		},
		success: {
			main: "#31D0AA",
		},
		warning: {
			main: "#ED4B9E",
		},
		divider: "#E7E3EB",
	},
	typography: {
		fontFamily: '"Kanit", "Inter", sans-serif',
		h1: { fontWeight: 600 },
		h2: { fontWeight: 600 },
		h3: { fontWeight: 600 },
		h4: { fontWeight: 600 },
		h5: { fontWeight: 600 },
		h6: { fontWeight: 600 },
		button: {
			fontWeight: 600,
			textTransform: "none",
		},
	},
	shape: {
		borderRadius: 16,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					borderRadius: "16px",
					fontWeight: 600,
					boxShadow: "none",
					"&:hover": {
						boxShadow: "none",
					},
				},
				contained: {
					background: "linear-gradient(135deg, #1FC7D4 0%, #7645D9 100%)",
					color: "white",
					"&:hover": {
						background: "linear-gradient(135deg, #1AA9B2 0%, #5121B4 100%)",
					},
				},
				outlined: {
					borderColor: "#1FC7D4",
					color: "#1FC7D4",
					"&:hover": {
						backgroundColor: "rgba(31, 199, 212, 0.04)",
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: "24px",
					boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.04)",
					border: "1px solid #E7E3EB",
					backgroundColor: "#FFFFFF",
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiOutlinedInput-root": {
						borderRadius: "16px",
						backgroundColor: "#FAF9FA",
					},
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: "8px",
					fontWeight: 600,
				},
			},
		},
	},
});

// Dark theme
const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#1FC7D4",
			light: "#53DEE9",
			dark: "#1AA9B2",
		},
		secondary: {
			main: "#9A6AFF",
			light: "#B59AFF",
			dark: "#7645D9",
		},
		background: {
			default: "#08060B",
			paper: "#1D1C21",
		},
		text: {
			primary: "#F4EEFF",
			secondary: "#B8ADD2",
		},
		success: {
			main: "#31D0AA",
		},
		warning: {
			main: "#ED4B9E",
		},
		divider: "#383241",
	},
	typography: {
		fontFamily: '"Kanit", "Inter", sans-serif',
		h1: { fontWeight: 600 },
		h2: { fontWeight: 600 },
		h3: { fontWeight: 600 },
		h4: { fontWeight: 600 },
		h5: { fontWeight: 600 },
		h6: { fontWeight: 600 },
		button: {
			fontWeight: 600,
			textTransform: "none",
		},
	},
	shape: {
		borderRadius: 16,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					borderRadius: "16px",
					fontWeight: 600,
					boxShadow: "none",
					"&:hover": {
						boxShadow: "none",
					},
				},
				contained: {
					background: "linear-gradient(135deg, #1FC7D4 0%, #9A6AFF 100%)",
					color: "white",
					"&:hover": {
						background: "linear-gradient(135deg, #1AA9B2 0%, #7645D9 100%)",
					},
				},
				outlined: {
					borderColor: "#1FC7D4",
					color: "#1FC7D4",
					"&:hover": {
						backgroundColor: "rgba(31, 199, 212, 0.08)",
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: "24px",
					boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
					border: "1px solid #383241",
					backgroundColor: "#1D1C21",
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiOutlinedInput-root": {
						borderRadius: "16px",
						backgroundColor: "#27262C",
					},
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: "8px",
					fontWeight: 600,
				},
			},
		},
		MuiAlert: {
			styleOverrides: {
				root: {
					borderRadius: "16px",
				},
			},
		},
	},
});

// Renamed to avoid conflict with the imported MUIThemeProvider
export default function CustomThemeProvider({ children }) {
	const { darkMode } = useTheme();
	const theme = darkMode ? darkTheme : lightTheme;

	return (
		<MUIThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</MUIThemeProvider>
	);
}
