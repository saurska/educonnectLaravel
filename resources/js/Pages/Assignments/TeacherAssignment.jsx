// resources/js/Pages/Assignments/AssignmentPage.jsx

import React from 'react';
import AuthenticatedLayout from '@/Layouts/TeacherAuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';


const AssignmentPage = ({ auth, subjects, classes, semesters }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
      subject_id: '',
      title: '',
      description: '',
      due_date: '',
      class_id: '',
      semester_id: '',
      file: null,
    });
  
    const submitForm = (e) => {
      e.preventDefault();
  
    //   const formData = new FormData();
    //   formData.append('subject_id', data.subject_id);
    //   formData.append('title', data.title);
    //   formData.append('description', data.description);
    //   formData.append('due_date', data.due_date);
    //   formData.append('class_id', data.class_id);
    //   formData.append('semester_id', data.semester_id);
    //   formData.append('file', data.file);
  
      console.log('Form submitted:', data);
  
      // You can use your preferred method for making API requests (axios, fetch, etc.)
      post(route('teacher.assignment.store'));
      reset();
    };
  
    return (
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
      >
        <Head title="Assignments" />
  
        <div className="py-12">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-md sm:rounded-md p-8">
            <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Assignments</h1>
  
            {/* Display existing assignments or any other content */}
            {/* You can customize this section based on your requirements */}
            <div>
              {/* Display existing assignments */}
            </div>
  
            {/* Form for creating new assignments */}
            <h2 className="text-lg font-semibold mb-4">Create Assignment</h2>
            <form onSubmit={submitForm} encType="multipart/form-data" className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Subject</label>
                <select
                  value={data.subject_id}
                  onChange={(e) => setData('subject_id', e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="" >Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                        {subject.name}
                        </option>
                  ))}
                </select>
              </div>
  
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Title</label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
  
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Description</label>
                <textarea
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
  
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Due Date</label>
                <input
                  type="date"
                  value={data.due_date}
                  onChange={(e) => setData('due_date', e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
  
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Class</label>
                <select
                  value={data.class_id}
                  onChange={(e) => setData('class_id', e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="" disabled>Select Class</option>
                  {classes.map((classItem) => (
                    <option key={classItem.id} value={classItem.id}>{classItem.name}</option>
                  ))}
                </select>
              </div>
  
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Semester</label>
                <select
                  value={data.semester_id}
                  onChange={(e) => setData('semester_id', e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="" disabled>Select Semester</option>
                  {semesters.map((semester) => (
                    <option key={semester.id} value={semester.id}>{semester.name}</option>
                  ))}
                </select>
              </div>
  
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Upload File</label>
                <input
                  type="file"
                  onChange={(e) => setData('file', e.target.files[0])}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
  
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                disabled={processing}
              >
                {processing ? 'Creating...' : 'Create Assignment'}
              </button>
            </form>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  };
  
  export default AssignmentPage;
  
  

