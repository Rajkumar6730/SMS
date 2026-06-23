// src/components/StudentList.jsx
import StudentCard from './StudentCard';

const StudentList = ({ students, onDelete }) => {
  if (students.length === 0) {
    return <p>No students found.</p>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
      {students.map(student => (
        <StudentCard key={student.id} student={student} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default StudentList;