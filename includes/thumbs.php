<?php
    include('db.php');
    $conn = db_connect();

    // QUERY DB FOR SMALL SIZES ONLY SO THAT MAIN PAGE SHOWS ONLY EACH PRODUCT, NOT SIZES AND COLORS
    $sql = "SELECT sku, product, description FROM Inventory WHERE size='small'";
    $result = $conn->query($sql);

    // MAKE RETURN TO SEND ARRAY OF $RESULT TO JSON FOR JACK
      $items = [];
      while($row = $result->fetch_assoc())
      {
          $items[] = $row["sku"]. $row["product"].$row["description"];
      }

    print json_encode($items);
    $conn->close();
?>