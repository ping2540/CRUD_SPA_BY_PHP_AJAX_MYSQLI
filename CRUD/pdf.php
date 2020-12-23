<?php

require_once __DIR__ . '/vendor/autoload.php';
$mpdf = new \Mpdf\Mpdf();
require_once("customer_function.php");
ob_start();

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="CSS/tablepdf.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ShowDatabase</title>
</head>

<body>
    <br>
    <h1 style="text-align: center;">Show All Data in Database</h1><br>
    <hr><br>
    <?php
    $data = getAllCustomer();
    echo "<center><table><tr>";

    // member head table
    $key = array_keys($data[0]);

    // head table
    for ($i = 0; $i < count($key); $i++) {
        echo '<th>' . ucfirst($key[$i]) . '</th>';
    }
    echo '</tr>';
    // body table
    for ($i = 0; $i < count($data); $i++) {
        echo "<tr id=" . $data[$i]["id"] . ">";
        for ($j = 0; $j < count($key); $j++) {
            echo "<td>" .  $data[$i][$key[$j]] . '</td>';
        }
        echo '</tr>';
    }
    echo "</tbody></table></center>";
    ?>
    <br>
    <?php
    $html = ob_get_contents();
    $mpdf->WriteHTML($html);
    $mpdf->Output("ShowDatabase.pdf");
    ob_end_flush();
    ?>
    <center>ดาวโหลดในรูปแบบ PDF <a href="ShowDatabase.pdf">คลิกที่นี้</a></center>
</body>


</html>