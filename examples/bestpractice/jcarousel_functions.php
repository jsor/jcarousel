<?php

$jcarousel_items = array(
    array(
        'title' => 'Flower 1',
        'src' => 'http://static.flickr.com/66/199481236_dc98b5abb3_s.jpg',
    ),

    array(
        'title' => 'Flower 2',
        'src' => 'http://static.flickr.com/75/199481072_b4a0d09597_s.jpg',
    ),
    array(
        'title' => 'Flower 3',
        'src' => 'http://static.flickr.com/57/199481087_33ae73a8de_s.jpg',
    ),
    array(
        'title' => 'Flower 4',
        'src' => 'http://static.flickr.com/77/199481108_4359e6b971_s.jpg',
    ),
    array(
        'title' => 'Flower 5',
        'src' => 'http://static.flickr.com/58/199481143_3c148d9dd3_s.jpg',
    ),
    array(
        'title' => 'Flower 6',
        'src' => 'http://static.flickr.com/72/199481203_ad4cdcf109_s.jpg',
    ),
    array(
        'title' => 'Flower 7',
        'src' => 'http://static.flickr.com/58/199481218_264ce20da0_s.jpg',
    ),
    array(
        'title' => 'Flower 8',
        'src' => 'http://static.flickr.com/69/199481255_fdfe885f87_s.jpg',
    ),
    array(
        'title' => 'Flower 9',
        'src' => 'http://static.flickr.com/60/199480111_87d4cb3e38_s.jpg',
    ),
    array(
        'title' => 'Flower 10',
        'src' => 'http://static.flickr.com/70/229228324_08223b70fa_s.jpg',
    ),
);

/**
 * This function returns the number items. Typically, this
 * would fetch it from a database (SELECT COUNT(*) FROM items) or
 * from a directory.
 */
function jcarousel_countItems()
{
	global $jcarousel_items;

	return count($jcarousel_items);
}

/**
 * This function returns the items. Typically, this
 * would fetch it from a database (SELECT * FROM items LIMIT $limit OFFSET $offset) or
 * from a directory.
 */
function jcarousel_getItems($limit = null, $offset = null)
{
	global $jcarousel_items;

	// Copy items over
	$return = $jcarousel_items;

	if ($offset !== null) {
		$return = array_slice($return, $offset);
	}

	if ($limit !== null) {
		$return = array_slice($return, 0, $limit);
	}

	return $return;
}

?>