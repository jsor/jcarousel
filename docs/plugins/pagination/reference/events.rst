Events
======

After initialization, the plugin triggers the following events on the element:

.. note::

   Since the plugins uses the :doc:`../../control/index`, each pagination item
   also receives :doc:`../../control/reference/events` from it.

.. _pagination.reference.events.create:

``create.jcarouselpagination``
    Triggered on creation of the plugin.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('create.jcarouselpagination', function() {
            // Do something
        });

.. _pagination.reference.events.createend:

``createend.jcarouselpagination``
    Triggered after creation of the plugin.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('createend.jcarouselpagination', function() {
            // Do something
        });

.. _pagination.reference.events.reload:

``reload.jcarouselpagination``
    Triggered when the ``reload`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('reload.jcarouselpagination', function() {
            // Do something
        });

.. _pagination.reference.events.reloadend:

``reloadend.jcarouselpagination``
    Triggered after the ``reload`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('reloadend.jcarouselpagination', function() {
            // "this" refers to the element
        });

.. _pagination.reference.events.destroy:

``destroy.jcarouselpagination``
    Triggered when the ``destroy`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('destroy.jcarouselpagination', function() {
            // Do something
        });

.. _pagination.reference.events.destroyend:

``destroyend.jcarouselpagination``
    Triggered after the ``destroy`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('destroyend.jcarouselpagination', function() {
            // Do something
        });
