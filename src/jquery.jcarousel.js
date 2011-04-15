/*!
 * jCarousel v@VERSION - Riding carousels with jQuery
 * http://sorgalla.com/jcarousel/
 *
 * Copyright 2011, Jan Sorgalla
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * or GPL Version 2 (http://www.opensource.org/licenses/gpl-2.0.php) licenses.
 *
 * Date: @DATE
 */
(function($, window) {

    var $j = $.jcarousel = function(el, opts) {
        // Allow instantiation without the 'new' keyword
        if (!this.jcarousel) {
            return new $.jcarousel(el, opts);
        }

        this.init(el, opts);
    };

    $j.fn = $j.prototype = {
        jcarousel: '@VERSION'
    };

    $j.fn.extend = $j.extend = $.extend;

    $j.fn.extend({
        element: null,
        list: null,
        options: {},
        first: $(),
        last: $(),
        visible: $(),
        animating: false,
        tail: 0,
        inTail: false,
        resizeTimer: null,
        lt: null,
        wh: null,
        rlt: null,
        lrb: null,
        vertical: false,
        rtl: false,
        circular: false,
        init: function(el, opts) {
            this.element = $(el);
            this.options = $.extend(true, {}, $j.options, opts);

            this.element.data('jcarousel', this);

            var self = this;

            this.onWindowResize = function() {
                if (self.resizeTimer) {
                    clearTimeout(self.resizeTimer);
                }

                self.resizeTimer = setTimeout(function() {
                    self.reload();
                }, 100);
            };

            this.onAnimationComplete = function(callback) {
                self.animating = false;
                self.remove('.jcarousel-clone');
                if ($.isFunction(callback)) {
                    callback.call(self, true);
                }
            };

            this.setup();

            return this;
        },
        setup: function() {
            this.element.trigger('jcarouselsetup');

            this.list = this.element.find(this.options.list);
            this.reload();

            $(window).unbind('resize.jcarousel', this.onWindowResize).bind('resize.jcarousel', this.onWindowResize);

            this.element.trigger('jcarouselsetupend');

            return this;
        },
        destroy: function() {
            this.element.trigger('jcarouseldestroy');

            var all = this.get();
            $.each($j.itemData, function(i, name) {
                all.removeData('jcarousel' + name);
            });

            $(window).unbind('resize.jcarousel', this.onWindowResize);
            this.element.removeData('jcarousel');

            this.element.trigger('jcarouseldestroyend');

            return this;
        },
        reload: function() {
            this.element.trigger('jcarouselreload');

            this.vertical = this.element.data('jcarousel-vertical') ||
                            this.element.attr('class').toLowerCase().indexOf('jcarousel-vertical') > -1;

            this.rtl = this.element.attr('dir').toLowerCase() === 'rtl' ||
                       this.element.parents('[dir]').filter(function() {
                           return (/rtl/i).test($(this).attr('dir'));
                       }).size() > 0;

            this.wh  = !this.vertical ? 'width' : 'height';
            this.lt  = !this.vertical ? 'left'  : 'top';
            this.rlt = !this.vertical ? (this.rtl ? 'right' : 'left')  : 'top';
            this.lrb = !this.vertical ? (this.rtl ? 'left'  : 'right') : 'bottom';

            var item, end = this.size() - 1;

            if (this.first.size() > 0) {
                item = this.first;
            } else {
                item = this.get(this.options.start > end ? -1 : this.options.start);
            }

            this.circular = false;

            this.positions(item);
            this.remove('.jcarousel-clone');

            this.circular = this.options.wrap == 'circular' && (this.index(this.first) > 0 || this.index(this.last) < end);

            var pos = this.first.position()[this.lt];

            if (this.rtl && !this.vertical) {
                pos -= this.element[!this.vertical ? 'innerWidth' : 'innerHeight']() - this.dimension(this.first);
            }

            if ((this.index(item) === end || this.inTail) && this.tail) {
                pos = this.rtl ? pos - this.tail : pos + this.tail;
                this.inTail = true;
            } else {
                this.inTail = false;
            }

            this.list.css({'left': 0, 'top': 0}).css(this.lt, -(pos) + 'px');

            this.element.trigger('jcarouselreloadend');

            return this;
        },
        size: function() {
            return this.list.find(this.options.items).size();
        },
        get: function(index) {
            if (index == null) {
                return this.list.find(this.options.items);
            }

            var t = $.type(index);

            if (t === 'number') {
                return this.list.find(this.options.items).eq(index);
            } else if (t === 'string') { // Selector
                return this.list.find(this.options.items).filter(index);
            } else { // Object, wrap in jQuery instance
                return $(index);
            }
        },
        index: function(item) {
            return this.list.find(this.options.items).index(item);
        },
        remove: function(item) {
            item = this.get(item);

            if (item.size() > 0) {
                var self = this;
                item.each(function() {
                    if (self.first.size() > 0 && this === self.first.get(0)) {
                        self.first = self.first.next();
                    }
                    item.remove();
                });

                this.reload();
            }

            return this;
        },
        next: function(callback) {
            if (this.animating) {
                return this;
            }

            this.element.trigger('jcarouselnext');

            var last = this.index(this.last),
                end = this.size() - 1,
                scroll = Math.min(this.options.scroll, end),
                self = this,
                cb = function() {
                    self.element.trigger('jcarouselnextend');
                    if ($.isFunction(callback)) {
                        callback.call(self);
                    }
                };

            if (last >= end && this.tail) {
                if (!this.inTail) {
                    this.scrollTail(false, cb);
                } else {
                    if (this.options.wrap == 'both' || this.options.wrap == 'last') {
                        this.scroll(0, cb);
                    }
                }
            } else {
                if (last === end && (this.options.wrap == 'both' || this.options.wrap == 'last')) {
                    return this.scroll(0, cb);
                } else {
                    var first = this.index(this.first), index = first + scroll;

                    if (this.circular) {
                        var i = scroll, cl = 0;

                        while (i-- > 0 && cl++ < first) {
                            var curr = this.get(0);
                            curr.after(curr.clone().addClass('jcarousel-clone'));
                            this.list.append(curr);
                            index--;
                        }
                    }

                    this.scroll(Math.min(index, end), cb);
                }
            }

            return this;
        },
        prev: function(callback) {
            if (this.animating) {
                return this;
            }

            this.element.trigger('jcarouselprev');

            var first = this.index(this.first),
                end = this.size() - 1,
                scroll = Math.min(this.options.scroll, end),
                self = this,
                cb = function() {
                    self.element.trigger('jcarouselprevend');
                    if ($.isFunction(callback)) {
                        callback.call(self);
                    }
                };

            if (this.inTail) {
                if (first <= (this.index(this.last) - scroll)) {
                    this.scrollTail(true, cb);
                } else {
                    this.scroll(Math.max(first - scroll, 0), cb);
                }
            } else {
                if (first === 0 && (this.options.wrap == 'both' || this.options.wrap == 'first')) {
                    this.scroll(end, cb);
                } else {
                    if (this.circular && (first - scroll) < 0) {
                        var i = first - scroll, cl = end, last = this.index(this.last);

                        while (i++ < 0 && cl-- > last) {
                            var curr = this.get(-1);
                            curr.after(curr.clone().addClass('jcarousel-clone'));
                            this.list.prepend(curr);
                            this.list.css(this.lt, $j.intval(this.list.css(this.lt)) - this.dimension(curr) + 'px');
                        }
                    }

                    this.scroll(Math.max(first - scroll, 0), cb);
                }
            }

            return this;
        },
        scrollTail: function(back, callback) {
            if (this.animating || !this.tail) {
                return this;
            }

            this.element.trigger('jcarouselscrolltail', [back]);

            var pos = this.list.position()[this.lt],
                self = this,
                cb = function() {
                    self.element.trigger('jcarouselscrolltailend', [back]);
                    if ($.isFunction(callback)) {
                        callback.call(self);
                    }
                };

            this.rtl ?
                (!back ? pos += this.tail : pos -= this.tail) :
                (!back ? pos -= this.tail : pos += this.tail);

            this.inTail = !back;

            var properties = {};
            properties[this.lt] = pos + 'px';

            this.animate(properties, true, cb);

            return this;
        },
        scroll: function(item, animate, callback) {
            if (this.animating) {
                return this;
            }

            this.element.trigger('jcarouselscroll', [typeof item === 'object' ? this.index(item) : item]);

            if ($.isFunction(animate)) {
                callback = animate;
                animate = true;
            }

            var self = this,
                cb = function(animated) {
                    self.element.trigger('jcarouselscrollend', [animated]);
                    if ($.isFunction(callback)) {
                        callback.call(self, animated);
                    }
                };

            item = this.get(item);

            if (item.size() === 0) {
                cb.call(this, false);
                return this;
            }

            this.inTail = false;

            this.positions(item);

            if ((this.first.offset()[this.lt] - $j.intval(this.element.css('border-' + this.rlt + '-width'))) === this.element.offset()[this.lt]) {
                cb.call(this, false);
                return this;
            }

            var pos = this.first.position()[this.lt];

            if (this.rtl && !this.vertical) {
                pos -= this.element[!this.vertical ? 'innerWidth' : 'innerHeight']() - this.dimension(this.first);
            }

            // If we scroll to the last item, force it to be visible if it's in tail
            if (this.index(item) === (this.size() - 1) && this.tail) {
                pos = this.rtl ? pos - this.tail : pos + this.tail;
                this.inTail = true;
            }

            var properties = {};
            properties[this.lt] = -(pos) + 'px';

            this.animate(properties, animate, cb);

            return this;
        },
        animate: function(properties, animate, callback) {
            if (this.animating) {
                return this;
            }

            this.animating = true;

            if (!this.options.animation || animate === false) {
                this.list.css(properties);
                this.onAnimationComplete(callback);
            } else {
                var self = this, 
                    opts = typeof this.options.animation === 'object' ? this.options.animation : {duration: this.options.animation},
                    oldcomplete = opts.complete;

                opts.complete = function() {
                    self.onAnimationComplete(callback);
                    if ($.isFunction(oldcomplete)) {
                        oldcomplete.call(this);
                    }
                };

                this.list.animate(properties, opts);
            }

            return this;
        },
        positions: function(item) {
            var index   = this.index(item),
                idx     = index,
                wh      = this.dimension(item),
                clip    = this.clipping(),
                update  = {
                    first:   item,
                    last:    item,
                    visible: item
                },
                curr;

            if (wh < clip) {
                var fidx = this.first.size() > 0 ? this.index(this.first) : 0,
                    cl   = 0;

                while (true) {
                    curr = this.get(++idx);
                    if (curr.size() === 0) {
                        if (this.circular && cl++ < fidx) {
                            curr = this.get(0);
                            curr.after(curr.clone(false, false).addClass('jcarousel-clone'));
                            this.list.append(curr);
                        } else {
                            break;
                        }
                    }
                    wh += this.dimension(curr);
                    update.last = curr;
                    update.visible = update.visible.add(curr);
                    if (wh >= clip) {
                        break;
                    }
                }
            }

            if (wh < clip) {
                idx = index;

                while (true) {
                    if (--idx < 0) {
                        break;
                    }
                    curr = this.get(idx);
                    if (curr.size() === 0) {
                        break;
                    }
                    wh += this.dimension(curr);
                    update.first = curr;
                    update.visible = update.visible.add(curr);
                    if (wh >= clip) {
                        break;
                    }
                }
            }

            this.update(update);

            this.first   = update.first;
            this.last    = update.last;
            this.visible = update.visible;
            this.tail    = 0;

            if (this.options.wrap !== 'circular' && this.options.wrap !== 'custom' && this.index(this.last) === (this.size() - 1)) {
                // Remove right/bottom margin from total width
                wh -= $j.intval(this.last.css('margin-' + this.lrb));
                if (wh > clip) {
                    this.tail = wh - clip;
                }
            }

            return this;
        },
        update: function(update) {
            var all = this.get();

            $.each($j.itemData, function(i, name) {
                all.data('jcarouselitem' + name, false);
            });

            $.each($j.itemData, function(i, name) {
                update[name].data('jcarouselitem' + name, true);
            });

            if (update.first.get(0) !== this.first.get(0)) {
                update.first.trigger('jcarouselitemfirstin');
                this.first.trigger('jcarouselitemfirstout');
            }

            if (update.last.get(0) !== this.last.get(0)) {
                update.last.trigger('jcarouselitemlastin');
                this.last.trigger('jcarouselitemlastout');
            }

            var v = this.visible,
                vin = update.visible.filter(function() {
                    return $.inArray(this, v) < 0;
                }),
                vout = v.filter(function() {
                    return $.inArray(this, update.visible) < 0;
                }),
                fidx = this.first.size() > 0 ? this.index(this.first) : 0;

            if (this.index(update.first) >= fidx) {
                vout = $().pushStack(vout.get().reverse());
            } else {
                vin = $().pushStack(vin.get().reverse());
            }

            vin.trigger('jcarouselitemvisiblein');
            vout.trigger('jcarouselitemvisibleout');

            return this;
        },
        clipping: function() {
            return this.element['inner' + (!this.vertical ? 'Width' : 'Height')]();
        },
        dimension: function(el) {
            // outerWidth()/outerHeight() doesn't seem to work on hidden elements
            return !this.vertical ?
                el.innerWidth() +
                    $j.intval(el.css('margin-left')) +
                    $j.intval(el.css('margin-right')) +
                    $j.intval(el.css('border-left-width')) +
                    $j.intval(el.css('border-right-width')) :
                el.innerHeight()  +
                    $j.intval(el.css('margin-top')) +
                    $j.intval(el.css('margin-bottom')) +
                    $j.intval(el.css('border-top-width')) +
                    $j.intval(el.css('border-bottom-width'));
        }
    });

    $.each(['after', 'before', 'replaceWith'], function(i, name) {
        $j.fn[name] = function(element, item) {
            item = this.get(item);

            if (item.size() > 0) {
                item[name](element);
                this.reload();
            }

            return this;
        };
    });

    $.each(['prepend', 'append'], function(i, name) {
        $j.fn[name] = function(element) {
            this.list[name](element);
            this.reload();

            return this;
        };
    });

    $j.extend({
        options: {
            list:      '>ul:eq(0)',
            items:     '>li',
            start:     0,
            scroll:    1,
            animation: 'normal',
            wrap:      null
        },
        itemData: ['first', 'last', 'visible'],
        intval: function(v) {
            v = parseInt(v, 10);
            return isNaN(v) ? 0 : v;
        }
    });

    $.expr.filters.jcarousel = function(elem) {
        return $.data(elem, 'jcarousel') != null;
    };

    $.each($j.itemData, function(i, name) {
        $.expr.filters['jcarouselitem'  + name] = function(elem) {
            return $.data(elem, 'jcarouselitem'  + name);
        };
    });

    $.fn.jcarousel = function(o) {
        var args = Array.prototype.slice.call(arguments, 1), returnResult = false, result;
        this.each(function() {
            var j = $(this).data('jcarousel');
            if (typeof o === 'string') {
                var r = j[o].apply(j, args);
                if (r !== j) {
                    returnResult = true;
                    result = r;
                    return false;
                }
            } else {
                if (j) {
                    $.extend(true, j.options, o || {});
                } else {
                    $j(this, o);
                }
            }
        });

        return returnResult ? result : this;
    };

})(jQuery, window);
