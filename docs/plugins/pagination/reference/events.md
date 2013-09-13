Events
======

After initialization, the plugin triggers the following events on the root and
the item elements:

* [Root element events](#root-element-events)
  * [create](#create)
  * [createend](#createend)
  * [reload](#reload)
  * [reloadend](#reloadend)
  * [destroy](#destroy)
  * [destroyend](#destroyend)
* [Item element events](#item-element-events)
  * [active](#active)
  * [inactive](#inactive)

**Note**: Some events are triggered from the constructor, so you have to bind
to the events **before** you initialize the plugin:

```javascript
$('.jcarousel-pagination')

    // Bind first
    .on('create.jcarouselpagination', function(event, carousel) {
        // Do something
    })

    // Initialize at last step
    .jcarouselPagination();
```


Root element events
-------------------

These events are triggered on the root element.


create
------

Triggered on creation of the plugin.

### Example

```javascript
$('.jcarousel-pagination').on('create.jcarouselpagination', function() {
    // Do something
});
```


createend
---------

Triggered after creation of the plugin.

### Example

```javascript
$('.jcarousel-pagination').on('createend.jcarouselpagination', function() {
    // Do something
});
```


reload
------

Triggered when the `reload` method is called.

### Example

```javascript
$('.jcarousel-pagination').on('reload.jcarouselpagination', function() {
    // Do something
});
```


reloadend
---------

Triggered after the `reload` method is called.

### Example

```javascript
$('.jcarousel-pagination').on('reloadend.jcarouselpagination', function() {
    // "this" refers to the element
});
```


destroy
-------

Triggered when the `destroy` method is called.

### Example

```javascript
$('.jcarousel-pagination').on('destroy.jcarouselpagination', function() {
    // Do something
});
```


destroyend
----------

Triggered after the ``destroy`` method is called.

### Example

```javascript
$('.jcarousel-pagination').on('destroyend.jcarouselpagination', function() {
    // Do something
});
```


Item element events
-------------------

These events are triggered on the item elements. The recommended way is to bind
via delegated events:

```javascript
$('.jcarousel-pagination')
    .on('active.jcarouselpagination', 'a', function() {
        $(this).addClass('active');
    })
    .on('inactive.jcarouselpagination', 'a', function() {
        $(this).removeClass('active');
    });
```


active
------

Triggered when the item becomes active.

### Example

```javascript
$('.jcarousel-pagination').on('active.jcarouselpagination', 'a', function() {
    // Do something
});
```


inactive
--------

Triggered when the item becomes inactive.

### Example

```javascript
$('.jcarousel-pagination').on('inactive.jcarouselpagination', 'a', function() {
    // Do something
});
```
