import './App.css'
import PostsList from './features/posts/PostsList';
import PostAddForm from './features/posts/PostAddForm';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import SinglePostPage from './features/posts/SinglePostPage';
import EditPostForm from './features/posts/EditPostForm';
import UsersList from './features/users/UsersList';
import UserPage from './features/users/UserPage.jsx';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<PostsList />} />

        <Route path='post' >
          <Route index element={<PostAddForm />} />
          <Route path=':postId' element={<SinglePostPage />} />
          <Route path='edit/:postId' element={<EditPostForm />} />
        </Route>

        <Route path='user' >
          <Route index element={<UsersList />} />
          <Route path=':userId' element={<UserPage />} />
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  )
}

export default App
