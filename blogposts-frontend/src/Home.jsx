import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [activeButton, setActiveButton] = useState();
  const navigate = useNavigate();

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
            <GetPosts isGetPostsVisible={isGetPostsVisible} isGetPostVisible={isGetPostVisible} setIsGetPostVisible={setIsGetPostVisible} setGetAllPostsText={setGetAllPostsText} />
            <CreatePost isCreatePostVisible={isCreatePostVisible} />
            <UpdatePost isUpdatePostVisible={isUpdatePostVisible} isModifyPostVisible={isModifyPostVisible} setIsModifyPostVisible={setIsModifyPostVisible} setUpdatePostText={setUpdatePostText} />
            <DeletePost isDeletePostVisible={isDeletePostVisible} />
          </div>
        </div>
    </>
  )
}

export default Home
