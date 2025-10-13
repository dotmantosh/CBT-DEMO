import React, { useState } from 'react';

const TeacherActionsDropdown: React.FC<{ onAction: (action: string) => void }> = ({ onAction }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <button onClick={() => setOpen(!open)} className="px-2 py-1 bg-gray-200 rounded">Actions</button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { onAction('update'); setOpen(false); }}>Update Teacher</button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { onAction('suspend'); setOpen(false); }}>Suspend Teacher</button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600" onClick={() => { onAction('delete'); setOpen(false); }}>Delete Teacher</button>
        </div>
      )}
    </div>
  );
};

export default TeacherActionsDropdown;