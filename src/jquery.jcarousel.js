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

    var filterItemFirst = ':jcarouselitemfirst',
        filterItemLast  = ':jcarouselitemlast';

    $.jcarouselSub = $.sub();

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
        element:     null,
        list:        null,
        options:     {},
        animating:   false,
        tail:        0,
        inTail:      false,
        resizeTimer: null,
        lt:          null,
        vertical:    false,
        rtl:         false,
        circular:    false,
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

                var c = self.list.find('.jcarousel-clone');
                if (c.size() > 0) {
                    c.remove();
                    self.reload();
                }

                if ($.isFunction(callback)) {
                    callback.call(self, true);
                }
            };

            this.setup();

            return this;
        },
        setup: function() {
            if (false === this._notify('setup')) {
                return this;
            }

            this.list = this.element.find(this.options.list);
            this.reload();

            $(window).unbind('resize.jcarousel', this.onWindowResize).bind('resize.jcarousel', this.onWindowResize);

            this._notify('setupend');

            return this;
        },
        destroy: function() {
            if (false === this._notify('destroy')) {
                return this;
            }

            var all = this.items();
            $.each($j.itemData, function(i, name) {
                all.removeData('jcarousel' + name);
            });

            $(window).unbind('resize.jcarousel', this.onWindowResize);
            this.element.removeData('jcarousel');

            this._notify('destroyend');

            return this;
        },
        reload: function() {
            if (false === this._notify('reload')) {
                return this;
            }

            this.vertical = this.element.data('jcarousel-vertical') ||
                            ('' + this.element.attr('class')).toLowerCase().indexOf('jcarousel-vertical') > -1;

            this.rtl = ('' + this.element.attr('dir')).toLowerCase() === 'rtl' ||
                       this.element.parents('[dir]').filter(function() {
                           return (/rtl/i).test($(this).attr('dir'));
                       }).size() > 0;

            this.lt = this.vertical ? 'top' : 'left';

            var items = this.items(),
                item  = items.filter(filterItemFirst),
                end   = items.size() - 1;

            if (item.size() === 0) {
                item = items.eq(0);
            }

            this.circular = false;
            this.list.css({'left': 0, 'top': 0});

            if (item.size() > 0) {
                this._prepare(item);
                this.list.find('.jcarousel-clone').remove();

                // Reload items
                items = this.items();

                this.circular = this.options.wrap == 'circular' &&
                                (items.filter(filterItemFirst).index() > 0 ||
                                 items.filter(filterItemLast).index() < end);

                this.list.css(this.lt, this._position(item) + 'px');
            }

            this._notify('reloadend');

            return this;
        },
        items: function() {
            return this.list.find(this.options.items).not('.jcarousel-clone');
        },
        scrollBy: function(offset, animate, callback) {
            offset = $j.intval(offset);

            if (this.animating || !offset) {
                return this;
            }

            if (false === this._notify('scrollby', [offset])) {
                return this;
            }

            if ($.isFunction(animate)) {
                callback = animate;
                animate = true;
            }

            var items  = this.items(),
                end    = items.size() - 1,
                scroll = Math.abs(offset),
                self   = this,
                cb     = function() {
                    self._notify('scrollbyend');
                    if ($.isFunction(callback)) {
                        callback.call(self);
                    }
                },
                first,
                index,
                curr,
                i;

            if (offset > 0) {
                var last = items.filter(filterItemLast).index();

                if (last >= end && this.tail) {
                    if (!this.inTail) {
                        this._scrollTail(animate, cb);
                    } else {
                        if (this.options.wrap == 'both' || this.options.wrap == 'last') {
                            this._scroll(0, animate, cb);
                        } else {
                            this._scroll(end, animate, cb);
                        }
                    }
                } else {
                    if (last === end && (this.options.wrap == 'both' || this.options.wrap == 'last')) {
                        return this._scroll(0, animate, cb);
                    } else {
                        first = items.filter(filterItemFirst).index();
                        index = first + scroll;

                        if (this.circular && index > end) {
                            i = end;
                            curr = items.get(-1);

                            while (i++ < index) {
                                curr = this.items().eq(0);
                                curr.after(curr.clone(true).addClass('jcarousel-clone'));
                                this.list.append(curr);
                            }

                            this._scroll(curr, animate, cb);
                        } else {
                            this._scroll(Math.min(index, end), animate, cb);
                        }
                    }
                }
            } else {
                first = items.filter(filterItemFirst).index();
                index = first - scroll;

                if (this.inTail) {
                    this._scroll(Math.max(index + 1, 0), animate, cb);
                } else {
                    if (first === 0 && (this.options.wrap == 'both' || this.options.wrap == 'first')) {
                        this._scroll(end, animate, cb);
                    } else {
                        if (this.circular && index < 0) {
                            i = index;
                            curr = items.get(0);

                            while (i++ < 0) {
                                curr = this.items().eq(-1);
                                curr.after(curr.clone(true).addClass('jcarousel-clone'));
                                this.list.prepend(curr);
                                this.list.css(this.lt, $j.intval(this.list.css(this.lt)) - this._dimension(curr) + 'px');
                            }

                            this._scroll(curr, animate, cb);
                        } else {
                            this._scroll(Math.max(first - scroll, 0), animate, cb);
                        }
                    }
                }
            }

            return this;
        },
        scrollTo: function(item, animate, callback) {
            if (this.animating) {
                return this;
            }

            if (false === this._notify('scrollto', [typeof item === 'object' ? this.items().index(item) : item])) {
                return this;
            }

            if ($.isFunction(animate)) {
                callback = animate;
                animate = true;
            }

            var self = this,
                cb   = function(animated) {
                    self._notify('scrolltoend', [animated]);
                    if ($.isFunction(callback)) {
                        callback.call(self, animated);
                    }
                };

            this._scroll(item, animate, cb);

            return this;
        },
        _scroll: function(item, animate, callback) {
            if (this.animating) {
                return this;
            }

            if (typeof item !== 'object') {
                item = this.items().eq(item);
            }

            if (item.size() === 0) {
                callback(false);
                return this;
            }

            this.inTail = false;

            this._prepare(item);
            var pos = this._position(item);

            if (pos == $j.intval(this.list.css(this.lt))) {
                callback(false);
                return this;
            }

            var properties = {};
            properties[this.lt] = pos + 'px';

            this._animate(properties, animate, callback);

            return this;
        },
        _scrollTail: function(animate, callback) {
            if (this.animating || !this.tail) {
                return this;
            }

            var pos = this.list.position()[this.lt];

            this.rtl ? pos += this.tail : pos -= this.tail;
            this.inTail = true;

            var properties = {};
            properties[this.lt] = pos + 'px';

            this._animate(properties, animate, callback);

            return this;
        },
        _animate: function(properties, animate, callback) {
            if (this.animating) {
                return this;
            }

            this.animating = true;

            if (!this.options.animation || animate === false) {
                this.list.css(properties);
                this.onAnimationComplete(callback);
            } else {
                var self        = this,
                    opts        = typeof this.options.animation === 'object' ?
                                      this.options.animation :
                                      {duration: this.options.animation},
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
        _prepare: function(item) {
            var items   = this.items(),
                index   = items.index(item),
                idx     = index,
                wh      = this._dimension(item),
                clip    = this._clipping(),
                update  = {
                    first:   item,
                    last:    item,
                    visible: item
                },
                curr;

            if (wh < clip) {
                while (true) {
                    curr = this.items().eq(++idx);
                    if (curr.size() === 0) {
                        if (this.circular) {
                            curr = this.items().eq(0);
                            curr.after(curr.clone(true).addClass('jcarousel-clone'));
                            this.list.append(curr);
                        } else {
                            break;
                        }
                    }
                    wh += this._dimension(curr);
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
                    curr = this.items().eq(idx);
                    if (curr.size() === 0) {
                        break;
                    }
                    wh += this._dimension(curr);
                    update.first = curr;
                    update.visible = update.visible.add(curr);
                    if (wh >= clip) {
                        break;
                    }
                }
            }

            this._update(update);

            this.tail = 0;

            if (this.options.wrap !== 'circular' && this.options.wrap !== 'custom' && update.last.index() === (this.items().size() - 1)) {
                // Remove right/bottom margin from total width
                var lrb = this.vertical ? 'bottom' : (this.rtl ? 'left'  : 'right');
                wh -= $j.intval(update.last.css('margin-' + lrb));
                if (wh > clip) {
                    this.tail = wh - clip;
                }
            }

            return this;
        },
        _position: function(item) {
            var items = this.items(),
                first = items.filter(filterItemFirst),
                pos   = first.position()[this.lt];

            if (this.rtl && !this.vertical) {
                pos -= this._clipping() - this._dimension(first);
            }

            if ((items.index(item) ===  (items.size() - 1) || this.inTail) && this.tail) {
                pos = this.rtl ? pos - this.tail : pos + this.tail;
                this.inTail = true;
            } else {
                this.inTail = false;
            }

            return -pos;
        },
        _update: function(update) {
            var items = this.items(),
                first = items.filter(filterItemFirst),
                last  = items.filter(filterItemLast);

            $.each($j.itemData, function(i, name) {
                items.data('jcarouselitem' + name, false);
            });

            $.each($j.itemData, function(i, name) {
                update[name].data('jcarouselitem' + name, true);
            });

            if (update.first.get(0) !== first.get(0)) {
                update.first.trigger('jcarouselitemfirstin');
                first.trigger('jcarouselitemfirstout');
            }

            if (update.last.get(0) !== last.get(0)) {
                update.last.trigger('jcarouselitemlastin');
                last.trigger('jcarouselitemlastout');
            }

            var v    = items.filter(':jcarouselitemvisible'),
                vin  = update.visible.filter(function() {
                    return $.inArray(this, v) < 0;
                }),
                vout = v.filter(function() {
                    return $.inArray(this, update.visible) < 0;
                }),
                fidx = first.size() > 0 ? first.index() : 0;

            if (items.index(update.first) >= fidx) {
                vout = $().pushStack(vout.get().reverse());
            } else {
                vin = $().pushStack(vin.get().reverse());
            }

            vin.trigger('jcarouselitemvisiblein');
            vout.trigger('jcarouselitemvisibleout');

            return this;
        },
        _notify: function(event, data) {
            var e = $.Event('jcarousel' + event);
            this.element.trigger(e, data);
            if ($j.hooks[event]) {
                for (var i = 0, l = $j.hooks[event].length; i < l; i++) {
                    $j.hooks[event][i].call(this, e);
                }
            }
            return !e.isDefaultPrevented();
        },
        _clipping: function() {
            return this.element['inner' + (this.vertical ? 'Height' : 'Width')]();
        },
        _dimension: function(el) {
            // outerWidth()/outerHeight() doesn't seem to work on hidden elements
            return this.vertical ?
                el.innerHeight()  +
                    $j.intval(el.css('margin-top')) +
                    $j.intval(el.css('margin-bottom')) +
                    $j.intval(el.css('border-top-width')) +
                    $j.intval(el.css('border-bottom-width')) :
                el.innerWidth() +
                    $j.intval(el.css('margin-left')) +
                    $j.intval(el.css('margin-right')) +
                    $j.intval(el.css('border-left-width')) +
                    $j.intval(el.css('border-right-width'));
        }
    });

    $j.extend({
        options: {
            list:      '>ul:eq(0)',
            items:     '>li',
            animation: 'normal',
            wrap:      null
        },
        hooks: {},
        itemData: ['first', 'last', 'visible'],
        hook: function(types, callback) {
            types = types.split(" ");
            var type, i = 0;
            while ((type = types[i++])) {
                if (!$j.hooks[type]) {
                    $j.hooks[type] = [];
                }
                $j.hooks[type].push(callback);
            }
        },
        api: function(methods) {
            $.each(methods, function(method, ret) {
                if (!$.isFunction(ret)) {
                    ret = (function(method, ret) {
                        return function() {
                            var j = this.data('jcarousel'),
                                res = j[method].apply(j, arguments);
                            return ret ? this : res;
                        };
                    })(method, ret);
                }

                $.jcarouselSub.fn[method] = ret;
            });
        },
        intval: function(v) {
            v = parseInt(v, 10);
            return isNaN(v) ? 0 : v;
        }
    });

    $.expr.filters.jcarousel = function(elem) {
        return !!$.data(elem, 'jcarousel');
    };

    $.each($j.itemData, function(i, name) {
        $.expr.filters['jcarouselitem'  + name] = function(elem) {
            return !!$.data(elem, 'jcarouselitem'  + name);
        };
    });

    $.jcarousel.api({
        destroy: function() {
            this.data('jcarousel').destroy();
            // Exit out of jCarousel specific subclass and return original jQuery object
            return $(this);
        },
        reload:   true,
        items:    true,
        scrollBy: true,
        scrollTo: true
    });

    $.fn.jcarousel = function(o) {
        return $.jcarouselSub(this).each(function() {
            var j = $(this).data('jcarousel');
            if (j) {
                $.extend(true, j.options, o || {});
            } else {
                $j(this, o);
            }
        });
    };

})(jQuery, window);
