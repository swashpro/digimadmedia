<?php 

 $dbname='swashpro';
    $dbhost='cust-mysql-123-17';
    $dbpass='brokenwings1';
    $dbuser='swashpro';


    $dbhandle = mysql_connect($dbhost, $dbuser, $dbpass)
      or die("Unable to connect to MySQL");
    echo "";


    $selected = mysql_select_db("swashpro",$dbhandle)
      or die("Could not select examples");

      ?>