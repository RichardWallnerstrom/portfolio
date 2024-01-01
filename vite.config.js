// vite.config.js

import { defineConfig } from "vite"

export default defineConfig({
	base: "./", // Set the base path to the root directory
	build: {
		sourcemap: true,
		rollupOptions: {
			input: {
				index: "/index.html", // Existing entry point
				main: "/main.js", // Additional entry point
			},
		},
	},
	// Other Vite configuration options...
})
