import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import postCssPxToRem from "postcss-pxtorem";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), legacy({
		targets: ['chrome 49'],
	})],
	base: './',
	server: {
		// ← ← ← ← ← ←
		host: '0.0.0.0', // ← 新增内容 ←
	},
	define: {
		'process.env': {},
	},
	resolve: {
		alias: [{
			find: '@/',
			replacement: '/src/'
		}],
	},
	css: {
		postcss: {
			plugins: [
				postCssPxToRem({
					rootValue: 75, // 1rem的大小（控制1rem的大小  点位：px）
					propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
				}),
			],
		}
	},
})