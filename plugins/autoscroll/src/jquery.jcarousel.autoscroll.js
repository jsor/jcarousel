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
jCarousel.register(function(jCarousel, $) {
    jCarousel.plugin('autoscroll', {
        options: {
            scroll:   '+=1',
            interval: 3000,
            autostart: true
        },
        timer: null,
        paused: false,
        _init: function() {
            if (this.option('autostart')) {
                this._start();
            }
        },
        _destroy: function() {
            this.stop();
        },
        _start: function() {
            this.stop();

            if (this.carousel().size() === 0) {
                return this;
            }

            this.timer = setInterval($.proxy(function() {
                if (!this.paused) {
                    this.carousel().jcarousel('scroll', this.option('scroll'));
                }
            }, this), this.option('interval'));

            return this;
        },
        play: function() {
            this._start();
            this.carousel().jcarousel('scroll', this.option('scroll'));

            return this;
        },
        pause: function() {
            this.paused = true;
            return this;
        },
        resume: function() {
            this.paused = false;
            return this;
        },
        stop: function() {
            if (this.timer) {
                this.timer = clearInterval(this.timer);
            }

            return this;
        }
    });
});
