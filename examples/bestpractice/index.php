<?php

include_once 'jcarousel_functions.php';

// Number of visible items.
// NOTE: If you change the number of items here,
// you must also change the width of .jcarousel-container
// and .jcarousel-clip in the jcarousel.css file.
$jcarousel_visible = 3;

$jcarousel_size = jcarousel_countItems();

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-us">
<head>
<title>jCarousel Examples</title>
<link href="../../style.css" rel="stylesheet" type="text/css" />

<!--
  jQuery library
-->
<script type="text/javascript" src="../../lib/jquery-1.2.3.pack.js"></script>

<!--
  jCarousel library
-->
<script type="text/javascript" src="../../lib/jquery.jcarousel.pack.js"></script>

<!--
  jCarousel core stylesheet
-->
<link rel="stylesheet" type="text/css" href="../../lib/jquery.jcarousel.css" />

<!--
  jCarousel skin stylesheet
-->
<link rel="stylesheet" type="text/css" href="jcarousel.css" />

<!--
  jCarousel business javascript
-->
<script type="text/javascript" src="jcarousel.js"></script>

<script type="text/javascript">

jQuery(function() {
    jQuery('#mycarousel').jcarousel({
        itemLoadCallback: jcarousel_itemLoadCallback,
        // Explicitly set size. Otherwise, jCarousel will limit the
        // carousel to 3 items (the number of available items on initialization)
        size: <?php echo $jcarousel_size; ?>
    });
});

</script>
</head>
<body>
<div id="wrap">
  <h1>jCarousel</h1>
  <h2>Riding carousels with jQuery</h2>

  <h3>Best Practice Implementation</h3>
  <p>
    This is a recommended unobstrusive example implementation of jCarousel.
  </p>

  <div id="mycarousel" class="jcarousel-container">
    <div class="jcarousel-clip">
      <ul class="jcarousel-list">
        <!-- Add the first visible range of items statically for displaying with javascript disabled -->
<?php

$jcarousel_items = jcarousel_getItems($jcarousel_visible);

foreach ($jcarousel_items as $item) {
?>
        <li><img src="<?php echo htmlspecialchars($item['src']); ?>" width="75" height="75" alt="<?php echo htmlspecialchars($item['title']); ?>" /></li>
<?php
}
?>
      </ul>
    </div>
  </div>

</div>
</body>
</html>
