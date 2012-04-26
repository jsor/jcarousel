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
jCarousel.plugin('control', function($) {
    var jCarousel = this;

    return {
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
                .removeClass(this.pluginClass + '-active')
                .removeClass(this.pluginClass + '-inactive');
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
                    .addClass(this.pluginClass + '-active')
                    .removeClass(this.pluginClass + '-inactive');
            } else {
                this.element()
                    .removeClass(this.pluginClass + '-active')
                    .addClass(this.pluginClass + '-inactive');
            }

            this._trigger(active ? 'active' : 'inactive');

            this.active = active;

            return this;
        }
    };
});
