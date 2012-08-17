/*!
 * jCarousel Pagination Plugin
 * http://sorgalla.com/jcarousel/
 *
 * Copyright 2012, Jan Sorgalla
 * Dual licensed under the MIT (https://github.com/jsor/jcarousel/blob/master/LICENSE-MIT)
 * or GPL Version 2 (https://github.com/jsor/jcarousel/blob/master/LICENSE-GPL) licenses.
 *
 * Depends:
 *     jquery.jcarousel.js
 *     jquery.jcarousel.control.js
 */
(function ($) {
    'use strict';

    $.jcarousel.plugin('jcarouselPagination', {
        _options: {
            perPage: null,
            item: function(page) {
                return '<a href="#' + page + '">' + page + '</a>';
            }
        },
        _pages: {},
        _items: {},
        _init: function() {
            this.onDestroy = $.proxy(function() {
                this._destroy();
                this.carousel().one('createend.jcarousel', $.proxy(this._create, this));
            }, this);
            this.onReload = $.proxy(this._reload, this);
        },
        _create: function() {
            this.carousel()
                .one('destroy.jcarousel', this.onDestroy)
                .bind('reloadend.jcarousel', this.onReload);

            this._reload();
        },
        _destroy: function() {
            if ($.fn.jcarouselControl) {
                $.each(this._items, function(page, item) {
                    item.jcarouselControl('destroy');
                });
            }

            this._element.empty();

            this.carousel()
                .unbind('destroy.jcarousel', this.onDestroy)
                .unbind('reloadend.jcarousel', this.onReload);
        },
        _reload: function() {
            var perPage = this.options('perPage');

            this._pages = {};
            this._items = {};

            // Calculate pages
            if ($.isFunction(perPage)) {
                perPage = perPage.call(this);
            }

            if (perPage == null) {
                this._pages = this._calculatePages();
            } else {
                var pp = parseInt(perPage, 10) || 0,
                    items = this.carousel().jcarousel('items'),
                    page = 1,
                    i = 0,
                    curr;

                while (true) {
                    curr = items.eq(i++);

                    if (curr.size() === 0) {
                        break;
                    }

                    if (!this._pages[page]) {
                        this._pages[page] = curr;
                    } else {
                        this._pages[page] = this._pages[page].add(curr);
                    }

                    if (i % pp === 0) {
                        page++;
                    }
                }
            }

            var items = this.carousel().jcarousel('items'),
                elements = this._element.find(' > *'), // all direct children
                self = this,
                element,
                item = this.options('item'),
                numberOfPages = 0;
                
                $.each(this._pages, function() { numberOfPages++; });
                
                // if the elements inside the list are the same length as the number of pages.
                if(elements.size() != numberOfPages) {
                    element = this._element.empty();
                }
                
                $.each(this._pages, function(page, carouselItems) {
                    var currItem;
                                        
                    if(element) {
                        currItem = self._items[page] = $(item.call(self, page, carouselItems));
                        element.append(currItem);
                    } else {
                        currItem = self._items[page] = elements.eq(page-1);
                    }
                    
                    if ($.fn.jcarouselControl) {
                        currItem.jcarouselControl({
                            carousel: self.carousel(),
                            target: carouselItems.eq(0)
                        });
                    }
                });
        },
        items: function() {
            return this._items;
        },
        _calculatePages: function() {
            var carousel = this.carousel().data('jcarousel'),
                items    = carousel.items(),
                clip     = carousel.clipping(),
                wh       = 0,
                idx      = 0,
                page     = 1,
                pages    = {},
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

                wh += carousel.dimension(curr);

                if (wh >= clip) {
                    page++;
                    wh = 0;
                }
            }

            return pages;
        }
    });
}(jQuery));
