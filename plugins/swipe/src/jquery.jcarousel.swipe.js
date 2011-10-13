/*!
 * jCarousel Swipe Plugin v@VERSION
 * http://sorgalla.com/jcarousel/
 *
 * Copyright 2011, Jan Sorgalla
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * or GPL Version 2 (http://www.opensource.org/licenses/gpl-2.0.php) licenses.
 *
 * Date: @DATE
 */
jCarousel(function(jCarousel, $) {
    jCarousel.plugin('swipe', {
        started:  false,
        startX:   null,
        startY:   null,
        startPos: null,
        width:    0,
        _init: function() {
            this.eventNames = {
                mousedown: ($.vmouse ? 'v' : '') + 'mousedown.' + this.pluginName,
                mousemove: ($.vmouse ? 'v' : '') + 'mousemove.' + this.pluginName,
                mouseup:   ($.vmouse ? 'v' : '') + 'mouseup.'   + this.pluginName
            };

            this.carousel().element()
                .bind(this.eventNames.mousedown, $.proxy(this._start, this))
                .bind(this.eventNames.mouseup, $.proxy(this._stop, this))
                .bind(this.eventNames.mousemove, $.proxy(this._move, this))
                .bind('mouseleave.' + this.pluginName, $.proxy(this._stop, this));
        },
        _start: function(e) {
            var carousel = this.carousel();

            this.started  = true;
            this.startPos = jCarousel.intval(carousel.list().css(carousel.lt));
            this.startX   = jCarousel.intval(e.pageX);
            this.startY   = jCarousel.intval(e.pageY);

            var width  = 0,
                margin = 0,
                // Remove right/bottom margin from total width
                lrb    = carousel.vertical ?
                             'bottom' :
                             (carousel.rtl ? 'left'  : 'right');

            carousel.items().each(function() {
                var el = $(this);
                width += carousel._dimension(el);
                margin = el.css('margin-' + lrb);
            });

            this.width = width - jCarousel.intval(margin);

            e.stopPropagation();
            e.preventDefault();

            return this;
        },
        _stop: function() {
            var scrollNearest = function() {
                var self    = this,
                    items   = this.items(),
                    pos     = this.list().position()[this.lt],
                    current = items.eq(0),
                    stop    = false;

                if (this.rtl && !this.vertical) {
                    pos = (pos + this.list().width() - this._clipping()) * -1;
                }

                items.each(function() {
                    var el  = $(this),
                        dim = self._dimension(el);

                    pos += dim;
                    current = el;

                    if (stop) {
                        return false;
                    }

                    if (pos >= 0) {
                        if (Math.abs(pos) < (dim / 2)) {
                            stop = true;
                        } else {
                            return false;
                        }
                    }
                });

                this.scroll(current);
            };

            var carousel = this.carousel();

            if (carousel.rtl && !carousel.vertical) {
                var right = jCarousel.intval(carousel.list().css('right'));

                if (right > 0) {
                    carousel.scroll(0);
                } else if (right < -(this.width - carousel._clipping())) {
                    carousel.scroll(-1);
                } else {
                    scrollNearest.apply(carousel);
                }
            } else {
                var left = jCarousel.intval(carousel.list().css(carousel.lt));

                if (left > 0) {
                    carousel.scroll(0);
                } else if (left < -(this.width - carousel._clipping())) {
                    carousel.scroll(-1);
                } else {
                    scrollNearest.apply(carousel);
                }
            }

            this.started = false;
            this.startPos = this.startX = this.startY = null;

            return this;
        },
        _move: function(e) {
            if (!this.started) {
                return this;
            }

            var carousel = this.carousel();

            var distance = carousel.vertical ?
                               this.startY - jCarousel.intval(e.pageY) :
                               this.startX - jCarousel.intval(e.pageX);

            carousel.list()
                .stop(true, false)
                .css(carousel.lt, Math.ceil(this.startPos - distance) + 'px');

            return this;
        }
    });

});
