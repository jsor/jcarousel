jCarousel - Riding carousels with jQuery
========================================

jCarousel is a jQuery plugin for controlling a list of items in horizontal or vertical order. The items, which can be static HTML content or loaded with (or without) AJAX, can be scrolled back and forth (with or without animation).

Getting started
---------------

To use the jCarousel component, include the [jQuery](http://jquery.com) library, the jCarousel source file and a jCarousel skin stylesheet file inside the `<head>` tag of your HTML document:

```html
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
<script type="text/javascript" src="/path/to/jquery.jcarousel.min.js"></script>
<link rel="stylesheet" type="text/css" href="/path/to/skin.css" />
```

jCarousel expects a very basic HTML markup structure inside your HTML document:

```html
<div id="mycarousel" class="jcarousel">
    <ul>
        <li>...</li>
        <li>...</li>
    </ul>
</div>
```

This document refers to the elements as _root element_, _list element_ and _item element(s)_:

```
<div id="mycarousel" class="jcarousel"> <------------------| Root element
    <ul> <--------------------------------| List element   |
        <li>...</li> <---| Item element   |                |
        <li>...</li> <---| Item element   |                |
    </ul> <-------------------------------|                |
</div> <---------------------------------------------------|
```

To setup jCarousel, add the following code inside the `<head>` tag of your HTML document:

```html
<script type="text/javascript">
$(function() {
    $('#mycarousel').jcarousel({
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

.jcarousel[dir=rtl] li {
    float: right;
}
```

Skinning jCarousel
------------------

**Note:** These are only conventions and nothing of it is _required_. You can adjust the class names or the whole handling of the skinning.

If you want to provide different skins for your carousel, setup with the following markup:

```html
<div class="jcarousel-skin-name">
    <div id="mycarousel" class="jcarousel">
        <ul>
            <li>...</li>
            <li>...</li>
        </ul>
    </div>
</div>
```

We simply surround the root element with a additional `<div class="jcarousel-skin-name">` to have a skin _namespace_. We can now style within this _namespace_:

```css
.jcarousel-skin-default .jcarousel {
    /* ... */
}

.jcarousel-skin-default .jcarousel ul {
    /* ... */
}

.jcarousel-skin-default .jcarousel li {
    /* ... */
}
```

The download package contains some example skin packages. Feel free to build your own skins based on it.

**Note: Skins will follow!**

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
        <td>string</td>
        <td>&quot;&gt;ul:eq(0)&quot;</td>
        <td>jQuery selector to select the list inside the root element.</td>
    </tr>
    <tr>
        <td>items</td>
        <td>string</td>
        <td>&quot;&gt;li&quot;</td>
        <td>jQuery selector to select the items inside the list element.</td>
    </tr>
    <tr>
        <td>animation</td>
        <td>integer|string|object</td>
        <td>&quot;normal&quot;</td>
        <td>The speed of the scroll animation as string in jQuery terms (<code>"slow"</code> or <code>"fast"</code>) or milliseconds as integer (See the <a href="http://api.jquery.com/animate">jQuery Documentation</a>). If set to 0, animation is turned off. Alternatively, this can be a map of options like the one <a href="http://api.jquery.com/animate/#animate-properties-options">jQuery.animate</a> accepts as second argument.</td>
    </tr>
    <tr>
        <td>wrap</td>
        <td>string</td>
        <td>null</td>
        <td>Specifies whether to wrap at the first/last item (or both) and jump back to the start/end. Options are <code>"first"</code>, <code>"last"</code>, <code>"both"</code> or <code>"circular"</code> as string. If set to null, wrapping is turned off (default).</td>
    </tr>
    <tr>
        <td>vertical</td>
        <td>boolean</td>
        <td>null</td>
        <td>Specifies whether the carousel appears in vertical orientation. Changes the carousel from a left/right style to a up/down style carousel. If not set, jCarousel looks for a class `jcarousel-vertical` on the root element and if found, automatically sets `vertical` to `true`.</td>
    </tr>
    <tr>
        <td>rtl</td>
        <td>boolean</td>
        <td>null</td>
        <td>Specifies wether the carousel appears in RTL (Right-To-Left) mode. If not set, jCarousel looks for `dir` attribute with a value of `rtl` on the root element (or to any of its parent elements) and if found, automatically sets `rtl` to `true`.</td>
    </tr>
    <tr>
        <td>center</td>
        <td>boolean</td>
        <td>false</td>
        <td>Specifies wether the carousel should be centered inside the root element. <strong>Note:</strong> This feature is experimental and may not work with all carousel setups.</td>
    </tr>
</table>

Navigating the carousel
-----------------------

By default, jCarousel offers no built in controls to navigate through the carousel. But you can simply implement navgiation controls using the `scroll` method.

```javascript
$('#mycarousel').jcarousel('scroll', target);
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
        <td><pre>$('#mycarousel').jcarousel('scroll', 0);</pre></td>
    </tr>
    <tr>
        <td>-index</td>
        <td>Scrolls to the item at the given index counting backwards from the last item.</td>
        <td><pre>$('#mycarousel').jcarousel('scroll', -1);</pre></td>
    </tr>
    <tr>
        <td>object</td>
        <td>Scrolls to the given DOM object.</td>
        <td><pre>$('#mycarousel').jcarousel('scroll', $('#mycarousel li:eq(2)').get(0));</pre></td>
    </tr>
    <tr>
        <td>+=offset</td>
        <td>Scrolls the carousel forward by the given offset relatively from the current position.</td>
        <td><pre>$('#mycarousel').jcarousel('scroll', '+=1');</pre></td>
    </tr>
    <tr>
        <td>-=offset</td>
        <td>Scrolls the carousel backwards by the given offset relatively from the current position.</td>
        <td><pre>$('#mycarousel').jcarousel('scroll', '-=1');</pre></td>
    </tr>
</table>

A simple example for previous and next controls:

```javascript
$('#mycarousel_prev_button').click(function() {
    $('#mycarousel').jcarousel('scroll', '-=1');
});

$('#mycarousel_next_button').click(function() {
    $('#mycarousel').jcarousel('scroll', '+=1');
});
```

A more comfortable way is to use one of the navigation plugins:

  * jquery.jcarousel.button.js
  * jquery.jcarousel.pagination.js

Defining the number of visible items
------------------------------------

Sometimes people are confused how to define the number of visible items because there is no option for this as they expect.

You simply define the number of visible items by defining the width (or height for a vertical carousel) of the element which surrounds the list (if you use the default from this document, you do that with the class `.jcarousel` in your skin stylesheet).

This offers a lot of flexibility, because you can define the width in pixel for a fixed carousel or in percent for a flexible carousel.

Vertical carousels
------------------

To create a vertical carousel, set the `vertical` option to `true`:

```javascript
$('#mycarousel').jcarousel({vertical: true});
```

Alternatively, you can simply use a class for your root element which contains the string `jcarousel-vertical`:

```html
<div class="jcarousel-skin-name">
    <div id="mycarousel" class="jcarousel-vertical">
        <ul>
            <!-- The content goes in here -->
        </ul>
    </div>
</div>
```

RTL (Right-To-Left) carousels
-----------------------------

To create a carousel in RTL mode, set the `rtl` option to `true`:

```javascript
$('#mycarousel').jcarousel({rtl: true});
```

Alternatively, you can simply add the `dir` attribute with a value of `rtl` to the root element (or to any of its parent elements):

```html
<div class="jcarousel-skin-name">
    <div id="mycarousel" class="jcarousel" dir="rtl">
        <ul>
            <!-- The content goes in here -->
        </ul>
    </div>
</div>
```

Accessing the jCarousel instance
--------------------------------

If you have created a carousel like:

```javascript
$(function() {
    $('#mycarousel').jcarousel();
});
```

You can later access the jCarousel instance with:

```javascript
var jcarousel = $('#mycarousel').data('jcarousel');

// Call a method
jcarousel.scroll('+=2');
```

Methods can be also called directly like this:

```javascript
$('#mycarousel').jcarousel('scroll', '+=2');
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
        <td>Removes the jCarousel functionality completely. This will return the element back to its pre-init state.</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('reload');</pre></td>
        <td>Reloads the carousel. This method is useful to reinitialize the carousel if you have changed the content of the list from the outside.</td>
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
        <td><pre>.jcarousel('option', name, [value]);</pre></td>
        <td>Get or set any jCarousel option. If no value is specified, will act as a getter.</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('option', options);</pre></td>
        <td>Set multiple jCarousel options at once by providing an options object.</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('option', callback);</pre></td>
        <td>Set multiple jCarousel options by passing a function which returns an options object. The function is executed in the context of the carousel instance.</td>
    </tr>
</table>

Manipulating the carousel
-------------------------

If you manipulate the carousel from the outside (eg. adding or removing items from the list), ensure that you call `reload()` afterwards so that jCarousel becomes aware of the changes:

```javascript
$(function() {
    $('#mycarousel').jcarousel({
        // Configuration goes here
    });

    // Append items
    $('#mycarousel ul')
        .append('<li>Item 1</li>')
        .append('<li>Item 2</li>');

    // Reload carousel
    $('#mycarousel').jcarousel('reload');
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
        <td>jcarouselinit</td>
        <td>Triggered on initialization of the carousel.</td>
        <td>
            <pre>
$('#mycarousel').bind('jcarouselinit', function(carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
        <tr>
        <td>jcarouselinitend</td>
        <td>Triggered after initialization of the carousel.</td>
        <td>
            <pre>
$('#mycarousel').bind('jcarouselinitend', function(carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>jcarouselreload</td>
        <td>Triggered when the <code>reload</code> method is called.</td>
        <td>
            <pre>
$('#mycarousel').bind('jcarouselreload', function(carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>jcarouselreloadend</td>
        <td>Triggered after the <code>reload</code> method is called.</td>
        <td>
            <pre>
$('#mycarousel').bind('jcarouselreload', function(carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>jcarouseldestroy</td>
        <td>Triggered when the <code>destroy</code> method is called.</td>
        <td>
            <pre>
$('#mycarousel').bind('jcarouseldestroy', function(carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>jcarouseldestroyend</td>
        <td>Triggered after the <code>destroy</code> method is called.</td>
        <td>
            <pre>
$('#mycarousel').bind('jcarouseldestroyend', function(carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>jcarouselscroll</td>
        <td>Triggered when the <code>scroll</code> method is called.</td>
        <td>
            <pre>
$('#mycarousel').bind('jcarouselscroll', function(carousel, target, animate) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
    // "target" is the target argument passed to the `scroll` method
    // "animate" is the animate argument passed to the `scroll` method indicating whether jCarousel was requested to do an animation
});</pre>
        </td>
    </tr>
    <tr>
        <td>jcarouselscrollend</td>
        <td>Triggered after the <code>scroll</code> method is called.</td>
        <td>
            <pre>
$('#mycarousel').bind('jcarouselscrollend', function(carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
    // "animated" is a boolean indicating whether jCarousel actually moved
});</pre>
        </td>
    </tr>
    <tr>
        <td>jcarouselanimate</td>
        <td>Triggered when jCarousel starts a animation.</td>
        <td>
            <pre>
$('#mycarousel').bind('jcarouselanimate', function(carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>jcarouselanimateend</td>
        <td>Triggered after jCarousel has finished a animation.</td>
        <td>
            <pre>
$('#mycarousel').bind('jcarouselanimateend', function(carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
</table>

**Note:** Some events like `jcarouselinit` are triggered from the constructor, so you have to bind the events **before** you initialize the carousel:

```javascript
$('#mycarousel')

    // Bind first
    .bind('jcarouselinit', function(carousel) {
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
        <td>jcarouselitemfirstin</td>
        <td>Triggered when the item becomes the first visible item.</td>
        <td>
            <pre>
$('#mycarousel li').bind('jcarouselitemfirstin', function(carousel) {
    // This is now the first visible item
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>jcarouselitemfirstout</td>
        <td>Triggered when the item is no longer the first visible item.</td>
        <td>
            <pre>
$('#mycarousel li').bind('jcarouselitemfirstout', function(carousel) {
    // This is no longer the first visible item
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>jcarouselitemlastin</td>
        <td>Triggered when the item becomes the last visible item.</td>
        <td>
            <pre>
$('#mycarousel li').bind('jcarouselitemlastin', function(carousel) {
    // This is now the last visible item
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>jcarouselitemlastout</td>
        <td>Triggered when the item is no longer the last visible item.</td>
        <td>
            <pre>
$('#mycarousel li').bind('jcarouselitemlastout', function(carousel) {
    // This is no longer the last visible item
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>jcarouselitemvisiblein</td>
        <td>Triggered when the item becomes a visible item.</td>
        <td>
            <pre>
$('#mycarousel li').bind('jcarouselitemvisiblein', function(carousel) {
    // This is now a visible item
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>jcarouselitemvisibleout</td>
        <td>Triggered when the item is no longer a visible item.</td>
        <td>
            <pre>
$('#mycarousel li').bind('jcarouselitemvisibleout', function(carousel) {
    // This is no longer a visible item
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>jcarouselitemfullyvisiblein</td>
        <td>Triggered when the item becomes a fully visible item.</td>
        <td>
            <pre>
$('#mycarousel li').bind('jcarouselitemfullyvisiblein', function(carousel) {
    // This is now a fully visible item
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
    <tr>
        <td>jcarouselitemfullyvisibleout</td>
        <td>Triggered when the item is no longer a fully visible item.</td>
        <td>
            <pre>
$('#mycarousel li').bind('jcarouselitemfullyvisibleout', function(carousel) {
    // This is no longer a fully visible item
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});</pre>
        </td>
    </tr>
</table>

jCarousel specific selectors
----------------------------

After initialization, you can use jCarousel specific selectors on the root element and on the items of the carousel.

### Available root element selectors are:

<table>
    <tr>
        <th>Selector</th>
        <th>Description</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>:jcarousel</td>
        <td>Selects elements which have a initialized jcarousel instance applied.</td>
        <td><pre>$(':jcarousel');</pre></td>
    </tr>
</table>

### Available item selectors are:

<table>
    <tr>
        <th>Selector</th>
        <th>Description</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>:jcarousel-item-first</td>
        <td>Selects the first visible element.</td>
        <td><pre>$('#mycarousel :jcarousel-item-first');</pre></td>
    </tr>
    <tr>
        <td>:jcarousel-item-last</td>
        <td>Selects the last visible element.</td>
        <td><pre>$('#mycarousel :jcarousel-item-last');</pre></td>
    </tr>
    <tr>
        <td>:jcarousel-item-visible</td>
        <td>Selects all visible elements.</td>
        <td><pre>$('#mycarousel :jcarousel-item-visible');</pre></td>
    </tr>
    <tr>
        <td>:jcarousel-item-fullyvisible</td>
        <td>Selects all fully visible elements.</td>
        <td><pre>$('#mycarousel :jcarousel-item-fullyvisible');</pre></td>
    </tr>
</table>

Credits
-------

jCarousel is written on top of [jQuery](http://jquery.com) and is inspired by the [Carousel Component](http://billwscott.com/carousel/) by [Bill Scott](http://looksgoodworkswell.com).
