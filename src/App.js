import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API = 'http://localhost:8080/api/appointments';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    patientName: '',
    doctorName: '',
    appointmentTime: '',
    status: 'Scheduled',
    mobilenumber: '' ,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const res = await axios.get(API);
    setAppointments(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API}/${editingId}`, form);
    } else {
      await axios.post(API, form);
    }
    setForm({ patientName: '', doctorName: '', appointmentTime: '', status: 'Scheduled' });
    setEditingId(null);
    fetchAppointments();
  };

  const handleEdit = (appt) => {
    setForm(appt);
    setEditingId(appt.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchAppointments();
  };

  return (
    <div className="container">
      <h2>Appointment Booking System</h2>
      <form onSubmit={handleSubmit}>
        <input value={form.patientName} onChange={e => setForm({ ...form, patientName: e.target.value })} placeholder="Patient Name" required />
        <input value={form.doctorName} onChange={e => setForm({ ...form, doctorName: e.target.value })} placeholder="Doctor Name" required />
        <input
  value={form.mobileNumber}
  onChange={e => setForm({ ...form, mobileNumber: e.target.value })}
  placeholder="Mobile Number"
  type="tel"
  required
/>

        <input type="datetime-local" value={form.appointmentTime} onChange={e => setForm({ ...form, appointmentTime: e.target.value })} required />
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
          <option>Scheduled</option>
          <option>Cancelled</option>
          <option>Completed</option>
        </select>
        <button type="submit">{editingId ? 'Update' : 'Book'} Appointment</button>
      </form>

      <ul className="appointment-list">
        {appointments.map(appt => (
          <li className="appointment-item" key={appt.id}>
            <span>
             
              <span>
  <strong>{appt.patientName}</strong> ({appt.mobileNumber}) with Dr. <strong>{appt.doctorName}</strong><br />

</span>

              Time: {new Date(appt.appointmentTime).toLocaleString()} | Status: {appt.status}
            </span>
            <div className="actions">
              <button className="edit" onClick={() => handleEdit(appt)}>Edit</button>
              <button onClick={() => handleDelete(appt.id)}>Cancel</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
