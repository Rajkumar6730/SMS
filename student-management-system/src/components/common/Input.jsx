// src/components/common/Input.jsx
const Input = ({ label, name, type = 'text', value, onChange, required, ...props }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
    </div>
  );
};

export default Input;