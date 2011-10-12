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

    var relativeTarget = /^([+\-]=)?(.+)$/;

    var $j = $.jcarousel = {
        intval: function(value) {
            value = parseInt(value, 10);
            return isNaN(value) ? 0 : value;
        },
        parseTarget: function(target) {
            var relative = false,
                parts    = typeof target !== 'object' ?
                               relativeTarget.exec(target) :
                               null;

            if (parts) {
                target = $j.intval(parts[2]);

                if (parts[1]) {
                    relative = true;
                    if (parts[1] === '-=') {
                        target *= -1;
                    }
                }
            } else if (typeof target !== 'object') {
                target = $j.intval(target);
            }

            return {target: target, relative: relative};
        },
        base: {
            version: '@VERSION',
            options: {},
            _options: $.noop,
            _init: $.noop,
            option: function(key, value) {
                if (arguments.length === 0) {
                    // Don't return a reference to the internal hash
                    return $.extend({}, this.options);
                }

                if (typeof key === 'string') {
                    if (value === undefined) {
                        return this.options[key] === undefined ?
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
            carousel: function(element) {
                if (!!this.options.carousel) {
                    return this.options.carousel;
                }

                var el = element || this.element,
                    filter = function() {
                        return !!$.data(this, 'jcarousel');
                    },
                    carousel = el.filter(filter);

                if (carousel.length) {
                    return carousel;
                }

                while (el.size() > 0) {
                    carousel = el.find('*').filter(filter);

                    if (carousel.length) {
                        return carousel;
                    }

                    el = el.parent();
                }

                return $();
            },
            _trigger: function(type, element, data, event) {
                element = element || this.element;

                event = $.Event(event);
                event.type = (this._event + type).toLowerCase();
                data = [this].concat(data || []);

                if (event.originalEvent) {
                    for (var i = $.event.props.length, prop; i;) {
                        prop = $.event.props[--i];
                        event[prop] = event.originalEvent[prop];
                    }
                }

                element.trigger(event, data);

                return !event.isDefaultPrevented();
            }
        },
        create: function(name, prototype) {
            var selector,
                event;

            if (name !== 'jcarousel') {
                selector = 'jcarousel-' + name.toLowerCase();
                event    = 'jcarousel' + name.toLowerCase();
                name     = 'jcarousel' +
                           name.charAt(0).toUpperCase() +
                           name.slice(1);
            } else {
                selector = event = name;
            }

            $j[name] = function(element, options) {
                // allow instantiation without "new" keyword
                if (!this._init) {
                    return new $j[name](element, options);
                }

                this.element = $(element).data(selector, this);

                this.options = $.extend({},
                    this.options,
                    this._options(),
                    options);

                this._init();
            };

            $j[name].prototype = $.extend({}, $j.base, {
                _selector: selector,
                _event: event
            }, prototype);

            $.fn[name] = function(options) {
                var args        = Array.prototype.slice.call(arguments, 1),
                    returnValue = this;

                if (typeof options === 'string') {
                    this.each(function() {
                        var instance = $.data(this, selector);

                        if (!instance) {
                            return $.error(
                                'Cannot call methods on ' + name + ' prior to initialization; ' +
                                'attempted to call method "' + options + '"'
                            );
                        }

                        if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
                            return $.error(
                                'No such method "' + options + '" for ' + name + ' instance'
                            );
                        }

                        var methodValue = instance[options].apply(instance, args);

                        if (methodValue !== instance && methodValue !== undefined) {
                            returnValue = methodValue;
                            return false;
                        }
                    });
                } else {
                    this.each(function() {
                        var instance = $.data(this, selector);

                        if (instance) {
                            if (options) {
                                instance.option(options);
                            }
                        } else {
                            $j[name](this, options);
                        }
                    });
                }

                return returnValue;
            };
        }
    };

    $j.create('jcarousel', {
        options: {
            list:      '>ul:eq(0)',
            items:     '>li',
            animation: 'normal',
            wrap:      null,
            vertical:  null,
            rtl:       null,
            center:    false
        },
        list:          null,
        animating:     false,
        tail:          0,
        inTail:        false,
        resizeTimer:   null,
        lt:            null,
        vertical:      false,
        rtl:           false,
        circular:      false,

        // Protected, don't access directly
        _items:        null,
        _target:       null,
        _first:        null,
        _last:         null,
        _visible:      null,
        _fullyvisible: null,
        _init: function() {
            if (false === this._trigger('init')) {
                return this;
            }

            this.list = this.element.find(this.options.list);

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

            this._trigger('initEnd');

            return this;
        },
        destroy: function() {
            if (false === this._trigger('destroy')) {
                return this;
            }

            var items = this.items().unbind('.jcarousel');

            $.each(['first', 'last', 'visible', 'fullyvisible'], function(i, name) {
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
        items: function() {
            if (this._items === null) {
                this._items = this.list.find(this.options.items).not('.jcarousel-clone');
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
            var wrap = this.option('wrap'),
                end  = this.items().size() - 1;

            return end >= 0 &&
                    ((wrap && wrap !== 'first') ||
                     (this._last.index() < end) ||
                     (this.tail && !this.inTail)) ? true : false;
        },
        hasPrev: function() {
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
                animate = true;
            }

            var parsed = $j.parseTarget(target);

            if (parsed.relative) {
                var items  = this.items(),
                    end    = items.size() - 1,
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
                                this._scroll(end, animate, callback);
                            }
                        }
                    } else {
                        if (last === end &&
                            (this.options.wrap == 'both' || this.options.wrap == 'last')) {
                            return this._scroll(0, animate, callback);
                        } else {
                            first = this._first.index();
                            index = first + scroll;

                            if (this.circular && index > end) {
                                i = end;
                                curr = this.items().get(-1);

                                while (i++ < index) {
                                    curr = this.items().eq(0);
                                    curr.after(curr.clone(true).addClass('jcarousel-clone'));
                                    this.list.append(curr);
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
                    first = this._first.index();
                    index = first - scroll;

                    if (this.inTail) {
                        this._scroll(Math.max(index + 1, 0), animate, callback);
                    } else {
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
                                    this.list.prepend(curr);
                                    // Force items reload
                                    this._items = null;

                                    var lt  = $j.intval(this.list.css(this.lt)),
                                        dim = this._dimension(curr);

                                    this.rtl ? lt += dim : lt -= dim;

                                    this.list.css(this.lt, lt + 'px');
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

            this._trigger('scrollend')

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

            // Force items reload
            this._items = null;

            var item = this._first || this.items().eq(0);

            // _prepare() needs this here
            this.circular = false;
            this.list.css({'left': 0, 'top': 0});

            if (item.size() > 0) {
                this._prepare(item);
                this.list.find('.jcarousel-clone').remove();

                // Force items reload
                this._items = null;

                this.circular = this.options.wrap == 'circular' &&
                                this._fullyvisible.size() < this.items().size();

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
                if ($.isFunction(callback)) {
                    callback.call(this, false);
                }

                return this;
            }

            this.inTail = false;

            this._prepare(item);
            var pos = this._position(item);

            if (pos == $j.intval(this.list.css(this.lt))) {
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

            var pos = this.list.position()[this.lt];

            this.rtl ? pos += this.tail : pos -= this.tail;
            this.inTail = true;

            var properties = {};
            properties[this.lt] = pos + 'px';

            this._update({
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
            var index  = item.index(),
                idx    = index,
                wh     = this._dimension(item),
                clip   = this._clipping(),
                update = {
                    target:       item,
                    first:        item,
                    last:         item,
                    visible:      item,
                    fullyvisible: wh <= clip ? item : $()
                },
                lrb = this.vertical ? 'bottom' : (this.rtl ? 'left'  : 'right'),
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
                    var margin= $j.intval(curr.css('margin-' + lrb));

                    if ((wh - margin) <= clip) {
                        update.fullyvisible = update.fullyvisible.add(curr);
                    }

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

                    // Remove right/bottom margin from total width
                    var margin= $j.intval(curr.css('margin-' + lrb));

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
                var lrb = this.vertical ? 'bottom' : (this.rtl ? 'left'  : 'right');

                wh -= $j.intval(update.last.css('margin-' + lrb));

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
                back = (update.first || current.first).index() < current.first.index();

            $.each(update, function(key, elements) {
                var vin = elements.filter(function() {
                        return $.inArray(this, current[key]) < 0;
                    }),
                    vout = current[key].filter(function() {
                        return $.inArray(this, elements) < 0;
                    });

                if (back) {
                    vin = $().pushStack(vin.get().reverse());
                } else {
                    vout = $().pushStack(vout.get().reverse());
                }

                self._trigger('item' + key + 'in', vin);
                self._trigger('item' + key + 'out', vout);

                current[key].removeClass('jcarousel-item-' + key);
                elements.addClass('jcarousel-item-' + key);

                self['_' + key] = elements;
            });

            return this;
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

})(jQuery, window);
