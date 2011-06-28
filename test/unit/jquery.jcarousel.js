$(function($){

    module("jquery.jcarousel");

    test("init() sets root", function() {
        expect(2);

        $('#jcarousel1').jcarousel();

        ok($('#jcarousel1').data('jcarousel').root, '#jcarousel1 (root exists)');
        ok($('#jcarousel1').data('jcarousel').root.jquery, '#jcarousel1 (root is jQuery object)');
    });

    test("init() sets options", function() {
        expect(4);

        $('#jcarousel1').jcarousel({wrap: 'custom', foo: 'bar'});

        ok($('#jcarousel1').data('jcarousel').options.wrap, '#jcarousel1 (wrap exists)');
        equal($('#jcarousel1').data('jcarousel').options.wrap, 'custom', '#jcarousel1 (wrap equals)');

        ok($('#jcarousel1').data('jcarousel').options.foo, '#jcarousel1 (foo exists)');
        equal($('#jcarousel1').data('jcarousel').options.foo, 'bar', '#jcarousel1 (foo equals)');
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

    test("setup() calls reload()", function() {
        expect(1);

        stop();

        $('#jcarousel1').bind('jcarouselreload', function() {
            ok(true, "#jcarousel1");
            start();
        }).jcarousel();
    });

    test("destroy removes data", function() {
        expect(2);

        $('#jcarousel1').jcarousel();

        notEqual($('#jcarousel1').data('jcarousel'), undefined, '#jcarousel1');

        $('#jcarousel1').jcarousel().destroy();

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

        console.log($('#jcarousel1').jcarousel().items())

        equal($('#jcarousel1').jcarousel().items().get(1), $('#jcarousel1 li:eq(1)').get(0), '#jcarousel1');
    });

});
