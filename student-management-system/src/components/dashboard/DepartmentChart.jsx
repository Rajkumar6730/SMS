import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DepartmentChart = ({ students }) => {
  const deptCounts = students.reduce((acc, s) => {
    acc[s.department] = (acc[s.department] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(deptCounts),
    datasets: [
      {
        data: Object.values(deptCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  return (
    <div className="chart-box">
      <h3>Students by Department</h3>
      <Doughnut data={data} />
    </div>
  );
};

export default DepartmentChart;