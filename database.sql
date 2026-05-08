CREATE DATABASE IF NOT EXISTS student_mgmt_db;
USE student_mgmt_db;

-- Table for Users (Both Students and Admins)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') NOT NULL,
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
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table for Admin Specific Details
CREATE TABLE IF NOT EXISTS admin_details (
    user_id INT PRIMARY KEY,
    department VARCHAR(100),
    employee_id VARCHAR(20) UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table for Attendance (Sample)
CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    subject VARCHAR(100),
    attended INT DEFAULT 0,
    total INT DEFAULT 0,
    FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Table for Salary (Sample for Admin/Teachers)
CREATE TABLE IF NOT EXISTS salary_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT,
    month VARCHAR(20),
    amount DECIMAL(10, 2),
    status ENUM('Paid', 'Pending') DEFAULT 'Paid',
    FOREIGN KEY (admin_id) REFERENCES users(id)
);

-- Table for Fees
CREATE TABLE IF NOT EXISTS fee_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    term VARCHAR(50),
    amount DECIMAL(10, 2),
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
CREATE TABLE college_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tagline TEXT,
    about TEXT,
    address TEXT,
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20),
    logo_url VARCHAR(255)
);

CREATE TABLE courses_list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    duration VARCHAR(50),
    annual_fees DECIMAL(10, 2),
    seats INT,
    icon VARCHAR(10) -- Emoji or icon name
);

CREATE TABLE trustees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100),
    bio TEXT,
    image_url VARCHAR(255)
);

CREATE TABLE campus_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    event_date DATE,
    event_time TIME,
    location VARCHAR(255),
    tag VARCHAR(50) -- Festival, Conference, etc.
);

-- Seed Initial Data
INSERT INTO college_info (name, est_year, address, tagline, vc_name, vc_msg, logo_path) VALUES
('Zenith Global University', 1949, 'University Road, Sector 9, North Metropolitan City', 'Empowering the Future through Innovation', 'Dr. Alistair Thorne', 'Zenith Global University is committed to providing a transformative education that balances tradition with modern innovation.', '/logo.png');

INSERT INTO courses_list (name, duration, seats, fees_annual, icon, highlights) VALUES
('B.Tech Computer Science', '4 Years', 120, 85000, '💻', 'AI, Cloud, Full Stack Development'),
('B.Tech Electronics', '4 Years', 60, 75000, '📡', 'VLSI, Robotics, IoT Systems'),
('MBA International Business', '2 Years', 60, 120000, '💼', 'Global Trade, Finance, HR'),
('B.Sc Physics (Hons)', '3 Years', 40, 25000, '⚛️', 'Quantum Mechanics, Optics'),
('M.Tech Data Science', '2 Years', 30, 95000, '🧠', 'Big Data, ML, Neural Networks');

INSERT INTO trustees (name, role, bio, photo_path) VALUES
('Hon. Julian Sterling', 'Chancellor', 'A distinguished academic leader with decades of experience in global governance.', '/chancellor.png'),
('Dr. Alistair Thorne', 'Vice Chancellor', 'Academic visionary specializing in Theoretical Physics and Reform.', '/vice_chancellor.png'),
('Dr. Elena Vance', 'Registrar', 'Expert in institutional administration and coordination.', '/registrar.png'),
('Mr. Marcus Vane', 'Finance Officer', 'Managing the university\'s multi-million research and development fund.', '/finance.png');

INSERT INTO campus_events (title, event_date, event_time, location, tag) VALUES
('Global Tech Summit 2026', '2026-05-12', '10:00:00', 'Main Hall', 'Conference'),
('Annual Cultural Fest', '2026-06-05', '18:00:00', 'Open Grounds', 'Festival');

-- Seed Sample User (Student)
INSERT INTO users (id, full_name, email, password, role, dob, gender, phone, address) VALUES
(1, 'Alex Johnson', 'alex@university.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'student', '2004-05-15', 'Male', '+1 234 567 890', '123 University Housing');

INSERT INTO student_details (user_id, course, semester, roll_no) VALUES
(1, 'Computer Science & Engineering', 4, 'CS-2023-042');

INSERT INTO attendance (student_id, subject, attended, total) VALUES
(1, 'Data Structures', 28, 32),
(1, 'Operating Systems', 24, 30),
(1, 'Computer Networks', 31, 34),
(1, 'DBMS', 25, 28);

INSERT INTO fee_records (student_id, term, amount, paid_amount, due_date, status) VALUES
(1, 'Semester 4', 45000, 0, '2025-08-15', 'Pending'),
(1, 'Semester 3', 45000, 45000, '2025-01-15', 'Paid');

INSERT INTO exam_schedule (exam_name, subject, exam_date, room, status) VALUES
('Mid-Term Examination', 'Data Structures', '2026-04-25', 'Hall A', 'Upcoming'),
('Practical Viva', 'DBMS Lab', '2026-04-28', 'Lab 1', 'Upcoming');

CREATE TABLE notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    notice_date DATE,
    is_new BOOLEAN DEFAULT TRUE
);

CREATE TABLE ticker_updates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    priority INT DEFAULT 0
);

INSERT INTO notices (title, notice_date, is_new) VALUES
('Circular regarding PhD Entrance Exam', '2026-04-18', 1),
('Hostel Admission List - Semester I', '2026-04-15', 0),
('Summer Internship Opportunity at Tech Hub', '2026-04-12', 0),
('Rescheduling of BA Sem-IV Exams', '2026-04-10', 0);

INSERT INTO ticker_updates (content, priority) VALUES
('Admissions 2026-27: UG/PG Applications now live!', 1),
('Heritage State University ranked #1 in Innovation by State Rankings.', 2),
('Notification: Mid-Term Examination schedules published for Science Faculty.', 3);
