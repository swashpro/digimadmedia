<?php
$con=mysqli_connect("cust-mysql-123-17","swashpro","brokenwings1","swashpro");

// Check connection
if (mysqli_connect_errno($con))
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
else
 {
 echo "Success!";
 }

mysqli_close($con);
?>