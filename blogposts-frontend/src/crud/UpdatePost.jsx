import { useState, useEffect } from 'react'
import ModifyPost from './ModifyPost.jsx'

function UpdatePost ({ getPosts, blogPosts, isModifyPostVisible, setIsModifyPostVisible, setUpdatePostText }){
    const [selectedPost, setSelectedPost] = useState([]);

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setIsModifyPostVisible(true);
        setUpdatePostText('Back');
    };

    useEffect(() => {
        getPosts();
    }, [isModifyPostVisible]);

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

export default UpdatePost