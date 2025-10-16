import React from "react";
import Modal from "react-responsive-modal";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const UpdateTeacherPopup: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  teacher: any;
  onUpdate: (teacher: any) => void;
}> = ({ isOpen, onClose, teacher, onUpdate }) => {
  const subjects = useSelector((state: RootState) => state.subjects) as {
    name: string;
  }[];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const firstname = (form.elements.namedItem("firstname") as HTMLInputElement)
      .value;
    const lastname = (form.elements.namedItem("lastname") as HTMLInputElement)
      .value;
    const subjectId = (
      form.elements.namedItem("subjectId") as HTMLSelectElement
    ).value;
    const subject = subjects.find((s) => s.name === subjectId)?.name || "";
    onUpdate({
      ...teacher,
      subject,
      subjectId,
      firstname,
      lastname: lastname || "",
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
      <h2 className="text-xl font-bold mb-4">Update Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 margin-top-20px">
          <label className="block mb-2">Name</label>
          <input
            name="firstname"
            type="text"
            defaultValue={teacher.firstname}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4 margin-bottom-20px">
          <label className="block mb-2">Lastname</label>
          <input
            name="lastname"
            type="text"
            defaultValue={teacher.lastname}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4 margin-bottom-20px">
          <label className="block mb-2">Subject</label>
          <select
            name="subjectId"
            className="w-full px-3 py-2 border rounded"
            defaultValue={teacher.subject}
            required
          >
            <option value="">Select subject</option>
            {subjects.map((subject: { name: string }) => (
              <option key={subject.name} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2 action-buttons">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded edit-button"
          >
            Update
          </button>
        </div>
      </form>
      </div>
      </div>
    </Modal>
  );
};

export default UpdateTeacherPopup;
