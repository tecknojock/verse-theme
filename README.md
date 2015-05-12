# Verse

Verse is a flexible and modern Tumblr theme: rich in customizable features with a clean focused design.

[Demo](http://versetheme.tumblr.com/)

## Usage

[Install on Tumblr Themes](http://versetheme.tumblr.com/install)

## Modify Verse

If you are only making minor changes to the theme's HTML or CSS simply directly edit the HTML file once you have installed the theme (by clicking on "edit HTML" in the [Tumblr customize menu](https://www.tumblr.com/docs/en/blog_customization))

To build Verse:

```shell
$ git clone https://github.com/rohanchandra/verse.git
$ npm install
$ bower install
$ grunt local
```

More detail is given below.

### Overview

Verse uses:
- JavaScript to initialise [jQuery](https://jquery.com/) plugins ([FitVids.JS](http://fitvidsjs.com/) and [jQuery PhotosetGrid](https://stylehatch.github.io/photoset-grid/))
- HTML with [Tumblr's templating language](https://www.tumblr.com/docs/en/custom_themes/)
- [SCSS](http://sass-lang.com/), a CSS pre-processor
- CSS when referencing variables from [Tumblr's templating language](https://www.tumblr.com/docs/en/custom_themes/)

The tools to build Verse are:
- [Bower](http://bower.io/) to manage JavaScript dependencies
- [Grunt](http://gruntjs.com/) to process the HTML, SCSS, CSS and JavaScript
- [Git](http://bower.io/) for version control

### Before you start

1. Clone Github repo
2. [Install Grunt dependencies](http://gruntjs.com/getting-started#working-with-an-existing-grunt-project)
3. [Install Bower dependencies](http://bower.io/#install-packages)

### Making changes to Verse

Code and markup used in Verse is stored in the 'src' folder.

The directories in the 'src' folder correspond to the type of code or markup stored:
- styles: SCSS and CSS
- js: JavaScript
- includes: partial HTML files

The bulk of the theme's HTML is kept in 'theme.html'.

### Build Verse

Once you've made changes to either the CSS, JavaScript or HTML, run the following commands in Terminal to build Verse:

`grunt plugins` to build Tumblr theme Javascript*, AND

`grunt local` to build the Tumblr theme HTML with inline CSS, OR

`grunt dist` to build Tumblr theme HTML with CSS kept external*

* = Important: upload the theme CSS (dist.min.css) and JavaScript (verse.min.js) to Tumblr as theme assets in the customize menu. Place the resulting URL in `package.json` to link these assets in the build.

Open the 'build' folder to see the results of the build process.

To test changes open 'theme.html' and paste the contents of the file your  Tumblr blog's customize menu. Remember if you have used `grunt dist` before testing: 1) first upload the theme CSS and JavaScript and 2) make sure you have updated the URL to the asset in `package.json`.
