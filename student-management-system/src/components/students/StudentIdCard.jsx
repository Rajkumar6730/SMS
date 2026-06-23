import { forwardRef } from 'react';

const StudentIdCard = forwardRef(({ student }, ref) => (
  <div ref={ref} className="id-card">
    <div className="id-card-header">Student ID Card</div>
    <div className="id-card-body">
      <img src={student.photo || '/default-avatar.png'} alt="student" />
      <h3>{student.name}</h3>
      <p>Hall Ticket: {student.hallTicket}</p>
      <p>Department: {student.department}</p>
      <p>Course: {student.course}</p>
    </div>
  </div>
));

export default StudentIdCard;