# Logophile Chrome Extension
This extension provides a set of useful tools for logophiles.

# Specs
This project uses [Jasmine](http://pivotal.github.com/jasmine/) as testing framework. To run the specs, simply 
[download](http://pivotal.github.com/jasmine/download.html) the standalone Jasmine runner, and edit SpecRunner.html 
to import relevant scripts:

```html
<!-- include dependencies here... -->
<script type="text/javascript" src="../src/js/libs/jquery.min.js"></script>
  
<!-- include source files here... -->
<script type="text/javascript" src="../src/js/common.js"></script>
<script type="text/javascript" src="../src/js/wordnik.js"></script>
<script type="text/javascript" src="../src/js/cache.js"></script>

<!-- include spec files here... -->
<script type="text/javascript" src="../spec/common-suite.js"></script>
<script type="text/javascript" src="../spec/wordnik-suite.js"></script>
<script type="text/javascript" src="../spec/cache-suite.js"></script>
```