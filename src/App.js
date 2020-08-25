import React, { useState, useEffect} from 'react'
import './App.css';
import Post from "./Post";
import PostThumb from "./PostThumb";
import { db, auth } from "./firebase";
import {makeStyles } from '@material-ui/core/styles';
import {Modal} from '@material-ui/core';
import {Button, Input} from '@material-ui/core';
import ImageUpload from "./ImageUpload"
import InstagramEmbed from 'react-instagram-embed';
import Avatar from "@material-ui/core/Avatar"


function backToTop(){
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function getModalStyle() {
  const top = 50; 
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openImageUpload, setOpenImageUpload] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [viewmine, setViewMine] = useState(false);
  const [viewsinglepost, setViewSinglePost] = useState(false);
  const [singlepostid, setSinglePostId] = useState("bUsaVQYrGk0KJoRlWnKk");

  // The below is what checks if you are logged in or not, and keeps you logged in on refresh
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // if user has logged in...
        console.log(authUser);
        setUser(authUser);

      } else {
        // if user has logged out... 
        setUser(null);
      }
    })

    return () => {
      // perform some cleanup actions
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
      // This is where the code runs
      db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        // every time a new post is added, this code fires up
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data()
        })));
      })
  }, []);

  const signUp = (event) => {

    // This is to prevent the page from refreshing when we submit the form
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));

    // Close modal
    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    
    // Close modal
    setOpenSignIn(false);
  }


  return (
    <div className="app">

      <Modal  
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img 
                className="app__headerImage"
                height="40px;"
                src="https://toogreen.ca/instagreen/img/instagreen.svg"
                alt=""
              />
            </center>

            <Input 
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /> 
            <Input 
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input 
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>

          </form>

        </div>
      </Modal>

      <Modal  
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img 
                className="app__headerImage"
                src="https://toogreen.ca/instagreen/img/instagreen.svg"
                height="40px;"
                alt=""
              />
            </center>

            <Input 
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input 
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>

          </form>

        </div>
      </Modal>

      <header className="app__header">
        <img 
          className="app__headerImage"
          src="https://toogreen.ca/instagreen/img/instagreen.svg"
          height="40px;"
          alt=""
          // onClick={backToTop}
        />

        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ): (
          <div className="app__loginContainer">
              <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
              <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}

      </header>

        <div className="app__posts">
          <div className="app__postsLeft">
            {
            // If "View my own posts button was clicked AND user is logged in"
            (viewmine && user)  ? (
              
              <div className="post__thumbs">
              
             {
              posts.filter(({id, post}) => post.username === auth.currentUser.displayName).map(({id, post}) => (
                
                // added te below div so that if anyone clicks on this it will set a variable to enable view on a single post
                <div onClick={() => {setViewSinglePost(true); setSinglePostId(id); setViewMine(false); backToTop(); }}>
                  <PostThumb 
                      key={id}
                      postId={id}
                      user={user}
                      username={post.username}
                      caption={post.caption}
                      imageUrl={post.imageUrl}
                  />
                </div>

               ))}
              </div>
                        
            ) : viewsinglepost ? ( 

              // If a single post was selected
        
              posts.filter(({id, post}) => id === singlepostid).map(({id, post}) => (
                <Post 
                    key={id}
                    postId={id}
                    user={user}
                    username={post.username}
                    caption={post.caption}
                    imageUrl={post.imageUrl}
                />  
                                             
              ))

            ) : (

              // Else if no posts were selected, simply display all posts as usual
            
              posts.map(({id, post}) => (
                <Post 
                    key={id}
                    postId={id}
                    user={user}
                    username={post.username}
                    caption={post.caption}
                    imageUrl={post.imageUrl}
                />  
              ))

            )
            }   
          </div>
          <div className="app__postsRight no-mobile">
            <InstagramEmbed
              url="https://instagr.am/p/CDSUMassQI6XPkLspyAlml1uyiD4FhzzE4Iy_Q0/"
              maxWidth={320}
              hideCaption={false}
              containerTagName="div"
              protocol=""
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
            />

          </div>
        </div>

      <footer className="footer">

        {/* This is where people can upload stuff */}
        {user?.displayName ? (

          <div>
            <Modal  
              open={openImageUpload}
              onClose={() => setOpenImageUpload(false)}
            >
              <ImageUpload username={user.displayName} closemodal={setOpenImageUpload} />
            </Modal>
            

            <div className="footer__icons">
              <div className="footer__left">
                <img onClick={() => {setViewMine(false); setViewSinglePost(false); backToTop();}} className="app__home" src="https://toogreen.ca/instagreen/img/home.svg" alt='home icon to go back up'/>         
              </div>

              <div className="footer__middle">
                <img onClick={() => setOpenImageUpload(true)} className="app__add-postImg" src="https://toogreen.ca/instagreen/img/add-post.svg" alt='plus icon to add posts'/>
              </div>

              <div className="footer__right">
                  <Avatar 
                      onClick={()=> {setViewMine(true); backToTop();}}
                      className="footer__avatar"
                      alt={username}
                      src="https://toogreen.ca/instagreen/static/images/avatar/1.jpg"
                  />  
              </div>
            </div>

          </div>
        ): (
          <center><h3>Sorry you need to login first to upload</h3></center>
        )}  
      </footer>
    </div>
  );
}

export default App;
