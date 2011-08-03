$(function($){

    module("jquery.jcarousel");

    test("init() sets element", function() {
        expect(2);

        $('#jcarousel1').jcarousel();

        ok($('#jcarousel1').data('jcarousel').element, '#jcarousel1 (element exists)');
        ok($('#jcarousel1').data('jcarousel').element.jquery, '#jcarousel1 (element is jQuery object)');
    });

    test("init() sets options", function() {
        expect(4);

        $('#jcarousel1').jcarousel({wrap: 'custom'});

        ok($('#jcarousel1').data('jcarousel').options.wrap, '#jcarousel1 (wrap exists in property)');
        equal($('#jcarousel1').data('jcarousel').options.wrap, 'custom', '#jcarousel1 (wrap equals in property)');

        ok($('#jcarousel1').jcarousel('option', 'wrap'), '#jcarousel1 (wrap exists through option())');
        equal($('#jcarousel1').jcarousel('option', 'wrap'), 'custom', '#jcarousel1 (wrap equals through option())');
    });

    test("init() sets options from data-attributes", function() {
        expect(4);

        $('#jcarousel1').jcarousel({wrap: 'foo'});

        ok($('#jcarousel1').data('jcarousel').options.wrap, '#jcarousel1 (wrap exists in property)');
        equal($('#jcarousel1').data('jcarousel').options.wrap, 'custom', '#jcarousel1 (wrap equals in property)');

        ok($('#jcarousel1').jcarousel('option', 'wrap'), '#jcarousel1 (wrap exists through option())');
        equal($('#jcarousel1').jcarousel('option', 'wrap'), 'custom', '#jcarousel1 (wrap equals through option())');
    });

    test("option() sets nested options", function() {
        $('#jcarousel1').jcarousel({
            foo: {
                bar: "baz",
                qux: {
                    quux: "xyzzy"
                }
            },
            'nested.option': 'test'
        });

        equal($('#jcarousel1').jcarousel('option', 'foo.bar'), 'baz', 'one level deep - string');
        equal($('#jcarousel1').jcarousel('option', 'nested.option'), 'test', 'one level deep set a nested key - string');
        deepEqual($('#jcarousel1').jcarousel('option', 'foo.qux'), {quux: 'xyzzy'}, 'one level deep - object');
        equal($('#jcarousel1').jcarousel('option', 'foo.qux.quux'), 'xyzzy', 'two levels deep - string');
        equal($('#jcarousel1').jcarousel('option', 'x.y'), null, 'top level non-existent');
        equal($('#jcarousel1').jcarousel('option', 'foo.x.y'), null, 'one level deep - non-existent');
    });

    test("init() sets data", function() {
        expect(1);

        $('#jcarousel1').jcarousel();

        ok($('#jcarousel1').data('jcarousel'), '#jcarousel1');
    });

    test("init() sets callbacks", function() {
        expect(2);

        $('#jcarousel1').jcarousel();

        ok($('#jcarousel1').data('jcarousel').onWindowResize, '#jcarousel1 (onWindowResize)');
        ok($('#jcarousel1').data('jcarousel').onAnimationComplete, '#jcarousel1 (onAnimationComplete)');
    });

    test("init() calls setup()", function() {
        expect(1);

        stop();

        $('#jcarousel1').bind('jcarouselsetup', function() {
            ok(true, "#jcarousel1");
            start();
        }).jcarousel();
    });

    test("setup() sets list", function() {
        expect(1);

        $('#jcarousel1').jcarousel();

        equal($('#jcarousel1').data('jcarousel').list.get(0), $('#jcarousel1 ul').get(0), '#jcarousel1');
    });

    test("destroy removes data", function() {
        expect(2);

        $('#jcarousel1').jcarousel();

        notEqual($('#jcarousel1').data('jcarousel'), undefined, '#jcarousel1');

        $('#jcarousel1').jcarousel('destroy');

        equal($('#jcarousel1').data('jcarousel'), undefined, '#jcarousel1');
    });

    test("reload() sets vertical", function() {
        expect(4);

        $('.jcarousel').jcarousel();

        equal($('#jcarousel1').data('jcarousel').vertical, false, '#jcarousel1');
        equal($('#jcarousel2').data('jcarousel').vertical, false, '#jcarousel2');
        equal($('#jcarousel3').data('jcarousel').vertical, true, '#jcarousel3 (class: .jcarousel-vertical)');
        equal($('#jcarousel4').data('jcarousel').vertical, true, '#jcarousel4 (attribute: data-jcarousel-vertical="true")');
    });

    test("reload() sets rtl", function() {
        expect(4);

        $('.jcarousel').jcarousel();

        equal($('#jcarousel1').data('jcarousel').rtl, false, '#jcarousel1');
        equal($('#jcarousel2').data('jcarousel').rtl, true, '#jcarousel2 (attribute: dir="rtl")');
        equal($('#jcarousel3').data('jcarousel').rtl, true, '#jcarousel3 (parent attribute: dir="rtl")');
        equal($('#jcarousel4').data('jcarousel').rtl, false, '#jcarousel4');
    });

    test("reload() sets circular", function() {
        expect(2);

        $('#jcarousel1').jcarousel();
        $('#jcarousel2').jcarousel({wrap: 'circular'});

        equal($('#jcarousel1').data('jcarousel').circular, false, '#jcarousel1');
        equal($('#jcarousel2').data('jcarousel').circular, true, '#jcarousel2');
    });

    test("items() returns all items", function() {
        expect(1);

        $('#jcarousel1').jcarousel();

        equal($('#jcarousel1').jcarousel('items').get(1), $('#jcarousel1 li:eq(1)').get(0), '#jcarousel1');
    });

});
