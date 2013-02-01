API
===

The plugin exposes the following methods:

.. _pagination.reference.api.reload:

``.jcarouselPagination('reload' [, options])``
    Reloads the plugin. This method is useful to reinitialize the plugin or if
    you want to change options at runtime.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel-pagination').jcarouselPagination('reload', {
            'interval': 1500
        });

.. _pagination.reference.api.destroy:

``.jcarouselPagination('destroy')``
    Removes the pagination functionality completely. This will return the
    element back to its initial state.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel-pagination').jcarouselPagination('destroy');
