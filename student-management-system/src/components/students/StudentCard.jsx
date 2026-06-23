// src/components/StudentCard.jsx
import { Link } from 'react-router-dom';

const StudentCard = ({ student, onDelete }) => {
  return (
    <div className="card">
      <h3>{student.name}</h3>
      <p>Email: {student.email}</p>
      <p>Course: {student.course}</p>
      <p>Year: {student.year}</p>
      <div style={{ marginTop: '0.5rem' }}>
        <Link to={`/students/${student.id}`}>
          <button>View</button>
        </Link>
        <Link to={`/students/${student.id}/edit`}>
          <button style={{ marginLeft: '0.5rem', background: '#f39c12' }}>Edit</button>
        </Link>
        <button
          style={{ marginLeft: '0.5rem', background: '#e74c3c' }}
          onClick={() => onDelete(student.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;