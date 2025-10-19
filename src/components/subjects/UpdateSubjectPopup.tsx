import React from 'react';
import Modal from 'react-responsive-modal';

const UpdateSubjectPopup: React.FC<{ isOpen: boolean; onClose: () => void; subject: any; onUpdate: (subject: any) => void }> = ({ isOpen, onClose, subject, onUpdate }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLInputElement).value;
    const teacherId = (form.elements.namedItem('teacherId') as HTMLInputElement)?.value || '';
    onUpdate({
      ...subject,
      name,
      description,
      teacherId,
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      center
      // className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto mt-24 outline-none"
      // overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
    >
      <div className="inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 popup-div">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">


      <h2 className="text-xl font-bold mb-4">Update Subject</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 margin-bottom-20px">
          <label className="block mb-2">Name</label>
          <input name="name" type="text" defaultValue={subject.name} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4 margin-bottom-20px">
          <label className="block mb-2">Description</label>
          <input name="description" type="text" className="w-full px-3 py-2 border rounded" defaultValue={subject.description}/>
        </div>
        {/* Add other fields as needed */}
        <div className="flex justify-end gap-2 action-buttons">
          <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded edit-button">Update</button>
        </div>
      </form>
    </div>
    </div>
    </Modal>
  );
};

export default UpdateSubjectPopup;