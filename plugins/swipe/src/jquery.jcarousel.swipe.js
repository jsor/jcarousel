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
jCarousel.plugin('swipe', function($) {
    var jCarousel = this;

    return {
        started:  false,
        moved:    false,
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

            carousel.list().stop(true, false);
            carousel.animating = false;

            this.started  = true;
            this.moved    = false;
            this.startPos = jCarousel.intval(carousel.list().css(carousel.lt));
            this.startX   = jCarousel.intval(typeof e.pageX !== 'undefined' ? e.pageX : e.originalEvent.pageX);
            this.startY   = jCarousel.intval(typeof e.pageY !== 'undefined' ? e.pageY : e.originalEvent.pageY);

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
            if (!this.moved) {
                return this;
            }

            var scrollNearest = function() {
                var self    = this,
                    items   = this.items(),
                    pos     = this.list().position()[this.lt],
                    current = items.eq(0),
                    stop    = false,
                    lrb     = this.vertical ? 'bottom' : (this.rtl ? 'left'  : 'right');

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
                        var limit = (dim / 2) + jCarousel.intval(el.css('margin-' + lrb));

                        if (Math.abs(pos) < limit) {
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
                var right = !carousel.circular ? jCarousel.intval(carousel.list().css('right')) : 0;

                if (right > 0) {
                    carousel.scroll(0);
                } else if (right < -(this.width - carousel._clipping())) {
                    carousel.scroll(-1);
                } else {
                    scrollNearest.apply(carousel);
                }
            } else {
                var left = !carousel.circular ? jCarousel.intval(carousel.list().css(carousel.lt)) : 0;

                if (left > 0) {
                    carousel.scroll(0);
                } else if (left < -(this.width - carousel._clipping())) {
                    carousel.scroll(-1);
                } else {
                    scrollNearest.apply(carousel);
                }
            }

            this.started = this.moved = false;
            this.startPos = this.startX = this.startY = null;

            return this;
        },
        _move: function(e) {
            if (!this.started) {
                return this;
            }

            this.moved = true;

            var carousel = this.carousel();

            var distance = carousel.vertical ?
                               this.startY - jCarousel.intval(typeof e.pageY !== 'undefined' ? e.pageY : e.originalEvent.pageY) :
                               this.startX - jCarousel.intval(typeof e.pageX !== 'undefined' ? e.pageX : e.originalEvent.pageX);

            carousel.list()
                .stop(true, false)
                .css(carousel.lt, Math.ceil(this.startPos - distance) + 'px');

            return this;
        }
    };
});
