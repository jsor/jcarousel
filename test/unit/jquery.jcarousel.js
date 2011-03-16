$(function($){

    module("jquery.jcarousel");

    test("init() sets data", function() {
        expect(1);

        $('#jcarousel1').jcarousel();

        ok($('#jcarousel1').data('jcarousel'), '#jcarousel1');
    });

    test("setup() sets vertical", function() {
        expect(4);

        $('.jcarousel').jcarousel();

        equals(false, $('#jcarousel1').data('jcarousel').vertical, '#jcarousel1');
        equals(false, $('#jcarousel2').data('jcarousel').vertical, '#jcarousel2');
        equals(true, $('#jcarousel3').data('jcarousel').vertical, '#jcarousel3 (class: .jcarousel-vertical)');
        equals(true, $('#jcarousel4').data('jcarousel').vertical, '#jcarousel4 (attribute: data-jcarousel-vertical="true")');
    });

    test("setup() sets rtl", function() {
        expect(4);

        $('.jcarousel').jcarousel();

        equals(false, $('#jcarousel1').data('jcarousel').rtl, '#jcarousel1');
        equals(true, $('#jcarousel2').data('jcarousel').rtl, '#jcarousel2 (attribute: dir="rtl")');
        equals(true, $('#jcarousel3').data('jcarousel').rtl, '#jcarousel3 (parent attribute: dir="rtl")');
        equals(false, $('#jcarousel4').data('jcarousel').rtl, '#jcarousel4');
    });

    test("setup() sets circular", function() {
        expect(2);

        $('#jcarousel1').jcarousel();
        $('#jcarousel2').jcarousel({wrap: 'circular'});

        equals(false, $('#jcarousel1').data('jcarousel').circular, '#jcarousel1');
        equals(true, $('#jcarousel2').data('jcarousel').circular, '#jcarousel2');
    });

});