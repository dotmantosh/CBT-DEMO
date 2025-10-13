import React from 'react';

const UpdateTeacherPopup: React.FC<{ onClose: () => void; teacher: any; onUpdate: (teacher: any) => void }> = ({ onClose, teacher, onUpdate }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const subjectId = (form.elements.namedItem('subjectId') as HTMLInputElement).value;
    const [firstname, lastname] = name.split(' ');
    onUpdate({
      ...teacher,
      subjectId,
      firstname,
      lastname: lastname || '',
    });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Teacher</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input name="name" type="text" defaultValue={teacher.firstname + ' ' + teacher.lastname} className="w-full px-3 py-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Subject</label>
            <input name="subjectId" type="text" defaultValue={teacher.subjectId} className="w-full px-3 py-2 border rounded" required />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTeacherPopup;