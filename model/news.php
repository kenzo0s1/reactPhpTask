<?php
class News{
    private $db ;
    function __construct($dbConn){
        $this->db = $dbConn;
    }
    public function getPostCount($count){
        $query = "SELECT *  FROM `news` ORDER BY `date` DESC LIMIT $count;";
        $result = mysqli_query($this->db, $query);
        return $result;
    }

}