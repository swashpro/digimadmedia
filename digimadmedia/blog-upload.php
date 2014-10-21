<?php include 'database-connect.php'; ?>

<?php


  $res=mysql_query("INSERT INTO Vectors (Blog_ID, blog_sub_heading, blog_heading, blog_content, blog_image_1, blog_image_2) VALUES ('$_POST[Blog_ID]', '$_POST[blog_heading]', '$_POST[blog_sub_heading]', '$_POST[blog_content]', '$_POST[blog_image_1]', '$_POST[blog_image_2]')");

    if (array_key_exists ('check_submit', $_POST )) 


// $remote_dir = "/img/";

// $ftp_server = 'ftp.digimadmedia.com';

// $ftp_user_name = 'ftp@digimadmedia.com';
// $ftp_user_pass = '0f21XevTVkd3';

// $conn_id = ftp_connect($ftp_server) or die("Couldn't connect to $ftp_server"); 

// // ftp_chdir($conn_id, "pubilc_html/img");


// // login with username and password
// $login_result = @ftp_login($conn_id, $ftp_user_name, $ftp_user_pass);

// if($login_result) {
// //set passive mode enabled
// ftp_pasv($conn_id, true);

// echo'logged into ftp';
// }

// if (empty($fileName)) {
//     die('Please upload a sfile');
// }

// else{
// 	echo'here is the file';
// }

// $upload = ftp_put( $conn_id, 'public_html/vectors' . $fileName , $_FILES['Image']['tmp_name'] , FTP_BINARY );

// if(!$upload){
//     echo "FTP upload has failed!" ;
// } else {
//     echo "Successfully Uploaded." ;
// }


if (!$res) {
    die('Invalid query: ' . mysql_error());
}
    ?>



