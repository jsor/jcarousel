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
                .bind(this.eventNames.mousedown, jCarousel.proxy(this._start, this))
                .bind(this.eventNames.mouseup, jCarousel.proxy(this._stop, this))
                .bind(this.eventNames.mousemove, jCarousel.proxy(this._move, this))
                .bind('mouseleave.' + this.pluginName, jCarousel.proxy(this._stop, this));
        },
        _start: function(e) {
            var carousel = this.carousel();

            carousel.list().stop(true, false);
            carousel.animating = false;

            this.started  = true;
            this.moved    = false;
            this.startPos = parseFloat(carousel.list().css(carousel.lt)) || 0;
            this.startX   = this._getX(e);
            this.startY   = this._getY(e);

            var width = 0,
                margin = 0,
                // Remove right/bottom margin from total width
                lrb = carousel.vertical ?
                          'bottom' :
                          (carousel.rtl ? 'left'  : 'right');

            carousel.items().each(function() {
                var el = $(this);
                width += carousel._dimension(el);
                margin = el.css('margin-' + lrb);
            });

            this.width = width - (parseFloat(margin) || 0);

            e.stopPropagation();
            e.preventDefault();

            return this;
        },
        _stop: function() {
            var moved = this.moved;

            this.started = this.moved = false;
            this.startPos = this.startX = this.startY = null;

            if (!moved) {
                return this;
            }

            var scrollNearest = function() {
                var self = this,
                    items = this.items(),
                    pos = this.list().position()[this.lt],
                    current = items.eq(0),
                    stop = false;

                if (this.rtl && !this.vertical) {
                    pos = (pos + this.list().width() - this._clipping()) * -1;
                }

                items.each(function() {
                    var el = $(this),
                        dim = self._dimension(el);

                    pos += dim;
                    current = el;

                    if (stop) {
                        return false;
                    }

                    if (pos >= 0) {
                        stop = true;
                    }
                });

                this.scroll(current);
            };

            var carousel = this.carousel();

            if (carousel.rtl && !carousel.vertical) {
                var right = parseFloat(carousel.list().css('right')) || 0;

                if (right > 0) {
                    carousel.scroll(0);
                } else if (!carousel.circular && right < -(this.width - carousel._clipping())) {
                    carousel.scroll(-1);
                } else {
                    scrollNearest.apply(carousel);
                }
            } else {
                var left = parseFloat(carousel.list().css(carousel.lt)) || 0;

                if (left > 0) {
                    carousel.scroll(0);
                } else if (!carousel.circular && left < -(this.width - carousel._clipping())) {
                    carousel.scroll(-1);
                } else {
                    scrollNearest.apply(carousel);
                }
            }

            return this;
        },
        _move: function(e) {
            if (!this.started) {
                return this;
            }

            this.moved = true;

            var carousel = this.carousel();

            var distance = carousel.vertical ?
                               this.startY - this._getY(e) :
                               this.startX - this._getX(e);

            carousel.list()
                .stop(true, false)
                .css(carousel.lt, Math.ceil(this.startPos - distance) + 'px');

            return this;
        },
        _getX: function(e) {
            return parseFloat(typeof e.pageX !== 'undefined' ? e.pageX : e.originalEvent.pageX) || 0;
        },
        _getY: function(e) {
            return parseFloat(typeof e.pageY !== 'undefined' ? e.pageY : e.originalEvent.pageY) || 0;
        }
    };
});
