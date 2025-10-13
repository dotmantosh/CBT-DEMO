import React from 'react';

const SuspendTeacherPopup: React.FC<{ onClose: () => void; teacher: any; onSuspend: (teacher: any) => void }> = ({ onClose, teacher, onSuspend }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Suspend Teacher</h2>
        <p className="mb-6">Are you sure you want to suspend <span className="font-bold">{teacher.firstname} {teacher.lastname}</span>?</p>
        <div className="flex justify-end gap-2">
          <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
          <button type="button" className="px-4 py-2 bg-yellow-600 text-white rounded" onClick={() => onSuspend(teacher)}>Suspend</button>
        </div>
      </div>
    </div>
  );
};

export default SuspendTeacherPopup;