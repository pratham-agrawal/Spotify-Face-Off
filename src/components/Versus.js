import {useState, useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';

function Versus() {

    const [songs, setSongs] = useState([]);


    useEffect(()=>{
        let songs = window.localStorage.getItem("songs");
        setSongs(JSON.parse(songs));
      }, [])

    useEffect(()=>{
        console.log("Start of useEffect");
        let temp = JSON.parse(window.localStorage.getItem("songs"));
        if (songs && temp && temp.length != 0) return;
        const getPlaylistSongs = async () => {
            let playlist_id = window.localStorage.getItem("playlist");
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}`, 
            {
                headers: {
                    Authorization: "Bearer " + window.localStorage.getItem("token"),
                    "Content-Type": "application/json" 
                }
            });
            const {items} = response.data.tracks;
            setSongs(items.map(item => {
                return {name: item.track.name, id: item.track.id, image: item.track.album.images[0].url, artists: item.track.artists.map((artist)=>artist.name)}
            }))
            window.localStorage.setItem("songs",JSON.stringify(songs));
            console.log("songs:")
            console.log(songs);
        }
        getPlaylistSongs();
        
    }, [])


    function selectedSong(selection){
        let temp = [...songs];
        console.log("idkidk")
        console.log(temp);
        if (temp && temp.length>=2){
            if (selection == 1){
                let song = temp[0];
                temp.push(song);
            }
            else {
                let song = temp[1];
                temp.push(song);
            }
            temp.splice(0,2);
            setSongs(temp);
            window.localStorage.setItem("songs",JSON.stringify(temp));
        }
    }

    return (
        <div className="Versus">
        {songs && songs.length >= 2?
        <div>
        <Card onClick={() => selectedSong(1)} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={songs[0].image ?? "ERROR"} />
        <Card.Body>
            <Card.Title>{songs[0].name ?? "ERROR"}</Card.Title>
            <Card.Text> {songs[0].artists[0] ?? "ERROR"}</Card.Text>
        </Card.Body>
        </Card>
        <Card onClick={() => selectedSong(2)} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={songs[1].image ?? "ERROR"} />
        <Card.Body>
            <Card.Title>{songs[1].name ?? "ERROR"}</Card.Title>
            <Card.Text> {songs[1].artists[0] ?? "ERROR"}</Card.Text>
        </Card.Body>
        </Card>
        </div>
        : <></>
        }
        {songs && songs.length == 1?
        <div>
        <h1>Winner:</h1>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={songs[0].image ?? "ERROR"} />
        <Card.Body>
            <Card.Title>{songs[0].name ?? "ERROR"}</Card.Title>
            <Card.Text> {songs[0].artists[0] ?? "ERROR"}</Card.Text>
        </Card.Body>
        </Card>
        </div>
        : <></>
        }
        </div>
    );
  }
  
  export default Versus;