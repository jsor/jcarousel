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
(function($, window) {

    var autoscroll = $.jcarousel.plugins.autoscroll = function(carousel) {
        $.extend(carousel.options, {
            autoscroll: {
                scroll:   1,
                interval: 3000
            }
        });

        carousel.bind('destroy', function(e) {
            if (!e.isDefaultPrevented()) {
                this.autoscroll.stop();
            }
        });

        this.carousel = carousel;
    };

    $.extend(autoscroll.prototype, {
        timer: null,
        paused: false,
        start: function() {
            var self = this, opts = this.carousel.options.autoscroll;

            this.stop();

            this.timer = window.setInterval(function() {
                if (!self.paused) {
                    self.carousel.scrollBy(opts.scroll);
                }
            }, opts.interval);

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
                this.timer = window.clearInterval(this.timer);
            }

            return this;
        }
    });

})(jQuery, window);
