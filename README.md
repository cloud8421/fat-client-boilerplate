# Fat client boilerplate

A thorough boilerplate to easily work with fat client webapps. Features:

- Require.js support (with r.js build)
- Package management with Bower (with a manifest file to manage dependencies)
- Sass compilation
- Static distribution files, with appended md5 sum for cache bust and asset map for integration (but it can be served straight from `./dist`
- Jasmine unit testing (headless and browser)
- Jasmine and Zombie.js integration testing (headless)
- Livereload support (with the [livereload extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)
- Static server on different ports (development, test, production)
- Tailored wachers
- JSLint configuration

## Installation

This boilerplate depends on:

- Node ([installation instructions](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) - I suggest a package manager)
- Sass ([installation instructions](http://sass-lang.com/download.html))

Once you have all dependencies, you can run the following:

    $ npm install
    $ bower install

This will add all needed packages.

## Usage

Package management for client libraries is done through Bower. To add a new package, you can run:

    $ bower install --save <package-name>

This will install the package in the right directory and update `component.json`, so that if you ever need to run `bower install` again, everything will be all set.

Once you've added a package, you have to edit `src/config.js` and `grunt.js` for the require.js configuration. At the moment you have to make the same change in both files, definining the new library module path, shims and dependencies (if needed).
