import { useState } from 'react'
import axios from 'axios'
import homeStyles from '../Home.module.css'
import createPostStyles from './CreatePost.module.css'

function CreatePost ({ isCreatePostVisible }){
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
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

    const createPost = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/posts', data, config);
            setNotification('Post saved!✔️');
            console.log(response.data);
        } catch (err) {
            console.error('Failed to create a post:', err.response.data.message);
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

    if ( isCreatePostVisible ){
        return (
            <>
                <div>
                    <input placeholder='Title' className={createPostStyles.inputBox} type='text' value={title} onChange={handleTitle}/>
                </div>
                <div>
                    <textarea placeholder='Content' value={body} onChange={handleBody} />
                </div>
                <div className={createPostStyles['button-container']}>
                    <div className={homeStyles.button} onClick={handleClear}>Clear</div>
                    <div>{notification}</div>
                    <div className={homeStyles.button} onClick={createPost}>Save Post</div>
                </div>
            </>
        )
    };

};

export default CreatePost