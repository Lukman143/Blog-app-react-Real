import React from "react";
import Base from "../../components/Base";
import AddPost from "../../components/AddPost";
import { Container } from "reactstrap";
import { useState, useEffect } from "react";
import { deletePostService, loadPostUserWise } from "../../services/post-service";
import { getCurrentUserDetails } from "../../auth/authtoken";
import { toast } from "react-toastify";
import Post from "../../components/Post";



const UserDashboard = () => {

    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    useEffect(() => {
        console.log(getCurrentUserDetails());
        setUser(getCurrentUserDetails())
        loadPostData()

    }, [])

    function loadPostData() {
        loadPostUserWise(getCurrentUserDetails().id).then(data => {
            console.log(data)
            setPosts([...data])
        })
            .catch(error => {
                console.log(error)
                toast.error("error in loading user posts")
            })
    }

    //function to delete post

    function deletePost(post) {
        //going to delete post
        console.log(post)

        deletePostService(post.postId).then(res => {
            console.log(res)
            toast.success("post is deleted..")
            let newPosts = posts.filter(p => p.postId != post.postId)
            setPosts([...newPosts])

        })
            .catch(error => {
                console.log(error)
                toast.error("error in deleting post")
            })
    }


    return (

        <Base>
            <Container>
                <AddPost />

                <h1 className='my-3'>Your Posts Count : ({posts.length})</h1>

                {posts.map((post, index) => {
                    return (
                        <Post post={post} deletePost={deletePost} key={index} />
                    )
                })}
            </Container>
        </Base>

    )
}
export default UserDashboard;