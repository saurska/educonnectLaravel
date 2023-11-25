import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

// ... (imports)

export default function Students({ auth, users }) {
    const [search, setSearch] = useState('');
  
    // Filter users based on search input
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  
    return (
      <AdminAuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
      >
        <Head title="Dashboard" />
  
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900 dark:text-gray-100">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Student List</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by name"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="p-3 border border-gray-300 dark:border-gray-700 rounded w-full pl-10 pr-4 focus:outline-none focus:border-blue-500 dark:text-gray-100"
                    />
                    <div className="absolute top-3 left-4">
                      <svg
                        className="fill-current pointer-events-none text-gray-500 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                      >
                        <path d="M16.2 17.8l-4.4-4.4a6.5 6.5 0 1 0-1.4 1.4l4.4 4.4a1 1 0 0 0 1.4 0 1 1 0 0 0 0-1.4zM5 10a5 5 0 1 1 10 0 5 5 0 0 1-10 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                    <thead>
                      <tr>
                        <th className="py-3 px-6 text-left border-b">ID</th>
                        <th className="py-3 px-6 text-left border-b">Name</th>
                        <th className="py-3 px-6 text-left border-b">Enrollment No.</th>
                        <th className="py-3 px-6 text-left border-b">Class</th>
                        <th className="py-3 px-6 text-left border-b">Semester</th>
                        {/* Add other columns based on your User model fields */}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="py-2 px-6 text-left border-b">{user.id}</td>
                          <td className="py-2 px-6 text-left border-b">{user.name}</td>
                          <td className="py-2 px-6 text-left border-b">{user.enrollment_no}</td>
                          <td className="py-2 px-6 text-left border-b">{user.class}</td>
                          <td className="py-2 px-6 text-left border-b">{user.semester}</td>
                          {/* Add other cells based on your User model fields */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminAuthenticatedLayout>
    );
  }
  
  