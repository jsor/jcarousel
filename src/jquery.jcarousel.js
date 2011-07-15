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
(function($, window, undefined) {

    var filterItemFirst = ':jcarouselitemfirst',
        filterItemLast  = ':jcarouselitemlast',
        itemData        = ['first', 'last', 'visible'],
        plugins         = {};

    var $j = $.jcarousel = function(element, options) {
        // Allow instantiation without the 'new' keyword
        if (!this.jcarousel) {
            return new $j(element, options);
        }

        this._init(element, options);
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
        plugins:     {},
        _init: function(element, options) {
            this.element  = $(element);
            this.options  = $j.dataOptions(this.element, $.extend(true, {}, $j.defaults, options));

            this.element.data('jcarousel', this);

            if (this.options.events) {
                this._bind(this.options.events);
            }

            var self = this;

            $.each(plugins, function(name, plugin) {
                self.plugins[name] = new plugin(self);
            });

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

                self._trigger('animateEnd');

                if ($.isFunction(callback)) {
                    callback.call(self, true);
                }
            };

            // Safari wants this
            window.setTimeout(function() {
                 self.setup();
            }, 10);

            return this;
        },
        setup: function() {
            if (false === this._trigger('setup')) {
                return this;
            }

            this.list = this.element.find(this.options.list);

            this.reload();

            $(window).unbind('resize.jcarousel', this.onWindowResize).bind('resize.jcarousel', this.onWindowResize);

            this._trigger('setupEnd');

            return this;
        },
        destroy: function() {
            if (false === this._trigger('destroy')) {
                return this;
            }

            var items = this.items().unbind('.jcarousel');

            $.each(itemData, function(i, name) {
                items.removeData('jcarousel' + name);
            });

            $(window).unbind('resize.jcarousel', this.onWindowResize);

            this.element
                .unbind('.jcarousel')
                .removeData('jcarousel');

            this._trigger('destroyEnd');

            return this;
        },
        reload: function() {
            if (false === this._trigger('reload')) {
                return this;
            }

            this.vertical = this.options.vertical == null ?
                ('' + this.element.attr('class')).toLowerCase().indexOf('jcarousel-vertical') > -1 :
                this.options.vertical;

            this.rtl = this.options.rtl == null ?
                ('' + this.element.attr('dir')).toLowerCase() === 'rtl' ||
                this.element.parents('[dir]').filter(function() {
                    return (/rtl/i).test($(this).attr('dir'));
                }).size() > 0 :
                this.options.rtl;

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

            this._trigger('reloadEnd');

            return this;
        },
        option: function(key, value) {
            if (arguments.length === 0) {
                return $.extend({}, this.options);
            }

            if (typeof key === "string") {
                if (value === undefined) {
                    return this.options[key] === undefined ? null : this.options[key];
                }

                this.options[key] = value;
            } else {
                $.extend(true, this.options, key);
            }

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

            if (false === this._trigger('scrollBy', null, [offset])) {
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
                cb     = function(animated) {
                    self._trigger('scrollByEnd', null, [animated]);
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
                                this.list.css(this.lt, $j.intval(this.list.css(this.lt)) - this.dimension(curr) + 'px');
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

            if (false === this._trigger('scrollTo', null, [typeof item === 'object' ? this.items().index(item) : item])) {
                return this;
            }

            if ($.isFunction(animate)) {
                callback = animate;
                animate = true;
            }

            var self = this,
                cb   = function(animated) {
                    self._trigger('scrollToEnd', null, [animated]);
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

            if (false === this._trigger('animate')) {
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
                wh      = this.dimension(item),
                clip    = this.clipping(),
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

                    curr = this.items().eq(idx);

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
                pos -= this.clipping() - this.dimension(first);
            }

            if ((items.index(item) > items.index(first) || this.inTail) && this.tail) {
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

            $.each(itemData, function(i, name) {
                items.data('jcarouselitem' + name, false);
            });

            $.each(itemData, function(i, name) {
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
        _trigger: function(type, event, data) {
            return $j.trigger(this.element, type, event, data);
        },
        _bind: function(event, handler) {
            $j.bind(this, this.element, event, handler);
            return this;
        },
        clipping: function() {
            return this.element['inner' + (this.vertical ? 'Height' : 'Width')]();
        },
        dimension: function(element) {
            // outerWidth()/outerHeight() doesn't seem to work on hidden elements
            return this.vertical ?
                element.innerHeight()  +
                    $j.intval(element.css('margin-top')) +
                    $j.intval(element.css('margin-bottom')) +
                    $j.intval(element.css('border-top-width')) +
                    $j.intval(element.css('border-bottom-width')) :
                element.innerWidth() +
                    $j.intval(element.css('margin-left')) +
                    $j.intval(element.css('margin-right')) +
                    $j.intval(element.css('border-left-width')) +
                    $j.intval(element.css('border-right-width'));
        }
    });

    $j.extend({
        defaults: {
            list:      '>ul:eq(0)',
            items:     '>li',
            animation: 'normal',
            wrap:      null,
            vertical:  null,
            rtl:       null
        },
        plugin: function(name, plugin) {
            plugins[name] = plugin;
        },
        intval: function(value) {
            value = parseInt(value, 10);
            return isNaN(value) ? 0 : value;
        },
        dataOptions: function(element, options) {
            $.each(options, function(option) {
                var value = element.data('jcarousel-' + option.replace(/[A-Z]/g, function(c) {
                        return "-" + c.toLowerCase();
                    })
                );

                if (value !== undefined) {
                    options[option] = value;
                }
            });

            return options;
        },
        trigger: function(element, type, event, data) {
            event = $.Event(event);
            event.type = ('jcarousel' + type).toLowerCase();
            data = data || {};

            // copy original event properties over to the new event
            // this would happen if we could call $.event.fix instead of $.Event
            // but we don't have a way to force an event to be fixed multiple times
            if (event.originalEvent) {
                for (var i = $.event.props.length, prop; i;) {
                    prop = $.event.props[--i];
                    event[prop] = event.originalEvent[prop];
                }
            }

            element.trigger(event, data);

            return !event.isDefaultPrevented();
        },
        bind: function(instance, element, event, handler) {
            var events = {};
            if (typeof event === 'string') {
                events[event] = handler;
            } else {
                events = event;
            }

            $.each(events, function(event, handler) {
                element.bind('jcarousel' + event.toLowerCase() + '.jcarousel', function() {
                    handler.apply(instance, arguments);
                });
            });
        }
    });

    $.expr.filters.jcarousel = function(element) {
        return !!$.data(element, 'jcarousel');
    };

    $.each(itemData, function(i, name) {
        $.expr.filters['jcarouselitem'  + name] = function(element) {
            return !!$.data(element, 'jcarouselitem' + name);
        };
    });

    $.fn.jcarousel = function(options) {
        var args        = Array.prototype.slice.call(arguments, 1),
            returnValue = this;

        if (typeof options === "string") {
            this.each(function() {
                var instance = $.data(this, 'jcarousel');

                if (!instance) {
                    return $.error("Cannot call methods prior to initialization; attempted to call method '" + options + "'");
                }

                if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                    return $.error("No such method '" + options + "'");
                }

                var methodValue = instance[options].apply(instance, args);

                if (methodValue !== instance && methodValue !== undefined) {
                    returnValue = methodValue;
                    return false;
                }
            });
        } else {
            this.each(function() {
                var instance = $.data(this, 'jcarousel');

                if (instance) {
                    if (options) {
                        instance.option(options).reload();
                    }
                } else {
                    $j(this, options);
                }
            });
        }

        return returnValue;
    };

})(jQuery, window);
