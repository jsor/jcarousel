jCarousel - Riding carousels with jQuery
========================================

jCarousel is a jQuery plugin for controlling a list of items in horizontal or vertical order. The items, which can be static HTML content or loaded with (or without) AJAX, can be scrolled back and forth (with or without animation).

Getting started
---------------

To use the jCarousel component, include the [jQuery](http://jquery.com) library, the jCarousel source file and a jCarousel skin stylesheet file inside the `<head>` tag of your HTML document:

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="/path/to/jquery.jcarousel.min.js"></script>
    <link rel="stylesheet" type="text/css" href="/path/to/skin.css" />

The download package contains some example skin packages. Feel free to build your own skins based on it.

**Note: skins will follow!**

jCarousel expects a very basic HTML markup structure inside your HTML document:

    <div class="jcarousel-skin-name">
        <div id="mycarousel" class="jcarousel">
            <ul>
                <!-- The content goes in here -->
            </ul>
        </div>
    </div>

To setup jCarousel, add the following code inside the `<head>` tag of your HTML document:

    <script type="text/javascript">
    $(function() {
        $('#mycarousel').jcarousel({
            // Configuration goes here
        });
    });
    </script>

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
        <td><pre>list</pre></td>
        <td>string</td>
        <td>>ul:eq(0)</td>
        <td>jQuery selector to select the list inside the root element.</td>
    </tr>
    <tr>
        <td><pre>items</pre></td>
        <td>string</td>
        <td>>li</td>
        <td>jQuery selector to select the items inside the list element.</td>
    </tr>
    <tr>
        <td><pre>start</pre></td>
        <td>integer</td>
        <td>0</td>
        <td>The index of the item to start with (0-based).</td>
    </tr>
    <tr>
        <td><pre>scroll</pre></td>
        <td>integer</td>
        <td>1</td>
        <td>The number of items to scroll by.</td>
    </tr>
    <tr>
        <td><pre>animation</pre></td>
        <td>mixed</td>
        <td>&quot;normal&quot;</td>
        <td>The speed of the scroll animation as string in jQuery terms (<code>"slow"</code> or <code>"fast"</code>) or milliseconds as integer (See the <a href="http://api.jquery.com/animate">jQuery Documentation</a>). If set to 0, animation is turned off.</td>
    </tr>
    <tr>
        <td><pre>easing</pre></td>
        <td>string</td>
        <td>&quot;swing&quot;</td>
        <td>The name of the easing effect that you want to use (See the <a href="http://api.jquery.com/animate#easing">jQuery Documentation</a>).</td>
    </tr>
    <tr>
        <td><pre>wrap</pre></td>
        <td>string</td>
        <td>null</td>
        <td>Specifies whether to wrap at the first/last item (or both) and jump back to the start/end. Options are <code>"first"</code>, <code>"last"</code>, <code>"both"</code> or <code>"circular"</code> as string. If set to null, wrapping is turned off (default).</td>
    </tr>
    <tr>
        <td><pre>prev</pre></td>
        <td>function</td>
        <td>function() {}</td>
        <td>JavaScript function that is called right after initialisation of the carousel. Two parameters are passed: The instance of the requesting carousel and the state of the carousel initialisation (init, reset or reload).</td>
    </tr>
</table>

Navigating the carousel
-----------------------

By default, jCarousel offers no built in way to navigate through the carousel (scroll prev, next or to a specific position).

You can do that by hand (see "Accessing the jCarousel instance" for available methods) or use a plugin for that.

A simple example to navigate the carousel:

    $('#mycarousel_prev_button').click(function() {
        $('#mycarousel').jcarousel('prev');
    });

    $('#mycarousel_next_button').click(function() {
        $('#mycarousel').jcarousel('next');
    });

A more comfortable way is to use one of the navigation plugins:

  * jquery.jcarousel.buttons.js
  * jquery.jcarousel.pagination.js

**Note: Plugins will follow!**

Defining the number of visible items
------------------------------------

Sometimes people are confused how to define the number of visible items because there is no option for this as they expect.

You simply define the number of visible items by defining the width (or height) of the element which surrounds the list (if you use the default from this document, you do that with the class `.jcarousel` in your skin stylesheet).

This offers a lot of flexibility, because you can define the width in pixel for a fixed carousel or in percent for a flexible carousel.

Vertical carousels
------------------

To define a vertical carousel, simply use a class for your root element which contains the string `jcarousel-vertical`:

    <div class="jcarousel-skin-name">
        <div id="mycarousel" class="jcarousel-vertical">
            <ul>
                <!-- The content goes in here -->
            </ul>
        </div>
    </div>

Alternatively, you can set a [data attribute](http://api.jquery.com/data/) `jcarousel-vertical`:

    $('#mycarousel').data('jcarousel-vertical', true).jcarousel();

As of jQuery 1.4.3, you can also use HTML 5 `data-` attributes:

    <div class="jcarousel-skin-name">
        <div id="mycarousel" data-jcarousel-vertical="true" class="jcarousel">
            <ul>
                <!-- The content goes in here -->
            </ul>
        </div>
    </div>

RTL (Right-To-Left) carousels
-----------------------------

To define a carousel in RTL mode, simply add the `dir` attribute with a value of `rtl` to the root element (or to any of its parent elements):

    <div class="jcarousel-skin-name">
        <div id="mycarousel" class="jcarousel" dir="rtl">
            <ul>
                <!-- The content goes in here -->
            </ul>
        </div>
    </div>

Accessing the jCarousel instance
--------------------------------

The instance of the carousel will be stored with the `data()` method of jQuery under the key `jcarousel` for a simple access.

If you have created a carousel like:

    $(function() {
        $('#mycarousel').jcarousel();
    });

You can access the instance with:

    var carousel = $('#mycarousel').data('jcarousel');

You can also access methods of the instance directly, for example the `append()` method:

    $('#mycarousel').jcarousel('append', '<li><!-- Item content --></li>');

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
        <td><pre>.jcarousel('size');</pre></td>
        <td>Returns the number of items of the carousel.</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('get' [, index]);</pre></td>
        <td>Returns the item at the given index as jQuery object. If the index argument is ommitted, it returns all items.</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('index', item);</pre></td>
        <td>Returns the index of the given item.</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('remove', item_or_index);</pre></td>
        <td>Removes the item (or the item at the given index) from the list.</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('next' [, callback]);</pre></td>
        <td>Triggers a next scroll on the carousel. If <code>callback</code> is given and a valid callback, it is triggered after the animation is finished.</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('prev' [, callback]);</pre></td>
        <td>Triggers a prev scroll on the carousel. If <code>callback</code> is given and a valid callback, it is triggered after the animation is finished.</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('scroll', item_or_index [, animate [, callback]]);</pre></td>
        <td>Scrolls to a given item or index. If the argument <code>animate</code> is given and <code>false</code>, it just jumps to the position without animation. If <code>callback</code> is given and a valid callback, it is triggered after the animation is finished.</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('after', element, item_or_index);</pre></td>
        <td>Inserts a new element after the given item (or index).</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('before', element, item_or_index);</pre></td>
        <td>Inserts a new element before the given item (or index).</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('replaceWith', element, item_or_index);</pre></pre></td>
        <td>Replaces the given item (or index) with a new element.</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('append', element);</pre></td>
        <td>Appends a new element to the list.</td>
    </tr>
    <tr>
        <td><pre>.jcarousel('prepend', element);</pre></td>
        <td>Prepends a new element to the list.</td>
    </tr>
</table>

jCarousel specific events
-------------------------

After initialization, jCarousel triggers specific events on the root element and the items of the carousel:

### Available element events are:

<table>
    <tr>
        <th>Event</th>
        <th>Description</th>
        <th>Example</th>
    </tr>
    <tr>
        <td><pre>jcarouselsetup</pre></td>
        <td>Triggered when the <code>setup</code> method is called.</td>
        <td>
            <pre>
$('#mycarousel').bind('jcarouselsetup', function() {
    // this refers to the root element
    var carousel = $(this).data('jcarousel');
});</pre>
        </td>
    </tr>
    <tr>
        <td><pre>jcarouselreload</pre></td>
        <td>Triggered when the <code>reload</code> method is called.</td>
        <td>
            <pre>
$('#mycarousel').bind('jcarouselreload', function() {
    // this refers to the root element
    var carousel = $(this).data('jcarousel');
});</pre>
        </td>
    </tr>
    <tr>
        <td><pre>jcarouseldestroy</pre></td>
        <td>Triggered when the <code>destroy</code> method is called.</td>
        <td>
            <pre>
$('#mycarousel').bind('jcarouseldestroy', function() {
    // this refers to the root element
    var carousel = $(this).data('jcarousel');
});</pre>
        </td>
    </tr>
    <tr>
        <td><pre>jcarouselprev</pre></td>
        <td>Triggered when the <code>prev</code> method is called.</td>
        <td>
            <pre>
$('#mycarousel').bind('jcarouselprev', function() {
    // this refers to the root element
    var carousel = $(this).data('jcarousel');
});</pre>
        </td>
    </tr>
    <tr>
        <td><pre>jcarouselnext</pre></td>
        <td>Triggered when the <code>next</code> method is called.</td>
        <td>
            <pre>
$('#mycarousel').bind('jcarouselnext', function() {
    // this refers to the root element
    var carousel = $(this).data('jcarousel');
});</pre>
        </td>
    </tr>
    <tr>
        <td><pre>jcarouselscroll</pre></td>
        <td>Triggered when the <code>scroll</code> method is called.</td>
        <td>
            <pre>
$('#mycarousel').bind('jcarouselscroll', function() {
    // this refers to the root element
    var carousel = $(this).data('jcarousel');
});</pre>
        </td>
    </tr>
</table>

### Available item events are:

<table>
    <tr>
        <th>Event</th>
        <th>Description</th>
        <th>Example</th>
    </tr>
    <tr>
        <td><pre>jcarouselitemfirstin</pre></td>
        <td>Triggered when the item becomes the first visible item.</td>
        <td>
            <pre>
$('#mycarousel li').bind('jcarouselitemfirstin', function() {
    // this is now the first visible item
});</pre>
        </td>
    </tr>
    <tr>
        <td><pre>jcarouselitemfirstout</pre></td>
        <td>Triggered when the item is no longer the first visible item.</td>
        <td>
            <pre>
$('#mycarousel li').bind('jcarouselitemfirstout', function() {
    // this is no longer the first visible item
});</pre>
        </td>
    </tr>
    <tr>
        <td><pre>jcarouselitemlastin</pre></td>
        <td>Triggered when the item becomes the last visible item.</td>
        <td>
            <pre>
$('#mycarousel li').bind('jcarouselitemlastin', function() {
    // this is now the last visible item
});</pre>
        </td>
    </tr>
    <tr>
        <td><pre>jcarouselitemlastout</pre></td>
        <td>Triggered when the item is no longer the last visible item.</td>
        <td>
            <pre>
$('#mycarousel li').bind('jcarouselitemlastout', function() {
    // this is no longer the last visible item
});</pre>
        </td>
    </tr>
    <tr>
        <td><pre>jcarouselitemvisiblein</pre></td>
        <td>Triggered when the item becomes a visible item.</td>
        <td>
            <pre>
$('#mycarousel li').bind('jcarouselitemvisiblein', function() {
    // this is now a visible item
});</pre>
        </td>
    </tr>
    <tr>
        <td><pre>jcarouselitemvisibleout</pre></td>
        <td>Triggered when the item is no longer a visible item.</td>
        <td>
            <pre>
$('#mycarousel li').bind('jcarouselitemvisibleout', function() {
    // this is no longer a visible item
});</pre>
        </td>
    </tr>
</table>

jCarousel specific selectors
----------------------------

After initialization, you can use jCarousel specific selectors on the root element and on the items of the carousel:

### Available element selectors are:

<table>
    <tr>
        <th>Selector</th>
        <th>Description</th>
        <th>Example</th>
    </tr>
    <tr>
        <td><pre>:jcarousel</pre></td>
        <td>Selects elements which have a initialized jcarousel instance applied.</td>
        <td><pre>$('div:jcarousel');</pre></td>
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
        <td><pre>:jcarouselitemfirst</pre></td>
        <td>Selects the first visible element.</td>
        <td><pre>$('#mycarousel li:jcarouselitemfirst');</pre></td>
    </tr>
    <tr>
        <td><pre>:jcarouselitemlast</pre></td>
        <td>Selects the last visible element.</td>
        <td><pre>$('#mycarousel li:jcarouselitemlast');</pre></td>
    </tr>
    <tr>
        <td><pre>:jcarouselitemvisible</pre></td>
        <td>Selects all visible elements.</td>
        <td><pre>$('#mycarousel li:jcarouselitemvisible');</pre></td>
    </tr>
</table>

Credits
-------

jCarousel is written on top of [jQuery](http://jquery.com) and is inspired by the [Carousel Component](http://billwscott.com/carousel/) by [Bill Scott](http://looksgoodworkswell.com).
