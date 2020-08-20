import React from 'react'
import "./Post.css"
import Avatar from "@material-ui/core/Avatar"

function Post() {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    className="post__avatar"
                    alt="tougrine"
                    src="/static/images/avatar/1.jpg"
                />
                <h3>Username</h3>
            </div>
 
            {/* Header -> avatar + username  */}

            <img className="post__image" src="https://instagram.fymq3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/117135954_293525208416226_8155044869062406049_n.jpg?_nc_ht=instagram.fymq3-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=qKNsLHW8-iwAX-iWmzB&oh=1e36d7f4c12f5c8a060ddb4bf8a363db&oe=5F66A7C5" alt="" />


            <h4 className="post__text"><strong>tougrine: </strong>Username: caption</h4>

        </div>
    )
}

export default Post
