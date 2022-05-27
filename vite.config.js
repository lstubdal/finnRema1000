import vue from '@vitejs/plugin-vue';

export default {
	plugins: [vue()],
	build: { // for npm run build minification
		chunkSizeWarningLimit: 1000,
	}
};
