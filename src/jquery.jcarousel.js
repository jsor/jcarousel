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

    var toFloat = function(val) {
        return parseFloat(val) || 0;
    };

    var arraySlice = Array.prototype.slice;

    var jCarousel = {};

    jCarousel.version = '@VERSION';

    var rRelativeTarget = /^([+\-]=)?(.+)$/;

    jCarousel.parseTarget = function(target) {
        var relative = false,
            parts = typeof target !== 'object' ?
                        rRelativeTarget.exec(target) :
                        null;

        if (parts) {
            target = parseInt(parts[2], 10) || 0;

            if (parts[1]) {
                relative = true;
                if (parts[1] === '-=') {
                    target *= -1;
                }
            }
        } else if (typeof target !== 'object') {
            target = parseInt(target, 10) || 0;
        }

        return {
            target: target,
            relative: relative
        };
    };

    jCarousel.detectCarousel = function(element) {
        var carousel = element.data('jcarousel'),
            find = function(element) {
                var carousel;
                element.find('.jcarousel').each(function() {
                    carousel = $(this).data('jcarousel');
                    if (carousel) {
                        return false;
                    }
                });
                return carousel;
            };

        if (!carousel) {
            while (element.size() > 0) {
                carousel = find(element);

                if (carousel) {
                    break;
                }

                element = element.parent();
            }
        }

        return carousel;
    };

    jCarousel.Plugin = {
        version:     jCarousel.version,
        options:     {},
        pluginName:  null,
        pluginClass: null,
        pluginFn:    null,
        _element:    null,
        _carousel:   null,
        _options:    $.noop,
        _init:       $.noop,
        _destroy:    $.noop,
        _create: function() {
            this.carousel()
                ._bind('destroy.' + this.pluginName, $.proxy(this.destroy, this));
        },
        destroy: function() {
            this._destroy();

            this.carousel()
                ._unbind('.' + this.pluginName)
                .element()
                .unbind('.' + this.pluginName);

            this.element()
                .unbind('.' + this.pluginName)
                .removeData(this.pluginName);

            return this;
        },
        element: function() {
            return this._element;
        },
        option: function(key, value) {
            if (arguments.length === 0) {
                return $.extend({}, this.options);
            }

            if (typeof key === 'string') {
                if (typeof value === 'undefined') {
                    return typeof this.options[key] === 'undefined' ?
                               null :
                               this.options[key];
                }

                this.options[key] = value;
            } else {
                if ($.isFunction(key)) {
                    key = key.call(this);
                }

                this.options = $.extend({}, this.options, key);
            }

            return this;
        },
        carousel: function() {
            if (!!this.options.carousel) {
                return this.options.carousel.jquery ?
                           this.options.carousel.data('jcarousel') :
                           this.options.carousel;
            }

            if (!this._carousel) {
                this._carousel = jCarousel.detectCarousel(this.element());

                if (!this._carousel) {
                    $.error('Could not detect carousel for plugin "' + this.pluginName + '"');
                }
            }

            return this._carousel;
        },
        _bind: function(event, handler, element) {
            (element || this.element()).bind(this.pluginName + event, handler);
            return this;
        },
        _unbind: function(event, handler, element) {
            (element || this.element()).unbind(this.pluginName + event, handler);
            return this;
        },
        _trigger: function(type, element, data) {
            var event = $.Event((this.pluginName + type).toLowerCase());
            data = [this].concat(data || []);

            (element || this.element()).trigger(event, data);

            return !($.isFunction(event.isDefaultPrevented) ?
                       event.isDefaultPrevented() :
                       event.defaultPrevented);
        }
    };

    var plugins = {};

    jCarousel.plugin = function(name, callback) {
        if (typeof callback === 'undefined') {
            if (typeof plugins[name] === 'undefined') {
                return $.error('No such plugin "' + name + '" registered');
            }

            return plugins[name].call(jCarousel, $);
        }

        plugins[name] = callback;

        var pluginName,
            pluginClass,
            pluginFn;

        if (name !== 'jcarousel') {
            pluginName  = 'jcarousel' + name.toLowerCase();
            pluginClass = 'jcarousel-' + name.toLowerCase();
            pluginFn    = 'jcarousel' + name.charAt(0).toUpperCase() + name.slice(1);
        } else {
            pluginName = pluginClass = pluginFn = name;
        }

        var plugin = function(element, options) {
            // allow instantiation without "new" keyword
            if (!this._init) {
                return new plugin(element, options);
            }

            this._element = $(element).data(pluginName, this).addClass(pluginClass);

            this.options = $.extend(
                {},
                this.options,
                this._options(),
                options
            );

            this._create();
            this._init();
        };

        plugin.prototype = $.extend({}, jCarousel.Plugin, {
            pluginName:  pluginName,
            pluginClass: pluginClass,
            pluginFn:    pluginFn
        }, callback.call(jCarousel, $));

        $.fn[pluginFn] = function(options) {
            var args = arraySlice.call(arguments, 1),
                returnValue = this;

            if (typeof options === 'string') {
                this.each(function() {
                    var instance = $(this).data(pluginName);

                    if (!instance) {
                        return $.error(
                            'Cannot call methods on ' + pluginFn + ' prior to initialization; ' +
                            'attempted to call method "' + options + '"'
                        );
                    }

                    if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
                        return $.error(
                            'No such method "' + options + '" for ' + pluginFn + ' instance'
                        );
                    }

                    var methodValue = instance[options].apply(instance, args);

                    if (methodValue !== instance && typeof methodValue !== 'undefined') {
                        returnValue = methodValue;
                        return false;
                    }
                });
            } else {
                this.each(function() {
                    var instance = $(this).data(pluginName);

                    if (instance) {
                        if (options) {
                            instance.option(options);
                        }
                    } else {
                        plugin(this, options);
                    }
                });
            }

            return returnValue;
        };

        return plugin;
    };

    var _jCarousel = window.jCarousel;

    jCarousel.noConflict = function() {
        window.jCarousel = _jCarousel;
        return jCarousel;
    };

    window.jCarousel = jCarousel;

    // jCarousel core plugin
    jCarousel.plugin('jcarousel', function($) {
        var jCarousel = this;

        return {
            options: {
                list:      'ul',
                items:     'li',
                animation: 400,
                wrap:      null,
                vertical:  null,
                rtl:       null,
                center:    false
            },
            animating:     false,
            tail:          0,
            inTail:        false,
            resizeTimer:   null,
            lt:            null,
            vertical:      false,
            rtl:           false,
            circular:      false,

            // Protected, don't access directly
            _list:         null,
            _items:        null,
            _target:       null,
            _first:        null,
            _last:         null,
            _visible:      null,
            _fullyvisible: null,
            _create: function() {
                // Don't bind on jcarouseldestroy
            },
            _init: function() {
                if (false === this._trigger('init')) {
                    return this;
                }

                this._reload();

                var self = this;

                this.onWindowResize = function() {
                    if (self.resizeTimer) {
                        clearTimeout(self.resizeTimer);
                    }

                    self.resizeTimer = setTimeout(function() {
                        self.reload();
                    }, 100);
                };

                $(window).bind('resize.jcarousel', this.onWindowResize);

                this.onAnimationComplete = function(callback) {
                    self.animating = false;

                    var c = self.list().find('.jcarousel-clone');

                    if (c.size() > 0) {
                        c.remove();
                        self._reload();
                    }

                    self._trigger('animateEnd');

                    if ($.isFunction(callback)) {
                        callback.call(self, true);
                    }
                };

                this._trigger('initEnd');

                return this;
            },
            destroy: function() {
                if (false === this._trigger('destroy')) {
                    return this;
                }

                this.element()
                    .unbind('.' + this.pluginName)
                    .removeData(this.pluginName);

                this.items().unbind('.jcarousel');
                $(window).unbind('resize.jcarousel', this.onWindowResize);

                this._trigger('destroyend');

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
            list: function() {
                if (this._list === null) {
                    var option = this.option('list');
                    this._list = $.isFunction(option) ? option.call(this) : this.element().find(option);
                }

                return this._list;
            },
            items: function() {
                if (this._items === null) {
                    var option = this.option('items');
                    this._items = ($.isFunction(option) ? option.call(this) : this.list().find(option)).not('.jcarousel-clone');
                }

                return this._items;
            },
            target: function() {
                return this._target;
            },
            first: function() {
                return this._first;
            },
            last: function() {
                return this._last;
            },
            visible: function() {
                return this._visible;
            },
            fullyvisible: function() {
                return this._fullyvisible;
            },
            hasNext: function() {
                if (false === this._trigger('hasnext')) {
                    return true;
                }

                var wrap = this.option('wrap'),
                    end = this.items().size() - 1;

                return end >= 0 &&
                       ((wrap && wrap !== 'first') ||
                        (this._last.index() < end) ||
                        (this.tail && !this.inTail)) ? true : false;
            },
            hasPrev: function() {
                if (false === this._trigger('hasprev')) {
                    return true;
                }

                var wrap = this.option('wrap');

                return this.items().size() > 0 &&
                       ((wrap && wrap !== 'last') ||
                        (this._first.index() > 0) ||
                        (this.tail && this.inTail)) ? true : false;
            },
            scroll: function(target, animate, callback) {
                if (this.animating) {
                    return this;
                }

                if (false === this._trigger('scroll', null, [target, animate])) {
                    return this;
                }

                if ($.isFunction(animate)) {
                    callback = animate;
                    animate  = true;
                }

                var parsed = jCarousel.parseTarget(target);

                if (parsed.relative) {
                    var end = this.items().size() - 1,
                        scroll = Math.abs(parsed.target),
                        first,
                        index,
                        curr,
                        i;

                    if (parsed.target > 0) {
                        var last = this._last.index();

                        if (last >= end && this.tail) {
                            if (!this.inTail) {
                                this._scrollTail(animate, callback);
                            } else {
                                if (this.options.wrap == 'both' ||
                                    this.options.wrap == 'last') {
                                    this._scroll(0, animate, callback);
                                } else {
                                    this._scroll(Math.min(this._target.index() + scroll, end), animate, callback);
                                }
                            }
                        } else {
                            if (last === end &&
                                (this.options.wrap == 'both' || this.options.wrap == 'last')) {
                                this._scroll(0, animate, callback);
                            } else {
                                first = this._target.index();
                                index = first + scroll;

                                if (this.circular && index > end) {
                                    i = end;
                                    curr = this.items().get(-1);

                                    while (i++ < index) {
                                        curr = this.items().eq(0);
                                        curr.after(curr.clone(true).addClass('jcarousel-clone'));
                                        this.list().append(curr);
                                        // Force items reload
                                        this._items = null;
                                    }

                                    this._scroll(curr, animate, callback);
                                } else {
                                    this._scroll(Math.min(index, end), animate, callback);
                                }
                            }
                        }
                    } else {
                        if (this.inTail) {
                            this._scroll(Math.max((this._first.index() - scroll) + 1, 0), animate, callback);
                        } else {
                            first = this._first.index();
                            index = first - scroll;

                            if (first === 0 &&
                                (this.options.wrap == 'both' || this.options.wrap == 'first')) {
                                this._scroll(end, animate, callback);
                            } else {
                                if (this.circular && index < 0) {
                                    i = index;
                                    curr = this.items().get(0);

                                    while (i++ < 0) {
                                        curr = this.items().eq(-1);
                                        curr.after(curr.clone(true).addClass('jcarousel-clone'));
                                        this.list().prepend(curr);
                                        // Force items reload
                                        this._items = null;

                                        var lt  = toFloat(this.list().css(this.lt)),
                                            dim = this._dimension(curr);

                                        this.rtl ? lt += dim : lt -= dim;

                                        this.list().css(this.lt, lt + 'px');
                                    }

                                    this._scroll(curr, animate, callback);
                                } else {
                                    this._scroll(Math.max(first - scroll, 0), animate, callback);
                                }
                            }
                        }
                    }
                } else {
                    this._scroll(parsed.target, animate, callback);
                }

                this._trigger('scrollend');

                return this;
            },
            _reload: function() {
                var element = this.element(),
                    checkRTL = function() {
                        if (('' + element.attr('dir')).toLowerCase() === 'rtl') {
                            return true;
                        }

                        var found = false;

                        element.parents('[dir]').each(function() {
                            if ((/rtl/i).test($(this).attr('dir'))) {
                                found = true;
                                return false;
                            }
                        });

                        return found;
                    };

                this.vertical = this.options.vertical == null ?
                                    ('' + element.attr('class'))
                                        .toLowerCase()
                                        .indexOf('jcarousel-vertical') > -1 :
                                    this.options.vertical;
                this.rtl = this.options.rtl == null ? checkRTL() : this.options.rtl;
                this.lt = this.vertical ? 'top' : 'left';

                // Force items reload
                this._items = null;

                var item = this._target || this.items().eq(0);

                // _prepare() needs this here
                this.circular = this.options.wrap == 'circular';
                this.list().css({'left': 0, 'top': 0});

                if (item.size() > 0) {
                    this._prepare(item);
                    this.list().find('.jcarousel-clone').remove();

                    // Force items reload
                    this._items = null;

                    this.circular = this.options.wrap == 'circular' &&
                                    this._fullyvisible.size() < this.items().size();

                    this.list().css(this.lt, this._position(item) + 'px');
                }

                return this;
            },
            _scroll: function(item, animate, callback) {
                if (this.animating) {
                    return this;
                }

                if (typeof item !== 'object') {
                    item = this.items().eq(item);
                } else if (typeof item.jquery === 'undefined') {
                    item = $(item);
                }

                if (item.size() === 0) {
                    if ($.isFunction(callback)) {
                        callback.call(this, false);
                    }

                    return this;
                }

                this.inTail = false;

                this._prepare(item);
                var pos = this._position(item),
                    currPos = toFloat(this.list().css(this.lt));

                if (pos === currPos) {
                    if ($.isFunction(callback)) {
                        callback.call(this, false);
                    }

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

                var pos = this.list().position()[this.lt];

                this.rtl ? pos += this.tail : pos -= this.tail;
                this.inTail = true;

                var properties = {};
                properties[this.lt] = pos + 'px';

                this._update({
                    target:       this._target.next(),
                    fullyvisible: this._fullyvisible.slice(1).add(this._visible.last())
                });

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
                    this.list().css(properties);
                    this.onAnimationComplete(callback);
                } else {
                    var self = this;

                    if ($.isFunction(this.options.animation)) {
                        this.options.animation.call(this, properties, function() {
                            self.onAnimationComplete(callback);
                        });
                    } else {
                        var opts = typeof this.options.animation === 'object' ?
                                    this.options.animation :
                                    {duration: this.options.animation},
                            oldComplete = opts.complete;

                        opts.complete = function() {
                            self.onAnimationComplete(callback);
                            if ($.isFunction(oldComplete)) {
                                oldComplete.call(this);
                            }
                        };

                        this.list().animate(properties, opts);
                    }
                }

                return this;
            },
            _prepare: function(item) {
                var index = item.index(),
                    idx = index,
                    wh = this._dimension(item),
                    clip = this._clipping(),
                    update = {
                        target:       item,
                        first:        item,
                        last:         item,
                        visible:      item,
                        fullyvisible: wh <= clip ? item : $()
                    },
                    lrb = this.vertical ? 'bottom' : (this.rtl ? 'left'  : 'right'),
                    curr,
                    margin;

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
                                if (item.get(0) === curr.get(0)) {
                                    break;
                                }
                                curr.after(curr.clone(true).addClass('jcarousel-clone'));
                                this.list().append(curr);
                                // Force items reload
                                this._items = null;
                            } else {
                                break;
                            }
                        }

                        wh += this._dimension(curr);

                        update.last = curr;
                        update.visible = update.visible.add(curr);

                        // Remove right/bottom margin from total width
                        margin = toFloat(curr.css('margin-' + lrb));

                        if ((wh - margin) <= clip) {
                            update.fullyvisible = update.fullyvisible.add(curr);
                        }

                        if (wh >= clip) {
                            break;
                        }
                    }
                }

                if (!this.circular && wh < clip) {
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

                        // Remove right/bottom margin from total width
                        margin = toFloat(curr.css('margin-' + lrb));

                        if ((wh - margin) <= clip) {
                            update.fullyvisible = update.fullyvisible.add(curr);
                        }

                        if (wh >= clip) {
                            break;
                        }
                    }
                }

                this._update(update);

                this.tail = 0;

                if (this.options.wrap !== 'circular' &&
                    this.options.wrap !== 'custom' &&
                    update.last.index() === (this.items().size() - 1)) {

                    // Remove right/bottom margin from total width
                    wh -= toFloat(update.last.css('margin-' + lrb));

                    if (wh > clip) {
                        this.tail = wh - clip;
                    }
                }

                return this;
            },
            _position: function(item) {
                var first = this._first,
                    pos   = first.position()[this.lt];

                if (this.rtl && !this.vertical) {
                    pos -= this._clipping() - this._dimension(first);
                }

                if (this.options.center) {
                    pos -= (this._clipping() / 2) - (this._dimension(first) / 2);
                }

                if ((item.index() > first.index() || this.inTail) && this.tail) {
                    pos = this.rtl ? pos - this.tail : pos + this.tail;
                    this.inTail = true;
                } else {
                    this.inTail = false;
                }

                return -pos;
            },
            _update: function(update) {
                var self = this,
                    current = {
                        target:       this._target || $(),
                        first:        this._first || $(),
                        last:         this._last || $(),
                        visible:      this._visible || $(),
                        fullyvisible: this._fullyvisible || $()
                    },
                    back = (update.first || current.first).index() < current.first.index(),
                    key,
                    doUpdate = function(key) {
                        var elIn = [],
                            elOut = [];

                        update[key].each(function() {
                            if (current[key].index(this) < 0) {
                                elIn.push(this);
                            }
                        });

                        current[key].each(function() {
                            if (update[key].index(this) < 0) {
                                elOut.push(this);
                            }
                        });

                        if (back) {
                            elIn = elIn.reverse();
                        } else {
                            elOut = elOut.reverse();
                        }

                        self._trigger('item' + key + 'in', $(elIn));
                        self._trigger('item' + key + 'out', $(elOut));

                        current[key].removeClass('jcarousel-item-' + key);
                        update[key].addClass('jcarousel-item-' + key);

                        self['_' + key] = update[key];
                    };

                for (key in update) {
                    doUpdate(key);
                }

                return this;
            },
            _clipping: function() {
                return this.element()['inner' + (this.vertical ? 'Height' : 'Width')]();
            },
            _dimension: function(element) {
                return element['outer' + (this.vertical ? 'Height' : 'Width')](true);
            }
        };
    });

})(jQuery, window);
