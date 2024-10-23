import { useState, useEffect } from 'react'
import axios from 'axios'
import GetPost from './GetPost.jsx'

function GetPosts ({ isGetPostVisible, setIsGetPostVisible, isGetPostsVisible, setGetAllPostsText }){
    const [blogPosts, setBlogPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState([]);
    const token = localStorage.getItem('token'); 

    const getPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/posts', {
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
        setIsGetPostVisible(true);
        setGetAllPostsText('Back');
    };

    useEffect(() => {
        getPosts();
    }, [isGetPostsVisible]);

    if ( isGetPostsVisible ) {
        if ( blogPosts.length > 0 && !isGetPostVisible ) {
            return (
                <ul>
                    {blogPosts.map((post) => (
                        <li key={post._id} onClick={() => handlePostClick(post)}>{post.title}</li>
                    ))}
                </ul>
            )
        } else if ( isGetPostVisible ) {
            return (
                <div>
                    <GetPost isGetPostVisible={isGetPostVisible} post={selectedPost}/>
                </div>
            )
        } else {
            return 'No posts available.'
        };
    };
    
};

export default GetPosts