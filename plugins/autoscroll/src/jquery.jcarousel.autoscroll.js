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

    var $j = $.jcarousel;

    $.extend($j.options, {
        scroll:    1,
        interval:  3000,
        autostart: true
    });

    $.jcarousel.fn.extend({
        autoscrollTimer: null,
        autoscrollPaused: null,
        startAuto: function(interval) {
            var self = this;

            this.stopAuto();

            this.autoscrollTimer = window.setInterval(function() {
                if (!self.autoscrollPaused) {
                    self.scrollBy(self.options.scroll);
                }
            }, interval || this.options.interval);

            return this;
        },
        pauseAuto: function() {
            this.autoscrollPaused = true;

            return this;
        },
        resumeAuto: function() {
            this.autoscrollPaused = false;

            return this;
        },
        stopAuto: function() {
            if (this.autoscrollTimer) {
                this.autoscrollTimer = window.clearInterval(this.autoscrollTimer);
            }

            return this;
        }
    });

    $j.hook('setupend', function(e) {
        if (e.isDefaultPrevented()) {
            return;
        }

        if (this.options.autostart) {
            this.startAuto();
        }
    });

    $j.hook('destroy', function(e) {
        if (e.isDefaultPrevented()) {
            return;
        }

        this.stopAuto();
    });

    $.jcarouselSub.fn.extend({
        startAuto: function() {
            this.data('jcarousel').startAuto();
            return this;
        },
        pauseAuto: function() {
            this.data('jcarousel').pauseAuto();
            return this;
        },
        resumeAuto: function() {
            this.data('jcarousel').resumeAuto();
            return this;
        },
        stopAuto: function() {
            this.data('jcarousel').stopAuto();
            return this;
        }
    });

})(jQuery, window);
