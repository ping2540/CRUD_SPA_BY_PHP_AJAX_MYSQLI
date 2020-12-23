<?php

require_once("customer_function.php");

if (isset($_SERVER['CONTENT_TYPE'])) {
    $incom_contentType = $_SERVER['CONTENT_TYPE'];
    if ($incom_contentType == 'application/json') {

        $content = trim(file_get_contents("php://input"));
        $arrays = json_decode($content, true);
        $data = getAllCustomer($arrays['search']);
    }
} else {
    $data = getAllCustomer();
}
if (count($data) > 0) {
    echo "<center><table><tbody id=datatable><tr>";

    // member head table
    $key = array_keys($data[0]);

    // head table
    for ($i = 0; $i < count($key); $i++) {
        echo '<th>' . ucfirst($key[$i]) . '</th>';
    }
    echo "<th>Manage</th>";
    echo '</tr>';
    // body table
    if (isset($data[0]["id"])) {
        for ($i = 0; $i < count($data); $i++) {
            echo "<tr id=" . $data[$i]["id"] . ">";
            for ($j = 0; $j < count($key); $j++) {
                echo "<td>" .  $data[$i][$key[$j]] . '</td>';
            }
            echo "<td><button class = 'btn btn-primary fas fa-edit mx-2' onclick ='confirmEdit(" . $data[$i]["id"] . ")'></button>
        <button class='btn btn-danger fas fa-trash-alt mx-2' onclick ='confirmDelete(" . $data[$i]["id"] . ")'></button></td>";
            echo '</tr>';
        }

        echo "</tbody></table></center>";
    } else {
        echo "</tbody></table><center><h2 id=notdata>Not Found Data!!!</h2></center>";
    }
} else {
    echo "</tbody></table><center><h2 id=notdata>Not Found Data!!!</h2></center>";
}
