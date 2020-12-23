<?php
require_once("customer_function.php");

if (isset($_SERVER['CONTENT_TYPE'])) {
    $incom_contentType = $_SERVER['CONTENT_TYPE'];
    if ($incom_contentType != 'application/json') {
        header($_SERVER['SERVER_PROTOCOL'] . '599 Bad request');
        exit();
    }

    $content = trim(file_get_contents("php://input"));
    $arrays = json_decode($content, true);
    $db = createMysqliConnection();

    if (isset($arrays['id'])) {
        $id = $arrays['id'];
        $fname = ucfirst($arrays["firstname"]);
        $lname = ucfirst($arrays["lastname"]);
        $phone = $arrays["phone"];
        $email = $arrays["email"];
        $insert_time = $arrays["insert_time"];
        updateCustomer($id, $fname, $lname, $phone, $email, $insert_time);
    } else if ((isset($arrays['firstname']) && isset($arrays['lastname'])) &&
        (isset($arrays['email']) && isset($arrays['phone']))
    ) {

        $fname = ucfirst($arrays["firstname"]);
        $lname = ucfirst($arrays["lastname"]);
        $phone = $arrays["phone"];
        $email = $arrays["email"];
        insertNewCustomer($fname, $lname, $phone, $email);
    } else if (isset($arrays['email'])) {

        $email = $arrays["email"];
        $sql = "SELECT email FROM customer WHERE email = '$email' ";
        $results = mysqli_query($db, $sql);
        if (mysqli_num_rows($results) > 0) {
            echo 'have';
        } else {
            echo 'no_have';
        }
    } else if (isset($arrays['phone'])) {

        $phone = $arrays["phone"];
        $sql = "SELECT phone FROM customer WHERE phone = '$phone' ";
        $results = mysqli_query($db, $sql);
        if (mysqli_num_rows($results) > 0) {
            echo 'have';
        } else {
            echo 'no_have';
        }
    }
    exit();
}



