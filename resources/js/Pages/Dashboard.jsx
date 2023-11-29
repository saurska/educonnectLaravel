// pages/Dashboard.js
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, posts, comments }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        comment: '',
        postId: '',
    });

    const [isCommenting, setIsCommenting] = useState(false);
    const [commentContent, setCommentContent] = useState('');
    const [isOverlayClicked, setIsOverlayClicked] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const handleLike = (postId) => {
        console.log(`Liked post with ID: ${postId}`);
    };

    const handleComment = (postId) => {
        setData('postId', postId);
        setSelectedPostId(postId);
        setIsCommenting(true);
    };

    const closeCommentBox = () => {
        setIsCommenting(false);
        setSelectedPostId(null);
        setCommentContent('');
    };

    const handleOverlayClick = () => {
        closeCommentBox();
        setIsOverlayClicked(false);
    };

    const handleCommentSubmit = () => {
        // Perform submission logic here with selectedPostId and commentContent

        console.log(`Submitting comment for post ID ${selectedPostId}: ${commentContent}`);
        // Reset state and close comment box
        post(route('post.comment'));
        closeCommentBox();
        reset();
    };

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

                            {post.image && (
                                <img
                                    src={"/storage/" + post.image}
                                    alt="Post Image"
                                    className="mt-4 w-full h-auto max-h-60 object-cover rounded-md"
                                />
                            )}
                            <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 block">
                                Posted by {post.username ? post.username : 'Unknown User'} as {post.user_type}
                            </span>
                            <div className="mt-4 flex space-x-4">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                    onClick={() => handleLike(post.id)}
                                >
                                    Like
                                </button>
                                <button
                                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                                    onClick={() => handleComment(post.id)}
                                >
                                    Comment
                                </button>
                            </div>

                            {/* Display comments for the current post */}

                        </div>
                    ))}
                </div>
            </div>


            // Inside the commenting box
            {isCommenting && (
    <div
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
        onClick={() => setIsOverlayClicked(true)}
    >
        <div
            className="bg-white dark:bg-gray-800 p-6 rounded-md w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Comment box content */}
            <h2 className="text-lg font-semibold mb-4">Add a Comment</h2>
            <div className="overflow-y-auto max-h-40 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md mb-4">
                {/* Display existing comments for the current post */}
                <h3 className="text-lg font-semibold mb-2">Comments:</h3>
                {comments
                    .filter((comment) => comment.post_id === selectedPostId)
                    .map((comment) => (
                        <div key={comment.id} className="mb-4 p-2 bg-gray-200 dark:bg-gray-800 rounded-md">
                            <p className="text-gray-800 dark:text-gray-300 whitespace-pre-line">{comment.content}</p>
                            <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 block">
                                Commented by {comment.username ? comment.username : 'Unknown User'}
                            </span>
                        </div>
                    ))}
            </div>
            <textarea
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md mb-4"
                placeholder="Write your comment..."
                value={data.comment}
                onChange={(e) => setData('comment', e.target.value)}
            ></textarea>
            <div className="flex justify-end">
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
                    onClick={closeCommentBox}
                >
                    Cancel
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={handleCommentSubmit}
                >
                    Comment
                </button>
            </div>
        </div>
    </div>
)}



            {isOverlayClicked && handleOverlayClick()}
        </AuthenticatedLayout>
    );
}
