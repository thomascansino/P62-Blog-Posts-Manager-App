import { useState } from 'react'
import axios from 'axios'
import homeStyles from '../Home.module.css'
import createPostStyles from './CreatePost.module.css'

function ModifyPost ({ isModifyPostVisible, post }){
    const [body, setBody] = useState(post.body);
    const [title, setTitle] = useState(post.title);
    const [notification, setNotification] = useState('');
    const token = localStorage.getItem('token');

    const data = {
        title,
        body
    };

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const modifyPost = async () => {
        if ( !body || !title ) {
            alert(`A ${ !title && !body ? 'title and body' : !title ? 'title' : 'body' } is/are mandatory.`);
            return;
        };
        
        try {
            const response = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/posts/${post._id}`, data, config);
            setNotification('Post updated!✔️');
            console.log(response.data);
        } catch (err) {
            console.error('Failed to update a post:', err.response.data.message);
        };
    };

    const handleBody = (e) => {
        setBody(e.target.value);
    };

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleClear = () => {
        setTitle('');
        setBody('');
        setNotification('');
    };

    if ( isModifyPostVisible ) {
        return (
            <>
                <div>
                    <input className={createPostStyles.inputBox} placeholder='Title' type='text' value={title} onChange={handleTitle}/>
                </div>
                <div>
                    <textarea placeholder='Content' value={body} onChange={handleBody} />
                </div>
                <div className={createPostStyles['button-container']}>
                    <div className={homeStyles.button} onClick={handleClear}>Clear</div>
                    <div>{notification}</div>
                    <div className={homeStyles.button} onClick={modifyPost}>Modify Post</div>
                </div>
            </>
        )
    };
};

export default ModifyPost