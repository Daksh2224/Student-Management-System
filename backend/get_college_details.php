<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include_once 'config.php';

$response = [];

// Get General Info
$info_res = $conn->query("SELECT * FROM college_info LIMIT 1");
$response['info'] = $info_res->fetch_assoc();

// Get Courses
$courses_res = $conn->query("SELECT * FROM courses_list");
$response['courses'] = [];
while($row = $courses_res->fetch_assoc()) {
    $response['courses'][] = $row;
}

// Get Trustees
$trustees_res = $conn->query("SELECT * FROM trustees");
$response['trustees'] = [];
while($row = $trustees_res->fetch_assoc()) {
    $response['trustees'][] = $row;
}

// Get Events
$events_res = $conn->query("SELECT * FROM campus_events ORDER BY event_date ASC");
$response['events'] = [];
while($row = $events_res->fetch_assoc()) {
    $response['events'][] = $row;
}

// Get Notices
$notices_res = $conn->query("SELECT * FROM notices ORDER BY notice_date DESC");
$response['notices'] = [];
while($row = $notices_res->fetch_assoc()) {
    $response['notices'][] = $row;
}

// Get Ticker Updates
$ticker_res = $conn->query("SELECT * FROM ticker_updates ORDER BY priority ASC");
$response['ticker'] = [];
while($row = $ticker_res->fetch_assoc()) {
    $response['ticker'][] = $row;
}

echo json_encode($response);
?>
