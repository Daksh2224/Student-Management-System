<?php
require_once 'config.php';

// In a real app, this would use session_id or a JWT token
// For this demo, we'll use a user_id from the query param
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

if (!$user_id) {
    echo json_encode(["error" => "User ID required"]);
    exit;
}

$response = [];

try {
    // 1. Get Student Personal Info & Details
    $stmt = $conn->prepare("SELECT u.*, sd.course, sd.semester, sd.roll_no 
                           FROM users u 
                           JOIN student_details sd ON u.id = sd.user_id 
                           WHERE u.id = :uid");
    $stmt->execute(['uid' => $user_id]);
    $response['student'] = $stmt->fetch(PDO::FETCH_ASSOC);

    // 2. Get Attendance
    $stmt = $conn->prepare("SELECT subject, attended, total FROM attendance WHERE student_id = :uid");
    $stmt->execute(['uid' => $user_id]);
    $response['attendance'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 3. Get Fees
    $stmt = $conn->prepare("SELECT term, total_amount, paid_amount, due_date, status FROM fee_records WHERE student_id = :uid");
    $stmt->execute(['uid' => $user_id]);
    $response['fees'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 4. Get Exams
    $stmt = $conn->prepare("SELECT exam_name, exam_date, subject, room, status FROM exam_schedule");
    $stmt->execute();
    $response['exams'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 5. Get Notifications
    $response['notifications'] = [
        ["id" => 1, "text" => "Semester IV Internal Assessment dates announced.", "type" => "info", "time" => "2h ago"],
        ["id" => 2, "text" => "Your library book 'Data Structures' is due tomorrow.", "type" => "warning", "time" => "1d ago"],
        ["id" => 3, "text" => "Placement registration for TCS is now open.", "type" => "success", "time" => "3h ago"]
    ];

    echo json_encode($response);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
