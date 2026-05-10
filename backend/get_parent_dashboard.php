<?php
require_once 'config.php';

$parent_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

if (!$parent_id) {
    echo json_encode(["error" => "Parent ID required"]);
    exit;
}

$response = [];

try {
    // 1. Get Parent Info
    $stmt = $conn->prepare("SELECT id, full_name, email, phone FROM users WHERE id = :pid AND role = 'parent'");
    $stmt->execute(['pid' => $parent_id]);
    $response['parent'] = $stmt->fetch(PDO::FETCH_ASSOC);

    // 2. Get Children (Linked Students)
    $stmt = $conn->prepare("SELECT u.id, u.full_name, sd.course, sd.semester, sd.roll_no 
                           FROM users u 
                           JOIN student_details sd ON u.id = sd.user_id 
                           WHERE sd.parent_id = :pid");
    $stmt->execute(['pid' => $parent_id]);
    $children = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['children'] = $children;

    // 3. For each child, get their performance summary
    foreach ($response['children'] as &$child) {
        // Attendance
        $stmt = $conn->prepare("SELECT subject, attended, total FROM attendance WHERE student_id = :sid");
        $stmt->execute(['sid' => $child['id']]);
        $child['attendance'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Fees
        $stmt = $conn->prepare("SELECT term, total_amount, paid_amount, status FROM fee_records WHERE student_id = :sid");
        $stmt->execute(['sid' => $child['id']]);
        $child['fees'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode($response);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
