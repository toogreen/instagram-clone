import React from 'react'
import "./Post.css"
import Avatar from "@material-ui/core/Avatar"

function Post({username, caption, imageUrl}) {
    
        //alert(imageUrl.split('.').pop())
        

    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    className="post__avatar"
                    alt={username}
                    src="/static/images/avatar/1.jpg"
                />
                <h3 className="post__username">{username}</h3>
            </div>
 
            {/* Header -> avatar + username  */}


            {(imageUrl.split('.').pop() === '.mp4*') ? (
            <video>
                <source src={imageUrl} type='video/mp4' />
                Your browser does not support the video tag.
            </video>
            ): (
                <img className="post__image" src={imageUrl} alt="" />
            )}
            


            <h4 className="post__text"><strong>{username}: </strong>{caption}</h4>

        </div>
    )
}

export default Post
