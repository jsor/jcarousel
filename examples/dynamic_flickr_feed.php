<?php

header('Content-type: application/json; charset: utf-'.'8');
//header('Cache-Control: must-revalidate');

$url = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json';

if (!empty($_REQUEST['tags'])) {
    $url .= '&tags=' . urlencode($_REQUEST['tags']);
}

echo file_get_contents($url);

?>