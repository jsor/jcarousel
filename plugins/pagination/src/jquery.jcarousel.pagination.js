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
jCarousel.plugin('pagination', function($) {
    var jCarousel = this;

    return {
        options: {
            perpage: null,
            item: function(page) {
                return '<a class="' + this.pluginClass + '-item" href="#' + page + '">' + page + '</a>';
            },
            active: function(item) {
                item.addClass(this.pluginClass + '-item-active');
            },
            inactive: function(item) {
                item.removeClass(this.pluginClass + '-item-active');
            }
        },
        current: null,
        pages: {},
        items: {},
        _init: function() {
            this.carousel()
                ._bind('reloadend.' + this.pluginName, jCarousel.proxy(this.reload, this))
                ._bind('scrollend.' + this.pluginName, jCarousel.proxy(this.update, this));

            this.reload();
        },
        _destroy: function() {
            this.element().empty();
        },
        reload: function() {
            var self = this,
                carousel = this.carousel(),
                options = this.options;

            this.pages = {};
            this.items = {};

            // Calculate pages
            if (options.perpage == null) {
                options.perpage = function() {
                    var items = carousel.items(),
                        clip  = carousel._clipping(),
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
                        } else {
                            pages[page] = pages[page].add(curr);
                        }

                        wh += carousel._dimension(curr);

                        if (wh >= clip) {
                            page++;
                            wh = 0;
                        }
                    }

                    return pages;
                };
            }

            if ($.isFunction(options.perpage)) {
                this.pages = options.perpage.call(this);
            } else {
                var pp = parseInt(options.perpage, 10) || 0,
                    items = carousel.items(),
                    page = 1,
                    i = 0,
                    curr;

                while (true) {
                    curr = items.eq(i++);

                    if (curr.size() === 0) {
                        break;
                    }

                    if (!this.pages[page]) {
                        this.pages[page] = curr;
                    } else {
                        this.pages[page] = this.pages[page].add(curr);
                    }

                    if (i % pp === 0) {
                        page++;
                    }
                }
            }

            var element = this.element().empty();

            $.each(this.pages, function(page, carouselItems) {
                self.items[page] = $(options.item.call(self, page, carouselItems))
                    .click(function(e) {
                        e.preventDefault();
                        carousel.scroll(carouselItems.eq(0));
                    })
                    .appendTo(element);
            });

            this.current = null;
            this.update();
        },
        update: function() {
            var target = this.carousel().target(),
                current = null;

            $.each(this.pages, function(page, carouselItems) {
                if (carouselItems.index(target) >= 0) {
                    current = page;
                    return false;
                }
            });

            if (current !== this.current) {
                if (this.current) {
                    this.options.inactive.call(this, this.items[this.current]);
                }

                this.options.active.call(this, this.items[current]);
                this.current = current;
            }
        }
    };
});
