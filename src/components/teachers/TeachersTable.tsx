import React, { useState } from 'react';
import AddTeacherPopup from './AddTeacherPopup';
import TeacherActionsDropdown from './TeacherActionsDropdown';
import UpdateTeacherPopup from './UpdateTeacherPopup';
import SuspendTeacherPopup from './SuspendTeacherPopup';
import DeleteTeacherPopup from './DeleteTeacherPopup';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { addTeacher, updateTeacher, removeTeacher } from '../../store/teachersSlice';
import { toast } from 'react-toastify';

const TeachersTable: React.FC = () => {
  const teachers = useSelector((state: RootState) => state.teachers);
  const dispatch = useDispatch();
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [actionPopup, setActionPopup] = useState<{ id: string; action: string } | null>(null);

  const getTeacherById = (id: string) => teachers.find(t => t.id === id);

  const handleAddTeacher = (teacher: any) => {
    dispatch(addTeacher(teacher));
    toast.success('Teacher added');
    setShowAddPopup(false);
  };

  const handleUpdateTeacher = (teacher: any) => {
    dispatch(updateTeacher(teacher));
    toast.success('Teacher updated');
    setActionPopup(null);
  };

  const handleSuspendTeacher = (teacher: any) => {
    dispatch(updateTeacher({ ...teacher, isActive: false }));
    toast.info('Teacher suspended');
    setActionPopup(null);
  };

  const handleDeleteTeacher = (id: string) => {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      dispatch(removeTeacher(numericId.toString()));
      toast.error('Teacher deleted');
      setActionPopup(null);
    } else {
      toast.error('Invalid teacher ID');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Teachers</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => setShowAddPopup(true)}>
          Add Teacher
        </button>
      </div>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Subject</th>
            <th className="px-4 py-2">Active</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td className="px-4 py-2">{teacher.firstname}</td>
              <td className="px-4 py-2">{teacher.subject}</td>
              <td className="px-4 py-2">{teacher.isActive ? 'Active' : 'Suspended'}</td>
              <td className="px-4 py-2">
                <TeacherActionsDropdown onAction={(action) => setActionPopup({ id: teacher.id, action })} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddPopup && <AddTeacherPopup onClose={() => setShowAddPopup(false)} onAdd={handleAddTeacher} />}
      {actionPopup && actionPopup.action === 'update' && (
        <UpdateTeacherPopup onClose={() => setActionPopup(null)} teacher={getTeacherById(actionPopup.id)} onUpdate={handleUpdateTeacher} />
      )}
      {actionPopup && actionPopup.action === 'suspend' && (
        <SuspendTeacherPopup onClose={() => setActionPopup(null)} teacher={getTeacherById(actionPopup.id)} onSuspend={handleSuspendTeacher} />
      )}
      {actionPopup && actionPopup.action === 'delete' && (
        <DeleteTeacherPopup onClose={() => setActionPopup(null)} teacher={getTeacherById(actionPopup.id)} onDelete={handleDeleteTeacher} />
      )}
    </div>
  );
};

export default TeachersTable;