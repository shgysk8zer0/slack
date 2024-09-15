import { warningHandler } from '@shgysk8zer0/js-utils/rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { listDirByExt } from '@shgysk8zer0/npm-utils/fs';

const scripts = await Promise.all([
	listDirByExt('./', '.js'),
	listDirByExt('./block/', '.js'),
	listDirByExt('./element/', '.js')
]);

export default {
	input: scripts.flat().filter(script => ! (script.endsWith('.config.js') || script.endsWith('.test.js'))),
	external: ['node:child_process', '@shgysk8zer0/http/utils.js', '@shgysk8zer0/consts/mimes.js', '@shgysk8zer0/slack/*'],
	onwarn: warningHandler,
	output: {
		dir: './cjs/',
		format: 'cjs',
		preserveModules: true,
		entryFileNames: '[name].cjs',
		chunkFileNames: '[name]-[hash].cjs',
	},
	plugins: [nodeResolve()],
};
