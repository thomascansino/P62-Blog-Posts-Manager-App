import { useState, useEffect } from 'react'
import GetPost from './GetPost.jsx'

function GetPosts ({ getPosts, blogPosts, isGetPostVisible, setIsGetPostVisible, setGetAllPostsText }){
    const [selectedPost, setSelectedPost] = useState([]); 

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setIsGetPostVisible(true);
        setGetAllPostsText('Back');
    };

    useEffect(() => {
        getPosts();
    }, []);

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

export default GetPosts