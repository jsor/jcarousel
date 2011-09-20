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
        options: {
            scroll:         1,
            sensitivity:    40,
            preventDefault: true
        },
        startX: null,
        startY: false,
        moving: false,
        _init: function() {
            var self = this;

            this.carousel()
                .bind('jcarouseldestroy.' + this._event, function() {
                    self.destroy();
                })
                .bind('touchstart.' + this._event + ' mousedown.' + this._event, function(e) {
                    self._start(e);
                });

            this.onMove = function(e) {
                self._move(e);
            };
        },
        _start: function(e) {
            if (e.originalEvent.touches) {
                if (e.originalEvent.touches.length == 1) {
                     this.startX = e.originalEvent.touches[0].pageX;
                     this.startY = e.originalEvent.touches[0].pageY;
                     this.moving = true;
                     this.carousel().bind('touchmove.' + this._event, this.onMove);
                 }
            } else {
                this.startX = e.pageX;
                this.startY = e.pageY;
                this.moving = true;
                this.carousel().bind('mousemove.' + this._event, this.onMove);
            }

            return this;
        },
        _stop: function() {
            this.carousel().unbind('touchmove.' + this._event + ' mousemove.' + this._event, this.onMove);
            this.startX = this.startY = null;
    		this.moving = false;

            return this;
        },
        _move: function(e) {
            if (this.option('preventDefault')) {
                e.preventDefault();
            }

            if (!this.moving) {
                return this;
            }

            var instance = $.data(e.currentTarget, 'jcarousel'),
                end,
                distance,
                prefix;

            if (!instance) {
                return this;
            }

            if (instance.vertical) {
                end = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;
                distance = this.startY - end;
            } else {
                end = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
                distance = this.startX - end;
            }

            if (Math.abs(distance) >= this.option('sensitivity')) {
                this._stop();

                if (instance.rtl && !instance.vertical) {
                    prefix = distance > 0 ? '-=' : '+=';
                } else {
                    prefix = distance > 0 ? '+=' : '-=';
                }

                instance.scroll(prefix + this.option('scroll'));
            }

            return this;
        },
        destroy: function() {
            this.carousel().unbind('.' + this._event);
            this.element.removeData(this._selector);
        }
    });

})(jQuery);
