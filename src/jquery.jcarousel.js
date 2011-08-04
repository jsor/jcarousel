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

    var filterItemFirst    = ':jcarousel-item-first',
        filterItemLast     = ':jcarousel-item-last',
        filterItemVisible  = ':jcarousel-item-visible',
        itemData           = ['first', 'last', 'visible'];

    var $j = $.jcarousel = function(element, options) {
        // Allow instantiation without the 'new' keyword
        if (!this.jcarousel) {
            return new $j(element, options);
        }

        this._init(element, options);
    };

    $.extend($j, {
        plugins: {},
        intval: function(value) {
            value = parseInt(value, 10);
            return isNaN(value) ? 0 : value;
        },
        detect: function(object) {
            object = $(object);

            var instance;

            while (object.size() > 0) {
                instance = object.filter(':jcarousel').data('jcarousel') ||
                           object.find(':jcarousel').data('jcarousel');
                if (instance) {
                    break;
                }

                object = object.end().parent();
            }

            return instance;
        },
        dataOptions: function(element, options) {
            var dataOptions = {};
            $.each(options, function(option) {
                var value = element.data('jcarousel-' + option.replace(/[A-Z]/g, function(c) {
                        return '-' + c.toLowerCase();
                    })
                );

                if (value !== undefined) {
                    dataOptions[option] = value;
                }
            });

            return dataOptions;
        },
        trigger: function(element, type, data, event) {
            event = $.Event(event);
            event.type = ('jcarousel' + type).toLowerCase();
            data = data || {};

            if (event.originalEvent) {
                for (var i = $.event.props.length, prop; i;) {
                    prop = $.event.props[--i];
                    event[prop] = event.originalEvent[prop];
                }
            }

            element.trigger(event, data);

            return !event.isDefaultPrevented();
        }
    });

    $.extend($j.prototype, {
        jcarousel: '@VERSION',
        element:     null,
        list:        null,
        options:     {
            list:      '>ul:eq(0)',
            items:     '>li',
            animation: 'normal',
            wrap:      null,
            vertical:  null,
            rtl:       null,
            center:    false
        },
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
            this.element.data('jcarousel', this);

            var self = this;

            $.each($j.plugins, function(name, plugin) {
                self.plugins[name] = new plugin(self);
            });

            // Set passed options
            this.option(options || {});

            // Allow overwriting of options via data-* attributes
            this.option($j.dataOptions(this.element, this.options));

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

            this._setup();

            return this;
        },
        _setup: function() {
            if (false === this._trigger('setup')) {
                return this;
            }

            this.list = this.element.find(this.options.list);

            this._reload();

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
                items.removeData('jcarousel-item-' + name);
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

            this._reload();

            this._trigger('reloadEnd');

            return this;
        },
        option: function(key, value) {
            var options = key,
                parts,
                curOption,
                i;

            if (arguments.length === 0) {
                // Don't return a reference to the internal hash
                return $.extend({}, this.options);
            }

            if (typeof key === 'string') {
                // Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
                options = {};
                parts = key.split('.');
                key = parts.shift();

                if (parts.length) {
                    curOption = options[key] = $.extend({}, this.options[key]);

                    for (i = 0; i < parts.length - 1; i++) {
                        curOption[parts[i]] = curOption[parts[i]] || {};
                        curOption = curOption[parts[i]];
                    }

                    key = parts.pop();

                    if (value === undefined) {
                        return curOption[key] === undefined ? null : curOption[key];
                    }

                    curOption[key] = value;
                } else {
                    if (value === undefined) {
                        return this.options[key] === undefined ? null : this.options[key];
                    }

                    options[key] = value;
                }

                this.options = $.extend(true, {}, this.options, options);
            } else {
                var self = this;
                $.each(options, function(key, val) {
                    self.option(key, val);
                });
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

            if (false === this._trigger('scrollBy', null, [offset, animate])) {
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

            if (false === this._trigger('scrollTo', null, [item, animate])) {
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
        _reload: function() {
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

            // _prepare() needs this here
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
                wh      = this._dimension(item),
                clip    = this._clipping(),
                update  = {
                    first:   item,
                    last:    item,
                    visible: item
                },
                curr;

            if (this.options.center) {
                wh /= 2;
                clip /= 2;
            }

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

            if (this.options.center) {
                pos -= (this._clipping() / 2) - (this._dimension(first) / 2);
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
                items.data('jcarousel-item-' + name, false);
            });

            $.each(itemData, function(i, name) {
                update[name].data('jcarousel-item-' + name, true);
            });

            if (update.first.get(0) !== first.get(0)) {
                this._trigger('itemFirstIn', update.first);
                this._trigger('itemFirstOut', first);
            }

            if (update.last.get(0) !== last.get(0)) {
                this._trigger('itemLastIn', update.last);
                this._trigger('itemLastOut', last);
            }

            var v    = items.filter(filterItemVisible),
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

            this._trigger('itemVisibleIn', vin);
            this._trigger('itemVisibleOut', vout);

            return this;
        },
        _trigger: function(type, element, data) {
            element = element || this.element;
            return $j.trigger(element, type, [this].concat(data || []));
        },
        _clipping: function() {
            return this.element['inner' + (this.vertical ? 'Height' : 'Width')]();
        },
        _dimension: function(element) {
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

    $.expr[':'].jcarousel = function(element) {
        return !!$.data(element, 'jcarousel');
    };

    $.each(itemData, function(i, name) {
        $.expr[':']['jcarousel-item-'  + name] = function(element) {
            return !!$.data(element, 'jcarousel-item-' + name);
        };
    });

    $.fn.jcarousel = function(options) {
        var args        = Array.prototype.slice.call(arguments, 1),
            returnValue = this;

        if (typeof options === 'string') {
            var parts = options.split('.'),
                plugin = parts[1] ? parts[0] : null,
                method = parts[1] || parts[0];

            this.each(function() {
                var instance = $.data(this, 'jcarousel');

                if (!instance) {
                    return $.error('Cannot call methods prior to initialization; attempted to call method "' + options + '"');
                }

                if (plugin) {
                    if (!instance.plugins[plugin]) {
                        return $.error('No such plugin "' + plugin + '"');
                    }

                    instance = instance.plugins[plugin];
                }

                if (!$.isFunction(instance[method]) || method.charAt(0) === "_") {
                    return $.error('No such method "' + method + '"');
                }

                var methodValue = instance[method].apply(instance, args);

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
