CREATE DATABASE IF NOT EXISTS student_mgmt_db;
USE student_mgmt_db;

-- Table for Users (Admin, Student, Teacher, Parent)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin', 'teacher', 'parent') NOT NULL,
    dob DATE,
    gender VARCHAR(10),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Student Specific Details
CREATE TABLE IF NOT EXISTS student_details (
    user_id INT PRIMARY KEY,
    course VARCHAR(100),
    semester INT,
    roll_no VARCHAR(20) UNIQUE,
    parent_id INT, -- Links to the parent's user ID
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Table for Teacher Specific Details
CREATE TABLE IF NOT EXISTS teacher_details (
    user_id INT PRIMARY KEY,
    department VARCHAR(100),
    designation VARCHAR(100),
    employee_id VARCHAR(20) UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table for Admin Specific Details
CREATE TABLE IF NOT EXISTS admin_details (
    user_id INT PRIMARY KEY,
    department VARCHAR(100),
    employee_id VARCHAR(20) UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table for Attendance
CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    subject VARCHAR(100),
    attended INT DEFAULT 0,
    total INT DEFAULT 0,
    last_updated DATE,
    FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Table for Salary (For Teachers and Admins)
CREATE TABLE IF NOT EXISTS salary_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    month VARCHAR(20),
    amount DECIMAL(10, 2),
    status ENUM('Paid', 'Pending') DEFAULT 'Paid',
    payment_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table for Fees (Indian Context)
CREATE TABLE IF NOT EXISTS fee_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    term VARCHAR(50),
    total_amount DECIMAL(10, 2),
    paid_amount DECIMAL(10, 2) DEFAULT 0,
    due_date DATE,
    status ENUM('Paid', 'Pending', 'Partial') DEFAULT 'Pending',
    FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Table for Exams
CREATE TABLE IF NOT EXISTS exam_schedule (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exam_name VARCHAR(100),
    subject VARCHAR(100),
    exam_date DATE,
    room VARCHAR(50),
    status ENUM('Upcoming', 'Completed', 'Cancelled') DEFAULT 'Upcoming'
);

-- College Institutional Details
CREATE TABLE IF NOT EXISTS college_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tagline TEXT,
    about TEXT,
    address TEXT,
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20),
    logo_url VARCHAR(255),
    est_year INT,
    vc_name VARCHAR(100),
    vc_msg TEXT
);

CREATE TABLE IF NOT EXISTS courses_list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    duration VARCHAR(50),
    annual_fees DECIMAL(10, 2),
    seats INT,
    icon VARCHAR(10),
    highlights TEXT
);

CREATE TABLE IF NOT EXISTS trustees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100),
    bio TEXT,
    image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS campus_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    event_date DATE,
    event_time TIME,
    location VARCHAR(255),
    tag VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    notice_date DATE,
    is_new BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS ticker_updates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    priority INT DEFAULT 0
);

-- SEED DATA WITH INDIAN NAMES AND RUPEES
INSERT INTO college_info (name, est_year, address, tagline, vc_name, vc_msg) VALUES
('Savitribai Phule Institute of Technology', 1985, 'Ganeshkhind Road, Pune, Maharashtra 411007', 'Innovation for a Digital India', 'Dr. Rajesh Deshmukh', 'Our mission is to nurture the next generation of Indian engineers and leaders through excellence in education.');

INSERT INTO courses_list (name, duration, seats, annual_fees, icon, highlights) VALUES
('B.E. Computer Engineering', '4 Years', 120, 145000, '💻', 'AI, Cybersecurity, Blockchain'),
('B.E. Information Technology', '4 Years', 60, 135000, '🌐', 'Cloud Computing, Web Architecture'),
('M.E. Data Science', '2 Years', 30, 180000, '📊', 'Big Data Analytics, ML'),
('B.E. Electronics & Telecommunication', '4 Years', 60, 125000, '📡', 'IoT, Robotics, VLSI'),
('MBA Systems', '2 Years', 60, 210000, '💼', 'IT Management, Digital Transformation');

INSERT INTO trustees (name, role, bio) VALUES
('Dr. Shanti Swarup', 'Chairman', 'Renowned educationist with 40 years of experience in higher education policy.'),
('Smt. Meera Agarwal', 'Secretary', 'Philanthropist dedicated to rural education and women empowerment.'),
('Shri Vikram Malhotra', 'Treasurer', 'Expert in financial management and institutional growth.');

INSERT INTO campus_events (title, event_date, event_time, location, tag) VALUES
('National Tech Fest - Avishkar', '2026-06-15', '09:00:00', 'Auditorium', 'Festival'),
('Placement Drive - TCS/Infosys', '2026-05-20', '10:00:00', 'Placement Cell', 'Career');

-- Seed Users (Indian Names)
-- Password for all is 'password123' (hashed)
INSERT INTO users (id, full_name, email, password, role, dob, gender, phone, address) VALUES
(1, 'Admin User', 'admin@spit.edu', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '1980-01-01', 'Male', '9876543210', 'Pune, India'),
(2, 'Aryan Sharma', 'aryan@student.spit.edu', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student', '2004-08-15', 'Male', '8888888888', 'Mumbai, India'),
(3, 'Sanjay Sharma', 'sanjay@parent.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'parent', '1975-05-10', 'Male', '7777777777', 'Mumbai, India'),
(4, 'Dr. Kavita Iyer', 'kavita@teacher.spit.edu', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'teacher', '1982-03-20', 'Female', '6666666666', 'Pune, India'),
(5, 'Ananya Iyer', 'ananya@student.spit.edu', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student', '2005-01-12', 'Female', '5555555555', 'Pune, India');

INSERT INTO student_details (user_id, course, semester, roll_no, parent_id) VALUES
(2, 'Computer Engineering', 4, 'CE2023001', 3),
(5, 'Information Technology', 2, 'IT2024045', NULL);

INSERT INTO teacher_details (user_id, department, designation, employee_id) VALUES
(4, 'Computer Engineering', 'Associate Professor', 'TCH-CS-102');

INSERT INTO attendance (student_id, subject, attended, total) VALUES
(2, 'Data Structures', 45, 50),
(2, 'Mathematics IV', 38, 50),
(2, 'Microprocessors', 42, 50),
(5, 'C Programming', 48, 50);

INSERT INTO fee_records (student_id, term, total_amount, paid_amount, due_date, status) VALUES
(2, 'Academic Year 2025-26', 145000, 75000, '2025-12-31', 'Partial'),
(5, 'Academic Year 2025-26', 135000, 135000, '2025-12-31', 'Paid');

INSERT INTO salary_records (user_id, month, amount, status) VALUES
(4, 'April 2026', 85000, 'Paid'),
(1, 'April 2026', 95000, 'Paid');

INSERT INTO notices (title, notice_date, is_new) VALUES
('Holiday on account of Maharashtra Day', '2026-05-01', 1),
('Revised Semester Exam Time Table', '2026-04-28', 1),
('Internal Assessment Submission Deadline', '2026-04-25', 0);

INSERT INTO ticker_updates (content, priority) VALUES
('Admissions open for Academic Year 2026-27!', 1),
('SPIT ranked top in Maharashtra for IT Excellence.', 2);
