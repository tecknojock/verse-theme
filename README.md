# Verse

![Screenshot of Verse Theme](https://cloud.githubusercontent.com/assets/816965/7584256/7efd5cae-f8df-11e4-8248-18ef0de60d2a.png)

Verse is a flexible and modern Tumblr theme: rich in customizable features with a clean focused design.

** Key features**

* Free and open-source code
* Responsive design
* Group blog support
* Integration with Tumblr customize panel: custom fonts, colours and header image
* Customizable sidebar and blog footer

## Install Verse

**[Demo blog](http://versetheme.tumblr.com/)**

 **[Install on Tumblr Themes](http://versetheme.tumblr.com/install)**

## Modify Verse

![Edit HTML button in Tumblr customize panel](https://cloud.githubusercontent.com/assets/816965/7584238/62a75d34-f8df-11e4-8766-6694c5bd7794.png)

To make changes to the theme's HTML, click the 'Edit HTML' button in the [customize menu](https://www.tumblr.com/docs/en/blog_customization) after installing the theme.

## Build Verse

The following documentation is designed for developers interested in building Verse from code contained in this repo.

Verse uses:
- JavaScript to initialise [jQuery](https://jquery.com/) plugins ([FitVids.JS](http://fitvidsjs.com/) and [jQuery PhotosetGrid](https://stylehatch.github.io/photoset-grid/))
- HTML with [Tumblr's templating language](https://www.tumblr.com/docs/en/custom_themes/)
- [SCSS](http://sass-lang.com/), a CSS pre-processor
- CSS when referencing variables from [Tumblr's templating language](https://www.tumblr.com/docs/en/custom_themes/)

The tools used to build Verse are:
- [Bower](http://bower.io/) to manage JavaScript dependencies
- [Grunt](http://gruntjs.com/) to process the HTML, SCSS, CSS and JavaScript
- [Git](https://git-scm.com/) for version control

To build Verse from the code contained in this Github repository, Make sure you have [Bower](http://bower.io/), [Grunt](http://gruntjs.com/) and [Git](https://git-scm.com/) installed , then run the following steps in Terminal in order to install the themes dependencies and build a local copy:

```shell
$ git clone https://github.com/rohanchandra/verse-theme.git
$ npm install
$ bower install
$ grunt inline
```

### Editing code

Make changes to Verse's code by changing files in the 'src' folder.

Directories in the 'src' folder correspond to the type of code stored:
- `src/styles`: SCSS and CSS
- `src/js`: JavaScript
- `src/includes`: partial HTML files

The bulk of the theme's HTML is kept in `theme.html`.

After making changes, run the Grunt build processes which add CSS, JS, and HTML partials into a single HTML file.

### Builds in Grunt

#### Development builds
```shell
grunt inline
```
Development builds make use of inline CSS and JavaScript to allow for quick testing of the theme.

After making changes to either the JavaScript, HTML or CSS, run `grunt inline` in Terminal to create a development build of the theme.

To test your theme after running `grunt inline`:

1. Open the `build` folder
2. Open `theme.html` in a text editor
3. Paste the HTML into the [customize menu](https://www.tumblr.com/docs/en/blog_customization) of your testing blog
4. Save all changes

#### Distribution builds
```shell
grunt dist
```

Once you are satisfied with all changes to your JavaScript, HTML and CSS and have tested all changes running `grunt inline`, make a distribution build that links to the CSS and JS externally rather than placing them inline.

**Step one**: Upload `verse.min.js` and `dist.min.css` to Tumblr:

![theme-assets](https://cloud.githubusercontent.com/assets/816965/7584452/0a110100-f8e1-11e4-9a5d-c844614d785a.png)

**Step two**: Change the `staticCSS` and `staticJS` variables in `package.json` to the asset URLs from Tumblr:

```js
{
  "name": "Verse",
  "version": "2.0.0",
  "staticCSS": "http://static.tumblr.com/981y23h/7lwnnt197/dist.min.css",
  "staticJS": "http://static.tumblr.com/ns3mt1d/RKEnk0ivm/theme.min.js",
```

**Step three**: Run `grunt dist` to build the Tumblr theme HTML with the external CSS and external JavaScript links

## Issues
Please [open an issue on Github](https://github.com/rohanchandra/verse-theme/issues) or send an email to the email address listed on the [Tumblr Themes page for Verse](http://versetheme.tumblr.com/install).
