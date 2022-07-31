<?php
require_once('db/db.php');
require_once('model/form.php');
require_once('model/news.php');

if (!headers_sent()) {
    header('Access-Control-Allow-Origin: *');
}
$dbConn = new DataBaseConnection();
$form = new Form($dbConn->dbConn);
$news = new News($dbConn->dbConn);
$addPost = $_POST['addForm'];
if(isset($addPost)){
    $arr = json_decode($addPost, true);
    $name = $arr['name'];
    $number = $arr['number'];
    $email = $arr['email'];
    $adress = $arr['adress'];
    if($name && $number && $email && $adress){
        if($form->addFormData($name, $adress, $email, $number)){
            echo 'true';
        }else{
            echo 'false';
        }
       ;
//        echo 'true';
    }else{
        echo 'false';
       echo $addPost;
    }

}
$getPosts = $_POST['getPost'];
if(isset($getPosts)) {
    $res = $news->getPostCount($getPosts);
    $arr = array();
    if ($res->num_rows > 0) {
        while ($row = $res->fetch_assoc()) {
            $arr[] = $row;
//        echo json_encode($arr);
        }
    }
    echo json_encode($arr);
}
//$form->getPostById('1','1','1','1');