Events
======

After initialization, jCarousel triggers the following events on the root
and the items elements of the carousel:

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

Root element events
-------------------

.. _reference.events.create:

``create.jcarousel``
    Triggered on creation of the carousel.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('create.jcarousel', function(event, carousel) {
            // "this" refers to the root element
            // "carousel" is the jCarousel instance
        });

.. _reference.events.createend:

``createend.jcarousel``
    Triggered after creation of the carousel.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('createend.jcarousel', function(event, carousel) {
            // "this" refers to the root element
            // "carousel" is the jCarousel instance
        });

.. _reference.events.reload:

``reload.jcarousel``
    Triggered when the ``reload`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('reload.jcarousel', function(event, carousel) {
            // "this" refers to the root element
            // "carousel" is the jCarousel instance
        });

.. _reference.events.reloadend:

``reloadend.jcarousel``
    Triggered after the ``reload`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('reloadend.jcarousel', function(event, carousel) {
            // "this" refers to the root element
            // "carousel" is the jCarousel instance
        });

.. _reference.events.destroy:

``destroy.jcarousel``
    Triggered when the ``destroy`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('destroy.jcarousel', function(event, carousel) {
            // "this" refers to the root element
            // "carousel" is the jCarousel instance
        });

.. _reference.events.destroyend:

``destroyend.jcarousel``
    Triggered after the ``destroy`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('destroyend.jcarousel', function(event, carousel) {
            // "this" refers to the root element
            // "carousel" is the jCarousel instance
        });

.. _reference.events.scroll:

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

.. _reference.events.scrollend:

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

.. _reference.events.animate:

``animate.jcarousel``
    Triggered when the carousel starts a animation.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('animate.jcarousel', function(event, carousel) {
            // "this" refers to the root element
            // "carousel" is the jCarousel instance
        });

.. _reference.events.animateend:

``animateend.jcarousel``
    Triggered after the carousel has finished a animation.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('animateend.jcarousel', function(event, carousel) {
            // "this" refers to the root element
            // "carousel" is the jCarousel instance
        });

Item element events
-------------------

.. _reference.events.itemtargetin:

``itemtargetin.jcarousel``
    Triggered when the item becomes the targeted item.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('itemtargetin.jcarousel', 'li', function(event, carousel) {
            // "this" refers to the item element
            // "carousel" is the jCarousel instance
        });

.. _reference.events.itemtargetout:

``itemtargetout.jcarousel``
    Triggered when the item is no longer the targeted item.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('itemtargetout.jcarousel', 'li', function(event, carousel) {
            // "this" refers to the item element
            // "carousel" is the jCarousel instance
        });

.. _reference.events.itemfirstin:

``itemfirstin.jcarousel``
    Triggered when the item becomes the first visible item.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('itemfirstin.jcarousel', 'li', function(event, carousel) {
            // "this" refers to the item element
            // "carousel" is the jCarousel instance
        });

.. _reference.events.itemfirstout:

``itemfirstout.jcarousel``
    Triggered when the item is no longer the first visible item.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('itemfirstout.jcarousel', 'li', function(event, carousel) {
            // "this" refers to the item element
            // "carousel" is the jCarousel instance
        });

.. _reference.events.itemlastin:

``itemlastin.jcarousel``
    Triggered when the item becomes the last visible item.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('itemlastin.jcarousel', 'li', function(event, carousel) {
            // "this" refers to the item element
            // "carousel" is the jCarousel instance
        });

.. _reference.events.itemlastout:

``itemlastout.jcarousel``
    Triggered when the item is no longer the last visible item.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('itemlastout.jcarousel', 'li', function(event, carousel) {
            // "this" refers to the item element
            // "carousel" is the jCarousel instance
        });

.. _reference.events.itemvisiblein:

``itemvisiblein.jcarousel``
    Triggered when the item becomes a visible item.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('itemvisiblein.jcarousel', 'li', function(event, carousel) {
            // "this" refers to the item element
            // "carousel" is the jCarousel instance
        });

.. _reference.events.itemvisibleout:

``itemvisibleout.jcarousel``
    Triggered when the item is no longer a visible item.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('itemvisibleout.jcarousel', 'li', function(event, carousel) {
            // "this" refers to the item element
            // "carousel" is the jCarousel instance
        });

.. _reference.events.itemfullyvisiblein:

``itemfullyvisiblein.jcarousel``
    Triggered when the item becomes a fully visible item.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('itemfullyvisiblein.jcarousel', 'li', function(event, carousel) {
            // "this" refers to the item element
            // "carousel" is the jCarousel instance
        });

.. _reference.events.itemfullyvisibleout:

``itemfullyvisibleout.jcarousel``
    Triggered when the item is no longer a fully visible item.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('itemfullyvisibleout.jcarousel', 'li', function(event, carousel) {
            // "this" refers to the item element
            // "carousel" is the jCarousel instance
        });
