import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import Playlists from './components/Playlists';

function App() {

  const [token, setToken] = useState("")

  useEffect(()=>{
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    if (!token && hash){
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token",token)
      //setToken(token)
    }
    setToken(token)
  }, [])

  function logout(){
    setToken("")
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("playlist");
  }

  return (
    <div className="App">
      {token? <Playlists/> : <></>}
      {!token? <Login/> : <button onClick ={logout} className="btn btn-success btn-lg me-5">Logout</button>}
    </div>
  );
}

export default App;
