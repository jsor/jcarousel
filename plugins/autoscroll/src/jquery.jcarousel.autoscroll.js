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

    $.extend($j.defaults, {
        autoscroll: {
            scroll:   1,
            interval: 3000
        }
    });

    $j.fn.extend({
        autoscrollTimer: null,
        autoscrollPaused: null,
        startAuto: function(options) {
            var self = this, opts = $.extend({}, this.options.autoscroll, options);

            this.stopAuto();

            this.autoscrollTimer = window.setInterval(function() {
                if (!self.autoscrollPaused) {
                    self.scrollBy(opts.scroll);
                }
            }, opts.interval);

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

    $j.hook('destroy', function(e) {
        if (!e.isDefaultPrevented()) {
            this.stopAuto();
        }
    });

    $j.api({
        startAuto:  true,
        pauseAuto:  true,
        resumeAuto: true,
        stopAuto:   true
    });

})(jQuery, window);
