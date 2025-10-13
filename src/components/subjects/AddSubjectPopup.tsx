import React from 'react';

const AddSubjectPopup: React.FC<{ onClose: () => void; onAdd: (subject: any) => void }> = ({ onClose, onAdd }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLInputElement).value;
    const teacherId = (form.elements.namedItem('teacherId') as HTMLInputElement)?.value || '';
    onAdd({
      id: Date.now().toString(),
      name,
      description,
      teacherId,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Subject</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input name="name" type="text" className="w-full px-3 py-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <input name="description" type="text" className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Teacher ID</label>
            <input name="teacherId" type="text" className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubjectPopup;