# Fat client boilerplate

[![Build Status](https://travis-ci.org/cloud8421/fat-client-boilerplate.png?branch=master)](https://travis-ci.org/cloud8421/fat-client-boilerplate)

A thorough boilerplate to easily work with fat client webapps. Features:

- [Require.js](http://requirejs.org) support (with r.js build)
- Package management with [Bower](http://twitter.github.com/bower/) (with a manifest file to manage dependencies)
- [Sass](http://sass-lang.com/) compilation
- Static distribution files, with appended md5 sum for cache bust and asset map for integration
- [Jasmine](http://pivotal.github.com/jasmine/) unit testing (headless and browser)
- Jasmine and [Zombie.js](http://zombie.labnotes.org/) integration testing (headless)
- Livereload support (with the [livereload extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en))
- Static server on different ports (development, test, production)
- Tailored watchers
- [JSHint](http://www.jshint.com/) configuration
- [TravisCI](https://travis-ci.org/) integration

All of this is possible because [Grunt](http://gruntjs.com) is awesome. Please refer to `package.json` for extra dependencies connected to it.

## Installation

You can use [Rock](https://github.com/rocktemplates/rock) to clone a fresh copy of this repository and customize it on the fly:

    $ rock super-awesome-app -r cloud8421/fat-client-boilerplate

This will download everything into `./super-awesome-app` (without git history), asks you for some basic data (project name, author, email - note that you can [set default values](https://github.com/rocktemplates/rock#rockconfjson)), so that you're ready to roll.

This boilerplate depends on:

- Node ([installation instructions](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) - I suggest a package manager approach)
- Sass ([installation instructions](http://sass-lang.com/download.html))
- Bower (installed globally): `npm install -g bower`
- Grunt (the cli interface needs to be installed globally): `npm install -g grunt-cli`
- Jasmine-node (so you can run integration specs): `npm install -g jasmine-node`

Once you have all dependencies, you can run the following:

    $ npm install
    $ bower install

This will add all needed packages.

## Usage

### Package installation

Package management for client libraries is done through Bower (some defaults are provided, check `component.json`). To add a new package, you can run:

    $ bower install --save <package-name>

This will install the package in the right directory and update `component.json`, so that if you ever need to run `bower install` again, everything will be all set. If you are not sure about the package name, you can run:

    $ bower search <package-name>

Packages are installed in `src/vendor`.

Once you've added a package, you have to edit `src/config.js` for the require.js configuration. You have to define the new library module path, shims and dependencies (if needed - not all libraries behave in the same way). As a rule of thumb, check if the library you want to add has an AMD version (it can appear as a Bower search result or be a different file inside the library folder).

### Adding new files to your application code

Let's say that you want to add a `Book` backbone model.

    $ mkdir -p src/models
    $ touch src/models/book

That's the only thing you need to do. Provided that the file has a module structure and it's required in any point of the dependency chain created by `main.js`, it will be picked up in development and handled by the optimizer for production.

For any issues, check the Require.js configuration file(`src/config.js`).

### Adding new unit tests

Jasmine unit tests are defined into `test`. When you add one, it needs to be structured as an AMD module, check `test/main.test.js` for an example. The file name needs to end in `.test.js`.

Once you created a test, require it inside `test/support/test-helper.js`.

Note that requiring your application code modules requires you to traverse back one level due to the folder structure.

### Adding new integration specs

Integration specs are executed by Jasmine-node using a headless zombie.js instance. Please refer to the `test/integration/home.spec.js` file for a boilerplate. This time, the file needs to end with `.spec.js` (so that jasmine-node picks it up).

### Bonus: testem configuration

[Testem](https://github.com/airportyh/testem) is a library that lets you run your tests in different browsers. The included configuration runs your unit tests using the headless runner. In addition, running `testem ci` will also include a full run of the integration suite.

### Watchers

Running `grunt` from the project root directory is enough to launch all watchers. This will:

- lint any file inside src or specific subfolders (see `Gruntfile.js` for details and make sure that if you change it, you do not include the `vendor` folder);
- compile `stylesheets/main.scss`
- run two web servers, one for development [http://localhost:8000](http://localhost:8000) and one for test [http://localhost:8001](http://localhost:8001). This is done to make sure that if you use any local storage features, your development data is different from your test data.
- rerun unit tests
- rerun integration tests
- trigger a reload of your browser (provided you enabled the extension)

### Distribution

Run `grunt dist` to have distribution files ready under `dist`. You can use that directory as a baseline for your production setup. To test it, you can run `grunt connect:production` and open [http://localhost:8002](http://localhost:8002).

If you use [Heroku](http://heroku.com), you already have a `Procfile` configuration to serve the app as a static node server. You just need to follow [these instructions](https://devcenter.heroku.com/articles/nodejs#deploy-your-application-to-heroku).

If instead you want to use github pages, you can use `git subtree` (hat tip to
[the yeoman docs](http://yeoman.io/deployment.html)):

    $ git subtree push --prefix dist origin gh-pages

This will push the `dist` directory to the `gh-pages` branch, which you can use
to serve a completely static app (more information
[here](https://help.github.com/articles/creating-project-pages-manually)).

### Upcoming features

- cache manifest generation
- image management, cache bust and optimization.
