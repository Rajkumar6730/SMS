// src/components/students/StudentFilters.jsx
import { useFilter } from '../../context/FilterContext';
import { DEPARTMENTS, GENDER_OPTIONS, YEAR_OPTIONS, STATUS_OPTIONS } from '../../utils/constants';

const StudentFilters = () => {
  const { filters, setFilter, resetFilters } = useFilter();

  return (
    <div className="filters-bar">
      <input
        type="text"
        placeholder="Search by name, hall ticket..."
        value={filters.search}
        onChange={(e) => setFilter('search', e.target.value)}
      />
      <select value={filters.department} onChange={(e) => setFilter('department', e.target.value)}>
        <option value="">All Departments</option>
        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      <select value={filters.gender} onChange={(e) => setFilter('gender', e.target.value)}>
        <option value="">All Genders</option>
        {GENDER_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
      </select>
      <select value={filters.year} onChange={(e) => setFilter('year', e.target.value)}>
        <option value="">All Years</option>
        {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
      <select value={filters.status} onChange={(e) => setFilter('status', e.target.value)}>
        <option value="">All Status</option>
        {STATUS_OPTIONS?.map(s => <option key={s} value={s}>{s}</option>) || []}
      </select>
      <button onClick={resetFilters}>Clear</button>
    </div>
  );
};

export default StudentFilters;