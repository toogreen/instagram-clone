import React, { useEffect, useState } from 'react'
import "./Post.css"
import Avatar from "@material-ui/core/Avatar"
import { storage, db, auth } from './firebase';
import firebase from 'firebase';


function Post({postId, username, user, caption, imageUrl, imagename, viewwhichuser}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState([]);
    const [commentId, setCommentId] = useState([]);


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

    

    function deletePost(postId) {
        // event.preventDefault();
        
        db.collection("posts").doc(postId).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.log("Error removing document: ", error);            
        });
        // Get a reference to the storage service, which is used to create references in your storage bucket
        var storage = firebase.storage();

        // Create a storage reference from our storage service
        var storageRef = storage.ref();

        // Create a reference to the file to delete
        var desertRef = storageRef.child('images/'+imagename);

        // Delete the file
        desertRef.delete().then(function() {
        // File deleted successfully
    
        }).catch(function(error) {
        // Uh-oh, an error occurred!

        });
    
    }


    function deleteComment(commentId) {
        // event.preventDefault();
        
        

        alert(commentId);
        
/*         db.collection("posts").doc(postId).collection("comments").doc(commentId).delete().then(function() {
            alert("Document successfully deleted!");
        }).catch(function(error) {
            alert("Error removing document: ", error);            
        }); */
    }

    function backtotop(){
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    // Function to view others' posts
    function viewtheirstuff(userselected) { 
        viewwhichuser(userselected);
        backtotop();
    }
     
    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    className="post__avatar"
                    alt={username}
                    src="/static/images/avatar/1.jpg"
                    onClick={viewtheirstuff.bind(this, username) }
                />
                <div className="post__username" onClick={viewtheirstuff.bind(this, username)}>
                    <h3>{username} </h3>
                </div>
                {
                    user && username === auth.currentUser.displayName
                    &&
                    <h5 className="delete__Post" onClick={deletePost.bind(this, postId)}>DELETE this post</h5>
                }
                
            </div>

            <div className="post__imgcontainer">

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

            </div>            

            <h4 className="post__text"><strong onClick={viewtheirstuff.bind(this, username)}>{username}: </strong>{caption}</h4>

            
            <div className="post__comments">
                {comments.map((comment) => (
                    <p className="post__comment">
                        <strong onClick={viewtheirstuff.bind(this, comment.username)}>
                            {comment.username}: 
                        </strong> {comment.text} 
                        {
                            user && comment.username === auth.currentUser.displayName 
                            &&
                            // commentId = Object.assign({ uid: doc.id }, doc.data())
                            <h5 className="delete__CommentButton" onClick={deleteComment.bind(this, JSON.stringify(comment))}>
                                DELETE
                            </h5>
                        }
                    </p>
                    
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
