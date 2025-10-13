import React, { useState } from 'react';
import AddSubjectPopup from './AddSubjectPopup';
import UpdateSubjectPopup from './UpdateSubjectPopup';
import DeleteSubjectPopup from './DeleteSubjectPopup';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { addSubject, updateSubject, removeSubject } from '../../store/subjectsSlice';
import { toast } from 'react-toastify';

const SubjectsTable: React.FC = () => {
  const subjects = useSelector((state: RootState) => state.subjects);
  const dispatch = useDispatch();
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [actionPopup, setActionPopup] = useState<{ id: string; action: string } | null>(null);
  const getSubjectById = (id: string) => subjects.find(s => s.id === id);

  const handleAddSubject = (subject: any) => {
    dispatch(addSubject(subject));
    toast.success('Subject added');
    setShowAddPopup(false);
  };

  const handleUpdateSubject = (subject: any) => {
    dispatch(updateSubject(subject));
    toast.success('Subject updated');
    setActionPopup(null);
  };

  const handleDeleteSubject = (id: string) => {
    dispatch(removeSubject(id));
    toast.error('Subject deleted');
    setActionPopup(null);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Subjects</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setShowAddPopup(true)}>
          Add Subject
        </button>
      </div>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Teacher</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.id}>
              <td className="px-4 py-2">{subject.name}</td>
              <td className="px-4 py-2">{subject.description}</td>
              <td className="px-4 py-2">{subject.teacherId}</td>
              <td className="px-4 py-2">
                <div className="flex gap-2">
                  <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => setActionPopup({ id: subject.id, action: 'update' })}>Update</button>
                  <button className="px-2 py-1 bg-red-200 text-red-700 rounded" onClick={() => setActionPopup({ id: subject.id, action: 'delete' })}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddPopup && <AddSubjectPopup onClose={() => setShowAddPopup(false)} onAdd={handleAddSubject} />}
      {actionPopup && actionPopup.action === 'update' && (
        <UpdateSubjectPopup onClose={() => setActionPopup(null)} subject={getSubjectById(actionPopup.id)} onUpdate={handleUpdateSubject} />
      )}
      {actionPopup && actionPopup.action === 'delete' && (
        <DeleteSubjectPopup onClose={() => setActionPopup(null)} subject={getSubjectById(actionPopup.id)} onDelete={handleDeleteSubject} />
      )}
    </div>
  );
};

export default SubjectsTable;