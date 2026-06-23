// src/components/SearchBar.jsx
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by name, email, or course..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      style={{ maxWidth: '400px', marginBottom: '1rem' }}
    />
  );
};

export default SearchBar;