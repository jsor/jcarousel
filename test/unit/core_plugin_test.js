jQuery(function($){
    QUnit.testDone(function() {
        $('.jcarousel').each(function() {
            if ($(this).data('jcarousel')) {
                $(this).jcarousel('destroy');
            }
        });
    });

    module("core_plugin");

    test("constructor sets element", function() {
        expect(2);

        $('#jcarousel1').jcarousel();

        ok($('#jcarousel1').jcarousel('element'), '#jcarousel1 (element exists)');
        ok($('#jcarousel1').jcarousel('element').jquery, '#jcarousel1 (element is jQuery object)');
    });

    test("constructor sets options", function() {
        expect(2);

        $('#jcarousel1').jcarousel({wrap: 'custom'});

        ok($('#jcarousel1').jcarousel('options', 'wrap'), '#jcarousel1 (wrap exists)');
        equal($('#jcarousel1').jcarousel('options', 'wrap'), 'custom', '#jcarousel1 (wrap equals)');
    });

    test("constructor sets data", function() {
        expect(1);

        $('#jcarousel1').jcarousel();

        ok($('#jcarousel1').data('jcarousel'), '#jcarousel1');
    });

    test("_init() sets list", function() {
        expect(1);

        $('#jcarousel1').jcarousel();

        equal($('#jcarousel1').jcarousel('list').get(0), $('#jcarousel1 ul').get(0), '#jcarousel1');
    });

    test("_init() triggers events", function() {
        expect(2);

        $('#jcarousel1')
            .on('jcarousel:create', function() {
                ok(true, "#jcarousel1 (create)");
            }).on('jcarousel:createend', function() {
                ok(true, "#jcarousel1 (createend)");
            })
            .jcarousel();
    });

    test("destroy() removes data", function() {
        expect(2);

        $('#jcarousel1').jcarousel();

        notEqual($('#jcarousel1').data('jcarousel'), undefined, '#jcarousel1');

        $('#jcarousel1').jcarousel('destroy');

        equal($('#jcarousel1').data('jcarousel'), undefined, '#jcarousel1');
    });

    test("destroy() triggers events", function() {
        expect(2);

        $('#jcarousel1')
            .on('jcarousel:destroy', function() {
                ok(true, "#jcarousel1 (destroy)");
            })
            .on('jcarousel:destroyend', function() {
                ok(true, "#jcarousel1 (destroyend)");
            })
            .jcarousel()
            .jcarousel('destroy');
    });

    test("reload() sets vertical", function() {
        expect(3);

        $('.jcarousel').jcarousel();

        equal($('#jcarousel1').data('jcarousel').vertical, false, '#jcarousel1');
        equal($('#jcarousel2').data('jcarousel').vertical, false, '#jcarousel2');
        equal($('#jcarousel3').data('jcarousel').vertical, true, '#jcarousel3 (css dimension)');
    });

    test("reload() sets rtl", function() {
        expect(3);

        $('.jcarousel').jcarousel();

        equal($('#jcarousel1').data('jcarousel').rtl, false, '#jcarousel1');
        equal($('#jcarousel2').data('jcarousel').rtl, true, '#jcarousel2 (attribute: dir="rtl")');
        equal($('#jcarousel3').data('jcarousel').rtl, true, '#jcarousel3 (parent attribute: dir="rtl")');
    });

    test("reload() sets circular", function() {
        expect(2);

        $('#jcarousel1').jcarousel();
        $('#jcarousel2').jcarousel({wrap: 'circular'});

        equal($('#jcarousel1').data('jcarousel').circular, false, '#jcarousel1');
        equal($('#jcarousel2').data('jcarousel').circular, true, '#jcarousel2');
    });

    test("reload() triggers events", function() {
        expect(2);

        $('#jcarousel1')
            .on('jcarousel:reload', function() {
                ok(true, "#jcarousel1 (reload)");
            })
            .on('jcarousel:reloadend', function() {
                ok(true, "#jcarousel1 (reloadend)");
            })
            .jcarousel()
            .jcarousel('reload');
    });

    test("items() returns all items", function() {
        expect(1);

        $('#jcarousel1').jcarousel();

        equal($('#jcarousel1').jcarousel('items').get(1), $('#jcarousel1 li:eq(1)').get(0), '#jcarousel1');
    });

});
