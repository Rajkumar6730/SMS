// src/pages/Dashboard.jsx
import { useStudent } from '../context/StudentContext';
import { StatCard, DepartmentChart, GenderChart, RecentAdmissions } from '../components/dashboard';

const Dashboard = () => {
  const { students } = useStudent();

  // Calculate stats safely
  const total = students.length;
  const male = students.filter(s => s.gender === 'Male').length;
  const female = students.filter(s => s.gender === 'Female').length;
  const departments = new Set(students.map(s => s.department)).size;

  const stats = [
    { label: 'Total Students', value: total, icon: '👨‍🎓' },
    { label: 'Male', value: male, icon: '👦' },
    { label: 'Female', value: female, icon: '👧' },
    { label: 'Departments', value: departments, icon: '🏛️' },
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {total === 0 ? (
        <div className="empty-state">
          <p>No students yet. Click <strong>"Add Student"</strong> to get started.</p>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <StatCard key={idx} label={stat.label} value={stat.value} icon={stat.icon} />
            ))}
          </div>
          <div className="charts-grid">
            <DepartmentChart students={students} />
            <GenderChart students={students} />
          </div>
          <RecentAdmissions students={students} />
        </>
      )}
    </div>
  );
};

export default Dashboard;