Configuration
=============

jCarousel accepts the following options:

.. seealso::

   :ref:`reference.installation.setup`
      Set configuration options on initialization.

   :ref:`reload method <reference.api.reload>`
      Set configuration options at runtime.

.. _reference.configuration.list:

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

.. _reference.configuration.items:

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

.. _reference.configuration.animation:

``animation``
    The speed of the scroll animation as string in jQuery terms (``"slow"`` or
    ``"fast"``) or milliseconds as integer (See the documentation for
    `jQuery animate <http://api.jquery.com/animate>`_).

    Alternatively, this can be a map of options like the one `jQuery.animate
    <http://api.jquery.com/animate/#animate-properties-options>`_
    accepts as second argument.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarousel({
            'animation': 'slow'
        });

        $('.jcarousel').jcarousel({
            'animation': {
                'duration': 800,
                'easing':   'linear',
                'complete': function() {
                }
            }
        });

    **Default:**
        ``400``

.. _reference.configuration.transitions:

``transitions``
    If set to `true`, CSS3 transitions are used for animations.

    Alternatively, this can be a map of the following options:

    ``transforms``:   If set to `true`, 2D transforms are used for better hardware acceleration.

    ``transforms3d``: If set to `true`, 3D transforms are used for full hardware acceleration.

    ``easing``:       Value will be used as the `transition-timing-function <https://developer.mozilla.org/en-US/docs/CSS/transition-timing-function>`_ (e.g. `ease` or `linear`).

    .. warning::

       jCarousel does **not** check if the user's browser supports transitions
       and/or transforms. You have to do that yourself when setting the option.

       You can for example use `Modernizr <http://modernizr.com>`_ for browser
       feature detection.
       If you're not including it already in your site, you can use this
       `minimal build <http://modernizr.com/download/#-csstransforms-csstransforms3d-csstransitions-teststyles-testprop-testallprops-prefixes-domprefixes>`_.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarousel({
            'transitions': true
        });

        $('.jcarousel').jcarousel({
            transitions: Modernizr.csstransitions ? {
                transforms:   Modernizr.csstransforms,
                transforms3d: Modernizr.csstransforms3d,
                easing:       'ease'
            } : false
        });

    **Default:**
        ``false``

.. _reference.configuration.wrap:

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

.. _reference.configuration.vertical:

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

.. _reference.configuration.rtl:

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

.. _reference.configuration.center:

``center``
    Specifies wether the targeted item should be centered inside the root element.

    .. warning::

        This feature is **experimental** and may not work with all setups.

    **Example:**

    .. code-block:: javascript

        $('.jcarousel').jcarousel({
            'center': true
        });

    **Default:**
        ``false``
