<?php

header('Content-Type: application/atom+xml; charset=utf-8');
echo file_get_contents('https://github.com/jsor/jcarousel/commits/master.atom');

?>