const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'academy_management';

const sampleTeachers = [
  {
    type: 'teacher',
    id: 'TEACH001',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@academy.com',
    phone: '+1-555-0101',
    branch: 'Main Campus',
    course: 'Mathematics',
    password: 'teacher123',
    salary: 5000,
    base_salary: 5000,
    attendance_present: 20,
    attendance_absent: 2,
    attendance_total: 22,
    salary_paid: 0
  },
  {
    type: 'teacher',
    id: 'TEACH002',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@academy.com',
    phone: '+1-555-0102',
    branch: 'Main Campus',
    course: 'Physics',
    password: 'teacher123',
    salary: 5500,
    base_salary: 5500,
    attendance_present: 21,
    attendance_absent: 1,
    attendance_total: 22,
    salary_paid: 0
  },
  {
    type: 'teacher',
    id: 'TEACH003',
    name: 'Ms. Emily Rodriguez',
    email: 'emily.rodriguez@academy.com',
    phone: '+1-555-0103',
    branch: 'North Branch',
    course: 'Computer Science',
    password: 'teacher123',
    salary: 6000,
    base_salary: 6000,
    attendance_present: 19,
    attendance_absent: 3,
    attendance_total: 22,
    salary_paid: 0
  },
  {
    type: 'teacher',
    id: 'TEACH004',
    name: 'Dr. James Wilson',
    email: 'james.wilson@academy.com',
    phone: '+1-555-0104',
    branch: 'South Branch',
    course: 'Chemistry',
    password: 'teacher123',
    salary: 5200,
    base_salary: 5200,
    attendance_present: 22,
    attendance_absent: 0,
    attendance_total: 22,
    salary_paid: 0
  },
  {
    type: 'teacher',
    id: 'TEACH005',
    name: 'Ms. Priya Patel',
    email: 'priya.patel@academy.com',
    phone: '+1-555-0105',
    branch: 'Main Campus',
    course: 'English Literature',
    password: 'teacher123',
    salary: 4800,
    base_salary: 4800,
    attendance_present: 20,
    attendance_absent: 2,
    attendance_total: 22,
    salary_paid: 0
  }
];

