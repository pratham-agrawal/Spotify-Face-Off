import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

function Player({ accessToken, trackUri}) {
    const [play, setPlay] = useState(false);

    useEffect(() => setPlay(true), [trackUri]);

    if (!accessToken) return null;
    return (
    <div className="border border-dark rounded" style={{ width: '100%' }}>
    <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={state => {
            if (!state.isPlaying) setPlay(false)
        }}
        play = {true}
        uris={trackUri ? [trackUri] : []}
        styles={{
            bgColor: '#1DB954'
        }}
        
    />
    </div>
    )
}

export default Player