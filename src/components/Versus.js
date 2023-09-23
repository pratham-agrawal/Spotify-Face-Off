import {useState, useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Player from "./Player";

function Versus() {

    const [songs, setSongs] = useState([]);
    const [playOne, setPlayOne] = useState(false);
    const [playTwo, setPlayTwo] = useState(false);

    async function getNextPage(link) {
        const getPlaylistSongs = async () => {
          try {
            const response = await axios.get(`${link}`, {
              headers: {
                Authorization: "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
              },
            });
            return response;
          } catch (error) {
            // Handle any errors that occur during the API request
            console.error("Error fetching playlist songs:", error);
            throw error; // Optionally rethrow the error for the caller to handle
          }
        };
        try {
            // Use await to get the response data
            const response = await getPlaylistSongs();
            console.log("ugh");
            console.log(response);
            const {items} = response.data;
            console.log("new items");
            console.log(response);
            let newSongs = items.map(item => {
                return {name: item.track.name, id: item.track.id, uri: item.track.uri, image: item.track.album.images[0].url, artists: item.track.artists.map((artist)=>artist.name)}
            });
            setSongs(songs => [...songs, ...newSongs]);
            window.localStorage.setItem("songs",JSON.stringify(songs));
            console.log("should've updated");
            console.log(songs);
            if (response.data.next!=null){
                getNextPage(response.data.next);
            }
        } catch (error) {
          // Handle any errors that occur when using 'getPlaylistSongs'
          console.error("Error in getNextPage:", error);
        }
      }
      

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
            console.log(response);
            const {items} = response.data.tracks;
            console.log(items);
            setSongs(items.map(item => {
                return {name: item.track.name, id: item.track.id, uri: item.track.uri, image: item.track.album.images[0].url, artists: item.track.artists.map((artist)=>artist.name)}
            }))
            window.localStorage.setItem("songs",JSON.stringify(songs));
            console.log("songs:")
            console.log(songs);
            // if (response.data.tracks.next!=null){
            //     console.log(response.data.tracks.next)
            //     getNextPage(response.data.tracks.next);
            // }
        }
        getPlaylistSongs();
        
    }, [])


    function selectedSong(selection){
        setPlayOne(false);
        setPlayTwo(false);
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
    function play(selection){
        if (selection == 1) {
            setPlayTwo(false);
            setPlayOne(true);
        }
        else if (selection == 2) {
            setPlayOne(false);
            setPlayTwo(true);
        }
    }

    return (
        <div className="Versus">
        {songs && songs.length >= 2?
        <div className="container my-4">

        <div className="row">

            <div className="col border border-3 border-dark rounded m-2" style={{backgroundColor: "#2B3036"}}>
                <Card className="d-inline-block m-1" onClick={() => selectedSong(1)} style={{ width: '18rem'}}>
                <Card.Img variant="top" src={songs[0].image} />
                <Card.Body>
                    <Card.Title>{songs[0].name}</Card.Title>
                    <Card.Text> {songs[0].artists[0]}</Card.Text>
                </Card.Body>
                </Card>
                {playOne? <Player accessToken={window.localStorage.getItem("token")} trackUri = {songs[0].uri} /> : <div><button className="btn btn-lg" style={{ width: '400px', backgroundColor: "#8A7E72"}} onClick={() => play(1)}>Play</button></div>}
            </div>
            
            <div className="col border border-3 border-dark rounded m-2" style={{backgroundColor: "#2B3036"}}>
                <Card className="d-inline-block m-1" onClick={() => selectedSong(2)} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={songs[1].image} />
                <Card.Body>
                    <Card.Title>{songs[1].name}</Card.Title>
                    <Card.Text> {songs[1].artists[0]}</Card.Text>
                </Card.Body>
                </Card>
                {playTwo? <Player accessToken={window.localStorage.getItem("token")} trackUri = {songs[1].uri} /> : <div> <button className="btn btn-success btn-lg" style={{ width: '400px',  backgroundColor: "#8A7E72" }} onClick={() => play(2)}>Play</button> </div>}
            </div>
        </div>

        </div>
        : <></>
        }
        {songs && songs.length == 1?
        <div>
        <h1>Winner:</h1>
        <div className="col border border-3 border-dark rounded m-2" style={{backgroundColor: "#2B3036"}}>
            <Card className="d-inline-block m-1" onClick={() => selectedSong(1)} style={{ width: '18rem'}}>
            <Card.Img variant="top" src={songs[0].image} />
            <Card.Body>
                <Card.Title>{songs[0].name}</Card.Title>
                <Card.Text> {songs[0].artists[0]}</Card.Text>
            </Card.Body>
            </Card>
            <Player accessToken={window.localStorage.getItem("token")} trackUri = {songs[0].uri} />
        </div>
        </div>
        : <></>
        }
        </div>
    );
  }
  
  export default Versus;