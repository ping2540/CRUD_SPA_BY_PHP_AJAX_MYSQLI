<?php
function createMysqliConnection()
{
  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "expert";
  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  return $conn;
}

function insertNewCustomer($firstname, $lastname, $phone, $email)
{
  $conn = createMysqliConnection();
  $sql = "INSERT INTO customer (firstname,lastname,phone,email)
  VALUES ('$firstname', '$lastname', '$phone','$email')";

  // processing insert data
  if ($conn->query($sql) === TRUE) {
    echo "save";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

  $conn->close();
}

function deleteCustomer($id)
{
  $conn = createMysqliConnection();
  $sql = "DELETE FROM customer WHERE id = $id";

  // processing delete data
  if ($conn->query($sql) === TRUE) {
    echo "Delete ID = ".$id."successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

  $conn->close();
  exit();
}

function updateCustomer($id, $firstname, $lastname, $phone, $email, $insert_time)
{
  $conn = createMysqliConnection();
  $sql = "UPDATE `customer` SET `firstname`='$firstname',`lastname`='$lastname',`phone`='$phone',`email`='$email',`insert_time`='$insert_time ' WHERE id = $id";
  if ($conn->query($sql) === TRUE) {
    echo "save";
  } else {
    echo "Error updating record: " . $conn->error;
  }
  $conn->close();
}

function getAllCustomer($search=null)
{
  $conn = createMysqliConnection();
  if(empty($search))
  {
  $sql = "SELECT *FROM customer";
  }else {
    $sql = "SELECT * FROM customer WHERE firstname LIKE '$search%'";
  }

  $result = $conn->query($sql);
  $customers = array();

  if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
      $customers_row = array(
        "id" => $row["id"],
        "firstname" => $row["firstname"],
        "lastname" => $row["lastname"],
        "phone" => $row["phone"],
        "email" => $row["email"],
        "insert_time" => $row["insert_time"],
      );
      array_push($customers, $customers_row);
    }
  } else {
    $customers_row = array(
      "id" => null,
      "firstname" => null,
      "lastname" => null,
      "phone" => null,
      "email" => null,
      "insert_time" => null,
    );
    array_push($customers, $customers_row);
  }
  $conn->close();
  return $customers;
}

function getPerson()
{
  $conn = createMysqliConnection();
  $sql = "SELECT MAX(id) FROM `customer`";
  $result = mysqli_query($conn,  $sql);
  $row = mysqli_fetch_row($result);
  if (is_null($row[0])) {
    return 0;
  }
  return $row[0];
}
