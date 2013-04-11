Events
======

After initialization, the plugin triggers the following events on the root and
the item elements:

Root element events
-------------------

.. _pagination.reference.events.create:

``create.jcarouselpagination``
    Triggered on creation of the plugin.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel-pagination').on('create.jcarouselpagination', function() {
            // Do something
        });

.. _pagination.reference.events.createend:

``createend.jcarouselpagination``
    Triggered after creation of the plugin.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel-pagination').on('createend.jcarouselpagination', function() {
            // Do something
        });

.. _pagination.reference.events.reload:

``reload.jcarouselpagination``
    Triggered when the ``reload`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel-pagination').on('reload.jcarouselpagination', function() {
            // Do something
        });

.. _pagination.reference.events.reloadend:

``reloadend.jcarouselpagination``
    Triggered after the ``reload`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel-pagination').on('reloadend.jcarouselpagination', function() {
            // "this" refers to the element
        });

.. _pagination.reference.events.destroy:

``destroy.jcarouselpagination``
    Triggered when the ``destroy`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel-pagination').on('destroy.jcarouselpagination', function() {
            // Do something
        });

.. _pagination.reference.events.destroyend:

``destroyend.jcarouselpagination``
    Triggered after the ``destroy`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel-pagination').on('destroyend.jcarouselpagination', function() {
            // Do something
        });

Item element events
-------------------

``active.jcarouselpagination``
    Triggered when the item becomes active.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel-pagination').on('active.jcarouselpagination', 'a', function() {
            // Do something
        });

.. _control.reference.events.inactive:

``inactive.jcarouselpagination``
    Triggered when the item becomes inactive.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel-pagination').on('inactive.jcarouselpagination', 'a', function() {
            // Do something
        });

You should use delegated events to attach event handler to the pagination items
since they are created and removed on the fly depending on your configuration.

**Example:**

.. code-block:: javascript

   $('.jcarousel-pagination')
       .on('active.jcarouselpagination', 'a', function() {
           $(this).addClass('active');
       })
       .on('inactive.jcarouselpagination', 'a', function() {
           $(this).removeClass('active');
       });
