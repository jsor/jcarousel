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
(function (window) {
    'use strict';

    (function (factory) {
        if (typeof define === 'function' && define.amd) {
            define('jquery.jcarousel.autoscroll', ['jquery', 'jquery.jcarousel'], factory);
        } else {
            factory(window.jQuery, window.jCarousel);
        }
    }(function ($, jCarousel) {
        jCarousel.plugin('jcarouselAutoscroll', {
            _options: {
                target:    '+=1',
                interval:  3000,
                autostart: true
            },
            _timer: null,
            _init: function () {
                this.onAnimateEnd = $.proxy(this.start, this);
            },
            _create: function() {
                this.carousel()
                    .one('destroy.jcarousel', $.proxy(function() {
                        this._destroy();
                        this.carousel().one('createend.jcarousel', $.proxy(this._create, this));
                    }, this));

                if (this.options('autostart')) {
                    this.start();
                }
            },
            _destroy: function() {
                this.stop();
            },
            start: function() {
                this.stop();

                this.carousel().one('animateend.jcarousel', this.onAnimateEnd);

                this._timer = setTimeout($.proxy(function() {
                    this.carousel().jcarousel('scroll', this.options('target'));
                }, this), this.options('interval'));

                return this;
            },
            stop: function() {
                if (this._timer) {
                    this._timer = clearTimeout(this._timer);
                }

                this.carousel().unbind('animateend.jcarousel', this.onAnimateEnd);

                return this;
            }
        });
    }));
}(window));
