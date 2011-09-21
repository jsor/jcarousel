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
                var el = element || this.element,
                    carousel = el.filter(':jcarousel');

                if (carousel.length) {
                    return carousel;
                }

                while (el.size() > 0) {
                    carousel = el.find(':jcarousel');

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
            var split = name.split('.'),
                selector,
                event;

            if (split.length > 1) {
                selector = (split[0] + '-' + split[1]).toLowerCase();
                event    = (split[0] + split[1]).toLowerCase();
                name     = split[0] +
                           split[1].charAt(0).toUpperCase() +
                           split[1].slice(1);
            } else {
                selector = event = name.toLowerCase();
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

            $.expr[':'][selector] = function(element) {
                return !!$.data(element, selector);
            };

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
        options:     {
            list:      '>ul:eq(0)',
            items:     '>li',
            animation: 'normal',
            wrap:      null,
            vertical:  null,
            rtl:       null,
            center:    false
        },
        list:        null,
        animating:   false,
        tail:        0,
        inTail:      false,
        resizeTimer: null,
        lt:          null,
        vertical:    false,
        rtl:         false,
        circular:    false,
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
            return this.list.find(this.options.items).not('.jcarousel-clone');
        },
        hasNext: function() {
            var wrap  = this.option('wrap'),
                items = this.items(),
                end   = items.size() - 1;

            return end >= 0 &&
                    ((wrap && wrap !== 'first') ||
                     (items.filter(':jcarousel-item-last').index() < end) ||
                     (this.tail && !this.inTail)) ? true : false;
        },
        hasPrev: function() {
            var wrap  = this.option('wrap'),
                items = this.items();

            return items.size() > 0 &&
                    ((wrap && wrap !== 'last') ||
                     (items.filter(':jcarousel-item-first').index() > 0) ||
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

            var self = this,
                cb   = function(animated) {
                    self._trigger('scrollEnd', null, [animated]);
                    if ($.isFunction(callback)) {
                        callback.call(self);
                    }
                },
                parsed = $j.parseTarget(target);

            if (parsed.relative) {
                var items  = this.items(),
                    end    = items.size() - 1,
                    scroll = Math.abs(parsed.target),
                    first,
                    index,
                    curr,
                    i;

                if (parsed.target > 0) {
                    var last = items.filter(':jcarousel-item-last').index();

                    if (last >= end && this.tail) {
                        if (!this.inTail) {
                            this._scrollTail(animate, cb);
                        } else {
                            if (this.options.wrap == 'both' ||
                                this.options.wrap == 'last') {
                                this._scroll(0, animate, cb);
                            } else {
                                this._scroll(end, animate, cb);
                            }
                        }
                    } else {
                        if (last === end &&
                            (this.options.wrap == 'both' || this.options.wrap == 'last')) {
                            return this._scroll(0, animate, cb);
                        } else {
                            first = items.filter(':jcarousel-item-first').index();
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
                    first = items.filter(':jcarousel-item-first').index();
                    index = first - scroll;

                    if (this.inTail) {
                        this._scroll(Math.max(index + 1, 0), animate, cb);
                    } else {
                        if (first === 0 &&
                            (this.options.wrap == 'both' || this.options.wrap == 'first')) {
                            this._scroll(end, animate, cb);
                        } else {
                            if (this.circular && index < 0) {
                                i = index;
                                curr = items.get(0);

                                while (i++ < 0) {
                                    curr = this.items().eq(-1);
                                    curr.after(curr.clone(true).addClass('jcarousel-clone'));
                                    this.list.prepend(curr);

                                    var lt  = $j.intval(this.list.css(this.lt)),
                                        dim = this._dimension(curr);

                                    this.rtl ? lt += dim : lt -= dim;

                                    this.list.css(this.lt, lt + 'px');
                                }

                                this._scroll(curr, animate, cb);
                            } else {
                                this._scroll(Math.max(first - scroll, 0), animate, cb);
                            }
                        }
                    }
                }
            } else {
                this._scroll(parsed.target, animate, cb);
            }

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
                item  = items.filter(':jcarousel-item-first'),
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
                                (items.filter(':jcarousel-item-first').index() > 0 ||
                                 items.filter(':jcarousel-item-last').index() < end);

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
                    first:        item,
                    last:         item,
                    visible:      item,
                    fullyvisible: wh <= clip ? item : $()
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

                    if (wh <= clip) {
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

                    if (wh <= clip) {
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
            var items = this.items(),
                first = items.filter(':jcarousel-item-first'),
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
            var self = this,
                items = this.items(),
                first = items.filter(':jcarousel-item-first'),
                last  = items.filter(':jcarousel-item-last'),
                v     = {
                    visible:      items.filter(':jcarousel-item-visible'),
                    fullyvisible: items.filter(':jcarousel-item-fullyvisible')
                };

            $.each(['first', 'last', 'visible', 'fullyvisible'], function(i, name) {
                items.data('jcarousel-item-' + name, false);
                update[name].data('jcarousel-item-' + name, true);
            });

            if (update.first.get(0) !== first.get(0)) {
                this._trigger('itemfirstin', update.first);
                this._trigger('itemfirstout', first);
            }

            if (update.last.get(0) !== last.get(0)) {
                this._trigger('itemlastin', update.last);
                this._trigger('itemlastout', last);
            }

            $.each(['visible', 'fullyvisible'], function(i, name) {
                var vin  = update[name].filter(function() {
                        return $.inArray(this, v[name]) < 0;
                    }),
                    vout = v[name].filter(function() {
                        return $.inArray(this, update[name]) < 0;
                    }),
                    fidx = first.size() > 0 ? first.index() : 0;

                if (items.index(update.first) >= fidx) {
                    vout = $().pushStack(vout.get().reverse());
                } else {
                    vin = $().pushStack(vin.get().reverse());
                }

                self._trigger('item' + name + 'in', vin);
                self._trigger('item' + name + 'out', vout);
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

    $.each(['first', 'last', 'visible', 'fullyvisible'], function(i, name) {
        $.expr[':']['jcarousel-item-'  + name] = function(element) {
            return !!$.data(element, 'jcarousel-item-' + name);
        };
    });

})(jQuery, window);
