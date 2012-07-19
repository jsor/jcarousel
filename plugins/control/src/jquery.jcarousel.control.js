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
            options: {
                target: '+=1',
                event:  'click'
            },
            active: null,
            _init: function() {
                this.carousel()
                    ._bind('reloadend.' + this.pluginName, $.proxy(this.reload, this))
                    ._bind('scrollend.' + this.pluginName, $.proxy(this.reload, this));

                this.element()
                    .bind(this.option('event') + '.' + this.pluginName, $.proxy(function(e) {
                        e.preventDefault();
                        this.carousel().scroll(this.option('target'));
                    }, this));

                this.reload();
            },
            _destroy: function() {
                this.element()
                    .removeClass(this.pluginName.toLowerCase() + '-active')
                    .removeClass(this.pluginName.toLowerCase() + '-inactive');
            },
            reload: function() {
                var parsed = jCarousel.parseTarget(this.option('target')),
                    carousel = this.carousel(),
                    active;

                if (parsed.relative) {
                    active = carousel[parsed.target > 0 ? 'hasNext' : 'hasPrev']();
                } else {
                    var target = typeof parsed.target !== 'object' ?
                                    carousel.items().eq(parsed.target) :
                                    parsed.target;

                    active = carousel.target().index(target) >= 0;
                }

                if (this.active === active) {
                    return this;
                }

                if (active) {
                    this.element()
                        .addClass(this.pluginName.toLowerCase() + '-active')
                        .removeClass(this.pluginName.toLowerCase() + '-inactive');
                } else {
                    this.element()
                        .removeClass(this.pluginName.toLowerCase() + '-active')
                        .addClass(this.pluginName.toLowerCase() + '-inactive');
                }

                this._trigger(active ? 'active' : 'inactive');

                this.active = active;

                return this;
            }
        });
    }));
}(window));
