<?php
    include('includes/db.php');
    $conn = db_connect();

    // QUERY DB FOR SMALL SIZES ONLY SO THAT MAIN PAGE SHOWS ONLY EACH PRODUCT, NOT SIZES AND COLORS
    $sql = "SELECT sku, product, description FROM Inventory WHERE size='small'";
    $result = $conn->query($sql);
    $conn->close();

    if ($result->num_rows > 0)
    {
      $items = [];
      // OUTPUT DATA FOR EACH ROW
      while($row = $result->fetch_assoc())
      {

          $items[] = $row;
      }
    }
    else
    {
         echo "0 results";
    }

    print json_encode($items);
?>
