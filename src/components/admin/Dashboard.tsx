import React from 'react';
import TeachersTable from '../teachers/TeachersTable';
import SubjectsTable from '../subjects/SubjectsTable';

const Dashboard: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="admin-container">
        <div className="mb-8 margin-bottom-20px">
          <SubjectsTable />
        </div>
        <div>
          <TeachersTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;