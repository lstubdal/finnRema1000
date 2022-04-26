import vue from '@vitejs/plugin-vue';

export default {
	plugins: [vue()],

	// for npm run build minification
	build: {	
		chunkSizeWarningLimit: 1000,
	}
};
