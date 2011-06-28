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
                item.addClass('jcarousel-pagination-item-active');
            },
            inactive: function(item) {
                item.removeClass('jcarousel-pagination-item-active');
            }
        }
    });

    $.jcarousel.fn.extend({
        paginationRoot: null,
        paginationPages: {},
        paginationItems: {},
        scrollToPage: function(page) {
            if (this.paginationPages[page]) {
                this.scrollTo(this.paginationPages[page]);
            }
            return this;
        }
    });

    $j.hook('reloadend', function(e) {
        if (e.isDefaultPrevented()) {
            return;
        }

        var o = this.options.pagination;

        this.paginationPages = {};
        this.paginationItems = {};

        // Calculate pages
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
            this.paginationPages = o.perpage.call(this);
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

                this.paginationPages[page++] = curr;
                i += pp;
            }
        }

        // Build pagination
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
            $.each(this.paginationPages, function(page, item) {
                self.paginationItems[page] = $(o.item.call(self, page, item)).click(function(e) {
                    e.preventDefault();
                    self.scrollTo(item);
                }).appendTo(self.paginationRoot);
            });
        }
    });

    $j.hook('setupend animate', function(e) {
        if (e.isDefaultPrevented()) {
            return;
        }

        var self = this;
        $.each(this.paginationPages, function(page, item) {
            self.options.pagination[item.is(':jcarouselitemvisible') ? 'active' : 'inactive'](self.paginationItems[page]);
        });
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
