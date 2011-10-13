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
jCarousel(function(jCarousel, $) {
    jCarousel.plugin('control', {
        options: {
            scroll: '+=1',
            event: 'click'
        },
        enabled: null,
        _init: function() {
            this.carousel()
                .bind('jcarouselreloadend.' + this.pluginName, $.proxy(this.reload, this))
                .bind('jcarouselanimate.' + this.pluginName, $.proxy(this.reload, this));

            this.element
                .bind(this.option('event') + '.' + this.pluginName, $.proxy(function() {
                    if (this.enabled) {
                        this.carousel().jcarousel('scroll', this.option('scroll'));
                    }
                    return false;
                }, this));

            this.reload();
        },
        _destroy: function() {
            this.element
                .removeClass('jcarousel-control-enabled')
                .removeClass('jcarousel-control-disabled');
        },
        reload: function() {
            var parsed  = jCarousel.parseTarget(this.option('scroll')),
                enabled = false;

            this.carousel().each(function() {
                var instance = $.data(this, 'jcarousel');

                if (parsed.relative) {
                    enabled = instance[parsed.target > 0 ? 'hasNext' : 'hasPrev']();
                } else {
                    var target = typeof parsed.target !== 'object' ?
                                     instance.items().eq(parsed.target) :
                                     parsed.target;

                    enabled = instance.fullyvisible().index(target) < 0;
                }

                if (enabled) {
                    return false;
                }
            });

            if (this.enabled !== enabled) {
                if (enabled) {
                    this.element
                        .addClass('jcarousel-control-enabled')
                        .removeClass('jcarousel-control-disabled');
                } else {
                    this.element
                        .removeClass('jcarousel-control-enabled')
                        .addClass('jcarousel-control-disabled');
                }

                this.element.trigger('jcarouselcontrol' + (enabled ? 'enabled' : 'disabled'));
            }

            this.enabled = enabled;

            return this;
        }
    });
});
