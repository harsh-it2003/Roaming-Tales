import Header from './header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Diaries from './diaries/Diaries';
import Authentication from './authentication/Authentication';
import Add from './diaries/Add';
import Profile from './profile/Profile';
import EditPost from './diaries/EditPost';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


function App() {
  const dispatch=useDispatch();

  const isLoggedIn = useSelector((state)=>{
    return state.loginReducer.isLoggedIn;
  });
  

  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch({
        type:"login",
      });
    }
  });
  

  return (
    <div>
      <header>
        <Header />
      </header>

      <section>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/diaries' element={<Diaries />} />
          <Route exact path='/authentication' element={<Authentication />} />
          {isLoggedIn && <>
            <Route exact path='/add' element={<Add />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route exact path='/editPost/:id' element={<EditPost />} />
          </>}
        </Routes>
      </section>


    </div>
  );
}

export default App;
