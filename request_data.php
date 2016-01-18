<?php

header('Content-Type: application/json');

$data = require_once('data.php');

$final_array = array();
foreach($data as $key => $value ){
	$final_array[] = array('name' => $value['name'],'img' => $value['img']  );
}

echo json_encode($final_array);