require('esbuild').build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  outfile: './dist/bundle.js',
  platform: 'node',  // 确保是针对 Node.js 平台
  target: 'esnext',  // 确保指定目标版本
  external: ['path'],  // 如果你希望排除某些模块
  format: 'esm'
}).catch(() => process.exit(1));
