// src/context/FilterContext.jsx
import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    gender: '',
    year: '',
    status: '',
    sortBy: 'name',
    sortOrder: 'asc',
    page: 1,
    limit: 10,
  });

  const setFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      department: '',
      gender: '',
      year: '',
      status: '',
      sortBy: 'name',
      sortOrder: 'asc',
      page: 1,
      limit: 10,
    });
  };

  return (
    <FilterContext.Provider value={{ filters, setFilter, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);