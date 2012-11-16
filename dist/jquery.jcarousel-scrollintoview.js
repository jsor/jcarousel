/*! jCarousel - v0.3.0-beta - 2012-11-16
* http://sorgalla.com/jcarousel/
* Copyright 2012 Jan Sorgalla
* Released under the MIT license */

(function($) {
    'use strict';

    $.jcarousel.fn.scrollIntoView = function(target, animate, callback) {
        var items = this.items(),
            index = typeof target !== 'object' ? target : items.index(target),
            first = this._fullyvisible.first().index();

        if (index < first) {
            return this.scroll(index, animate, callback);
        }

        if (index >= first && index <= this._fullyvisible.last().index()) {
            if ($.isFunction(callback)) {
                callback.call(this, false);
            }

            return this;
        }

        var clip = this.clipping(),
            lrb  = this.vertical ? 'bottom' : (this.rtl ? 'left'  : 'right'),
            wh   = 0,
            curr;

        while (true) {
            curr = items.eq(index);

            if (curr.size() === 0) {
                break;
            }

            wh += this.dimension(curr);

            if (wh >= clip) {
                var margin = parseFloat(curr.css('margin-' + lrb)) || 0;
                if ((wh - margin) !== clip) {
                    index++;
                }
                break;
            }

            if (index <= 0) {
                break;
            }

            index--;
        }

        return this.scroll(index, animate, callback);
    };
}(jQuery));
