<?php

header('Content-Type: text/xml; charset: utf-'.'8');

if (!isset($_GET['feed'])) {
    exit;
}

if (strpos($_GET['feed'], 'http://') !== 0) {
    exit;
}

echo file_get_contents($_GET['feed']);

?>