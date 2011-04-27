/*!
 * jCarousel Buttons Plugin v@VERSION
 * http://sorgalla.com/jcarousel/
 *
 * Copyright 2011, Jan Sorgalla
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * or GPL Version 2 (http://www.opensource.org/licenses/gpl-2.0.php) licenses.
 *
 * Date: @DATE
 */
(function($) {

    var $j = $.jcarousel;

    $.extend($j.options, {
        next:      '.jcarousel-next',
        prev:      '.jcarousel-prev',
        nextEvent: 'click',
        prevEvent: 'click'
    });

    $j.hook('reloadend', function(e) {
        if (e.isDefaultPrevented()) {
            return;
        }

        var self = this, 
            o    = this.options;

        if ($.isFunction(o.next)) {
            o.next = o.next.call(this);
        }

        if ($.isFunction(o.prev)) {
            o.prev = o.prev.call(this);
        }

        this.nextButton = null;
        this.prevButton = null;

        if (o.next) {
            this.nextButton = (o.next.jquery ? o.next : this.element.parent().find(o.next)).unbind('.jcarousel');

            if (o.nextEvent) {
                this.nextButton.bind(o.nextEvent + '.jcarousel', function() {
                    if ($(this).data('jcarouselbuttonenabled') === true) {
                        self.next();
                    }
                    return false;
                });
            }
        }

        if (o.prev) {
            this.prevButton = (o.prev.jquery ? o.prev : this.element.parent().find(o.prev)).unbind('.jcarousel');

            if (o.prevEvent) {
                this.prevButton.bind(o.prevEvent + '.jcarousel', function() {
                    if ($(this).data('jcarouselbuttonenabled') === true) {
                        self.prev();
                    }
                    return false;
                });
            }
        }
    });

    $j.hook('reloadend scrollend scrolltailend', function(e) {
        if (e.isDefaultPrevented()) {
            return;
        }

        var o = this.options,
            s = this.size(),
            n = s > 0 && ((o.wrap && o.wrap !== 'first') || (this.index(this.last) < (s - 1)) || (this.tail && !this.inTail)) ? true : false,
            p = s > 0 && ((o.wrap && o.wrap !== 'last') || (this.index(this.first) > 0) || (this.tail && this.inTail)) ? true : false;

        if (this.nextButton && this.nextButton.data('jcarouselbuttonenabled') !== n) {
            this.nextButton
            .data('jcarouselbuttonenabled',  n)
            .data('jcarouselbuttondisabled', !n)
            .trigger('jcarouselbutton' + (n ? 'enabled' : 'disabled'));
        }

        if (this.prevButton && this.prevButton.data('jcarouselbuttonenabled') !== p) {
            this.prevButton
            .data('jcarouselbuttonenabled',  p)
            .data('jcarouselbuttondisabled', !p)
            .trigger('jcarouselbutton' + (p ? 'enabled' : 'disabled'));
        }
    });

    $j.hook('destroy', function(e) {
        if (e.isDefaultPrevented()) {
            return;
        }

        if (this.nextButton) {
            this.nextButton
            .removeData('jcarouselbuttonenabled')
            .removeData('jcarouselbuttondisabled')
            .unbind('.jcarousel');
        }

        if (this.prevButton) {
            this.prevButton
            .removeData('jcarouselbuttonenabled')
            .removeData('jcarouselbuttondisabled')
            .unbind('.jcarousel');
        }
    });

    $.each(['enabled', 'disabled'], function(i, name) {
        $.expr.filters['jcarouselbutton'  + name] = function(elem) {
            return $.data(elem, 'jcarouselbutton'  + name);
        };
    });

})(jQuery);
