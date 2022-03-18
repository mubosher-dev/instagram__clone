import React, { useEffect, useState } from 'react'
import './App.css';
import { Title } from './TitleChange';
import styled from 'styled-components';
import Post from './components/Post';
import { Modal, Button, Typography, Box, TextField, Avatar } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { auth, db } from './firebase';
import ImgUpload from './components/ImgUpload';
import HomeIcon from '@mui/icons-material/Home';
import InstagramIcon from '@mui/icons-material/Instagram';
import AddCommentIcon from '@mui/icons-material/AddComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Sidebar from './components/Sidebar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function App() {

  Title("Instagram Clone")

  const [posts, setPosts] = useState([]);

  const [open, setOpen] = useState(false);


  const handleClose = () => {
    setOpen(false);
    setOpenSignIn(false);
  }

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null)
  const [openSignIn, setOpenSignIn] = useState(false);

  const signUp = (e) => {
    e.preventDefault();

    if (openSignIn) {
      auth.signInWithEmailAndPassword(email, password)
        .catch((err) => alert(err))
      setOpen(false);
      setEmail("");
      setPassword("");
      setUserName("");
    }
    else {
      auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
          return authUser.user.updateProfile({
            displayName: username,
          })
        })
        .catch((err) => alert(err));
      setOpen(false);
      setEmail("");
      setPassword("");
      // setUserName("");
    }
  }

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
        if (authUser.displayName) {

        }
        else {
          return authUser.updateProfile({
            displayName: username,
          })
        }
      }
      else {
        setUser(null)
      }
    })

    return () => {
      subscribe();
    }
  }, [user, username])

  useEffect(() => {
    db.collection("instagram")
      .orderBy("avatarImg", "asc").onSnapshot((snapshot) => {
        console.log(snapshot);
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data(),
          }))
        );
      })
  }, [])

  console.log(posts)

  const logIn = () => {
    setOpenSignIn(true);
    setOpen(true)
  }

  console.log(posts)

  return (
    <div className="app">


      <Headers>
        <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" />


        <HeaderCenter>

          <TextField type="text" label="Search here"
            className='input__box'
          />

          <HomeIcon className="icon" />
          <FavoriteBorderIcon className="icon" />
          <AddCommentIcon className="icon" />
        </HeaderCenter>

        {user ? (
          <LoginContainer>
            <Button onClick={() => auth.signOut()} > Log Out </Button>
            <Avatar src={user.photoURL} />
          </LoginContainer>
        ) :
          (
            <LoginContainer>
              <Button onClick={logIn} > Sign In </Button>
              <Button onClick={() => setOpen(true)} > Sign Up </Button>
            </LoginContainer>
          )
        }
      </Headers>

      <AppBody>
        <AppLeft>
          {posts.map((post, index) => (
            <Post
              userName={post.name.userName}
              postCaption={post.name.postCaption}
              avatarImg={post.name.avatarImg}
              postImg={post.name.postImg}
              id={post.id}
              username={user}
              key={index}
            />
          ))}
        </AppLeft>
        <AppRight>
          <Sidebar />
        </AppRight>
      </AppBody>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>
            <LoginImg src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" />
            <Form>
              <Wrapper>
                {openSignIn ? (
                  <></>
                ) : (
                  <TextField
                    value={username}
                    onChange={e => setUserName(e.target.value)}
                    type="text" label="username" />
                )}
              </Wrapper>
              <Wrapper>
                <TextField
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email" label="email" />
              </Wrapper>
              <Wrapper>
                <TextField
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password" label="password" />
              </Wrapper>
              <Wrapper>
                {openSignIn ? (
                  <SearchButton onClick={signUp}>
                    Sign In
                  </SearchButton>
                ) : (
                  <SearchButton onClick={signUp}>
                    Sign Up
                  </SearchButton>
                )}
              </Wrapper>
            </Form>
          </Typography>
        </Box>
      </Modal>
      {user ? (
        <ImgUpload username={user.displayName} />
      ) :
        (
          <h3>Sorry you need to login upload</h3>
        )
      }
    </div>

  )
}

const Headers = styled.header`
    top:0;
    background-color: #fff;
    position: fixed;
    width:100%;
    z-index:100;
    padding: 20px;
    box-shadow: 0 0 8px 5px #f3f3f3;
    display:flex;
    justify-content:space-evenly;
    border-bottom: 1px solid rgba(0,0,0,0.5);
`;

const Logo = styled.img`
    width: 100px;
    object-fit: contain;
`;

const HeaderCenter = styled.div`
  display:flex;
  align-items:center;
  justify-content: space-around;

  .icon{
    font-size: 30px;
    margin: 0 15px !important;
  }

  @media screen and (max-width:768px){
    .input__box{
      display:none !important;
    }
    .icon:nth-child(3){
      display:none;
    }
    .icon{
      margin:0 5px !important;
    }
  }
`;

const LoginContainer = styled.div`
  display:flex;
  justify-content: center;
  align-items:center;
`;

const Form = styled.form``;

const AppBody = styled.div`
  display:flex;
  overflow-y: scroll;
  padding:20px;
  margin:100px;

  ::-webkit-scrollbar{
    display: none !important;
  }

  @media screen and (max-width:550px){
    margin: 0!important;
    margin-top: 100px !important;
    margin-bottom: 200px !important;
  }
`;

const AppLeft = styled.div``;

const AppRight = styled.div`
  position:fixed;
  right: 0;
  z-index: 20;
  top: 0;
  bottom: 0;
  background:#fff;

  @media screen and (max-width:998px) {
   display:none; 
  }
`;


const Wrapper = styled.div`
    margin:10px 0;

    .MuiFormControl-root{
        width:100%;
    }
`;

const SearchButton = styled(Button)`
    width:100% !important;
    background-color: rgb(100,10,20) !important;
    color: white !important;
`;


const LoginImg = styled.img`
    width: 100px !important;
    margin: auto;
`;


export default App;