API
===

The plugin exposes the following methods:

.. _autoscroll.reference.api.start:

``.jcarouselAutoscroll('start')``
    Starts the autoscrolling.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarouselAutoscroll('start');

.. _autoscroll.reference.api.stop:

``.jcarouselAutoscroll('stop')``
    Stops the autoscrolling.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarouselAutoscroll('stop');

.. _autoscroll.reference.api.reload:

``.jcarouselAutoscroll('reload' [, options])``
    Reloads the plugin. This method is useful to reinitialize the plugin or if
    you want to change options at runtime.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarouselAutoscroll('reload', {
            'interval': 1500
        });

.. _autoscroll.reference.api.destroy:

``.jcarouselAutoscroll('destroy')``
    Removes the autoscrolling functionality completely. This will return the
    element back to its initial state.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarouselAutoscroll('destroy');
