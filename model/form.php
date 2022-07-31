<?php
require_once ('functions/checkErr.php');
class Form{
    private $db ;
    function __construct($dbConn){
        $this->db = $dbConn;
    }
    public function addFormData($name,$adress,$email,$number){
        $query = "INSERT INTO `form` (`name`, `adress`, `email`, `number`) VALUES ('$name', '$adress', '$email', '$number')";
//        $query = "SELECT * FROM news where id = $id";
        return checkErrInsertInto($this->db->query($query));
//        if ($this->db->query($query) === TRUE) {
//            return true;
//        } else {
//            return false;
//        }

//        $result = mysqli_query($this->db, $query);
//        return $result;
    }
}