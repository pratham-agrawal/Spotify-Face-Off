import axios from "axios";
import { useState, useEffect } from "react";
import Versus from "./Versus";


function Playlists() {
    const [playlist, setPlaylist] = useState(null)
    const [playlists, setPlaylists] = useState([])

    useEffect(()=>{
        let playlist = window.localStorage.getItem("playlist")
        setPlaylist(playlist)
      }, [])
    

    useEffect(()=> {
        const getPlaylistData = async () => {
            const response = await axios.get("https://api.spotify.com/v1/me/playlists", 
            {
                headers: {
                    Authorization: "Bearer " + window.localStorage.getItem("token"),
                    "Content-Type": "application/json" 
                }
            });

            console.log (response);
            const {items} = response.data;
            console.log("items");
            console.log(items);

            setPlaylists(items.map(item => {
                return {id: item.id, name: item.name, image: item.images[0].url}
            }))
            console.log("playlists:")
            console.log(playlists)

        }
        getPlaylistData()
    }, [])

    function removePlaylist(){
        setPlaylist(null)
        window.localStorage.removeItem("playlist")
        window.localStorage.removeItem("songs")
      }
    
  
    return (
      <div className="Playlists">
      {playlist? <Versus/> : <></>}
      {!playlist? <h1 className="mt-3"> Select a Playlist:</h1> : <></>}
      {!playlist? 
      <div >
      {
        playlists.map(({name, id, image}) => {
            return (
            <div className="card m-3 d-inline-block" style={{}} onClick={()=>{
                setPlaylist(id)
                window.localStorage.setItem("playlist",id)
                }}> 
                <img src={image} className="rounded" style = {{width: 250, height: 250 }}/>
                <h4>{name}</h4> 
            </div>
            )
        })
      }
      </div>
      : <button onClick ={removePlaylist} className="btn btn-success btn-lg mb-3">Select other playlist</button>}
      </div>
    );
  }
  export default Playlists;