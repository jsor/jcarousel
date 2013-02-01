API
===

The plugin exposes the following methods:

.. _control.reference.api.reload:

``.jcarouselControl('reload' [, options])``
    Reloads the plugin. This method is useful to reinitialize the plugin or if
    you want to change options at runtime.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel-control').jcarouselControl('reload', {
            'interval': 1500
        });

.. _control.reference.api.destroy:

``.jcarouselControl('destroy')``
    Removes the control functionality completely. This will return the
    element back to its initial state.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel-control').jcarouselControl('destroy');
