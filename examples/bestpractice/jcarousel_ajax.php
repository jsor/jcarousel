<?php

include_once 'jcarousel_functions.php';

// --

// Array/Database indexes are 0-based, jCarousel positions are 1-based.
$first = intval($_REQUEST['first']) - 1;
$last  = max($first + 1, intval($_REQUEST['last']) - 1);

// --

$offset = $first;
$limit  = $last - $first + 1;

$items = jcarousel_getItems($limit, $offset);


// ---

header('Content-type: text/xml');

echo '<data>' . "\n";

foreach ($items as $item) {
    echo '  <item>' . "\n";
    foreach ($item as $key => $val) {
    	echo '    <' . $key  . '>' . htmlspecialchars($val) . '</' . $key  . '>' . "\n";
    }
    echo '  </item>' . "\n";
}

echo '</data>';

?>