Configuration
=============

The plugin accepts the following options:

.. _control.reference.configuration.target:

``target``
    The target for the control. Accepts the same argument as the
    :ref:`scroll() <reference.api.scroll>` method.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarouselControl({
            'target': '+=3'
        });

    **Default:**
        ``+=1``

.. _control.reference.configuration.interval:

``event``
    The event which triggers the control.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarouselControl({
            'event': 'mouseover'
        });

    **Default:**
        ``click``
