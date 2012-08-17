Installation
============

To use the jCarousel component, include the `jQuery <http://jquery.com>`_
library and the jCarousel source file into your HTML document:

.. code-block:: html

    <script type="text/javascript"
            src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js">
    </script>
    <script type="text/javascript"
            src="/path/to/jquery.jcarousel.js">
    </script>

jCarousel expects a very basic HTML markup structure inside your HTML document:

.. code-block:: html

    <div class="jcarousel">
        <ul>
            <li>...</li>
            <li>...</li>
        </ul>
    </div>

.. note::

    The documentation refers to the elements as **root** element, **list**
    element and **item** element(s):

    .. code-block:: text

        <div class="jcarousel"> <--------------------------------| Root element
            <ul> <-------------------------------| List element  |
                <li>...</li> <---| Item element  |               |
                <li>...</li> <---| Item element  |               |
            </ul> <------------------------------|               |
        </div> <-------------------------------------------------|

    This structure is only an example and not required. You could also use a
    structure like:

    .. code-block:: text

        <div class="mycarousel"> <-------------------------------| Root element
            <div> <------------------------------| List element  |
                <p>...</p> <-----| Item element  |               |
                <p>...</p> <-----| Item element  |               |
            </div> <-----------------------------|               |
        </div> <-------------------------------------------------|

    The only requirement is, that it consists of a root element, list element
    and item elements.

.. _reference.installation.setup:

Setup
-----

To setup jCarousel, add the following code to your HTML document:

.. code-block:: html

    <script type="text/javascript">
    $(function() {
        $('.jcarousel').jcarousel({
            // Configuration goes here
        });
    });
    </script>

See :doc:`configuration` for all available configuration options.

These are the minimal CSS settings for a horizontal carousel:

.. code-block:: css

    .jcarousel {
        position: relative;
        overflow: hidden;
    }

    .jcarousel ul {
        width: 20000em;
        position: absolute;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .jcarousel li {
        float: left;
    }
