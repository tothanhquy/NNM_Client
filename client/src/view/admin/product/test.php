<?php

$string = "id1:size1:numberOfSize1;id1:size2:numberOfSize2;id2:size3:numberOfSize3";

// Phân tách các phần tử theo dấu ';'
$items = explode(';', $string);

$products;

foreach ($items as $item) {
    // Phân tách thành phần con theo dấu ':'
    $parts = explode(':', $item);

    $id = $parts[0];
    $size = $parts[1];
    $numberOfSize = $parts[2];

    $products[$id][$size]=$numberOfSize;
}

$products = array(
    '1' => array(
        's' => 10,
        'm' => 15
    ),
    '2' => array(
        'l' => 8
    )
);
