import { useState, useEffect } from 'react'
import axios from 'axios'
import deletePostStyles from './DeletePost.module.css'

function DeletePost ({ isDeletePostVisible }){
    const [blogPosts, setBlogPosts] = useState([]);
    const [activePostIds, setActivePostIds] = useState([]);
    const [isDeleteTriggered, setIsDeleteTriggered] = useState(false);
    const token = localStorage.getItem('token');

    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Successfully deleted post:', response.data.title);
        } catch (err) {
            console.error('Failed to delete a post:', err.response.data.message);
        };
    };

    const deleteMultiplePosts = async () => {
        try {
            await Promise.all(activePostIds.map((id) => deletePost(id)));
            setIsDeleteTriggered(!isDeleteTriggered);
            console.log('All posts deleted successfully!');
        } catch (err) {
            console.error('Failed to delete some posts:', err.response.data.message);
        };
    };

    const getPosts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/posts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBlogPosts(response.data);
            console.log(response.data);
        } catch (err) {
            console.error('Failed to get all posts:', err.response.data.message);
        };
    };

    const handlePostClick = (post) => {
        if (activePostIds.includes(post._id)) {
            setActivePostIds(activePostIds.filter((id) => id !== post._id));
        } else {
            setActivePostIds([...activePostIds, post._id]);
        };
    };

    useEffect(() => {
        getPosts();
    }, [isDeletePostVisible, isDeleteTriggered]);

    if ( isDeletePostVisible ) {
        if ( blogPosts.length > 0) {
            return (
                <>
                    <ul>
                        {blogPosts.map((post) => (
                            <li key={post._id} onClick={() => handlePostClick(post)} className={activePostIds.includes(post._id) ? deletePostStyles.activePost : null}>{post.title}</li>
                        ))}
                    </ul>
                    <div className={deletePostStyles['button-container']}>
                        <div className={deletePostStyles.button} onClick={deleteMultiplePosts}>Delete</div>
                    </div>
                </>
            )
        } else {
            return 'No posts available.'
        };
    };
    

};

export default DeletePost