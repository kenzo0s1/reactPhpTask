<?php
const hostname = '127.0.0.1';
const userName = 'root';
const password = '';
const nameDb = 'demis';

class DataBaseConnection{
    public $dbConn;
    public function __construct(){
        $this->dbConn = mysqli_connect(hostname, userName, password,nameDb);
        if(!$this->dbConn){
            die('Ошибка соединения c базой данных(const) ' . mysqli_error($this->dbConn));
        }
    }
}
