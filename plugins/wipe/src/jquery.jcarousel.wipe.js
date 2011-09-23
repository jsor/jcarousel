/*!
 * jCarousel AutoScroll Plugin v@VERSION
 * http://sorgalla.com/jcarousel/
 *
 * Copyright 2011, Jan Sorgalla
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * or GPL Version 2 (http://www.opensource.org/licenses/gpl-2.0.php) licenses.
 *
 * Date: @DATE
 */
(function($) {

    $.jcarousel.create('jcarousel.wipe', {
        options: {},
        instance: null,
        startX:   null,
        startY:   null,
        startPos: null,
        lrt:      null,
        width:    0,
        moving:   false,
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

            this.lrt      = instance.vertical ?
                                'top' :
                                (instance.rtl ? 'right'  : 'left');
            this.startPos = $.jcarousel.intval(instance.list.css(this.lrt));
            this.startX   = $.jcarousel.intval(e.pageX);
            this.startY   = $.jcarousel.intval(e.pageY);
            this.moving   = true;

            var width  = 0,
                margin = 0,
                // Remove right/bottom margin from total width
                lrb    = instance.vertical ?
                             'bottom' :
                             (instance.rtl ? 'left'  : 'right');

            this.instance.items().each(function() {
                var el = $(this);
                width += instance._dimension(el);
                margin = el.css('margin-' + lrb);
            });

            this.width = width - $.jcarousel.intval(margin);

            e.stopPropagation();
            e.preventDefault();

            return this;
        },
        _stop: function() {
            if (!this.moving || !this.instance) {
                return this;
            }

            var list = this.instance.list,
                clip = this.instance._clipping();

            if (this.instance.rtl && !this.instance.vertical) {
                var right = $.jcarousel.intval(list.css('right'));

                if (right > 0) {
                    this.instance.scroll(-1);
                } else if (right < (this.width - clip)) {
                    this.instance.scroll(0);
                }
            } else {
                var left = $.jcarousel.intval(list.css('left'));

                if (left > 0) {
                    this.instance.scroll(0);
                } else if (left < -(this.width - clip)) {
                    this.instance.scroll(-1);
                }
            }

            this.instance = this.lrt = this.startPos = this.startX = this.startY = null;
            this.moving = false;

            return this;
        },
        _move: function(e) {
            if (!this.moving || !this.instance) {
                return this;
            }

            var distance = this.instance.vertical ?
                               this.startY - $.jcarousel.intval(e.pageY) :
                               this.startX - $.jcarousel.intval(e.pageX),
                list     = this.instance.list,
                clip     = this.instance._clipping(),
                pos;

            if (this.instance.rtl && !this.instance.vertical) {
                pos = Math.ceil($.jcarousel.intval(list.css('right')));

                if (pos > 0 || pos < (this.width - clip)) {
                    distance /= 3;
                }

                distance *= -1;
            } else {
                pos = Math.ceil($.jcarousel.intval(list.css('left')));

                if (pos > 0 || pos < -(this.width - clip)) {
                    distance /= 3;
                }
            }

            list
                .stop(true, false)
                .css(this.lrt, Math.ceil(this.startPos - distance) + 'px');

            return this;
        },
        destroy: function() {
            this.carousel().unbind('.' + this._event);
            this.element.removeData(this._selector);
        }
    });

})(jQuery);
