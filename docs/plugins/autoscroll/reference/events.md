Events
======

After initialization, the plugin triggers the following events on the element:

* [create](#create)
* [createend](#createend)
* [reload](#reload)
* [reloadend](#reloadend)
* [destroy](#destroy)
* [destroyend](#destroyend)

**Note**: Some events are triggered from the constructor, so you have to bind
to the events **before** you initialize the plugin:

```javascript
$('.jcarousel')

    // Bind first
    .on('create.jcarouselautoscroll', function(event, carousel) {
        // Do something
    })

    // Initialize at last step
    .jcarouselAutoscroll();
```


create
------

Triggered on creation of the plugin.

### Example

```javascript
$('.jcarousel').on('create.jcarouselautoscroll', function() {
    // Do something
});
```


createend
---------

Triggered after creation of the plugin.

### Example

```javascript
$('.jcarousel').on('createend.jcarouselautoscroll', function() {
    // Do something
});
```


reload
------

Triggered when the `reload` method is called.

### Example

```javascript
$('.jcarousel').on('reload.jcarouselautoscroll', function() {
    // Do something
});
```


reloadend
---------

Triggered after the `reload` method is called.

### Example

```javascript
$('.jcarousel').on('reloadend.jcarouselautoscroll', function() {
    // "this" refers to the element
});
```


destroy
-------

Triggered when the `destroy` method is called.

### Example

```javascript
$('.jcarousel').on('destroy.jcarouselautoscroll', function() {
    // Do something
});
```


destroyend
----------

Triggered after the ``destroy`` method is called.

### Example

```javascript
$('.jcarousel').on('destroyend.jcarouselautoscroll', function() {
    // Do something
});
```
