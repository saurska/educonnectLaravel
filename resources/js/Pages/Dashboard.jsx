import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, posts }) {
    return (
<AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="All Posts" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-md sm:rounded-md p-8">
                    <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">All Posts</h1>
                    
                    {posts.map((post) => (
                        <div key={post.id} className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                            <p className="text-gray-800 dark:text-gray-300 whitespace-pre-line">{post.content}</p>
                            <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 block">
                                Posted by {post.user ? post.user.name : 'Unknown User'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>

    );
}
