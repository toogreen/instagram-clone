import React from 'react'
import './App.css';
import Post from "./Post"

function App() {
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



    <Post />
      {/* { Posts } */}

    </div>
  );
}

export default App;
