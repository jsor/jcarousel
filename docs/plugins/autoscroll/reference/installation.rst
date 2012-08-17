Installation
============

To use the jCarousel Autoscroll Plugin, include the source file right after the
jCarousel core file:

.. code-block:: html

    <script type="text/javascript"
            src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js">
    </script>
    <script type="text/javascript"
            src="/path/to/jquery.jcarousel.js">
    </script>
    <script type="text/javascript"
            src="/path/to/jquery.jcarousel.autoscroll.js">
    </script>

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
