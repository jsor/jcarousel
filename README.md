jCarousel - Riding carousels with jQuery
========================================

jCarousel is a jQuery plugin for controlling a list of items in horizontal or vertical order. The items, which can be static HTML content or loaded with (or without) AJAX, can be scrolled back and forth (with or without animation).

**Note**: The master branch contains the new version 0.3 which is not released yet and is not compatible with [0.2](https://github.com/jsor/jcarousel/tree/0.2).

Getting started
---------------

To use the jCarousel component, include the [jQuery](http://jquery.com) library and the jCarousel source file inside the `<head>` tag of your HTML document:

```html
<link rel="stylesheet" type="text/css" href="/path/to/jcarousel.css" />
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="/path/to/jquery.jcarousel.js"></script>
```

jCarousel expects a very basic HTML markup structure inside your HTML document, for example:

```html
<div class="jcarousel">
    <ul>
        <li>...</li>
        <li>...</li>
    </ul>
</div>
```

This document refers to the elements as __root__ element, __list__ element and __item__ element(s):

```
<div class="jcarousel"> <----------------------------------| Root element
    <ul> <--------------------------------| List element   |
        <li>...</li> <---| Item element   |                |
        <li>...</li> <---| Item element   |                |
    </ul> <-------------------------------|                |
</div> <---------------------------------------------------|
```

Note that this structure is only an example and not required. You could also use a structure like:

```
<div class="mycarousel"> <---------------------------------| Root element
    <div> <-------------------------------| List element   |
        <p>...</p> <-----| Item element   |                |
        <p>...</p> <-----| Item element   |                |
    </div> <------------------------------|                |
</div> <---------------------------------------------------|
```
```

The only requirement is, that it consists of a root element, list element and item elements.

To setup jCarousel, add the following code inside the `<head>` tag of your HTML document:

```html
<script type="text/javascript">
$(function() {
    $('.jcarousel').jcarousel({
        // Configuration goes here
    });
});
</script>
```

These are the minimal CSS settings for a horizontal carousel:

```css
.jcarousel {
    position: relative;
    overflow: hidden;
}

.jcarousel ul {
    width: 20000em;
    position: absolute;
    list-style: none;
    margin: 0;
    padding: 0;
}

.jcarousel li {
    float: left;
}
```

Configuration
-------------

jCarousel accepts a list of options to control the behaviour of the carousel. Here is the list of options you may set:

<table>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>list</td>
        <td>string|function</td>
        <td><code>function() {
    return this.element().children().eq(0);
}</code></td>
        <td>A function or a jQuery selector to select the list inside the root element.</td>
    </tr>
    <tr>
        <td>items</td>
        <td>string|function</td>
        <td><code>function() {
    return this.list().children();
}</code></td>
        <td>A function or a jQuery selector to select the items inside the list element.</td>
    </tr>
    <tr>
        <td>animation</td>
        <td>integer|string|object</td>
        <td><code>&quot;normal&quot;</code></td>
        <td>The speed of the scroll animation as string in jQuery terms (<code>"slow"</code> or <code>"fast"</code>) or milliseconds as integer (See the <a href="http://api.jquery.com/animate">jQuery Documentation</a>). If set to 0, animation is turned off. Alternatively, this can be a map of options like the one <a href="http://api.jquery.com/animate/#animate-properties-options">jQuery.animate</a> accepts as second argument or a function. A function will be called in the context of the carousel instance and with 2 arguments: The first is a hash of css properties (ie. {left: -400}) and the second is a function which must be called as a callback.</td>
    </tr>
    <tr>
        <td>wrap</td>
        <td>string</td>
        <td><code>null</code></td>
        <td>Specifies whether to wrap at the first/last item (or both) and jump back to the start/end. Options are <code>"first"</code>, <code>"last"</code>, <code>"both"</code> or <code>"circular"</code> as string. If set to null, wrapping is turned off (default).</td>
    </tr>
    <tr>
        <td>vertical</td>
        <td>boolean</td>
        <td><code>null</code></td>
        <td>Specifies whether the carousel appears in vertical orientation. Changes the carousel from a left/right style to a up/down style carousel. If not set, jCarousel looks for a data-* attribute <code>data-jcarousel-vertical</code> on the root element and if found, automatically sets <code>vertical</code> to <code>true</code>.</td>
    </tr>
    <tr>
        <td>rtl</td>
        <td>boolean</td>
        <td><code>null</code></td>
        <td>Specifies wether the carousel appears in RTL (Right-To-Left) mode. If not set, jCarousel looks for <code>dir</code> attribute with a value of <code>rtl</code> on the root element (or to any of its parent elements) and if found, automatically sets <code>rtl</code> to <code>true</code>.</td>
    </tr>
    <tr>
        <td>center</td>
        <td>boolean</td>
        <td><code>false</code></td>
        <td>Specifies wether the carousel should be centered inside the root element. <strong>Note:</strong> This feature is experimental and may not work with all carousel setups.</td>
    </tr>
</table>

Navigating the carousel
-----------------------

By default, jCarousel offers no built in controls to navigate through the carousel. But you can simply implement navigation controls using the `scroll` method.

```javascript
$('.jcarousel').jcarousel('scroll', target);
```

Available formats for the `target` argument are:

<table>
    <tr>
        <th>Format</th>
        <th>Description</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>index</td>
        <td>Scrolls to the item at the given index (Note that indexes are 0-based).</td>
        <td><pre>$('.jcarousel').jcarousel('scroll', 0);</pre></td>
    </tr>
    <tr>
        <td>-index</td>
        <td>Scrolls to the item at the given index counting backwards from the last item.</td>
        <td><pre>$('.jcarousel').jcarousel('scroll', -1);</pre></td>
    </tr>
    <tr>
        <td>object</td>
        <td>Scrolls to the given DOM object.</td>
        <td><pre>$('.jcarousel').jcarousel('scroll', $('.jcarousel li:eq(2)'));</pre></td>
    </tr>
    <tr>
        <td>+=offset</td>
        <td>Scrolls the carousel forward by the given offset relatively from the current position.</td>
        <td><pre>$('.jcarousel').jcarousel('scroll', '+=1');</pre></td>
    </tr>
    <tr>
        <td>-=offset</td>
        <td>Scrolls the carousel backwards by the given offset relatively from the current position.</td>
        <td><pre>$('.jcarousel').jcarousel('scroll', '-=1');</pre></td>
    </tr>
</table>

A simple example for previous and next controls:

```javascript
$('.jcarousel-prev').click(function() {
    $('.jcarousel').jcarousel('scroll', '-=1');
});

$('.jcarousel-next').click(function() {
    $('.jcarousel').jcarousel('scroll', '+=1');
});
```

A more comfortable way is to use a navigation plugins:

  * [jquery.jcarousel.control.js](https://github.com/jsor/jcarousel/tree/master/plugins/control)
  * [jquery.jcarousel.pagination.js](https://github.com/jsor/jcarousel/tree/master/plugins/pagination)

Defining the number of visible items
------------------------------------

Sometimes people are confused how to define the number of visible items because there is no option for this as they expect.

You simply define the number of visible items by defining the width (or height for a vertical carousel) of the element which surrounds the list (if you use the default from this document, you do that with the class `.jcarousel` in your stylesheet).

This offers a lot of flexibility, because you can define the width in pixel for a fixed carousel or in percent for a flexible carousel.

Vertical carousels
------------------

To create a vertical carousel, set the `vertical` option to `true`:

```javascript
$('.jcarousel').jcarousel({vertical: true});
```

Alternatively, you can simply use a `data-jcarousel-vertical` attribute for your root element:

```html
<div class="jcarousel" data-jcarousel-vertical="true">
    <ul>
        <!-- The content goes in here -->
    </ul>
</div>
```

RTL (Right-To-Left) carousels
-----------------------------

To create a carousel in RTL mode, set the `rtl` option to `true`:

```javascript
$('.jcarousel').jcarousel({rtl: true});
```

Alternatively, you can simply add the `dir` attribute with a value of `rtl` to the root element (or to any of its parent elements):

```html
<div class="jcarousel" dir="rtl">
    <ul>
        <!-- The content goes in here -->
    </ul>
</div>
```

You should also add the following to your CSS stylesheet:

```css
.jcarousel[dir=rtl] li {
    float: right;
}
```

Accessing the jCarousel instance
--------------------------------

If you have created a carousel like:

```javascript
$(function() {
    $('.jcarousel').jcarousel();
});
```

You can later call methods on the jCarousel instance with:

```javascript
$('.jcarousel').jcarousel('scroll', '+=2');
```

The first argument is the method name. The following arguments are the arguments for the called method.

### Available methods are:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><pre>.jcarousel('destroy');</pre></td>
        <td>Removes the jCarousel functionality completely. This will return the element back to its initial state.</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('reload'[, options]);</pre></td>
        <td>Reloads the carousel. This method is useful to reinitialize the carousel if you have changed the content of the list from the outside or want to change options on runtime.</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('items');</pre></td>
        <td>Returns all items as jQuery object.</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('scroll', target [, animate [, callback]]);</pre></td>
        <td>Scrolls to a specific item or relative by a given offset (See section &quot;Navigating the carousel&quot; for more information about the target argument). If the argument <code>animate</code> is given and <code>false</code>, it just jumps to the position without animation. If <code>callback</code> is given and a valid callback, it is triggered after the animation is finished.</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('options'[, name, [value]]);</pre></td>
        <td>Get or set any jCarousel option. If no value is specified, will act as a getter. If no name is specified, it will return all options as an object.</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('options', options);</pre></td>
        <td>Set multiple jCarousel options at once by providing an options object.</td>
    </tr>
</table>

Manipulating the carousel
-------------------------

If you manipulate the carousel from the outside (eg. adding or removing items from the list), ensure that you call `reload()` afterwards so that jCarousel becomes aware of the changes:

```javascript
$(function() {
    $('.jcarousel').jcarousel({
        // Configuration goes here
    });

    // Append items
    $('.jcarousel ul')
        .append('<li>Item 1</li>')
        .append('<li>Item 2</li>');

    // Reload carousel
    $('.jcarousel').jcarousel('reload');
});
```
Existing items should only be manipulated not completely replaced:

```javascript
$(function() {
    // Don't do that
    $('.jcarousel li:eq(0)')
        .replaceWith('<li class="myclass">Item 1</li>');

    // Do this
    $('.jcarousel li:eq(0)')
        .addClass('myclass')
        .text('Item 1');
});
```

If you are removing items, make sure they are currently not visible:

```javascript
$(function() {
    var carousel = $('.jcarousel'),
        item = carousel.find('li:eq(0)');

    if (carousel.jcarousel('visible').index(items) < 0) {
        item.remove();
        carousel.jcarousel('reload');
    }
});
```

jCarousel specific events
-------------------------

After initialization, jCarousel triggers specific events on the root element and the items of the carousel.

### Available root element events are:

<table>
    <tr>
        <th>Event</th>
        <th>Description</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>create.jcarousel</td>
        <td>Triggered on creation of the carousel.</td>
        <td>
            <pre>
$('.jcarousel').bind('create.jcarousel', function(event, carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
        <tr>
        <td>createend.jcarousel</td>
        <td>Triggered after creation of the carousel.</td>
        <td>
            <pre>
$('.jcarousel').bind('createend.jcarousel', function(event, carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>destroy.jcarousel</td>
        <td>Triggered when the <code>destroy</code> method is called.</td>
        <td>
            <pre>
$('.jcarousel').bind('destroy.jcarousel', function(event, carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>destroyend.jcarousel</td>
        <td>Triggered after the <code>destroy</code> method is called.</td>
        <td>
            <pre>
$('.jcarousel').bind('destroyend.jcarousel', function(event, carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>reload.jcarousel</td>
        <td>Triggered when the <code>reload</code> method is called.</td>
        <td>
            <pre>
$('.jcarousel').bind('reload.jcarousel', function(event, carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>reloadend.jcarousel</td>
        <td>Triggered after the <code>reload</code> method is called.</td>
        <td>
            <pre>
$('.jcarousel').bind('reload.jcarousel', function(event, carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>scroll.jcarousel</td>
        <td>Triggered when the <code>scroll</code> method is called.</td>
        <td>
            <pre>
$('.jcarousel').bind('scroll.jcarousel', function(event, carousel, target, animate) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
    // "target" is the target argument passed to the `scroll` method
    // "animate" is the animate argument passed to the `scroll` method 
    //      indicating whether jCarousel was requested to do an animation
});</pre>
        </td>
    </tr>
    <tr>
        <td>scrollend.jcarousel</td>
        <td>Triggered after the <code>scroll</code> method is called. Note that this method is triggered at the end of the scroll method and not at the end of a animation.</td>
        <td>
            <pre>
$('.jcarousel').bind('scrollend.jcarousel', function(event, carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
    // "animated" is a boolean indicating whether jCarousel actually moved
});</pre>
        </td>
    </tr>
    <tr>
        <td>animate.jcarousel</td>
        <td>Triggered when jCarousel starts a animation.</td>
        <td>
            <pre>
$('.jcarousel').bind('animate.jcarousel', function(event, carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>animateend.jcarousel</td>
        <td>Triggered after jCarousel has finished a animation.</td>
        <td>
            <pre>
$('.jcarousel').bind('animateend.jcarousel', function(event, carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
</table>

**Note:** Some events like `create.jcarousel` are triggered from the constructor, so you have to bind the events **before** you initialize the carousel:

```javascript
$('.jcarousel')

    // Bind first
    .bind('create.jcarousel', function(event, carousel) {
        // Do something
    })

    // Initialize at last step
    .jcarousel();
```

### Available item events are:

<table>
    <tr>
        <th>Event</th>
        <th>Description</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>itemfirstin.jcarousel</td>
        <td>Triggered when the item becomes the first visible item.</td>
        <td>
            <pre>
$('.jcarousel li').bind('itemfirstin.jcarousel', function(event, carousel) {
    // This is now the first visible item
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>itemfirstout.jcarousel</td>
        <td>Triggered when the item is no longer the first visible item.</td>
        <td>
            <pre>
$('.jcarousel li').bind('itemfirstout.jcarousel', function(event, carousel) {
    // This is no longer the first visible item
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>itemlastin.jcarousel</td>
        <td>Triggered when the item becomes the last visible item.</td>
        <td>
            <pre>
$('.jcarousel li').bind('itemlastin.jcarousel', function(event, carousel) {
    // This is now the last visible item
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>itemlastout.jcarousel</td>
        <td>Triggered when the item is no longer the last visible item.</td>
        <td>
            <pre>
$('.jcarousel li').bind('itemlastout.jcarousel', function(event, carousel) {
    // This is no longer the last visible item
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>itemvisiblein.jcarousel</td>
        <td>Triggered when the item becomes a visible item.</td>
        <td>
            <pre>
$('.jcarousel li').bind('itemvisiblein.jcarousel', function(event, carousel) {
    // This is now a visible item
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>itemvisibleout.jcarousel</td>
        <td>Triggered when the item is no longer a visible item.</td>
        <td>
            <pre>
$('.jcarousel li').bind('itemvisibleout.jcarousel', function(event, carousel) {
    // This is no longer a visible item
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>itemfullyvisiblein.jcarousel</td>
        <td>Triggered when the item becomes a fully visible item.</td>
        <td>
            <pre>
$('.jcarousel li').bind('itemfullyvisiblein.jcarousel', function(event, carousel) {
    // This is now a fully visible item
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>itemfullyvisibleout.jcarousel</td>
        <td>Triggered when the item is no longer a fully visible item.</td>
        <td>
            <pre>
$('.jcarousel li').bind('itemfullyvisibleout.jcarousel', function(event, carousel) {
    // This is no longer a fully visible item
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
</table>

Credits
-------

jCarousel is written on top of [jQuery](http://jquery.com) and was originally inspired by the [Carousel Component](http://billwscott.com/carousel/) by [Bill Scott](http://looksgoodworkswell.com).

License
-------

Copyright (c) 2012 Jan Sorgalla.
Licensed under the MIT, GPL licenses.
