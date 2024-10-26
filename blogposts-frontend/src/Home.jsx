import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import GetPosts from './crud/GetPosts.jsx'
import CreatePost from './crud/CreatePost.jsx'
import UpdatePost from './crud/UpdatePost.jsx'
import DeletePost from './crud/DeletePost.jsx'
import styles from './Home.module.css'

function Home() {
  const [isGetPostVisible, setIsGetPostVisible] = useState(false);
  const [isGetPostsVisible, setIsGetPostsVisible] = useState(false);
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);
  const [isUpdatePostVisible, setIsUpdatePostVisible] = useState(false);
  const [isModifyPostVisible, setIsModifyPostVisible] = useState(false);
  const [isDeletePostVisible, setIsDeletePostVisible] = useState(false);
  const [getAllPostsText, setGetAllPostsText] = useState('Get All Posts');
  const [updatePostText, setUpdatePostText] = useState('Update Post');
  const [activeButton, setActiveButton] = useState('');
  const [blogPosts, setBlogPosts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    handleGetPosts();
  }, []);

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

  const handleGetPosts = () => {
    setIsGetPostVisible(false);
    setIsGetPostsVisible(true);
    setIsCreatePostVisible(false);
    setIsUpdatePostVisible(false);
    setIsModifyPostVisible(false);
    setIsDeletePostVisible(false);
    setGetAllPostsText('Get All Posts');
    setUpdatePostText('Update Post');
    setActiveButton('getAllPosts');
  };

  const handleCreatePost = () => {
    setIsGetPostVisible(false);
    setIsGetPostsVisible(false);
    setIsCreatePostVisible(true);
    setIsUpdatePostVisible(false);
    setIsModifyPostVisible(false);
    setIsDeletePostVisible(false);
    setGetAllPostsText('Get All Posts');
    setUpdatePostText('Update Post');
    setActiveButton('createPost');
  };

  const handleUpdatePost = () => {
    setIsGetPostVisible(false);
    setIsGetPostsVisible(false);
    setIsCreatePostVisible(false);
    setIsUpdatePostVisible(true);
    setIsModifyPostVisible(false);
    setIsDeletePostVisible(false);
    setGetAllPostsText('Get All Posts');
    setUpdatePostText('Update Post');
    setActiveButton('updatePost');
  };

  const handleDeletePost = () => {
    setIsGetPostVisible(false);
    setIsGetPostsVisible(false);
    setIsCreatePostVisible(false);
    setIsUpdatePostVisible(false);
    setIsModifyPostVisible(false);
    setIsDeletePostVisible(true);
    setGetAllPostsText('Get All Posts');
    setUpdatePostText('Update Post');
    setActiveButton('deletePost');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
        <div className={styles['logout-container']} onClick={handleLogout}>Logout</div>
        <div className={styles['main-container']}>
          <div className={styles['button-container']}>
            <div className={activeButton === 'getAllPosts' ? styles.activeButton : styles.button} onClick={handleGetPosts}>{getAllPostsText}</div>
            <div className={activeButton === 'createPost' ? styles.activeButton : styles.button} onClick={handleCreatePost}>Create Post</div>
            <div className={activeButton === 'updatePost' ? styles.activeButton : styles.button} onClick={handleUpdatePost}>{updatePostText}</div>
            <div className={activeButton === 'deletePost' ? styles.activeButton : styles.button} onClick={handleDeletePost}>Delete Post</div>
          </div>
          <div className={styles['window-container']}>
            
            {isGetPostsVisible &&
            <GetPosts 
            getPosts={getPosts}
            blogPosts={blogPosts}
            isGetPostVisible={isGetPostVisible} 
            setIsGetPostVisible={setIsGetPostVisible} 
            setGetAllPostsText={setGetAllPostsText} />}

            {isCreatePostVisible &&
            <CreatePost />}

            {isUpdatePostVisible &&
            <UpdatePost 
            getPosts={getPosts}
            blogPosts={blogPosts}
            isModifyPostVisible={isModifyPostVisible} 
            setIsModifyPostVisible={setIsModifyPostVisible} 
            setUpdatePostText={setUpdatePostText} />}
            
            {isDeletePostVisible &&
            <DeletePost 
            getPosts={getPosts} 
            blogPosts={blogPosts} />}
            
          </div>
        </div>
    </>
  )
}

export default Home
