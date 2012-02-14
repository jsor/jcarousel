jCarousel Control Plugin
========================

The jCarousel Control Plugin provides controls for jCarousel.

Getting started
---------------

To use the jCarousel Control Plugin, include the source file right after the jCarousel core file:

```html
<link rel="stylesheet" type="text/css" href="/path/to/jcarousel.css" />
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
<script type="text/javascript" src="/path/to/jquery.jcarousel.js"></script>
<script type="text/javascript" src="/path/to/jquery.jcarousel.control.js"></script>
```

A control is basically a HTML element (`<a>`, `<button>` etc.) which scrolls the
carousel when clicking on it.

A simple basic HTML markup structure would be:

```html
<!-- Wrapper -->
<div>
    <!-- Carousel -->
    <div id="mycarousel" class="jcarousel">
        <ul>
            <li>...</li>
            <li>...</li>
        </ul>
    </div>

    <!-- Controls -->
    <a id="mycarousel_prev" href="#">Prev</a>
    <a id="mycarousel_next" href="#">Next</a>
</div>
```

To setup the plugin, add the following code inside the `<head>` tag of your HTML document:

```html
<script type="text/javascript">
$(function() {
    $('#mycarousel').jcarousel({
        // Core configuration goes here
    });

    $('#mycarousel_prev').jcarouselControl({
        target: '-=1'
    });

    $('#mycarousel_next').jcarouselControl({
        target: '+=1'
    });
});
</script>
```

As you can see, you setup the controls independently from the carousel and the plugin tries to autodetect the carousel. 

This works best if you enclose the carousel and its controls inside a mutual wrapper element.

If that fails or isn't possible, you can pass the related carousel instance as an option:

```javascript
var carousel = $('#mycarousel').jcarousel({
    // Core configuration goes here
});
$('#mycarousel_prev').jcarouselControl({
    target: '-=1',
    carousel: carousel
});
```

Configuration
-------------

The plugin accepts the following options:

<table>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>target</td>
        <td>string|number|object</td>
        <td>+=1</td>
        <td>The target for the control. Accepts the same argument as the scroll() method.</td>
    </tr>
    <tr>
        <td>event</td>
        <td>string</td>
        <td>click</td>
        <td>The event which triggers the control.</td>
    </tr>
</table>

Events
------

After initialization, the plugin triggers specific events on the control element.

### Available events are:

<table>
    <tr>
        <th>Event</th>
        <th>Description</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>jcarouselcontrolenabled</td>
        <td>Triggered when the control becomes enabled.</td>
        <td>
            <pre>
$('#mycarousel_prev').bind('jcarouselcontrolenabled', function(plugin) {
    // "this" refers to the control element
    // "plugin" is the plugin instance
    //     (You can get the carousel instance with plugin.carousel())
});</pre>
        </td>
    </tr>
    <tr>
        <td>jcarouselcontroldisabled</td>
        <td>Triggered when the control becomes disabled.</td>
        <td>
            <pre>
$('#mycarousel_prev').bind('jcarouselcontroldisabled', function(plugin) {
    // "this" refers to the control element
    // "plugin" is the plugin instance
    //     (You can get the carousel instance with plugin.carousel())
});</pre>
        </td>
    </tr>
</table>
