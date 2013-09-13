Events
======

After initialization, jCarousel triggers the following events on the root
and the items elements of the carousel:

* [Root element events](#root-element-events)
  * [create](#create)
  * [createend](#createend)
  * [reload](#reload)
  * [reloadend](#reloadend)
  * [destroy](#destroy)
  * [destroyend](#destroyend)
  * [scroll](#scroll)
  * [scrollend](#scrollend)
  * [animate](#animate)
  * [animateend](#animateend)
* [Item element events](#item-element-events)
  * [itemtargetin](#itemtargetin)
  * [itemtargetout](#itemtargetout)
  * [itemfirstin](#itemfirstin)
  * [itemfirstout](#itemfirstout)
  * [itemlastin](#itemlastin)
  * [itemlastout](#itemlastout)
  * [itemvisiblein](#itemvisiblein)
  * [itemvisibleout](#itemvisibleout)
  * [itemfullyvisiblein](#itemfullyvisiblein)
  * [itemfullyvisibleout](#itemfullyvisibleout)

**Note**: Some events are triggered from the constructor, so you have to bind
to the events **before** you initialize the plugin:

```javascript
$('.jcarousel')

    // Bind first
    .on('create.jcarousel', function(event, carousel) {
        // Do something
    })

    // Initialize at last step
    .jcarousel();
```

Root element events
===================

These events are triggered on the root element.


create
------

Triggered on creation of the carousel.

### Example

```javascript
$('.jcarousel').on('create.jcarousel', function(event, carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});
```


createend
---------

Triggered after creation of the carousel.

### Example

```javascript
$('.jcarousel').on('createend.jcarousel', function(event, carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});
```


reload
------

Triggered when the ``reload`` method is called.

### Example

```javascript
$('.jcarousel').on('reload.jcarousel', function(event, carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});
```


reloadend
---------

Triggered after the ``reload`` method is called.

### Example

```javascript
$('.jcarousel').on('reloadend.jcarousel', function(event, carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});
```


destroy
----------
Triggered when the ``destroy`` method is called.

### Example

```javascript
$('.jcarousel').on('destroy.jcarousel', function(event, carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});
```


destroyend
----------

Triggered after the ``destroy`` method is called.

### Example

```javascript
$('.jcarousel').on('destroyend.jcarousel', function(event, carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});
```


scroll
------

Triggered when the ``scroll`` method is called.

### Example

```javascript
$('.jcarousel').on('scroll.jcarousel', function(event, carousel, target, animate) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
    // "target" is the target argument passed to the `scroll` method
    // "animate" is the animate argument passed to the `scroll` method
    //      indicating whether jCarousel was requested to do an animation
});
```


scrollend
---------

Triggered after the ``scroll`` method is called.

**Note**: This method is triggered at the end of the scroll method and **not**
when the animation is finished.

### Example

```javascript
$('.jcarousel').on('scrollend.jcarousel', function(event, carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});
```


animate
-------

Triggered when the carousel starts a animation.

### Example

```javascript
$('.jcarousel').on('animate.jcarousel', function(event, carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});
```


animateend
----------

Triggered after the carousel has finished a animation.

### Example

```javascript
$('.jcarousel').on('animateend.jcarousel', function(event, carousel) {
    // "this" refers to the root element
    // "carousel" is the jCarousel instance
});
```


Item element events
===================

These events are triggered on the item elements. The recommended way is to bind
via delegated events:

```javascript
$('.jcarousel').on('itemtargetin.jcarousel', 'li', function() {
    $(this).addClass('active');
});
```


itemtargetin
------------

Triggered when the item becomes the targeted item.

### Example

```javascript
$('.jcarousel').on('itemtargetin.jcarousel', 'li', function(event, carousel) {
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});
```


itemtargetout
-------------

Triggered when the item is no longer the targeted item.

### Example

```javascript
$('.jcarousel').on('itemtargetout.jcarousel', 'li', function(event, carousel) {
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});
```


itemfirstin
-----------

Triggered when the item becomes the first visible item.

### Example

```javascript
$('.jcarousel').on('itemfirstin.jcarousel', 'li', function(event, carousel) {
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});
```


itemfirstout
------------

Triggered when the item is no longer the first visible item.

### Example

```javascript
$('.jcarousel').on('itemfirstout.jcarousel', 'li', function(event, carousel) {
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});
```


itemlastin
----------

Triggered when the item becomes the last visible item.

### Example

```javascript
$('.jcarousel').on('itemlastin.jcarousel', 'li', function(event, carousel) {
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});
```


itemlastout
-----------

Triggered when the item is no longer the last visible item.

### Example

```javascript
$('.jcarousel').on('itemlastout.jcarousel', 'li', function(event, carousel) {
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});
```


itemvisiblein
-------------

Triggered when the item becomes a visible item.

### Example

```javascript
$('.jcarousel').on('itemvisiblein.jcarousel', 'li', function(event, carousel) {
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});
```

itemvisibleout
--------------

Triggered when the item is no longer a visible item.

### Example

```javascript
$('.jcarousel').on('itemvisibleout.jcarousel', 'li', function(event, carousel) {
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});
```


itemfullyvisiblein
------------------

Triggered when the item becomes a fully visible item.

### Example

```javascript
$('.jcarousel').on('itemfullyvisiblein.jcarousel', 'li', function(event, carousel) {
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});
```


itemfullyvisibleout
-------------------

Triggered when the item is no longer a fully visible item.

### Example

```javascript
$('.jcarousel').on('itemfullyvisibleout.jcarousel', 'li', function(event, carousel) {
    // "this" refers to the item element
    // "carousel" is the jCarousel instance
});
```
