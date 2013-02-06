Events
======

After initialization, the plugin triggers the following events on the element:

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

Pagination item events
----------------------

Since the plugins utilizes the :doc:`../../control/index` for controlling the
carousel, each pagination item receives events from the Control Plugin.

See the :doc:`Control Plugin Event<../../control/reference/events>`
documentation for a list of events.

You should use delegated events to attach event handler to the pagination items
since they are created and removed on the fly depending on your configuration.

**Example:**

.. code-block:: javascript

   $('.jcarousel-pagination')
       .on('active.jcarouselcontrol', 'a', function() {
           $(this).addClass('active');
       })
       .on('inactive.jcarouselcontrol', 'a', function() {
           $(this).removeClass('active');
       });
