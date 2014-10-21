<?php include 'header.php'; ?>

 <title>DIGIMAD MEDIA FREE VECTORS</title><!--End page title-->

 <title>DIGIMAD MEDIA FREE VECTORS</title><!--End page title-->

 <meta name="description" content="Free premium vector illustrations, downloads totally free for commercial use.">

 <meta name="keywords" content="free, commercial use, download, vectors, vector, illustration, premium, digital drawings, clip art, stock, stock">
  
  
  <div class="main--wrap clearfix">
 <!--    <div class="one--column">
      <h1>Welcome to our blog!</h1>

    </div> -->

   <!--  <ul class="blog--posts clearfix">
      <li style="list-style: none; display: inline"></li>

      <li class="blog--post--wrap">
        <div class="blog--post--left">  <img alt="blog image responsive design" src="vectors/digimad-2-mobile-phone.jpg"> </div>

        <div class="blog--post--right">
          <h2>To be responsive of not to be?</h2>

          <p>Mobile phones and tablets vary considerably in size, this makes the need for responsive design much more important than ever before. The need for mobile websites is somewhat unnecessary these days. Creating a responsive website will save companies not only money but far more time to produce and amend. Think of it this way, why would you make amends to a desktop site and then make the same changes to a mobile site when you could just make client amends to one single responsive website that works across the board?</p>

          <p></p>

          <h4>Posted on the 29/07/2014</h4><a class="main--button"
          href="blog-1.html">View More</a>
        </div>
      </li>
    
    </ul> -->


   <?php include 'database-connect.php'; ?>

 <ul class="blog--posts clearfix">

<?php
// database connection info
$conn = mysql_connect("cust-mysql-123-17", "swashpro", "brokenwings1", 'swashpro') or trigger_error("SQL", E_USER_ERROR);
$db = mysql_select_db('swashpro',$conn) or trigger_error("SQL", E_USER_ERROR);

// find out how many rows are in the table
$sql = "SELECT COUNT(*) FROM `Blog Posts`";
$result = mysql_query($sql, $conn) or trigger_error("SQL", E_USER_ERROR);
$r = mysql_fetch_row($result);
$numrows = $r[0];

// number of rows to show per page
$rowsperpage = 1;
// find out total pages
$totalpages = ceil($numrows / $rowsperpage);

// get the current page or set a default
if (isset($_GET['page']) && is_numeric($_GET['page'])) {
   // cast var as int
   $page = (int) $_GET['page'];
} else {
   // default page num
   $page = 1;
} // end if

// if current page is greater than total pages...
if ($page > $totalpages) {
   // set current page to last page
   $page = $totalpages;
} // end if
// if current page is less than first page...
if ($page < 1) {
   // set current page to first page
   $page = 1;
} // end if

// the offset of the list, based on current page
$offset = ($page - 1) * $rowsperpage;

// get the info from the db
$sql = "SELECT * FROM `Blog Posts` LIMIT $offset, $rowsperpage";


$result = mysql_query($sql, $conn) or trigger_error("SQL", E_USER_ERROR);


// while there are rows to be fetched...
while ($list = mysql_fetch_assoc($result)) {

  ?>  <li class="blog--post--wrap"> 
  

 <div class="blog--post--left">
<?php

$image_results = "photos/";

  echo "<img src=".$image_results . $list['blog_image_1']?>


?>
</div>

  <div class="blog--post--right">
  <?php
   // echo data
   echo "<h1>" . $list['blog_heading'] . "</h1>";
   echo "<h2>" . $list['blog_sub_heading'] . "</h2>";
   echo "<p>" . $list['blog_content'] . "</p>";

   ?> </div></li>

      <?php
} // end while

/******  build the pagination links ******/
// range of num links to show
$range = 3;

// if not on page 1, don't show back links
if ($page > 1) {
   // show << link to go back to page 1
   echo " <a href='{$_SERVER['PHP_SELF']}?page=1'><<</a> ";
   // get previous page num
   $prevpage = $page - 1;
   // show < link to go back to 1 page
   echo " <a href='{$_SERVER['PHP_SELF']}page=$prevpage'><</a> ";
} // end if 

// loop to show links to range of pages around current page
for ($x = ($page - $range); $x < (($page + $range) + 1); $x++) {
   // if it's a valid page number...
   if (($x > 0) && ($x <= $totalpages)) {
      // if we're on current page...
      if ($x == $page) {
         // 'highlight' it but don't make a link
         echo " [<b>$x</b>] ";
      // if not current page...
      } else {
         // make it a link
         echo " <a href='{$_SERVER['PHP_SELF']}?page=$x'>$x</a> ";
      } // end else
   } // end if
} // end for

// if not on last page, show forward and last page links        
if ($page != $totalpages) {
   // get next page
   $nextpage = $page + 1;
    // echo forward link for next page
   echo " <a href='{$_SERVER['PHP_SELF']}?page=$nextpage'>></a> ";
   // echo forward link for lastpage
   echo " <a href='{$_SERVER['PHP_SELF']}?page=$totalpages'>>></a> ";
} // end if
/****** end build pagination links ******/
?>

</ul>



   <?php include 'footer.php'; ?>