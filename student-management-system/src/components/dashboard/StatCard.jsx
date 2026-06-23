const StatCard = ({ label, value, icon }) => {
  return (
    <div className="stat-card">
      <span className="stat-icon">{icon}</span>
      <div>
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default StatCard;