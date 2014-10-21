<?php include 'header.php'; ?>

 <title>DIGIMAD MEDIA FREE VECTORS</title><!--End page title-->

 <title>DIGIMAD MEDIA FREE VECTORS</title><!--End page title-->

 <meta name="description" content="Free premium vector illustrations, downloads totally free for commercial use.">

 <meta name="keywords" content="free, commercial use, download, vectors, vector, illustration, premium, digital drawings, clip art, stock, stock">
	
<div class="main--wrap prod--main--wrap clearfix">

  <div class="cat--wrap"></div>
  	
  <div class="products--wrap">

<?php include 'database-connect.php'; ?>

<?php

  $strSQL = "SELECT * FROM Vectors";
  $rs = mysql_query($strSQL);
  
    while($row = mysql_fetch_array($rs)) {?>

    <div class="vector--product--wrap">
       <h2><?php echo $row['Name'];?></h2><h3>Free Vector Download for Commercial Use</h3>
       <div class="product">
            <div class="bottom">
               <img src="vectors/<?php echo $row['Image'];?>" alt="free vector downloads digimadmedia for   commercial use <?php echo $row['Tags'];?>"> <div class="product--hover"><a class="preview-image">Preview Vector </a> <a href="vectors/<?php echo $row['ai_files'];?>">Download Free Vector</a>
            </div>
            <div class="perview-image-wrap-main"> <img src="vectors/<?php echo $row['Image'];?>" alt="free vector downloads digimadmedia for commercial use <?php echo $row['Tags'];?>">
               <div class="close-preview">x</div>
            </div>
            </div>
          </div>
    </div>

    <?php 
    } 
    mysql_close(); 
    ?>

    <?php
        mysql_connect("cust-mysql-123-17", "swashpro", "brokenwings1") or die("Error connecting to database: ".mysql_error()); 
        mysql_select_db("swashpro") or die(mysql_error());
    ?>

    <?php
        $query = $_GET['query']; 
        
        // $min_length = 3;
         
        if(strlen($query) >= $min_length){ 
            // $query = htmlspecialchars($query); 
            $query = mysql_real_escape_string($query);


             $raw_results = mysql_query("SELECT `Name`,`Tags`,`Image`  FROM Vectors WHERE
             (`Name` LIKE '%".$query."%') OR
             (`Tags` LIKE '%".$query."%') OR
             (`Image` LIKE '%".$query."%')

             UNION ALL 
             
             SELECT `photo`,`photo_alt`,`image_id` FROM Photos WHERE
             (`photo` LIKE '%".$query."%') OR
             (`photo_alt` LIKE '%".$query."%')");

        if(mysql_num_rows($raw_results) > 0){ 
             
            while($results = mysql_fetch_array($raw_results)){ 

            $image_results = "vectors/";
            $image_results_2 = "photos/";

    ?>
            <img src="vectors/<?php echo $results['Image'];?>">
            <img src="photos/<?php echo $results['Name'];?>">              
    <?php
           }
         }
          else{
              echo "No results";
          }
        }
          else{
            echo "Minimum length is ".$min_length;
          }
    ?>

    <form action="" method="GET">
        <input type="text" name="query" />
        <input type="submit" value="Search" />
    </form>

<?php include 'footer.php'; ?>