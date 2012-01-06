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
                return '<a class="' + this.pluginPrefix + '-item" href="#' + page + '">' + page + '</a>';
            },
            active: function(item) {
                item.addClass(this.pluginPrefix + '-item-active');
            },
            inactive: function(item) {
                item.removeClass(this.pluginPrefix + '-item-active');
            }
        },
        current: null,
        pages: {},
        items: {},
        _init: function() {
            this.carousel()
                ._bind('reloadend.' + this.pluginName, $.proxy(this.reload, this))
                ._bind('scrollend.' + this.pluginName, $.proxy(this.update, this));

            this.reload();
        },
        _destroy: function() {
            this.element().empty();
        },
        reload: function() {
            var self = this,
                carousel = this.carousel(),
                o = this.options;

            this.pages = {};
            this.items = {};

            // Calculate pages
            if (o.perpage == null) {
                o.perpage = function() {
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

            if ($.isFunction(o.perpage)) {
                this.pages = o.perpage.call(this);
            } else {
                var pp    = jCarousel.intval(o.perpage),
                    items = carousel.items(),
                    page  = 1,
                    i     = 0,
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
                self.items[page] = $(o.item.call(self, page, carouselItems))
                    .click(function(e) {
                        e.preventDefault();
                        carousel.scroll(carouselItems.eq(0));
                    })
                    .appendTo(element);
            });

            this.update();
        },
        update: function() {
            var target  = this.carousel().target(),
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
