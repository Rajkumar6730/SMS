// src/pages/StudentList.jsx
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { useFilter } from '../context/FilterContext';
import StudentFilters from '../components/students/StudentFilters';
import Pagination from '../components/common/Pagination';
import { exportToCSV } from '../services/exportService';
import { deleteAllStudents } from '../services/studentService'; // <-- ADD THIS IMPORT

const StudentList = () => {
  const { students, loading, error, deleteStudent } = useStudent();
  const { filters, setFilter } = useFilter();

  // Filter & sort
  const filtered = useMemo(() => {
    let result = [...students];

    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(st => {
        const fullName = st.firstName && st.lastName 
          ? `${st.firstName} ${st.lastName}`.toLowerCase()
          : (st.name || '').toLowerCase();
        return (
          fullName.includes(s) ||
          (st.hallTicket || '').toLowerCase().includes(s) ||
          (st.email || '').toLowerCase().includes(s) ||
          (st.department || '').toLowerCase().includes(s)
        );
      });
    }
    if (filters.department) result = result.filter(st => st.department === filters.department);
    if (filters.gender) result = result.filter(st => st.gender === filters.gender);
    if (filters.year) result = result.filter(st => Number(st.yearOfStudy) === Number(filters.year));
    if (filters.status) result = result.filter(st => st.status === filters.status);

    result.sort((a, b) => {
      const valA = (a[filters.sortBy] || '').toString();
      const valB = (b[filters.sortBy] || '').toString();
      if (filters.sortOrder === 'asc') return valA.localeCompare(valB);
      return valB.localeCompare(valA);
    });

    return result;
  }, [students, filters]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / filters.limit));
  const currentPage = Math.min(filters.page, totalPages);
  const start = (currentPage - 1) * filters.limit;
  const paginated = filtered.slice(start, start + filters.limit);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
      } catch (err) {
        alert('Failed to delete student: ' + err.message);
      }
    }
  };

  const handleExportCSV = () => {
    exportToCSV(filtered);
  };

  // ========== ADD THE handleClearAll FUNCTION ==========
  const handleClearAll = async () => {
    const confirmClear = window.confirm(
      '⚠️ Are you sure you want to delete ALL students from the database? This action cannot be undone!'
    );
    if (!confirmClear) return;

    try {
      await deleteAllStudents();
      // Refresh the list after deletion
      window.location.reload();
    } catch (error) {
      alert('Failed to delete all students: ' + error.message);
    }
  };

  // Loading & Error states
  if (loading) return <div className="loading">Loading students...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Students</h1>
        <div>
          {/* ========== ADD THE "Clear All Students" BUTTON ========== */}
          <button 
            onClick={handleClearAll} 
            style={{ 
              background: '#e74c3c', 
              color: 'white', 
              marginRight: '0.5rem',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear All Students
          </button>
          <button onClick={handleExportCSV} style={{ marginRight: '0.5rem' }}>Export CSV</button>
          <Link to="/students/add">
            <button>Add Student</button>
          </Link>
        </div>
      </div>

      <StudentFilters />

      {paginated.length === 0 ? (
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <p>No students found. Try adjusting your filters or add a new student.</p>
        </div>
      ) : (
        <>
          <div style={{ overflowX: 'auto' }}>
            <table className="student-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Hall Ticket</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map(student => {
                  const fullName = student.firstName && student.lastName
                    ? `${student.firstName} ${student.lastName}`
                    : student.name || 'N/A';
                  return (
                    <tr key={student.id}>
                      <td>
                        <img
                          src={student.photo || '/default-avatar.png'}
                          alt={fullName}
                          onError={(e) => e.target.src = '/default-avatar.png'}
                        />
                      </td>
                      <td>{student.hallTicket}</td>
                      <td>{fullName}</td>
                      <td>{student.department}</td>
                      <td>{student.yearOfStudy}</td>
                      <td>
                        <span className={`status-${student.status?.toLowerCase().replace(' ', '-')}`}>
                          {student.status || 'Active'}
                        </span>
                      </td>
                      <td>
                        <Link to={`/students/${student.id}`}>View</Link>
                        <Link to={`/students/${student.id}/edit`}>Edit</Link>
                        <button onClick={() => handleDelete(student.id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setFilter('page', page)}
          />
        </>
      )}
    </div>
  );
};

export default StudentList;