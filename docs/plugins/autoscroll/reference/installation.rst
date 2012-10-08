Installation
============

The plugin provides autoscrolling support for carousels.

To setup the plugin, add the following code to your HTML document:

.. code-block:: html

    <script type="text/javascript">
    $(function() {
        $('.jcarousel')
            .jcarousel({
                // Core configuration goes here
            })
            .jcarouselAutoscroll({
                // Plugin configuration goes here
            });
    });
    </script>
