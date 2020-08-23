import React, { useEffect, useState } from 'react'
import "./Post.css"
import Avatar from "@material-ui/core/Avatar"
import { db } from './firebase';
import firebase from 'firebase';

function Post({postId, username, user, caption, imageUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState([]);

    // What follows is for comments under a post
    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                })
        }

        return () => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
            
    }
     
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

            <div className="post__comments">
                {comments.map((comment) => (
                    <p className="post__comment"><strong>{comment.username}: </strong> {comment.text} </p>
                ))}
            </div>


                {user && ( // Only display this comment form input if the user has logged in
                    <form className="post__commentBox">
                        <input 
                            className="post__input"
                            type="text"
                            placeholder="Add a comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <button
                            className="post__button"
                            disable={!comment}
                            type="submit"
                            onClick={postComment}
                        >
                            Post
                        </button>
                    </form>
                )}
        </div>
    )
}

export default Post
