import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useState } from 'react';
import TeacherDashboard from '../components/teachers/TeacherDashboard';

const Teachers: React.FC = () => {
  const teachers = useSelector((state: RootState) => state.teachers.filter(t => t.isActive));
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);

  if (!selectedTeacher) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Teacher Login</h2>
        <select className="mb-4 px-3 py-2 border rounded" onChange={e => setSelectedTeacher(e.target.value)} defaultValue="">
          <option value="" disabled>Select your name</option>
          {teachers.map(t => (
            <option key={t.id} value={t.id}>{t.firstname} {t.lastname}</option>
          ))}
        </select>
      </div>
    );
  }

  return <TeacherDashboard teacherId={selectedTeacher} />;
};

export default Teachers;
