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

    $.jcarousel.create('jcarousel.control', {
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
                    if ($.data(this, 'jcarousel-control-enabled')) {
                        carousel.jcarousel('scrollBy', scroll);
                    }
                    return false;
                });

            this.reload();
        },
        reload: function() {
            var scroll   = this.option('scroll'),
                enabled  = false;

            this.carousel().each(function() {
                enabled = $.data(this, 'jcarousel')[scroll > 0 ? 'hasNext' : 'hasPrev']();

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
            this.element
                .removeData(':jcarousel-control-enabled')
                .removeData(':jcarousel-control-disabled')
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
