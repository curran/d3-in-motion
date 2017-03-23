import npm from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default {
  entry: "index.js",
  format: "iife",
  plugins: [
    npm(),
    babel({
      exclude: "node_modules/**"
    })
  ],
  dest: "bundle.js"
};
