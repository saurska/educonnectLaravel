// resources/js/Pages/Teacher/Assignments/Index.jsx

import React from 'react';
import AuthenticatedLayout from '@/Layouts/TeacherAuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const TeacherAssignmentsIndex = ({ auth }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
    >
      <Head title="Assignments" />

      <div className="py-12">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-md sm:rounded-md p-8">
          <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Teacher Assignments</h1>
          {/* Display a list of assignments if needed */}
          {/* Add links or buttons for other actions */}
          <Link
            href={route('teacher.assignment.create')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Create Assignment
          </Link>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default TeacherAssignmentsIndex;
