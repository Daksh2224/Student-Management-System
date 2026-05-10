<?php
require_once 'config.php';

try {
    $stmt = $conn->prepare("SELECT u.id, u.full_name, u.email, u.phone, sd.course, sd.semester, sd.roll_no 
                           FROM users u 
                           JOIN student_details sd ON u.id = sd.user_id 
                           WHERE u.role = 'student'");
    $stmt->execute();
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($students);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
