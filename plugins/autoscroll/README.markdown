jCarousel AutoScroll Plugin
===========================

The jCarousel AutoScroll Plugin provides autoscrolling support for jCarousel.

Getting started
---------------

To use the jCarousel AutoScroll Plugin, include the source file right after the jCarousel core file:

```html
<link rel="stylesheet" type="text/css" href="/path/to/jcarousel.css" />
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="/path/to/jquery.jcarousel.js"></script>
<script type="text/javascript" src="/path/to/jquery.jcarousel.autoscroll.js"></script>
```

To setup the plugin, add the following code inside the `<head>` tag of your HTML document:

```html
<script type="text/javascript">
$(function() {
    $('#mycarousel')
        .jcarousel({
            // Core configuration goes here
        })
        .jcarouselAutoscroll({
            // Plugin configuration goes here
        });
});
</script>
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
        <td>The target for the autoscrolling. Accepts the same argument as the scroll() method.</td>
    </tr>
    <tr>
        <td>interval</td>
        <td>number</td>
        <td>3000</td>
        <td>The autoscrolling interval in milliseconds.</td>
    </tr>
    <tr>
        <td>autostart</td>
        <td>boolean</td>
        <td>true</td>
        <td>Whether to autostart autoscrolling.</td>
    </tr>
</table>
