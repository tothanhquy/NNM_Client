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


public function createOrderByStaff(Request $request,$UserId)
    {
        $new_order= $request->all();
        $string = $new_order['product'];
        //products: ["{id}:S.{number};M.{number}"]
        //$string = "id1:size1:numberOfSize1;id1:size2:numberOfSize2;id2:size3:numberOfSize3";

        // Phân tách các phần tử theo dấu ';'
        $items = explode(';', $string);

        $products;
        $totalPrice = 0;
        $discountPayment =0;
        $orderDetails=array();

        foreach ($items as $item) {
            // Phân tách thành phần con theo dấu ':'
            $parts = explode(':', $item);

            $id = $parts[0];
            $size = $parts[1];
            $numberOfSize = $parts[2];
            
            

            $products[$id][$size] = $numberOfSize;
            $singlePrice = getPrice($id, $size); // this function gets product price by id and size
            // Get discounts for the current product
            $discounts = \DB::table('discount')
                ->where('productId', $id)
                //chổ này where 2 lần ko dc à
                ->where(function ($query) use ($discountCode) {
                    $query->where('code', $discountCode)
                        ->where('startTime', '<=', now())
                        ->where('endTime', '>=', now());
                })
                ->first();

            $discountAmount = 0;
            $discountPayment += $singlePrice * $numberOfSize;
            if (!empty($discounts)) {
                $discountAmount = $singlePrice * $numberOfSize * $discounts->discountPercent / 100;

                $totalPrice += $singlePrice * $numberOfSize - $discountAmount;
            } else {
                $totalPrice += $singlePrice * $numberOfSize;
            }


            //

            array_push($orderDetails,{
                'size' => $size,
                 'productId' => $id,
                 'number'=>$numberOfSize,
                 'price' => $singlePrice
             });
        }

        $discountPayment = 0;

        foreach($processed_products as $product) {
            $discountPayment += ($product['money'] - $product['price_after_discount']);
        }
        $order = Order::create([
            'userId' => $UserId,
            'time' => $new_order['time'],
            'sdt' => $new_order['sdt'],
            'note' => $new_order['note'],
            'numberProduct' => count($product),
            'totalBill' => $total_price,
            'discountPayment' => $discountPayment,
            'numberTable' => $new_order['numberTable'],
            'discountCode' => $new_order['discountCode']
        ]);

        $orderId = 123;//lấy id sau khi tạo order

        //

        foreach($orderDetails as $orderDetails){
            $orderDetails["productId"]=$orderId;
        }
        

        $order_detail = Order_Details::create([
            
        ]);
        return response()->json([
            'message' => 'Order successfully created',
            'order' => $order
        ], 201);
    }