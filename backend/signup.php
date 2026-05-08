<?php
require_once 'config.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password) && !empty($data->role)) {
    $email = $data->email;
    $password = password_hash($data->password, PASSWORD_BCRYPT);
    $role = $data->role;
    $fullName = $data->fullName;

    try {
        // Insert into users table
        $query = "INSERT INTO users (full_name, email, password, role, dob, gender, phone, address) 
                  VALUES (:full_name, :email, :password, :role, :dob, :gender, :phone, :address)";
        $stmt = $conn->prepare($query);
        
        $stmt->bindParam(':full_name', $fullName);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':role', $role);
        $stmt->bindParam(':dob', $data->dob);
        $stmt->bindParam(':gender', $data->gender);
        $stmt->bindParam(':phone', $data->phone);
        $stmt->bindParam(':address', $data->address);

        if ($stmt->execute()) {
            $last_id = $conn->lastInsertId();

            if ($role === 'student') {
                $q = "INSERT INTO student_details (user_id, course, semester, roll_no) 
                      VALUES (:user_id, :course, :semester, :roll_no)";
                $s = $conn->prepare($q);
                $s->bindParam(':user_id', $last_id);
                $s->bindParam(':course', $data->course);
                $s->bindParam(':semester', $data->semester);
                $roll = "STU-" . str_pad($last_id, 4, '0', STR_PAD_LEFT);
                $s->bindParam(':roll_no', $roll);
                $s->execute();
            } else {
                $q = "INSERT INTO admin_details (user_id, department, employee_id) 
                      VALUES (:user_id, :department, :employee_id)";
                $s = $conn->prepare($q);
                $s->bindParam(':user_id', $last_id);
                $s->bindParam(':department', $data->department);
                $s->bindParam(':employee_id', $data->employeeId);
                $s->execute();
            }

            echo json_encode(["message" => "User registered successfully.", "userId" => $last_id]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Registration failed: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Incomplete data."]);
}
?>
