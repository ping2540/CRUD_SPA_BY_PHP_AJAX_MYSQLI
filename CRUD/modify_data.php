<?php
    require_once("customer_function.php");
if( $_SERVER['REQUEST_METHOD'] == 'POST'){
    $content = trim(file_get_contents("php://input"));
    $arrays = json_decode($content, true);
    deleteCustomer($arrays['id']);
}else{
    $person = getPerson();
    echo   $person;
}