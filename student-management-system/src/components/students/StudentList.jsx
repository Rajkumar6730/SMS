// src/pages/StudentList.jsx
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { useFilter } from '../context/FilterContext';
import { useAuth } from '../context/AuthContext';
import StudentFilters from '../components/students/StudentFilters';
import Pagination from '../components/common/Pagination';
import { exportToCSV } from '../services/exportService';
import { deleteAllStudents } from '../services/studentService';
import * as studentService from '../services/studentService';

const StudentList = () => {
  const { students, loading, error, deleteStudent } = useStudent();
  const { filters } = useFilter();
  const { isAuthenticated } = useAuth();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const [pageLoading, setPageLoading] = useState(false);

  const limit = 20; // Items per page

  // Fetch students when page or filters change
  useEffect(() => {
    const fetchStudents = async () => {
      setPageLoading(true);
      try {
        // Build filters object from FilterContext
        const filterParams = {};
        if (filters.department) filterParams.department = filters.department;
        if (filters.gender) filterParams.gender = filters.gender;
        if (filters.year) filterParams.yearOfStudy = parseInt(filters.year);
        if (filters.status) filterParams.status = filters.status;
        if (filters.search) filterParams.search = filters.search; // backend should support this

        const data = await studentService.getStudents(currentPage, limit, filterParams);
        // data = { students: [...], total: X, page: X, totalPages: X }
        
        // Update state
        // Since we're using Context, we need to update it differently
        // Option 1: Use the context's method to set students
        // But StudentContext doesn't have a direct setter for paginated data
        
        // Let's use a local state for paginated students
        // Or better: store paginated data in context
        // For now, we'll dispatch a custom action
        // But since we can't directly modify context from here,
        // we'll use the existing context and add a new state
        
        // I'll show two approaches below
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setPageLoading(false);
      }
    };

    fetchStudents();
  }, [currentPage, filters]); // Re-fetch when page or filters change

  // ========== HANDLE PAGE CHANGE ==========
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Filter & sort (client-side)
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
    // Filters are now applied on the backend via API call
    // But we keep client-side filtering for immediate feedback

    return result;
  }, [students, filters]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        // Refresh current page after deletion
        const data = await studentService.getStudents(currentPage, limit);
        // Update students in context...
      } catch (err) {
        alert('Failed to delete student: ' + err.message);
      }
    }
  };

  const handleExportCSV = () => {
    exportToCSV(students);
  };

  const handleClearAll = async () => {
    if (window.confirm('⚠️ Are you sure you want to delete ALL students from the database? This action cannot be undone!')) {
      try {
        await deleteAllStudents();
        window.location.reload();
      } catch (error) {
        alert('Failed to delete all students: ' + error.message);
      }
    }
  };

  // Loading states
  if (loading || pageLoading) return <div className="loading">Loading students...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Students ({totalStudents || students.length})</h1>
        <div>
          <button onClick={handleClearAll} style={{ background: '#e74c3c', color: 'white', marginRight: '0.5rem' }}>
            Clear All Students
          </button>
          <button onClick={handleExportCSV} style={{ marginRight: '0.5rem' }}>Export CSV</button>
          <Link to="/students/add">
            <button>Add Student</button>
          </Link>
        </div>
      </div>

      <StudentFilters />

      {filtered.length === 0 ? (
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
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
                {filtered.map(student => {
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
                          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
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
          
          {/* ========== PAGINATION COMPONENT ========== */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default StudentList;