import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Auth from './components/Auth/Auth.component';
import Main from './components/Main/Main.component';

import { setCurrentUser } from './store/user/user.action';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const localCurrentUser = localStorage.getItem('currentUser');
    
    if (localCurrentUser) {
      const currentUser = JSON.parse(localCurrentUser);
      dispatch(setCurrentUser({...currentUser}));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route index path={'/'} element={<Main />} />
        <Route path={'/auth'} element={<Auth />} />   
      </Routes>
    </div>
  );
}

export default App;