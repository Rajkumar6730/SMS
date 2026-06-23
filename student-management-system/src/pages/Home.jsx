// src/pages/Home.jsx
import { useState, useMemo } from 'react';
import { useStudent } from '../context/StudentContext';
import StudentList from '../components/StudentList';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

const Home = () => {
  const { students, deleteStudent } = useStudent();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('All');

  // Filter and search logic
  const filteredStudents = useMemo(() => {
    let result = students;

    // Filter by year
    if (filterYear !== 'All') {
      result = result.filter(s => s.year === filterYear);
    }

    // Search by name, email, or course
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(s =>
        s.name.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term) ||
        s.course.toLowerCase().includes(term)
      );
    }

    return result;
  }, [students, searchTerm, filterYear]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(id);
    }
  };

  return (
    <div>
      <h1>Student List</h1>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <FilterBar filter={filterYear} onFilterChange={setFilterYear} />
      </div>
      <StudentList students={filteredStudents} onDelete={handleDelete} />
    </div>
  );
};

export default Home;