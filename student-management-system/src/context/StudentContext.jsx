// src/context/StudentContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';
import * as studentService from '../services/studentService';

const StudentContext = createContext();

const initialState = {
  students: [],
  loading: false,
  error: null,
  // Optional: add pagination state later if needed
  // total: 0,
  // totalPages: 0,
  // currentPage: 1,
};

const ACTIONS = {
  SET_STUDENTS: 'SET_STUDENTS',
  ADD_STUDENT: 'ADD_STUDENT',
  UPDATE_STUDENT: 'UPDATE_STUDENT',
  DELETE_STUDENT: 'DELETE_STUDENT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_STUDENTS:
      return { ...state, students: action.payload, loading: false };
    case ACTIONS.ADD_STUDENT:
      return { ...state, students: [...state.students, action.payload] };
    case ACTIONS.UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };
    case ACTIONS.DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter((s) => s.id !== action.payload),
      };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const StudentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load students from API on mount
  useEffect(() => {
    const fetchStudents = async () => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      try {
        // ✅ Use paginated API call (page 1, limit 20)
        const data = await studentService.getStudents(1, 20);
        // data = { students: [...], total: X, page: 1, totalPages: Y }
        dispatch({ type: ACTIONS.SET_STUDENTS, payload: data.students });
        // Optionally store total and totalPages in state for pagination UI later
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      }
    };
    fetchStudents();
  }, []);

  const addStudent = async (studentData) => {
    try {
      const newStudent = await studentService.addStudent(studentData);
      dispatch({ type: ACTIONS.ADD_STUDENT, payload: newStudent });
      return newStudent;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const updateStudent = async (id, studentData) => {
    try {
      const updated = await studentService.updateStudent(id, studentData);
      dispatch({ type: ACTIONS.UPDATE_STUDENT, payload: updated });
      return updated;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const deleteStudent = async (id) => {
    try {
      await studentService.deleteStudent(id);
      dispatch({ type: ACTIONS.DELETE_STUDENT, payload: id });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const getStudentById = (id) => {
    return state.students.find((s) => s.id === id);
  };

  const value = {
    students: state.students,
    loading: state.loading,
    error: state.error,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) throw new Error('useStudent must be used within StudentProvider');
  return context;
};