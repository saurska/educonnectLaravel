import React, { useState } from 'react';
import { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

const PostForm = ({ auth }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        content :''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('post.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Create Post" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-md sm:rounded-md p-8">
                    <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Create a Post</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Content:
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                rows="4"
                                className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md w-full"
                                placeholder="Write your post..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
                        >
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default PostForm;
