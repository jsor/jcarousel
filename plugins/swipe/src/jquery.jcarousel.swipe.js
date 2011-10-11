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
(function($) {

    var $j = $.jcarousel;

    $j.create('swipe', {
        options:  {},
        instance: null,
        startX:   null,
        startY:   null,
        startPos: null,
        width:    0,
        _init: function() {
            this._eventNames = {
                mousedown: ($.vmouse ? 'v' : '') + 'mousedown.' + this._event,
                mousemove: ($.vmouse ? 'v' : '') + 'mousemove.' + this._event,
                mouseup:   ($.vmouse ? 'v' : '') + 'mouseup.'   + this._event
            };

            var self = this;

            this.carousel()
                .bind('jcarouseldestroy.' + this._event, function() {
                    self.destroy();
                })
                .bind(this._eventNames.mousedown, function(e) {
                    self._start(e);
                })
                .bind(this._eventNames.mouseup, function(e) {
                    self._stop(e);
                })
                .bind(this._eventNames.mousemove, function(e) {
                    self._move(e);
                })
                .bind('mouseleave.' + this._event, function(e) {
                    self._stop(e);
                });
        },
        _start: function(e) {
            var instance = this.instance = $.data(e.currentTarget, 'jcarousel');

            if (!instance) {
                return this;
            }

            this.startPos = $j.intval(instance.list.css(instance.lt));
            this.startX   = $j.intval(e.pageX);
            this.startY   = $j.intval(e.pageY);

            var width  = 0,
                margin = 0,
                // Remove right/bottom margin from total width
                lrb    = instance.vertical ?
                             'bottom' :
                             (instance.rtl ? 'left'  : 'right');

            instance.items().each(function() {
                var el = $(this);
                width += instance._dimension(el);
                margin = el.css('margin-' + lrb);
            });

            this.width = width - $j.intval(margin);

            e.stopPropagation();
            e.preventDefault();

            return this;
        },
        _stop: function() {
            if (!this.instance) {
                return this;
            }

            function scrollNearest() {
                var self    = this,
                    items   = this.items(),
                    pos     = this.list.position()[this.lt],
                    current = items.eq(0),
                    stop    = false;

                if (this.rtl && !this.vertical) {
                    pos = (pos + this.list.width() - this._clipping()) * -1;
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
            }

            if (this.instance.rtl && !this.instance.vertical) {
                var right = $j.intval(this.instance.list.css('right'));

                if (right > 0) {
                    this.instance.scroll(0);
                } else if (right < -(this.width - this.instance._clipping())) {
                    this.instance.scroll(-1);
                } else {
                    scrollNearest.apply(this.instance);
                }
            } else {
                var left = $j.intval(this.instance.list.css(this.instance.lt));

                if (left > 0) {
                    this.instance.scroll(0);
                } else if (left < -(this.width - this.instance._clipping())) {
                    this.instance.scroll(-1);
                } else {
                    scrollNearest.apply(this.instance);
                }
            }

            this.instance = this.startPos = this.startX = this.startY = null;

            return this;
        },
        _move: function(e) {
            if (!this.instance) {
                return this;
            }

            var distance = this.instance.vertical ?
                               this.startY - $j.intval(e.pageY) :
                               this.startX - $j.intval(e.pageX);

            this.instance.list
                .stop(true, false)
                .css(this.instance.lt, Math.ceil(this.startPos - distance) + 'px');

            return this;
        },
        destroy: function() {
            this.carousel().unbind('.' + this._event);
            this.element.removeData(this._selector);
        }
    });

})(jQuery);
