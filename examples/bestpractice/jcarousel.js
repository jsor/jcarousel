function jcarousel_itemLoadCallback(carousel, state)
{
    // Fetch the visible range first (should be already preloaded)
    jcarousel_itemFetchCallback(carousel, carousel.first, carousel.last);

    var visible = carousel.last - carousel.first + 1;

    // ---

    var first = carousel.last + 1;
    var last  = first + visible - 1;

    var first2 = last + 1;
    var last2  = first2 + visible - 1;

    jcarousel_itemFetchCallback(carousel, first, last, first2, last2);

    // ---

    var last  = carousel.first - 1;
    var first = last - visible + 1;

    var last2  = first - 1;
    var first2 = last2 - visible + 1;

    jcarousel_itemFetchCallback(carousel, first, last, first2, last2);
};

function jcarousel_itemFetchCallback(carousel, first, last, first2, last2)
{
	// Remove items to avoid big lists
    jcarousel_itemRemoveCallback(carousel, first2, last2);

	if (first < 1)
    	first = 1;

    // Check if "first" is out of range if the size was already set
    var size = carousel.size();
	if (carousel.options.wrap != 'circular' && size && first > size)
		return;

    jcarousel_itemQueryCallback(carousel, first, last);

};

function jcarousel_itemQueryCallback(carousel, first, last, realFirst)
{
    // Check if the requested items already exist
    if (carousel.has(first, last))
        return;

    jQuery.get(
        'jcarousel_ajax.php',
        {
            first: first,
            last: last
        },
        function(xml) {
            jcarousel_itemAddCallback(carousel, first, last, xml);
        },
        'xml'
    );
};

function jcarousel_itemAddCallback(carousel, first, last, xml)
{
    var items = jQuery('item', xml);

    // Set the size of the carousel
    if (items.length < (last - first + 1))
    	carousel.size(first + items.length - 1);

    items.each(function(i) {
        carousel.add(first + i, jcarousel_getItemHTML(this));
    });
};

function jcarousel_itemRemoveCallback(carousel, first, last)
{
    if (!first || !last)
	    return;

    for (var i = first; i <= last; i++)
    	carousel.remove(i);
};

/**
 * Item html creation helper.
 */
function jcarousel_getItemHTML(item)
{
    return '<img src="' + jQuery('src', item).text() + '" width="75" height="75" alt="' + jQuery('title', item).text() + '" />';
};