const sampleStudents = [
  {
    type: 'student',
    id: 'STU001',
    name: 'Alex Thompson',
    email: 'alex.thompson@student.academy.com',
    phone: '+1-555-1001',
    course: 'Computer Science',
    year: '2nd Year',
    gpa: 3.8,
    date_of_birth: '2004-05-15',
    address: '123 Oak Street, Springfield',
    father_name: 'Robert Thompson',
    status: 'Active',
    fees_due: 15000,
    fees_paid: 10000,
    attendance_present: 85,
    attendance_absent: 5,
    attendance_total: 90,
    results: 'Semester 1,A+,Programming|Semester 2,A,Data Structures'
  },
  {
    type: 'student',
    id: 'STU002',
    name: 'Maria Garcia',
    email: 'maria.garcia@student.academy.com',
    phone: '+1-555-1002',
    course: 'Mathematics',
    year: '3rd Year',
    gpa: 3.9,
    date_of_birth: '2003-08-22',
    address: '456 Maple Avenue, Springfield',
    father_name: 'Carlos Garcia',
    status: 'Active',
    fees_due: 15000,
    fees_paid: 15000,
    attendance_present: 88,
    attendance_absent: 2,
    attendance_total: 90,
    results: 'Semester 1,A+,Calculus|Semester 2,A+,Linear Algebra'
  },
  {
    type: 'student',
    id: 'STU003',
    name: 'David Kim',
    email: 'david.kim@student.academy.com',
    phone: '+1-555-1003',
    course: 'Physics',
    year: '1st Year',
    gpa: 3.5,
    date_of_birth: '2005-03-10',
    address: '789 Pine Road, Springfield',
    father_name: 'John Kim',
    status: 'Active',
    fees_due: 15000,
    fees_paid: 5000,
    attendance_present: 80,
    attendance_absent: 10,
    attendance_total: 90,
    results: 'Semester 1,B+,Mechanics'
  },
  {
    type: 'student',
    id: 'STU004',
    name: 'Sophie Anderson',
    email: 'sophie.anderson@student.academy.com',
    phone: '+1-555-1004',
    course: 'Chemistry',
    year: '2nd Year',
    gpa: 3.7,
    date_of_birth: '2004-11-28',
    address: '321 Elm Street, Springfield',
    father_name: 'William Anderson',
    status: 'Active',
    fees_due: 15000,
    fees_paid: 12000,
    attendance_present: 87,
    attendance_absent: 3,
    attendance_total: 90,
    results: 'Semester 1,A,Organic Chemistry|Semester 2,A-,Inorganic Chemistry'
  },
  {
    type: 'student',
    id: 'STU005',
    name: 'Ryan O\'Brien',
    email: 'ryan.obrien@student.academy.com',
    phone: '+1-555-1005',
    course: 'Computer Science',
    year: '4th Year',
    gpa: 3.6,
    date_of_birth: '2002-07-14',
    address: '654 Birch Lane, Springfield',
    father_name: 'Patrick O\'Brien',
    status: 'Active',
    fees_due: 15000,
    fees_paid: 8000,
    attendance_present: 82,
    attendance_absent: 8,
    attendance_total: 90,
    results: 'Semester 1,B+,Algorithms|Semester 2,A-,Database Systems|Semester 3,A,Web Development'
  },
  {
    type: 'student',
    id: 'STU006',
    name: 'Aisha Mohammed',
    email: 'aisha.mohammed@student.academy.com',
    phone: '+1-555-1006',
    course: 'English Literature',
    year: '3rd Year',
    gpa: 3.85,
    date_of_birth: '2003-12-05',
    address: '987 Cedar Court, Springfield',
    father_name: 'Ahmed Mohammed',
    status: 'Active',
    fees_due: 15000,
    fees_paid: 15000,
    attendance_present: 89,
    attendance_absent: 1,
    attendance_total: 90,
    results: 'Semester 1,A+,Shakespeare|Semester 2,A,Modern Poetry'
  },
  {
    type: 'student',
    id: 'STU007',
    name: 'Lucas Silva',
    email: 'lucas.silva@student.academy.com',
    phone: '+1-555-1007',
    course: 'Mathematics',
    year: '1st Year',
    gpa: 3.4,
    date_of_birth: '2005-09-18',
    address: '147 Willow Way, Springfield',
    father_name: 'Marco Silva',
    status: 'Active',
    fees_due: 15000,
    fees_paid: 3000,
    attendance_present: 78,
    attendance_absent: 12,
    attendance_total: 90,
    results: 'Semester 1,B,Algebra'
  },
  {
    type: 'student',
    id: 'STU008',
    name: 'Emma Zhang',
    email: 'emma.zhang@student.academy.com',
    phone: '+1-555-1008',
    course: 'Physics',
    year: '2nd Year',
    gpa: 3.75,
    date_of_birth: '2004-04-20',
    address: '258 Spruce Street, Springfield',
    father_name: 'Wei Zhang',
    status: 'Active',
    fees_due: 15000,
    fees_paid: 11000,
    attendance_present: 86,
    attendance_absent: 4,
    attendance_total: 90,
    results: 'Semester 1,A,Quantum Physics|Semester 2,A-,Thermodynamics'
  }
];

async function addSampleData() {
  let client;
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db(DB_NAME);
    const collection = db.collection('academy_data');

    // Clear existing data
    await collection.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert teachers
    const teacherResult = await collection.insertMany(sampleTeachers);
    console.log(`✅ Added ${teacherResult.insertedCount} teachers`);

    // Insert students
    const studentResult = await collection.insertMany(sampleStudents);
    console.log(`✅ Added ${studentResult.insertedCount} students`);

    console.log('\n📊 Sample Data Summary:');
    console.log(`   Teachers: ${sampleTeachers.length}`);
    console.log(`   Students: ${sampleStudents.length}`);
    console.log('\n🎉 Sample data added successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('   Admin: ADMIN001 / admin123');
    console.log('   Teacher: TEACH001 / teacher123');
    console.log('   Student: STU001 / 2004-05-15 (DOB)');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (client) {
      await client.close();
      console.log('\n👋 Disconnected from MongoDB');
    }
  }
}

addSampleData();
