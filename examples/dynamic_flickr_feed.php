<?php

header('Content-type: application/json; charset: utf-'.'8');
//header('Cache-Control: must-revalidate');

$url = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1';

if (!empty($_REQUEST['tags'])) {
    $url .= '&tags=' . urlencode($_REQUEST['tags']);
}

echo file_get_contents($url);

?>