// src/pages/EditStudent.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import StudentForm from '../components/students/StudentForm';
import { useEffect, useState } from 'react';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudentById, updateStudent } = useStudent();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = getStudentById(id);
    if (found) {
      setStudent(found);
    } else {
      // Student not found, redirect to list
      navigate('/students');
    }
    setLoading(false);
  }, [id, getStudentById, navigate]);

  const handleSubmit = async (data) => {
    try {
      await updateStudent(id, data);
      navigate(`/students/${id}`); // Go to details after update
    } catch (error) {
      alert('Failed to update student: ' + error.message);
    }
  };

  const handleCancel = () => {
    navigate(`/students/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (!student) return null;

  return (
    <div>
      <h1>Edit Student</h1>
      <StudentForm
        initialData={student}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Update Student"
      />
    </div>
  );
};

export default EditStudent;