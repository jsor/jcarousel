/*! jCarousel - v0.3.0-beta - 2012-10-10
* http://sorgalla.com/jcarousel/
* Copyright 2012 Jan Sorgalla
* Released under the MIT license */

(function($) {
    'use strict';

    $.extend($.jCarousel.plugin('jcarousel').prototype, {
        scrollIntoView: function(item, animate, callback) {
            var items = this.items(),
                index = typeof item !== 'object' ? item : items.index(item),
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
                wh   = this.dimension(items.eq(index)),
                curr;

            while (true) {
                curr = items.eq(index);

                if (curr.size() === 0) {
                    break;
                }

                wh += this.dimension(curr) - (parseFloat(curr.css('margin-' + lrb)) || 0);

                if (wh >= clip || --index <= 0) {
                    break;
                }
            }

            return this.scroll(index, animate, callback);
        }
    });
}(jQuery));
