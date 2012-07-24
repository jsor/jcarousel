/*!
 * jCarousel Control Plugin v@VERSION
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
            define('jquery.jcarousel.control', ['jquery', 'jquery.jcarousel'], factory);
        } else {
            factory(window.jQuery, window.jCarousel);
        }
    }(function ($, jCarousel) {
        jCarousel.plugin('jcarouselControl', {
            _options: {
                target: '+=1',
                event:  'click'
            },
            _active: null,
            _init: function() {
                this.onReload = $.proxy(this._reload, this);
                this.onEvent = $.proxy(function(e) {
                    e.preventDefault();
                    this.carousel().jcarousel('scroll', this.options('target'));
                }, this);
            },
            _create: function() {
                this.carousel()
                    .one('destroy.jcarousel', $.proxy(function() {
                        this._destroy();
                        this.carousel().one('createend.jcarousel', $.proxy(this._create, this));
                    }, this))
                    .bind('reloadend.jcarousel scrollend.jcarousel', this.onReload);

                this._element
                    .bind(this.options('event') + '.jcarouselcontrol', this.onEvent);

                this._reload();
            },
            _destroy: function() {
                this._element
                    .unbind('.jcarouselcontrol', this.onEvent);

                this.carousel()
                    .unbind('reloadend.jcarousel scrollend.jcarousel', this.onReload);
            },
            _reload: function() {
                var parsed = jCarousel.parseTarget(this.options('target')),
                    carousel = this.carousel(),
                    active;

                if (parsed.relative) {
                    active = carousel.jcarousel(parsed.target > 0 ? 'hasNext' : 'hasPrev');
                } else {
                    var target = typeof parsed.target !== 'object' ?
                                    carousel.jcarousel('items').eq(parsed.target) :
                                    parsed.target;

                    active = carousel.jcarousel('target').index(target) >= 0;
                }

                if (this._active !== active) {
                    this._trigger(active ? 'active' : 'inactive');
                    this._active = active;
                }

                return this;
            }
        });
    }));
}(window));
