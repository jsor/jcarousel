<?php

header('Content-type: text/xml; charset: utf-'.'8');
//header('Cache-Control: must-revalidate');

$api_key = '';

// This include sets my personal api key.
// Please remove this line and set your api key with the variable above.
// Get your own api key from http://www.flickr.com/services/api/keys/
include '../../config.flickr.php';

// Use the following url to get the most interesting photos.
// Since parameterless searches have been disabled, we have to add license=1,2,3,4,5
// to get the most interesting photos without search criteria.
// $url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&license=1,2,3,4,5,6&sort=interestingness-desc&api_key=' . $api_key;

$url = 'http://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=' . $api_key;

if (!empty($_REQUEST['per_page'])) {
    $url .= '&per_page=' . urlencode($_REQUEST['per_page']);
}
if (!empty($_REQUEST['page'])) {
    $url .= '&page=' . urlencode($_REQUEST['page']);
}

echo file_get_contents($url);

?>