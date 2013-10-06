(function($) {
    $(function() {
        $('.jcarousel').jcarousel();

        $('.jcarousel-control-prev')
            .on('active.jcarouselcontrol', function() {
                $(this).removeClass('inactive');
            })
            .on('inactive.jcarouselcontrol', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .on('active.jcarouselcontrol', function() {
                $(this).removeClass('inactive');
            })
            .on('inactive.jcarouselcontrol', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('click.jcarouselpagination', 'a', function() {
                $(this).addClass('active');
                return false;
            })
            .on('inactive.jcarouselpagination', 'a', function() {
                $(this).removeClass('active');
            })
            .jcarouselPagination();
    });
})(jQuery);
