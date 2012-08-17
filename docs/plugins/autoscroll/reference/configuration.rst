Configuration
=============

The plugin accepts the following options:

.. _autoscroll.reference.configuration.target:

``target``
    The target for the autoscrolling. Accepts the same argument as the
    :ref:`scroll() <reference.api.scroll>` method.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarouselAutoscroll({
            'target': '+=3'
        });

    **Default:**
        ``+=1``

.. _autoscroll.reference.configuration.interval:

``interval``
    The autoscrolling interval in milliseconds.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarouselAutoscroll({
            'interval': 1000
        });

    **Default:**
        ``3000``

.. _autoscroll.reference.configuration.autostart:

``autostart``
    Whether to autostart autoscrolling.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarouselAutoscroll({
            'autostart': false
        });

    **Default:**
        ``true``
