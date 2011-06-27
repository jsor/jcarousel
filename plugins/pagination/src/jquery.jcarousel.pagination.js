/*!
 * jCarousel Pagination Plugin v@VERSION
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
        perpage: null,
        pagination: '.jcarousel-pagination',
        paginationItem: function(page) {
            return $('<li><a href="#' + page + '>' + page + '</a></li>');
        }
    });

    $.jcarousel.fn.extend({
        pagination: null,
        pages: {},
        scrollToPage: function(page) {
            if (this.pages[page]) {
                this.scrollTo(this.pages[page]);
            }
            return this;
        },
        setupPages: function() {
            var o = this.options;

            if (o.perpage == null) {
                o.perpage = function() {
                    var items = this.items(),
                        clip  = this._clipping(),
                        wh    = 0,
                        idx   = 0,
                        page  = 1,
                        pages = {},
                        curr;

                    while (true) {
                        curr = items.eq(idx++);

                        if (curr.size() === 0) {
                            break;
                        }

                        if (!pages[page]) {
                            pages[page] =  curr;
                        }

                        wh += this._dimension(curr);

                        if (wh >= clip) {
                            page++;
                            wh = 0;
                        }
                    }

                    return pages;
                };
            }

            if ($.isFunction(o.perpage)) {
                this.pages = o.perpage.call(this);
            } else {
                var pp    = $j.intval(o.perpage),
                    items = this.items(),
                    page  = 1,
                    i     = 0,
                    curr;

                while (true) {
                    curr = items.eq(idx++);

                    if (curr.size() === 0) {
                        break;
                    }

                    this.pages[page++] = curr;
                    i += pp;
                }
            }

            return this;
        },
        generatePagination: function() {
            this.setupPages();

            var o = this.options;

            if ($.isFunction(o.pagination)) {
                o.pagination = o.pagination.call(this);
            }

            if (o.pagination) {
                this.pagination = (o.pagination.jquery ? o.pagination : this.element.parent().find(o.pagination));
            } else {
                this.pagination = $();
            }

            if (this.pagination.size() > 0) {

            }

            return this;
        }
    });

    $j.hook('scrolltoend scrollbyend', function(e) {
        if (e.isDefaultPrevented()) {
            return;
        }

        this.setupPages();
    });

    $j.hook('reloadend', function(e) {
        if (e.isDefaultPrevented()) {
            return;
        }

        this.generatePagination();
    });

    $j.hook('destroy', function(e) {
        if (e.isDefaultPrevented()) {
            return;
        }

        this.pagination.empty();
    });

    $.jcarouselSub.fn.extend({
        scrollToPage: function(page) {
            this.data('jcarousel').scrollToPage(page);
            return this;
        }
    });

})(jQuery);
