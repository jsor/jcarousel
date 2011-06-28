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
        pagination: {
            perpage: null,
            root: '.jcarousel-pagination',
            item: function(page) {
                return $('<a class="jcarousel-pagination-item" href="#' + page + '">' + page + '</a>');
            },
            active: function(item) {
                return item.addClass('jcarousel-item-active');
            },
            inactive: function(item) {
                return item.removeClass('jcarousel-item-active');
            }
        }
    });

    $.jcarousel.fn.extend({
        paginationRoot: null,
        scrollToPage: function(page) {
            var pages = this.pages();
            if (pages[page]) {
                this.scrollTo(pages[page]);
            }
            return this;
        },
        pages: function() {
            var o = this.options.pagination;

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
                            pages[page] = curr;
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
                return o.perpage.call(this);
            } else {
                var pages = {},
                    pp    = $j.intval(o.perpage),
                    items = this.items(),
                    page  = 1,
                    i     = 0,
                    curr;

                while (true) {
                    curr = items.eq(idx++);

                    if (curr.size() === 0) {
                        break;
                    }

                    pages[page++] = curr;
                    i += pp;
                }

                return pages;
            }
        },
        pagination: function() {
            var pages = this.pages(),
                o     = this.options.pagination;

            if ($.isFunction(o.root)) {
                o.root = o.root.call(this);
            }

            if (o.root) {
                this.paginationRoot = (o.root.jquery ? o.root : this.root.parent().find(o.root));
            } else {
                this.paginationRoot = $();
            }

            if (this.paginationRoot.size() > 0) {
                this.paginationRoot.empty();

                var self = this;
                $.each(pages, function(page, item) {
                    var el = $(o.item.call(self, page, item)).click(function(e) {
                        e.preventDefault();
                        self.scrollToPage(page);
                    });
                    self.paginationRoot.append(el);
                });
            }

            return this;
        }
    });

    $j.hook('reloadend', function(e) {
        if (!e.isDefaultPrevented()) {
            this.pagination();
        }
    });

    $j.hook('destroy', function(e) {
        if (!e.isDefaultPrevented()) {
            this.paginationRoot.empty();
        }
    });

    $.jcarousel.api({
        scrollToPage: true
    });

})(jQuery);
