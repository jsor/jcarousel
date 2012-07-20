jCarousel Control Plugin
========================

The jCarousel Control Plugin provides controls for jCarousel.

Getting started
---------------

To use the jCarousel Control Plugin, include the source file right after the jCarousel core file:

```html
<link rel="stylesheet" type="text/css" href="/path/to/jcarousel.css" />
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
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
    <div class="jcarousel">
        <ul>
            <li>...</li>
            <li>...</li>
        </ul>
    </div>

    <!-- Controls -->
    <a class="jcarousel-prev" href="#">Prev</a>
    <a class="jcarousel-next" href="#">Next</a>
</div>
```

To setup the plugin, add the following code inside the `<head>` tag of your HTML document:

```html
<script type="text/javascript">
$(function() {
    $('.jcarousel').jcarousel({
        // Core configuration goes here
    });

    $('.jcarousel-prev').jcarouselControl({
        target: '-=1'
    });

    $('.jcarousel-next').jcarouselControl({
        target: '+=1'
    });
});
</script>
```

As you can see, you setup the controls independently from the carousel and the plugin tries to autodetect the carousel. 

This works best if you enclose the carousel and its controls inside a mutual wrapper element.

If that fails or isn't possible, you can pass the related carousel instance as an option:

```javascript
var carousel = $('.jcarousel').jcarousel({
    // Core configuration goes here
});

$('.jcarousel-prev').jcarouselControl({
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
        <td>active.jcarouselcontrol</td>
        <td>Triggered when the control becomes active.</td>
        <td>
            <pre>
$('.jcarousel-prev').bind('active.jcarouselcontrol', function(plugin) {
    // "this" refers to the control element
    // "plugin" is the plugin instance
    //     (You can get the carousel instance with plugin.carousel())
});</pre>
        </td>
    </tr>
    <tr>
        <td>inactive.jcarouselcontrol</td>
        <td>Triggered when the control becomes inactive.</td>
        <td>
            <pre>
$('.jcarousel-prev').bind('inactive.jcarouselcontrol', function(plugin) {
    // "this" refers to the control element
    // "plugin" is the plugin instance
    //     (You can get the carousel instance with plugin.carousel())
});</pre>
        </td>
    </tr>
</table>

### Active and inactive states

This is how the plugin understands active and inactive states:

If the `target` option is relative, `+=1` for example, the control is active if there is at least on more item to scroll, inactive otherwise (if you're at the last item in this case).

If the `target` option is absolute, `0` for example (always scrolls to the first item), the control is active if the targeted item is at position 0, inactive otherwise.
