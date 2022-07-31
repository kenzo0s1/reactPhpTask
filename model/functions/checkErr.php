<?php
function checkErrInsertInto($query){
    if ($query === TRUE) {
        return true;
    } else {
        return false;
    }
}