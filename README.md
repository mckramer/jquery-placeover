# jQuery.placeover
#### Text overlay for input fields. A new take on the placeholder shim for jQuery to provide HTML5 behavior to legacy browsers.

Many current placeholder plugins handle the placeholder by setting it as the value of the input and removing it when needed.  Instead, Placeover positions text over the input, eliminating the hassle of ensuring the placeholders are not passed through with form submission as well as allowing a much closer replication of native behavior of the placeholder attribute in modern browsers.

This plugin was initially inspired by the [OverText plugin for MooTools](http://mootools.net/docs/more/Forms/OverText).  It attempts to bring this basic concept to jQuery, but also improve the handling to match native placeholder handling.

## Quickstart
You do not have to do anything special to use OverText.  Define a input as you would normally, specifying the placeholder with its attribute.
```html
<input type="text" name="firstName" placeholder="First name" />
```
Then, attach the Placeover to inputs as you like after the document is ready:
```js
$( function () {
  $('input').placeover();
});
```

Head on over to the [website](http://mckramer.github.io/jquery-placeover/) for full information, including documentation on options, methods, and events.

## Versions
Follows [semantic versioning](http://semver.org).  See `CHANGELOG.md` for more information on specific versions and changes.

## Contributing
See `CONTRIBUTING.md`.

## Author
Max Kramer

Connect with me on [GitHib](https://github.com/mckramer) or [Twitter](https://twitter.com/maxckramer)

## License
This software is released under MIT license.  See `LICENSE` for full text.