<?php
require_once 'config.php';

try {
    $stmt = $conn->prepare("SELECT u.id, u.full_name, u.email, u.phone, td.department, td.designation, td.employee_id 
                           FROM users u 
                           JOIN teacher_details td ON u.id = td.user_id 
                           WHERE u.role = 'teacher'");
    $stmt->execute();
    $teachers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($teachers);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
