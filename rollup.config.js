import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import pkg from "./package.json";
import resolve from "rollup-plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import postcss from "rollup-plugin-postcss";

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: true,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: (css) => {
        css.write("public/build/bundle.css");
      },
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: ["svelte", "@fullcalendar/common"],
    }),
    commonjs(),
    postcss(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    livereload("public"),
  ],
  watch: {
    clearScreen: false,
  },
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        });
      }
    },
  };
}
