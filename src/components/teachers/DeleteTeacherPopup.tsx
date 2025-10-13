import React from 'react';

const DeleteTeacherPopup: React.FC<{ onClose: () => void; teacher: any; onDelete: (id: string) => void }> = ({ onClose, teacher, onDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-red-600">Delete Teacher</h2>
        <p className="mb-6">Are you sure you want to delete <span className="font-bold">{teacher.firstname} {teacher.lastname}</span>?</p>
        <div className="flex justify-end gap-2">
          <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
          <button type="button" className="px-4 py-2 bg-red-600 text-white rounded" onClick={() => onDelete(teacher.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTeacherPopup;