ScrollIntoView Plugin
=====================

The jCarousel ScrollIntoView Plugin extends the jCarousel core by a
``scrollIntoView`` method.

Calling the method ensures that the passed target is fully visible inside the
carousel.

API
___

The plugin exposes the following method:

.. _scrollintoview.reference.api.scrollintoview:

``.jcarousel('scrollIntoView', target [, animate [, callback]])``
    The arguments is similar to the :ref:`scroll() <reference.api.scroll>`
    method with the difference that the target argument does **not** allow
    relative targets.

    If the targeted item is currently not fully visible, it will be the first or
    last fully visible item after calling the method.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarouselControl('scrollIntoView', 2, true, function(scrolled) {
            if (scrolled) {
                console.log('The carousel has been scrolled');
            } else {
                console.log('The carousel has not been scrolled');
            }
        });
