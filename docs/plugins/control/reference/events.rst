Events
======

After initialization, the plugin triggers the following events on the element:

.. note::

   This is how the plugin understands active and inactive states:

   If the ``target`` option is relative, ``+=1`` for example, the control is
   active if there is at least on more item to scroll, inactive otherwise (if
   you're at the last item in this case).

   If the ``target`` option is absolute, ``0`` for example (always scrolls to
   the first item), the control is active if the targeted item is at position 0,
   inactive otherwise.

.. _control.reference.events.active:

``active.jcarouselcontrol``
    Triggered when the control becomes active.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('active.jcarouselcontrol', function() {
            // Do something
        });

.. _control.reference.events.inactive:

``inactive.jcarouselcontrol``
    Triggered when the control becomes inactive.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('inactive.jcarouselcontrol', function() {
            // Do something
        });

.. _control.reference.events.create:

``create.jcarouselcontrol``
    Triggered on creation of the plugin.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('create.jcarouselcontrol', function() {
            // Do something
        });

.. _control.reference.events.createend:

``createend.jcarouselcontrol``
    Triggered after creation of the plugin.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('createend.jcarouselcontrol', function() {
            // Do something
        });

.. _control.reference.events.reload:

``reload.jcarouselcontrol``
    Triggered when the ``reload`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('reload.jcarouselcontrol', function() {
            // Do something
        });

.. _control.reference.events.reloadend:

``reloadend.jcarouselcontrol``
    Triggered after the ``reload`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('reloadend.jcarouselcontrol', function() {
            // "this" refers to the element
        });

.. _control.reference.events.destroy:

``destroy.jcarouselcontrol``
    Triggered when the ``destroy`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('destroy.jcarouselcontrol', function() {
            // Do something
        });

.. _control.reference.events.destroyend:

``destroyend.jcarouselcontrol``
    Triggered after the ``destroy`` method is called.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').on('destroyend.jcarouselcontrol', function() {
            // Do something
        });
