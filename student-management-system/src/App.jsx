import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { StudentProvider } from './context/StudentContext';
import { FilterProvider } from './context/FilterContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StudentProvider>
          <FilterProvider>
            <ThemeProvider>
              <AppRoutes />
            </ThemeProvider>
          </FilterProvider>
        </StudentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;