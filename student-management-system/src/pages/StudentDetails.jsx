// src/pages/StudentDetails.jsx
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { useEffect, useState } from 'react';

const StudentDetails = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { getStudentById, deleteStudent } = useStudent();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const found = getStudentById(studentId);
    if (found) {
      setStudent(found);
    } else {
      navigate('/');
    }
  }, [studentId, getStudentById, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Delete this student?')) {
      await deleteStudent(studentId);
      navigate('/');
    }
  };

  if (!student) return <p>Loading...</p>;

  return (
    <div>
      <h1>Student Details</h1>
      <div className="card">
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Year:</strong> {student.year}</p>
        <p><small>Added on: {new Date(student.createdAt).toLocaleDateString()}</small></p>
      </div>
      <div>
        <Link to={`/students/${studentId}/edit`}>
          <button style={{ background: '#f39c12' }}>Edit</button>
        </Link>
        <button onClick={handleDelete} style={{ marginLeft: '0.5rem', background: '#e74c3c' }}>
          Delete
        </button>
        <Link to="/">
          <button style={{ marginLeft: '0.5rem', background: '#95a5a6' }}>Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default StudentDetails;