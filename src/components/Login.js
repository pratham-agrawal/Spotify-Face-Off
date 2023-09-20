import { Container } from "react-bootstrap"

const CLIENT_ID = "561a8a221d184f68850aac065cac4c41"
const REDIRECT_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https:accounts.spotify.coom/authorize"
const RESPONSE_TYPE = "code"
const AUTH_URL = "https://accounts.spotify.com/en/authorize?client_id=561a8a221d184f68850aac065cac4c41&response_type=token&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-read-playback-state%20user-modify-playback-state"


function Login() {
    return (
        <Container className="d-flex justify-content-center align-items-center" style = {{minHeight: "80vh"}} >
        <a className="btn btn-dark btn-lg" style={{fontSize: "2.5rem"}} href={AUTH_URL}>
          Login With Spotify
        </a>
      </Container>
    );
  }
  
  export default Login;