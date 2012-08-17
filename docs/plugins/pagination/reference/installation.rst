Installation
============

To use the jCarousel Pagination Plugin, include the source file right after the
jCarousel core file:

.. code-block:: html

    <script type="text/javascript"
            src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js">
    </script>
    <script type="text/javascript"
            src="/path/to/jquery.jcarousel.js">
    </script>
        <script type="text/javascript"
            src="/path/to/jquery.jcarousel.control.js">
    </script>
    <script type="text/javascript"
            src="/path/to/jquery.jcarousel.pagination.js">
    </script>

.. note::

   The pagination plugin uses the :doc:`../../control/index`, so it must be
   included as well.

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

        <!-- Pagination -->
        <div class="jcarousel-pagination">
            <!-- Pagination items will be generated in here
        </div>
    </div>

To setup the plugin, add the following code to your HTML document:

.. code-block:: html

    <script type="text/javascript">
    $(function() {
        $('.jcarousel').jcarousel({
            // Core configuration goes here
        });

        $('.jcarousel-pagination').jcarouselPagination({
            // Configuration options
        });
    });
    </script>

As you can see, you setup the pagination independently from the carousel and the
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

    $('.jcarousel-prev').jcarouselPagination({
        carousel: carousel
    });
    </script>
