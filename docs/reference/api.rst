API
===

jCarousel exposes the following methods:

.. seealso::

   :ref:`reference.usage.methods`
      Call methods on the jCarousel instance.

.. _reference.api.scroll:

``.jcarousel('scroll', target [, animate [, callback]])``
    Scrolls to a specific item or relative by a given offset (See section
    :ref:`reference.usage.navigating-the-carousel-target-formats` for more
    information about the target argument).

    If the argument ``animate`` is given and ``false``, it just jumps to the
    position without animation.

    If the argument ``callback`` is given and a valid function, it is called
    after the animation is finished.

    The function receives as first argument a boolean indicating if a scrolling
    actually happend.

    It can be false for the following reasons:

    * The carousel is already animating
    * The target argument is invalid
    * The carousel is already on the requested position
    * An event has cancelled the scrolling

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarousel('scroll', '+=1', true, function(scrolled) {
            if (scrolled) {
                console.log('The carousel has been scrolled');
            } else {
                console.log('The carousel has not been scrolled');
            }
        });

.. _reference.api.reload:

``.jcarousel('reload' [, options])``
    Reloads the carousel. This method is useful to reinitialize the carousel if
    you have changed the content of the list from the outside or want to change
    options that affect appearance of the carousel at runtime.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarousel('reload', {
            'animation': 'slow'
        });

.. _reference.api.destroy:

``.jcarousel('destroy')``
    Removes the jCarousel functionality completely. This will return the element
    back to its initial state.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarousel('destroy');

.. _reference.api.items:

``.jcarousel('items')``
    Returns all items as jQuery object.

    **Example:**

    .. code-block:: javascript

        var items = $('.jcarousel').jcarousel('items');

.. _reference.api.target:

``.jcarousel('target')``
    Returns the *targeted* item as jQuery object.

    **Example:**

    .. code-block:: javascript

        var target = $('.jcarousel').jcarousel('target');

.. _reference.api.first:

``.jcarousel('first')``
    Returns the *first visible* item as jQuery object.

    **Example:**

    .. code-block:: javascript

        var first = $('.jcarousel').jcarousel('first');

.. _reference.api.last:

``.jcarousel('last')``
    Returns the *last visible* item as jQuery object.

    **Example:**

    .. code-block:: javascript

        var last = $('.jcarousel').jcarousel('last');

.. _reference.api.visible:

``.jcarousel('visible')``
    Returns all *visible* items as jQuery object.

    **Example:**

    .. code-block:: javascript

        var visible = $('.jcarousel').jcarousel('visible');

.. _reference.api.fullyvisible:

``.jcarousel('fullyvisible')``
    Returns all *fully visible* items as jQuery object.

    **Example:**

    .. code-block:: javascript

        var fullyvisible = $('.jcarousel').jcarousel('fullyvisible');
