/*!
 * jCarousel PrevNext Plugin v@VERSION
 * http://sorgalla.com/jcarousel/
 *
 * Copyright 2011, Jan Sorgalla
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * or GPL Version 2 (http://www.opensource.org/licenses/gpl-2.0.php) licenses.
 *
 * Date: @DATE
 */
(function($) {

    var $j = $.jcarousel,
        btnEnabled = 'jcarouselbuttonenabled',
        btnDisabled = 'jcarouselbuttondisabled';

    $.extend($j.options, {
        prevnext: {
            scroll:    1,
            next:      '.jcarousel-next',
            prev:      '.jcarousel-prev',
            nextEvent: 'click',
            prevEvent: 'click'
        }
    });

    $.jcarousel.fn.extend({
        prev: function() {
            this.scrollBy(-this.options.prevnext.scroll);
        },
        next: function() {
            this.scrollBy(this.options.prevnext.scroll);
        }
    });

    $j.hook('reloadend', function(e) {
        if (e.isDefaultPrevented()) {
            return;
        }

        var self = this,
            o    = this.options.prevnext;

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
                    if ($(this).data(btnEnabled) === true) {
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
                    if ($(this).data(btnEnabled) === true) {
                        self.prev();
                    }
                    return false;
                });
            }
        }
    });

    $j.hook('reloadend scrolltoend scrollbyend', function(e) {
        if (e.isDefaultPrevented()) {
            return;
        }

        var wrap = this.options.wrap,
            i    = this.items(),
            s    = i.size(),
            n    = s > 0 && ((wrap && wrap !== 'first') || (i.filter(':jcarouselitemlast').index() < (s - 1)) || (this.tail && !this.inTail)) ? true : false,
            p    = s > 0 && ((wrap && wrap !== 'last') || (i.filter(':jcarouselitemfirst').index() > 0) || (this.tail && this.inTail)) ? true : false;

        if (this.nextButton && this.nextButton.data(btnEnabled) !== n) {
            this.nextButton
            .data(btnEnabled,  n)
            .data(btnDisabled, !n)
            .trigger(n ? btnEnabled : btnDisabled);
        }

        if (this.prevButton && this.prevButton.data(btnEnabled) !== p) {
            this.prevButton
            .data(btnEnabled,  p)
            .data(btnDisabled, !p)
            .trigger(p ? btnEnabled : btnDisabled);
        }
    });

    $j.hook('destroy', function(e) {
        if (e.isDefaultPrevented()) {
            return;
        }

        if (this.nextButton) {
            this.nextButton
            .removeData(btnEnabled)
            .removeData(btnDisabled)
            .unbind('.jcarousel');
        }

        if (this.prevButton) {
            this.prevButton
            .removeData(btnEnabled)
            .removeData(btnDisabled)
            .unbind('.jcarousel');
        }
    });

    $.expr.filters[btnEnabled] = function(elem) {
        return !!$.data(elem, btnEnabled);
    };

    $.expr.filters[btnDisabled] = function(elem) {
        return !!$.data(elem, btnDisabled);
    };

    $.jcarousel.api({
        next: true,
        prev: true
    });

})(jQuery);
