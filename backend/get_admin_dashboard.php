<?php
require_once 'config.php';

$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

if (!$user_id) {
    echo json_encode(["error" => "Admin ID required"]);
    exit;
}

$response = [];

try {
    // 1. Get Admin Details
    $stmt = $conn->prepare("SELECT u.*, ad.department, ad.employee_id 
                           FROM users u 
                           JOIN admin_details ad ON u.id = ad.user_id 
                           WHERE u.id = :uid");
    $stmt->execute(['uid' => $user_id]);
    $response['admin'] = $stmt->fetch(PDO::FETCH_ASSOC);

    // 2. High-level Stats
    $response['stats'] = [
        ["label" => "Total Students", "value" => "1,540", "trend" => "+12%"],
        ["label" => "Active Faculty", "value" => "142", "trend" => "8 New"],
        ["label" => "Revenue", "value" => "₹4.2 Cr", "trend" => "92% Col."],
        ["label" => "Active Events", "value" => "12", "trend" => "Next: Annual Fest"]
    ];

    // 3. Faculty Work (Mock for now or from table)
    $response['schedule'] = [
        ["id" => 1, "subject" => "Quantum Mechanics", "time" => "09:00 AM", "room" => "Hall A", "type" => "Lecture"],
        ["id" => 2, "subject" => "Electromagnetism", "time" => "11:30 AM", "room" => "Lab 2", "type" => "Practical"]
    ];

    // 4. Leave Balance
    $response['leaves'] = [
        ["type" => "Sick Leave", "balance" => 5],
        ["type" => "Casual Leave", "balance" => 7]
    ];

    echo json_encode($response);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
