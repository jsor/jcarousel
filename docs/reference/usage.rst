Usage
=====

.. _reference.usage.navigating-the-carousel:

Navigating the carousel
-----------------------

jCarousel offers no built in controls to navigate through the carousel. But you
can simply implement navigation controls using the ``scroll`` method.

.. code-block:: javascript

    $('.jcarousel').jcarousel('scroll', target);

Available formats for the *target* argument
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

``index``
    Scrolls to the item at the given index (Note that indexes are 0-based).

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarousel('scroll', 0);

``-index``
    Scrolls to the item at the given index counting backwards from the end of
    the list.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarousel('scroll', -1);

``object``
    Scrolls to the given object.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarousel('scroll', $('.jcarousel li:eq(2)'));

``+=offset``
    Scrolls the carousel forward by the given offset relatively from the
    current position.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarousel('scroll', '+=1');

``-=offset``
    Scrolls the carousel backwards by the given offset relatively from the
    current position.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarousel('scroll', '-=1');

A simple example for previous and next controls:

.. code-block:: javascript

    $('.jcarousel-prev').click(function() {
        $('.jcarousel').jcarousel('scroll', '-=1');
    });

    $('.jcarousel-next').click(function() {
        $('.jcarousel').jcarousel('scroll', '+=1');
    });

A more comfortable way is to use a navigation plugins:

* jquery.jcarousel.control.js
* jquery.jcarousel.pagination.js

Defining the number of visible items
------------------------------------

You simply define the number of visible items by defining the width (or height
for a vertical carousel) of the root element (if you use the default from this
document, you do that with the class `.jcarousel` in your stylesheet).

This offers a lot of flexibility, because you can define the width in pixel for
a fixed carousel or in percent for a flexible carousel.

Fixed carousel, always 3 visible items:

.. code-block:: css

    .jcarousel {
        position: relative;
        overflow: hidden;
        width: 300px;
    }

    .jcarousel li {
        float: left;
        width: 100px;
    }

Flexible carousel, the number of visible items depend on the width of the
root's parent element:

.. code-block:: css

    .jcarousel {
        position: relative;
        overflow: hidden;
        width: 100%;
    }

    .jcarousel li {
        float: left;
        width: 100px;
    }

Vertical carousels
------------------

jCarousel tries to auto-detect the orientation by simply checking if the list
elements’s height is greater than the list element’s width.

If that doesn't work, you can explicitly pass the `vertical` option:

.. code-block:: javascript

    $('.jcarousel').jcarousel({
        vertical: true
    });

RTL (Right-To-Left) carousels
-----------------------------

jCarousel tries to auto-detect if the carousel should run in RTL mode by looking
for a ``dir`` attribute with the value ``rtl`` on the root or any of its parent
elements.

.. code-block:: html

    <div class="jcarousel" dir="rtl">
        <ul>
            <!-- The content goes in here -->
        </ul>
    </div>

.. hint::

    When running a carousel in RTL mode, you should ensure to float the items
    to the right:

    .. code-block:: css

        .jcarousel[dir=rtl] li {
            float: right;
        }

Alternatively, you can explicitly pass the ``rtl`` option:

.. code-block:: javascript

    $('.jcarousel').jcarousel({
        rtl: true
    });

Manipulating the carousel
-------------------------

If you manipulate the carousel from the outside (eg. adding or removing items
from the list), ensure that you call ``.jcarousel('reload')`` afterwards so
that jCarousel becomes aware of the changes:

.. code-block:: javascript

    $(function() {
        $('.jcarousel').jcarousel({
            // Configuration goes here
        });

        // Append items
        $('.jcarousel ul')
            .append('<li>Item 1</li>')
            .append('<li>Item 2</li>');

        // Reload carousel
        $('.jcarousel').jcarousel('reload');
    });

Existing items should only be manipulated, not completely replaced:

.. code-block:: javascript

    $(function() {
        // Don't do that
        $('.jcarousel li:eq(0)')
            .replaceWith('<li class="myclass">Item 1</li>');

        // Do this
        $('.jcarousel li:eq(0)')
            .addClass('myclass')
            .text('Item 1');
    });

If you are removing items, make sure they are currently not visible:

.. code-block:: javascript

    $(function() {
        var carousel = $('.jcarousel'),
            item = carousel.find('li:eq(0)');

        if (carousel.jcarousel('visible').index(items) < 0) {
            item.remove();
            carousel.jcarousel('reload');
        }
    });
