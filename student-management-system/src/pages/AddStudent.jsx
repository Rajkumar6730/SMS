// src/pages/AddStudent.jsx
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import StudentForm from '../components/students/StudentForm';

const AddStudent = () => {
  const navigate = useNavigate();
  const { addStudent } = useStudent();

  const handleSubmit = async (data) => {
    try {
      await addStudent(data);
      navigate('/students');
    } catch (error) {
      alert('Failed to add student: ' + error.message);
    }
  };

  const handleCancel = () => {
    navigate('/students');
  };

  return (
    <div>
      <h1>Add New Student</h1>
      <StudentForm onSubmit={handleSubmit} onCancel={handleCancel} submitLabel="Add Student" />
    </div>
  );
};

export default AddStudent;