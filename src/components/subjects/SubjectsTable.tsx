import React, { useState } from "react";
import AddSubjectPopup from "./AddSubjectPopup";
import UpdateSubjectPopup from "./UpdateSubjectPopup";
import DeleteSubjectPopup from "./DeleteSubjectPopup";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import {
  addSubject,
  updateSubject,
  removeSubject,
} from "../../store/subjectsSlice";
import { toast } from "react-toastify";

const SubjectsTable: React.FC = () => {
  const subjects = useSelector((state: RootState) => state.subjects) as Array<{
    id: number;
    name: string;
    description: string;
  }>;
  const dispatch = useDispatch();
  const [showAddPopup, setShowAddPopup] = useState(false);
  // const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  // const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [actionPopup, setActionPopup] = useState<{
    id: number;
    action: string;
  } | null>(null);
  const getSubjectById = (id: number) => subjects.find((s) => s.id === id);

  const handleAddSubject = (subject: any) => {
    dispatch(addSubject(subject));
    toast.success("Subject added");
    setShowAddPopup(false);
  };

  const handleUpdateSubject = (subject: any) => {
    dispatch(updateSubject(subject));
    toast.success("Subject updated");
    setActionPopup(null);
    // setShowUpdatePopup(false);
  };

  const handleDeleteSubject = (id: number) => {
    dispatch(removeSubject(id));
    toast.error("Subject deleted");
    setActionPopup(null);
    // setShowDeletePopup(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Subjects</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 add-button"
          onClick={() => setShowAddPopup(true)}
        >
          Add Subject
        </button>
      </div>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            {/* <th className="px-4 py-2">Teacher</th> */}
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.id}>
              <td className="px-4 py-2">{subject.name}</td>
              <td className="px-4 py-2">{subject.description}</td>
              <td className="px-4 py-2">
                <div className="flex gap-2 justify-center action-buttons">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded edit-button"
                    onClick={() => {
                      setActionPopup({ id: subject.id, action: "update" });
                      // setShowUpdatePopup(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-200 text-red-700 rounded delete-button"
                    onClick={() => {
                      setActionPopup({ id: subject.id, action: "delete" });
                      // setShowDeletePopup(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddPopup && (
        <AddSubjectPopup
          isOpen={showAddPopup}
          onClose={() => setShowAddPopup(false)}
          onAdd={handleAddSubject}
        />
      )}
      {actionPopup && actionPopup.action === "update" && (
        <UpdateSubjectPopup
          isOpen={!!actionPopup}
          onClose={() => setActionPopup(null)}
          subject={getSubjectById(actionPopup.id)}
          onUpdate={handleUpdateSubject}
        />
      )}
      {actionPopup && actionPopup.action === "delete" && (
        <DeleteSubjectPopup
          isOpen={!!actionPopup}  
          onClose={() => setActionPopup(null)}
          subject={getSubjectById(actionPopup.id)}
          onDelete={handleDeleteSubject}
        />
      )}
    </div>
  );
};

export default SubjectsTable;
