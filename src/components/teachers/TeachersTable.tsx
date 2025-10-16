import React, { useState } from "react";
import AddTeacherPopup from "./AddTeacherPopup";
import TeacherActionsDropdown from "./TeacherActionsDropdown";
import UpdateTeacherPopup from "./UpdateTeacherPopup";
import SuspendTeacherPopup from "./SuspendTeacherPopup";
import DeleteTeacherPopup from "./DeleteTeacherPopup";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import {
  addTeacher,
  updateTeacher,
  removeTeacher,
} from "../../store/teachersSlice";
import { toast } from "react-toastify";
import Modal from "react-responsive-modal";

type Teacher = {
  id: number;
  firstname: string;
  subject: string;
  isActive: boolean;
};

const TeachersTable: React.FC = () => {
  const teachers = useSelector((state: RootState) => state.teachers) as Teacher[];
  const dispatch = useDispatch();
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showSuspendPopup, setShowSuspendPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [actionPopup, setActionPopup] = useState<{
    id: number;
    action: string;
  } | null>(null);

  const getTeacherById = (id: number) => teachers.find((t) => t.id === id);

  const handleAddTeacher = (teacher: any) => {
    dispatch(addTeacher(teacher));
    toast.success("Teacher added");
    setShowAddPopup(false);
  };

  const handleUpdateTeacher = (teacher: any) => {
    dispatch(updateTeacher(teacher));
    toast.success("Teacher updated");
    setActionPopup(null);
    setShowUpdatePopup(false);
  };

  const handleSuspendTeacher = (teacher: any) => {
    dispatch(updateTeacher({ ...teacher, isActive: false }));
    toast.info("Teacher suspended");
    setActionPopup(null);
    setShowSuspendPopup(false);
  };

  const handleDeleteTeacher = (id: string) => {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      dispatch(removeTeacher(numericId));
      toast.error("Teacher deleted");
      setActionPopup(null);
      setShowDeletePopup(false);
    } else {
      toast.error("Invalid teacher ID");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md margin-bottom-40px">
      {showAddPopup && (
        <AddTeacherPopup
          isOpen={showAddPopup}
          onClose={() => setShowAddPopup(false)}
          onAdd={handleAddTeacher}
        />
      )}
      {actionPopup && actionPopup.action === "update" && (
        <UpdateTeacherPopup
          isOpen={!!actionPopup}
          onClose={() => setActionPopup(null)}
          teacher={getTeacherById(actionPopup.id)}
          onUpdate={handleUpdateTeacher}
        />
      )}
      {actionPopup && actionPopup.action === "suspend" && (
        <SuspendTeacherPopup
          onClose={() => {
            setActionPopup(null);
            setShowSuspendPopup(false);
          }}
          teacher={getTeacherById(actionPopup.id)}
          onSuspend={handleSuspendTeacher}
        />
      )}
      {actionPopup && actionPopup.action === "delete" && (
        <DeleteTeacherPopup
          isOpen={showDeletePopup}
          onClose={() => {
            setActionPopup(null);
            setShowDeletePopup(false);
          }}
          teacher={getTeacherById(actionPopup.id)}
          onDelete={handleDeleteTeacher}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Teachers</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 add-button"
          onClick={() => setShowAddPopup(true)}
        >
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
              <td className="px-4 py-2">
                {teacher.isActive ? "Active" : "Suspended"}
              </td>
              <td className="px-4 py-2">
                {/* <TeacherActionsDropdown
                  onAction={(action) =>
                    setActionPopup({ id: teacher.id, action })
                  }
                /> */}
                <div className="flex gap-2 justify-center action-buttons">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded edit-button"
                    onClick={() => {
                      setActionPopup({ id: teacher.id, action: "update" });
                      setShowUpdatePopup(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-200 text-red-700 rounded delete-button"
                    onClick={() => {
                      setActionPopup({ id: teacher.id, action: "delete" });
                      setShowDeletePopup(true);
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
      
    </div>
  );
};

export default TeachersTable;
