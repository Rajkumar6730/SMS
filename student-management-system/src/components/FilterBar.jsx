// src/components/FilterBar.jsx
const FilterBar = ({ filter, onFilterChange }) => {
  const years = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year'];

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>Filter by Year: </label>
      <select value={filter} onChange={(e) => onFilterChange(e.target.value)}>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;