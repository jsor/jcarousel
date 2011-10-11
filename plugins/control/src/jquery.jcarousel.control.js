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
        _init: function() {
            var self = this,
                carousel = this.carousel(),
                scroll   = this.option('scroll');

            carousel
                .bind('jcarouseldestroy.' + this._event, function() {
                    self.destroy();
                })
                .bind('jcarouselreloadend.' + this._event + ' jcarouselscrollend.' + this._event, function() {
                    self.reload();
                });

            this.element
                .unbind('.' + this._event)
                .bind(this.option('event') + '.' + this._event, function() {
                    if ($.data(this, 'jcarousel-control-enabled')) {
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
                    enabled = !$(typeof parsed.target !== 'object' ?
                                     instance.items().eq(parsed.target) :
                                     parsed.target)
                                  .is(':jcarousel-item-fullyvisible');
                }

                if (enabled) {
                    return false;
                }
            });

            if (this.element.data('jcarousel-control-enabled') !== enabled) {
                this.element
                    .data('jcarousel-control-enabled',  enabled)
                    .data('jcarousel-control-disabled', !enabled)
                    .trigger('jcarouselcontrol' + (enabled ? 'enabled' : 'disabled'));
            }

            return this;
        },
        destroy: function() {
            this.carousel().unbind('.' + this._event);

            this.element
                .removeData(this._selector)
                .removeData('jcarousel-control-enabled')
                .removeData('jcarousel-control-disabled')
                .unbind('.' + this._event);
        }
    });

    $.expr.filters['jcarousel-control-enabled'] = function(elem) {
        return !!$.data(elem, 'jcarousel-control-enabled');
    };

    $.expr.filters['jcarousel-control-disabled'] = function(elem) {
        return !!$.data(elem, 'jcarousel-control-disabled');
    };

})(jQuery);
