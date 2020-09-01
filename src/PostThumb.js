import React from 'react'
import "./Post.css"

function PostThumb({postId, imageUrl}) {
 

    return (
            
            <div className="post__thumbcontainer">
 
            { 
            // Check if the image is a video instead of an image, and if so, use the VIDEO tag instead
            (imageUrl.includes(".mp4")) || (imageUrl.includes(".MP4")) || (imageUrl.includes(".mov")) || (imageUrl.includes(".MOV")) 
            ? 
                (
                <div className="post__thumb">
                    <video width="100%" preload="metadata" src={imageUrl+"#t=0.1"}>
                        <source src={imageUrl} type='video/mp4'></source>
                        Your browser does not support the video tag.
                    </video>
                </div>
                )
                : 
                (
                // If it is NOT a video, load it as an image:
                <div className="post__thumb">
                    <img className="post__image" src={imageUrl} alt="" />
                </div>
                )
            }

        </div>
    )
}

export default PostThumb
