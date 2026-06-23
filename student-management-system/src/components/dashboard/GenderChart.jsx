import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GenderChart = ({ students }) => {
  const male = students.filter(s => s.gender === 'Male').length;
  const female = students.filter(s => s.gender === 'Female').length;
  const other = students.filter(s => s.gender === 'Other').length;

  const data = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [
      {
        data: [male, female, other],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="chart-box">
      <h3>Gender Distribution</h3>
      <Pie data={data} />
    </div>
  );
};

export default GenderChart;