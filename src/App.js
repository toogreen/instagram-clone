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
import Avatar from "@material-ui/core/Avatar";
import LazyLoad from "react-lazyload";
import MenuPopupState from "./components/MenuPopupState"
import getUserLocale from 'get-user-locale'


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

const Spinner = () => (
  <div className="post loading">
    <img alt="Loading..." src="https://i.gifer.com/ZZ5H.gif" width="20" />
    <h5>Loading...</h5>
  </div>
);


// Determine language from the user's computer or browser

const locale =() => {
  
  if (getUserLocale().includes("fr")) {
    return(true)
  } else {
    return(false)
  }
}

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
  const [viewwhichuser, setViewWhichUser] = useState('');
  const [viewsinglepost, setViewSinglePost] = useState(false);
  const [singlepostid, setSinglePostId] = useState('');
  const [lang, setLang] = useState(locale);

  // This is to toggle from FR to EN
  const toggleLang = () => setLang(!lang);


  // The below is what checks if you are logged in or not, and keeps you logged in on refresh
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // if user has logged in...
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

  // To automatically change language text desc - Not necessary for now actually
/*   useEffect((toggleLang) => {
        // To toggle lang
        if (lang) {
          // If user clicked FR
          setLang("FR")
          console.log(lang)
        } else {
          setLang("EN")
          console.log(lang)
        }  
  })
 */
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

    // Set user so that footer changes accordingly
    

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

  function home() {
    setViewMine(false); 
    setViewWhichUser(''); 
    setViewSinglePost(false); 
    backToTop();    
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
              placeholder={lang ? "Nom d'utilisateur":"username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /> 
            <Input 
              placeholder={lang ? "Courriel":"email"}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input 
              placeholder={lang ? "Mot de passe":"password"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>{lang ? "Inscrivez-vous":"Sign Up"}</Button>

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
              placeholder={lang ? "Courriel":"email"}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input 
              placeholder={lang ? "Mot de passe":"password"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>{lang ? "Connectez-vous":"Sign In"}</Button>

          </form>

        </div>
      </Modal>

      <header className="app__header">
        <img 
          className="app__headerImage"
          src="https://toogreen.ca/instagreen/img/instagreen.svg"
          height="40px;"
          alt=""
        />

        <div className="app__loginContainer">

              <div className="loginLeft">
                { user ? (
                  <Button onClick={() => auth.signOut()}>{lang ? "Déconnecter":"Logout"}</Button>
                ) : (
                  <Button onClick={() => toggleLang()}>{lang ? "EN":"FR"}</Button>
                )
                }
                
                
             </div>

            <div className="loginRight">
              <Button  aria-controls="fade-menu" aria-haspopup="true" > 
                <MenuPopupState 
                  topmenu={true}
                  lang={lang}
                  user={user}
                  functiontopass={toggleLang}
                  labeltopass={lang ? "English Version" : "Version française"}
                  signout={() => auth.signOut()}
                  signoutlabel={lang ? "Déconnecter":"Logout"}
                  signin={() => setOpenSignIn(true)}
                  signinlabel={lang ? "Me Connecter" : "Sign In"}
                  signup={() => setOpen(true)}
                  signuplabel={lang ? "M'enregistrer" : "Sign Up"}
                />
              </Button>

            </div>

          </div>
        

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
                
                <LazyLoad 
                  key={id}
                  height={100}
                  offset={[-100, 100]}
                  placeholder={<Spinner />}
                  >
                    <div onClick={() => {setViewSinglePost(true); setSinglePostId(id); setViewMine(false); setViewWhichUser(null); backToTop(); }}>
                      <PostThumb 
                          key={id}
                          lang={lang}
                          postId={id}
                          user={user}
                          username={post.username}
                          caption={post.caption}
                          imageUrl={post.imageUrl}
                      />
                    </div>
                  </LazyLoad>


               ))}
              </div>


              ) : (viewwhichuser)  ? ( // If we want to see other people's list of posts
                              
                  <div className="post__thumbs">
                  
                {

                  posts.filter(({id, post}) => post.username === viewwhichuser).map(({id, post}) => (
                    
                    <LazyLoad 
                    key={id}
                    height={100}
                    offset={[-100, 100]}
                    placeholder={<Spinner />}
                    >
                      <div onClick={() => {setViewSinglePost(true); setSinglePostId(id); setViewMine(false); setViewWhichUser(null); backToTop(); }}>
                        <PostThumb 
                            key={id}
                            lang= {lang}
                            postId={id}
                            user={user}
                            username={post.username}
                            caption={post.caption}
                            imageUrl={post.imageUrl}
                        />
                      </div>
                    </LazyLoad> 
                    // added te below div so that if anyone clicks on this it will set a variable to enable view on a single post


                  ))}
                  </div>
                          

            ) : viewsinglepost ? ( 

              // If a single post was selected
        
              posts.filter(({id, post}) => id === singlepostid).map(({id, post}) => (
                <Post 
                    key={id}
                    lang={lang}
                    postId={id}
                    user={user}
                    username={post.username}
                    caption={post.caption}
                    imageUrl={post.imageUrl}
                    imagename={post.imagename}
                    viewwhichuser={setViewWhichUser}
                    viewsinglepost={setViewSinglePost}
                />                             
              ))
                  
            ) : (

              // Else if no posts were selected at all, simply default to display all posts as usual
            
              posts.map(({id, post}) => (

                <LazyLoad 
                  key={id}
                  height={100}
                  offset={[-100, 100]}
                  placeholder={<Spinner />}
                  >
                    <Post 
                        key={id}
                        lang={lang}
                        postId={id}
                        user={user}
                        username={post.username}
                        caption={post.caption}
                        imageUrl={post.imageUrl}
                        imagename={post.imagename}
                        viewwhichuser={setViewWhichUser}
                        viewsinglepost={setViewSinglePost}
                    />  
                  </LazyLoad>

              ))

            )
            }

          </div>
          <div className="app__postsRight no-mobile">
            <InstagramEmbed
              className="floating"
              url="https://instagr.am/p/CAX8psZMEdL_Lkto_rA_8oIhfVE1IJNLUobpkc0/"
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
        {/* below line used to be user?.displayName ? (  - but it was giving issues so i changed it */}
        {user ? (

          <div>
            <Modal  
              open={openImageUpload}
              onClose={() => setOpenImageUpload(false)}
            >
              <ImageUpload 
                lang={lang}
                username={user.displayName} 
                closemodal={setOpenImageUpload} 
                // Passing the 2 below so that I can reset those once upload is done
                viewwhichuser={setViewWhichUser}
                viewsinglepost={setViewSinglePost}

              />
            </Modal>
            

            <div className="footer__icons">
              <div className="footer__left">
                <img onClick={home} className="app__home" src="https://toogreen.ca/instagreen/img/home.svg" alt='home icon to go back up'/>         
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
          <div className="footer__icons">
              <div className="footer__left">
                <img onClick={home} className="app__home" src="https://toogreen.ca/instagreen/img/home.svg" alt='home icon to go back up'/>         
              </div>
              <div className="footer__middle">
                  <Button onClick={() => setOpenSignIn(true)}>
                    {lang ? "CONNEXION":"SIGN IN"} &nbsp;&nbsp;
                  </Button> 
                  <Button onClick={() => setOpen(true)}>
                    {lang ? "INSCRIPTION":"SIGN UP"}
                  </Button>
                  
              </div>
              <div className="footer__right">
                  &nbsp;
              </div>                       
          </div>
          
        )}  
      </footer>
    </div>
  );
}

export default App;
