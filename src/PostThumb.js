import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import "./Post.css"

function PostThumb({postId, imageUrl}) {
 

    return (
            
            <div>
 
            { 
            // Check if the image is a video instead of an image, and if so, use the VIDEO tag instead
            (imageUrl.includes(".mp4")) || (imageUrl.includes(".MP4")) || (imageUrl.includes(".mov")) || (imageUrl.includes(".MOV")) 
            ? 
                (
                <div className="post__thumb">
                    <video width="100%" controls="true" autoplay="true" loop="true" muted="true" playsinline="true">
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
