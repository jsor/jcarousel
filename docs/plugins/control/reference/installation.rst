Installation
============

A control is basically a HTML element (``<a>``, ``<button>`` etc.) which scrolls
the carousel when clicking on it.

A simple basic HTML markup structure would be:

.. code-block:: html

    <!-- Wrapper -->
    <div>
        <!-- Carousel -->
        <div class="jcarousel">
            <ul>
                <li>...</li>
                <li>...</li>
            </ul>
        </div>

        <!-- Controls -->
        <a class="jcarousel-prev" href="#">Prev</a>
        <a class="jcarousel-next" href="#">Next</a>
    </div>

To setup the plugin, add the following code to your HTML document:

.. code-block:: html

    <script type="text/javascript">
    $(function() {
        $('.jcarousel').jcarousel({
            // Core configuration goes here
        });

        $('.jcarousel-prev').jcarouselControl({
            target: '-=1'
        });

        $('.jcarousel-next').jcarouselControl({
            target: '+=1'
        });
    });
    </script>

As you can see, you setup the controls independently from the carousel and the
plugin tries to autodetect the carousel.

This works best if you enclose the carousel and its controls inside a mutual
wrapper element.

If that fails or isn't possible, you can pass the related carousel instance as
an option:

.. code-block:: html

    <script type="text/javascript">
    var carousel = $('.jcarousel').jcarousel({
        // Core configuration goes here
    });

    $('.jcarousel-prev').jcarouselControl({
        target: '-=1',
        carousel: carousel
    });
    </script>
