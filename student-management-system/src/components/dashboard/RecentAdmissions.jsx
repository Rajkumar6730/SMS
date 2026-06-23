import { Link } from 'react-router-dom';

const RecentAdmissions = ({ students }) => {
  // Sort by admission date (newest first) and take top 5
  const recent = [...students]
    .sort((a, b) => new Date(b.admissionDate) - new Date(a.admissionDate))
    .slice(0, 5);

  return (
    <div className="recent-admissions">
      <h3>Recent Admissions</h3>
      {recent.length === 0 ? (
        <p>No students yet.</p>
      ) : (
        <ul>
          {recent.map(student => (
            <li key={student.id}>
              <Link to={`/students/${student.id}`}>
                {student.name} – {student.department}
              </Link>
              <span>{new Date(student.admissionDate).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentAdmissions;