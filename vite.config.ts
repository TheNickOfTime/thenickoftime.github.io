import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
// import remarkFrontmatter from 'remark-frontmatter';
// import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), mdx()],
	resolve: {
		alias: {
			src: '/src',
		},
	},
	server: {
		host: '127.0.0.1',
		// port: 3000,
	},
});
