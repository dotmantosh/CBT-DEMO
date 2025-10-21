import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import {
  addQuestion,
  updateQuestion,
  removeQuestion,
} from "../../store/questionsSlice";
import { toast } from "react-toastify";
import { Modal } from "react-responsive-modal";
const TeacherDashboard: React.FC<{ teacherId: number }> = ({ teacherId }) => {
  const subjects = useSelector((state: RootState) =>
    state.subjects.filter((s) => s.id === teacherId)
  );
  const questions = useSelector((state: RootState) => state.questions);
  const dispatch = useDispatch();
  const [showAddQuestion, setShowAddQuestion] = useState<number | null>(null);
  const [editQuestion, setEditQuestion] = useState<any | null>(null);
  const [deleteQuestion, setDeleteQuestion] = useState<any | null>(null);

  const handleAddQuestion = (subjectId: number, question: any) => {
    dispatch(
      addQuestion({
        ...question,
        id: Date.now().toString(),
        subjectId,
        teacherId,
        createdAt: new Date().toISOString(),
      })
    );
    toast.success("Question added");
    setShowAddQuestion(null);
  };

  const handleUpdateQuestion = (question: any) => {
    dispatch(updateQuestion(question));
    toast.success("Question updated");
    setEditQuestion(null);
  };

  const handleDeleteQuestion = (id: number) => {
    dispatch(removeQuestion(id));
    toast.error("Question deleted");
    setDeleteQuestion(null);
  };

  return (
    <div className="p-4 section-div">
      <h2 className="text-2xl font-bold mb-6">Your Subject</h2>
      {subjects.length === 0 ? (
        <p>No subject assigned.</p>
      ) : (
        subjects.map((subject) => (
          <div key={subject.id} className="mb-8 bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{subject.name}</h3>
            <p className="mb-2">{subject.description}</p>

            {showAddQuestion === subject.id && (
              <AddQuestionPopup
                subjectId={subject.id}
                onClose={() => setShowAddQuestion(null)}
                onAdd={(q) => handleAddQuestion(subject.id, q)}
              />
            )}
            {editQuestion && (
              <EditQuestionPopup
                question={editQuestion}
                onClose={() => setEditQuestion(null)}
                onUpdate={handleUpdateQuestion}
              />
            )}
            {deleteQuestion && (
              <DeleteQuestionPopup
                question={deleteQuestion}
                onClose={() => setDeleteQuestion(null)}
                onDelete={() => handleDeleteQuestion(deleteQuestion.id)}
              />
            )}
            <div className="title flex items-center justify-between">
              <h4 className="font-bold mb-2">Questions:</h4>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded add-button"
                onClick={() => setShowAddQuestion(subject.id)}
              >
                Add Question
              </button>
            </div>

            <ul className="mb-2">
              {questions
                .filter((q) => q.subjectId === subject.id)
                .map((q) => (
                  <li
                    key={q.id}
                    className="mb-1 flex items-center justify-between"
                  >
                    <span>{q.text}</span>
                    <span className="flex gap-2 action-buttons">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded edit-button"
                        onClick={() => setEditQuestion(q)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg-red-200 text-red-700 rounded delete-button"
                        onClick={() => setDeleteQuestion(q)}
                      >
                        Delete
                      </button>
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

const AddQuestionPopup: React.FC<{
  subjectId: number;
  onClose: () => void;
  onAdd: (question: any) => void;
}> = ({ onClose, onAdd }) => {
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [isAddModalOpen] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ text, options, answer });
  };

  return (
    <Modal open={isAddModalOpen} onClose={onClose} center>
      <div className="inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Add Question</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 margin-bottom-20px">
              <label className="block mb-2">Question Text</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Options</label>
              {options.map((opt, idx) => (
                <input
                  key={idx}
                  type="text"
                  className="w-full px-3 py-2 border rounded mb-2 margin-bottom-10px"
                  value={opt}
                  onChange={(e) => {
                    const newOpts = [...options];
                    newOpts[idx] = e.target.value;
                    setOptions(newOpts);
                  }}
                  required
                />
              ))}
            </div>
            {/* <div className="mb-4 margin-bottom-20px">
              <label className="block mb-2">Answer</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div> */}
            <div className="mb-4 margin-bottom-20px">
              <label className="block mb-2">answer</label>
              <select
                name="subjectId"
                className="w-full px-3 py-2 border rounded"
                defaultValue={""}
                onChange={(e) => setAnswer(e.target.value)}
                required
              >
                <option value="">Select answer</option>
                {options.map((option: string, index: number) => (
                  option.length > 0 && <option key={index} value={option}>
                    {option}
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
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

const EditQuestionPopup: React.FC<{
  question: any;
  onClose: () => void;
  onUpdate: (question: any) => void;
}> = ({ question, onClose, onUpdate }) => {
  const [text, setText] = useState(question.text);
  const [options, setOptions] = useState([...question.options]);
  const [answer, setAnswer] = useState(question.answer);
  const [isEditModalOpen] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...question, text, options, answer });
  };

  return (
    <Modal open={isEditModalOpen} onClose={onClose} center>
      <div className="inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Edit Question</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 margin-bottom-20px">
              <label className="block mb-2">Question Text</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Options</label>
              {options.map((opt, idx) => (
                <input
                  key={idx}
                  type="text"
                  className="w-full px-3 py-2 border rounded mb-2 margin-bottom-10px"
                  value={opt}
                  onChange={(e) => {
                    const newOpts = [...options];
                    newOpts[idx] = e.target.value;
                    setOptions(newOpts);
                  }}
                  required
                />
              ))}
            </div>
            {/* <div className="mb-4 margin-bottom-20px">
              <label className="block mb-2">Answer</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div> */}
            <div className="mb-4 margin-bottom-20px">
              <label className="block mb-2">answer</label>
              <select
                name="subjectId"
                className="w-full px-3 py-2 border rounded"
                defaultValue={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              >
                <option value="">Select answer</option>
                {options.map((option: string, index: number) => (
                  option.length > 0 && <option key={index} value={option}>
                    {option}
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

const DeleteQuestionPopup: React.FC<{
  question: any;
  onClose: () => void;
  onDelete: () => void;
}> = ({ question, onClose, onDelete }) => {
  const [isDeleteModalOpen] = useState(true);
  return (
    <Modal open={isDeleteModalOpen} onClose={onClose} center>
      <div className="inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-red-600">
            Delete Question
          </h2>
          <p className="mb-6 margin-bottom-20px">
            Are you sure you want to delete{" "}
            <span className="font-bold">{question.text}</span>?
          </p>
          <div className="flex justify-end gap-2 action-buttons">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded delete-button"
              onClick={onDelete}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TeacherDashboard;
