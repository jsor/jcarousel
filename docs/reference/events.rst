Events
======

After initialization, jCarousel triggers specific events on the root element
and the items of the carousel.

.. note::

    Some events like `create.jcarousel` are triggered from the constructor,
    so you have to bind the events **before** you initialize the carousel:

    .. code-block:: javascript

        $('.jcarousel')

            // Bind first
            .on('create.jcarousel', function(event, carousel) {
                // Do something
            })

            // Initialize at last step
            .jcarousel();

Available root element events
-----------------------------

``create.jcarousel``
    Triggered on creation of the carousel.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('create.jcarousel', function(event, carousel) {
            // "this" refers to the root element
            // "carousel" is the jCarousel instance
        });

``createend.jcarousel``
    Triggered after creation of the carousel.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('createend.jcarousel', function(event, carousel) {
            // "this" refers to the root element
            // "carousel" is the jCarousel instance
        });

``reload.jcarousel``
    Triggered when the ``reload`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('reload.jcarousel', function(event, carousel) {
            // "this" refers to the root element
            // "carousel" is the jCarousel instance
        });

``reloadend.jcarousel``
    Triggered after the ``reload`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('reloadend.jcarousel', function(event, carousel) {
            // "this" refers to the root element
            // "carousel" is the jCarousel instance
        });

``destroy.jcarousel``
    Triggered when the ``destroy`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('destroy.jcarousel', function(event, carousel) {
            // "this" refers to the root element
            // "carousel" is the jCarousel instance
        });

``destroyend.jcarousel``
    Triggered after the ``destroy`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('destroyend.jcarousel', function(event, carousel) {
            // "this" refers to the root element
            // "carousel" is the jCarousel instance
        });

``scroll.jcarousel``
    Triggered when the ``scroll`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('scroll.jcarousel', function(event, carousel, target, animate) {
            // "this" refers to the root element
            // "carousel" is the jCarousel instance
            // "target" is the target argument passed to the `scroll` method
            // "animate" is the animate argument passed to the `scroll` method 
            //      indicating whether jCarousel was requested to do an animation
        });

``scrollend.jcarousel``
    Triggered after the ``scroll`` method is called.

    .. note::

        This method is triggered at the end of the scroll method and **not**
        when the animation is finished.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('scrollend.jcarousel', function(event, carousel) {
            // "this" refers to the root element
            // "carousel" is the jCarousel instance
        });

``animate.jcarousel``
    Triggered when the carousel starts a animation.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('animate.jcarousel', function(event, carousel) {
            // "this" refers to the root element
            // "carousel" is the jCarousel instance
        });

``animateend.jcarousel``
    Triggered after the carousel has finished a animation.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('animateend.jcarousel', function(event, carousel) {
            // "this" refers to the root element
            // "carousel" is the jCarousel instance
        });

Available item element events
-----------------------------

``itemfirstin.jcarousel``
    Triggered when the item becomes the first visible item.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').delegate('li', 'itemfirstin.jcarousel', function(event, carousel) {
            // "this" refers to the item element
            // "carousel" is the jCarousel instance
        });

``itemfirstout.jcarousel``
    Triggered when the item is no longer the first visible item.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').delegate('li', 'itemfirstout.jcarousel', function(event, carousel) {
            // "this" refers to the item element
            // "carousel" is the jCarousel instance
        });

``itemlastin.jcarousel``
    Triggered when the item becomes the last visible item.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').delegate('li', 'itemlastin.jcarousel', function(event, carousel) {
            // "this" refers to the item element
            // "carousel" is the jCarousel instance
        });

``itemlastout.jcarousel``
    Triggered when the item is no longer the last visible item.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').delegate('li', 'itemlastout.jcarousel', function(event, carousel) {
            // "this" refers to the item element
            // "carousel" is the jCarousel instance
        });

``itemvisiblein.jcarousel``
    Triggered when the item becomes a visible item.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').delegate('li', 'itemvisiblein.jcarousel', function(event, carousel) {
            // "this" refers to the item element
            // "carousel" is the jCarousel instance
        });

``itemvisibleout.jcarousel``
    Triggered when the item is no longer a visible item.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').delegate('li', 'itemvisibleout.jcarousel', function(event, carousel) {
            // "this" refers to the item element
            // "carousel" is the jCarousel instance
        });

``itemfullyvisiblein.jcarousel``
    Triggered when the item becomes a fully visible item.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').delegate('li', 'itemfullyvisiblein.jcarousel', function(event, carousel) {
            // "this" refers to the item element
            // "carousel" is the jCarousel instance
        });

``itemfullyvisibleout.jcarousel``
    Triggered when the item is no longer a fully visible item.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').delegate('li', 'itemfullyvisibleout.jcarousel', function(event, carousel) {
            // "this" refers to the item element
            // "carousel" is the jCarousel instance
        });
