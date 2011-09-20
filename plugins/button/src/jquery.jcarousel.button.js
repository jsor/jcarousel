/*!
 * jCarousel Button Plugin v@VERSION
 * http://sorgalla.com/jcarousel/
 *
 * Copyright 2011, Jan Sorgalla
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * or GPL Version 2 (http://www.opensource.org/licenses/gpl-2.0.php) licenses.
 *
 * Date: @DATE
 */
(function($) {

    $.jcarousel.create('jcarousel.button', {
        options: {
            scroll: 1,
            event: 'click'
        },
        _init: function() {
            var self = this,
                carousel = this.carousel(),
                scroll   = this.option('scroll');

            this.carousel()
                .bind('jcarouseldestroy', function() {
                    self.destroy();
                })
                .bind('jcarouselreloadend jcarouselscrolltoend jcarouselscrollbyend', function() {
                    self.reload();
                });

            this.element
                .unbind('.' + this._event)
                .bind(this.option('event') + '.' + this._event, function() {
                    if ($.data(this, 'jcarousel-button-enabled')) {
                        carousel.jcarousel('scrollBy', scroll);
                    }
                    return false;
                });

            this.reload();
        },
        reload: function() {
            var carousel = this.carousel(),
                scroll   = this.option('scroll'),
                enabled  = false;

            carousel.each(function() {
                var instance = $.data(this, 'jcarousel'),
                    wrap     = instance.option('wrap'),
                    items    = instance.items(),
                    size     = items.size();

                if (scroll > 0) {
                    enabled = size > 0 &&
                        ((wrap && wrap !== 'first') ||
                         (items.filter(':jcarousel-item-last').index() < (size - 1)) ||
                         (instance.tail && !instance.inTail)) ? true : false;
                } else {
                    enabled = size > 0 &&
                        ((wrap && wrap !== 'last') ||
                         (items.filter(':jcarousel-item-first').index() > 0) ||
                         (instance.tail && instance.inTail)) ? true : false;
                }

                if (enabled) {
                    return false;
                }
            });

            if (this.element.data('jcarousel-button-enabled') !== enabled) {
                this.element
                    .data('jcarousel-button-enabled',  enabled)
                    .data('jcarousel-button-disabled', !enabled)
                    .trigger('jcarouselbutton' + (enabled ? 'enabled' : 'disabled'));
            }

            return this;
        },
        destroy: function() {
            this.element
                .removeData(':jcarousel-button-enabled')
                .removeData(':jcarousel-button-disabled')
                .unbind('.' + this._event);
        }
    });

    $.expr.filters['jcarousel-button-enabled'] = function(elem) {
        return !!$.data(elem, 'jcarousel-button-enabled');
    };

    $.expr.filters['jcarousel-button-disabled'] = function(elem) {
        return !!$.data(elem, 'jcarousel-button-disabled');
    };

})(jQuery);
