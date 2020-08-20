import React, {useState, useEffect} from 'react'
import './App.css';
import Post from "./Post"

function App() {

  const [posts, setPosts] = useState([
    {
      username:"tougrine",
      caption:"WOW it works", 
      imageUrl:"https://instagram.fymq3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/117135954_293525208416226_8155044869062406049_n.jpg?_nc_ht=instagram.fymq3-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=qKNsLHW8-iwAX-iWmzB&oh=1e36d7f4c12f5c8a060ddb4bf8a363db&oe=5F66A7C5" 
    },
    {
      username:"motherfucker",
      caption:"Dope",
      imageUrl:"https://instagram.fymq3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/116819197_151944139868249_7771130104551618004_n.jpg?_nc_ht=instagram.fymq3-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=8jMJskOhYh4AX-nuLg3&oh=c5bd470cad60044727d847b76d799194&oe=5F6600B0"
    },
    {
      username:"asshole",
      caption:"This sucks",
      imageUrl:"https://instagram.fymq3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/116363761_318349305972935_1616265591268789554_n.jpg?_nc_ht=instagram.fymq3-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=F5tPOgB7Lx0AX_0h_o6&oh=b4237b7a82eff7a473790fa67a3805b0&oe=5F68FCA4" 
    }
  ]);

  return (
    <div className="app">

      <header className="app__header">
        <img 
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </header>

      <h1>hello</h1>

      {
        posts.map(post => (
          <Post 
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
          />
        ))
      }
      
    </div>
  );
}

export default App;
