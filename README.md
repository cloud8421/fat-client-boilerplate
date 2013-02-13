# Fat client boilerplate

A thorough boilerplate to easily work with fat client webapps. Features:

- Require.js support (with r.js build)
- Package management with Bower (with a manifest file to manage dependencies)
- Sass compilation
- Distribution files, with appended md5 sum for cache bust and asset map for integration
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
