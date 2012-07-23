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
(function (window) {
    'use strict';

    (function (factory) {
        if (typeof define === 'function' && define.amd) {
            define('jquery.jcarousel.pagination', ['jquery', 'jquery.jcarousel'], factory);
        } else {
            factory(window.jQuery, window.jCarousel);
        }
    }(function ($, jCarousel) {
        jCarousel.plugin('jcarouselPagination', {
            _options: {
                perPage: null,
                item: function(page) {
                    return '<a href="#' + page + '">' + page + '</a>';
                }
            },
            _current: null,
            _pages: {},
            _items: {},
            _init: function() {
                this.onReload = $.proxy(this._reload, this);
                this.onScroll = $.proxy(this.update, this);
            },
            _create: function() {
                this.carousel()
                    .one('destroy.jcarousel', $.proxy(function() {
                        this._destroy();
                        this.carousel().one('createend.jcarousel', $.proxy(this._create, this));
                    }, this))
                    .bind('reloadend.jcarousel', this.onReload)
                    .bind('scrollend.jcarousel', this.onScroll);

                this._reload();
            },
            _destroy: function() {
                this._element.empty();

                this.carousel()
                    .unbind('reloadend.jcarousel', this.onReload)
                    .unbind('scrollend.jcarousel', this.onScroll);
            },
            _reload: function() {
                var perPage = this.options('perPage');

                this._pages = {};
                this._items = {};

                // Calculate pages
                if (perPage == null) {
                    this._pages = this._calculatePages();
                } else if ($.isFunction(perPage)) {
                    this._pages = perPage.call(this);
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

                var self = this,
                    element = this._element.empty(),
                    item = this.options('item');

                $.each(this._pages, function(page, carouselItems) {
                    self._items[page] = $(item.call(self, page, carouselItems))
                        .click(function(e) {
                            e.preventDefault();
                            self.carousel().jcarousel('scroll', carouselItems.eq(0));
                        })
                        .appendTo(element);
                });

                this._current = null;
                this.update();
            },
            current: function() {
                return this._current;
            },
            items: function() {
                return this._items;
            },
            update: function() {
                var target = this.carousel().jcarousel('target'),
                    current = null;

                $.each(this._pages, function(page, carouselItems) {
                    if (carouselItems.index(target) >= 0) {
                        current = page;
                        return false;
                    }
                });

                if (current !== this._current) {
                    if (this._current) {
                        this._trigger('iteminactive', this._items[this._current]);
                    }

                    this._trigger('itemactive', this._items[current]);
                    this._current = current;
                }
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
    }));
}(window));
