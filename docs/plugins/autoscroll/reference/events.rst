Events
======

After initialization, the plugin triggers the following events on the element:

.. _autoscroll.reference.events.create:

``create.jcarouselautoscroll``
    Triggered on creation of the plugin.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('create.jcarouselautoscroll', function() {
            // Do something
        });

.. _autoscroll.reference.events.createend:

``createend.jcarouselautoscroll``
    Triggered after creation of the plugin.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('createend.jcarouselautoscroll', function() {
            // Do something
        });

.. _autoscroll.reference.events.reload:

``reload.jcarouselautoscroll``
    Triggered when the ``reload`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('reload.jcarouselautoscroll', function() {
            // Do something
        });

.. _autoscroll.reference.events.reloadend:

``reloadend.jcarouselautoscroll``
    Triggered after the ``reload`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('reloadend.jcarouselautoscroll', function() {
            // "this" refers to the element
        });

.. _autoscroll.reference.events.destroy:

``destroy.jcarouselautoscroll``
    Triggered when the ``destroy`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('destroy.jcarouselautoscroll', function() {
            // Do something
        });

.. _autoscroll.reference.events.destroyend:

``destroyend.jcarouselautoscroll``
    Triggered after the ``destroy`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('destroyend.jcarouselautoscroll', function() {
            // Do something
        });
