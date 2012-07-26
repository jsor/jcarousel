Configuration
=============

jCarousel accepts a list of options to control the behaviour of the carousel.

Available options
------------------

``list``
    A function or a jQuery selector to select the list inside the root element.

    A function will be called in the context of the carousel instance.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarousel({
            'list': '.jcarousel-list'
        });

    **Default:**

    .. code-block:: javascript

        function() {
            return this.element().children().eq(0);
        }

``items``
    A function or a jQuery selector to select the items inside the list element.

    A function will be called in the context of the carousel instance.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarousel({
            'items': '.jcarousel-item'
        });

    **Default:**

    .. code-block:: javascript

        function() {
            return this.list().children();
        }

``animation``
    The speed of the scroll animation as string in jQuery terms (``"slow"`` or
    ``"fast"``) or milliseconds as integer (See the documentation for
    `jQuery animate <http://api.jquery.com/animate>`_). If set to 0, animation
    is turned off.

    Alternatively, this can be a map of options like the one `jQuery.animate
    <http://api.jquery.com/animate/#animate-properties-options>`_
    accepts as second argument or a function.

    A function will be called in the context of the carousel instance and with
    2 arguments: The first is a hash of css properties (ie. ``{left: -400}``)
    and the second is a function which must be called as a callback.

    The function is then responsible for animating the list and executing the
    callback after the animation is finished.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarousel({
            'animation': 'slow'
        });

        $('.jcarousel').jcarousel({
            'animation': {
                    'duration': 800,
                    'easing':   'linear'
            }
        });

    **Default:**
        ``400``

``wrap``
    Specifies whether to wrap at the first or last item (or both) and jump back
    to the start/end. Options are ``"first"``, ``"last"``, ``"both"`` or
    ``"circular"`` as string.

    If set to null, wrapping is turned off (default).

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarousel({
            'wrap': 'both'
        });


    **Default:**
        ``null``

``vertical``
    Specifies whether the carousel appears in vertical orientation. Changes the
    carousel from a left/right style to a up/down style carousel.

    If set to ``null``, jCarousel tries to auto-detect the orientation by simply
    checking if the list's height is greater than the list's width.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarousel({
            'vertical': true
        });

    **Default:**
        ``null``

``rtl``
    Specifies wether the carousel appears in RTL (Right-To-Left) mode.

    If set to ``null``, jCarousel looks for ``dir="rtl"`` attribute on the root
    element (or to any of its parent elements) and if found, automatically sets
    rtl to true.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarousel({
            'rtl': true
        });

    **Example with dir attribute:**

    .. code-block:: html

        <div class="jcarousel" dir="rtl">
            <ul>
                <li>...</li>
            </ul>
        </div>

        <script>
        $('.jcarousel').jcarousel();
        </script>

    **Default:**
        ``null``

``center``
    Specifies wether the carousel should be centered inside the root element.

    .. warning::

        This feature is **experimental** and may not work with all setups.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarousel({
            'center': true
        });

    **Default:**
        ``false``
