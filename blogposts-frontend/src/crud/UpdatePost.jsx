import { useState, useEffect } from 'react'
import axios from 'axios'
import ModifyPost from './ModifyPost.jsx'

function UpdatePost ({ isUpdatePostVisible, isModifyPostVisible, setIsModifyPostVisible, setUpdatePostText }){
    const [blogPosts, setBlogPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState([]);
    const token = localStorage.getItem('token');

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
        setSelectedPost(post);
        setIsModifyPostVisible(true);
        setUpdatePostText('Back');
    };

    useEffect(() => {
        getPosts();
    }, [isUpdatePostVisible, isModifyPostVisible]);

    if ( isUpdatePostVisible ) {
        if ( blogPosts.length > 0 && !isModifyPostVisible ) {
            return (
                <ul>
                    {blogPosts.map((post) => (
                        <li key={post._id} onClick={() => handlePostClick(post)}>{post.title}</li>
                    ))}
                </ul>
            )
        } else if ( isModifyPostVisible ) {
            return (
                <ModifyPost isModifyPostVisible={isModifyPostVisible} post={selectedPost}/>
            )
        } else {
            return 'No posts available.'
        };
    };

};

export default UpdatePost