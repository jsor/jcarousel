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
(function($) {

    $.jcarousel.create('control', {
        options: {
            scroll: '+=1',
            event: 'click'
        },
        enabled: null,
        _init: function() {
            var self = this,
                carousel = this.carousel(),
                scroll   = this.option('scroll');

            carousel
                .bind('jcarouseldestroy.' + this._event, function() {
                    self.destroy();
                })
                .bind('jcarouselreloadend.' + this._event + ' jcarouselanimate.' + this._event, function() {
                    self.reload();
                });

            this.element
                .unbind('.' + this._event)
                .bind(this.option('event') + '.' + this._event, function() {
                    if (self.enabled) {
                        carousel.jcarousel('scroll', scroll);
                    }
                    return false;
                });

            this.reload();
        },
        reload: function() {
            var parsed  = $.jcarousel.parseTarget(this.option('scroll')),
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
        },
        destroy: function() {
            this.carousel().unbind('.' + this._event);

            this.element
                .removeData(this._selector)
                .removeClass('jcarousel-control-enabled')
                .removeClass('jcarousel-control-disabled')
                .unbind('.' + this._event);
        }
    });

})(jQuery);
