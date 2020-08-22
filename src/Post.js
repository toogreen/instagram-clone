import React from 'react'
import "./Post.css"
import Avatar from "@material-ui/core/Avatar"

function Post({username, caption, imageUrl}) {
    
    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    className="post__avatar"
                    alt={username}
                    src="/static/images/avatar/1.jpg"
                />
                <div className="post__username">
                    <h3>{username}</h3>
                </div>
            </div>
 
            {/* Header -> avatar + username  */}

            
            { 
            // Check if the image is a video instead of an image, and if so, use the VIDEO tag instead
            (imageUrl.includes(".mp4")) || (imageUrl.includes(".MP4")) || (imageUrl.includes(".mov")) || (imageUrl.includes(".MOV")) 
            ? 
                (
                <video width="100%" max-width="500" controls="true" autoplay="true" loop="true" muted="true" playsinline="true">
                    <source src={imageUrl} type='video/mp4'></source>
                    Your browser does not support the video tag.
                </video>
                )
                : 
                (
                // If it is NOT a video, load it as an image:
                <img className="post__image" src={imageUrl} alt="" />
                )
            }
            
            <h4 className="post__text"><strong>{username}: </strong>{caption}</h4>

        </div>
    )
}

export default Post
