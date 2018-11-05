import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';

export default [
  // browser-friendly UMD build
  {
    input: 'src/resourceLoader.js',
    output: {
      name: 'resourceLoader',
      file: 'dist/resourceLoader.min.js',
      format: 'umd'
    },
    plugins: [resolve(), commonjs(), typescript()],
    watch: {
      chokidar: {
        // if the chokidar option is given, rollup-watch will
        // use it instead of fs.watch. You will need to install
        // chokidar separately.
        //
        // this options object is passed to chokidar. if you
        // don't have any options, just pass `chokidar: true`
      },

      // include and exclude govern which files to watch. by
      // default, all dependencies will be watched
      exclude: ['node_modules/**']
    }
  }
];
