<?php
require_once ('functions/checkErr.php');
class Form{
    private $db ;
    function __construct($dbConn){
        $this->db = $dbConn;
    }
    public function addFormData($name,$adress,$email,$number){
        $query = "INSERT INTO `form` (`name`, `adress`, `email`, `number`) VALUES ('$name', '$adress', '$email', '$number')";
        return checkErrInsertInto($this->db->query($query));
    }
}