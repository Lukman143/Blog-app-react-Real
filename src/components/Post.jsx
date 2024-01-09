// import React from 'react'
// import { Button, Card, CardBody, CardText } from 'reactstrap'
// import { Link } from 'react-router-dom'

// const Post = ({ post = { postId:0,title: "This is default post title", content: "This default post content" } }) => {
//     return (

//         <Card className='border-0 shadow-sm mt-3'>
//             <CardBody>
//                 <h1>
//                     {post.title}
//                 </h1>
//                 <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,60)}} ></CardText>
//                 <div>

//                     <Link className='btn btn-secondary border-0' to={'/postpage/'+post.postId}>Read More</Link>
//                 </div>
//             </CardBody>
//         </Card>
//     )
// }

// export default Post



import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import userContext from '../context/userContext'
import { getCurrentUserDetails, isLoggedIn } from '../auth/authtoken'



function Post({ post = { id: -1, title: "This is default post title", content: "This is default post content" }, deletePost }) {

    const userContextData = useContext(userContext)
    const [user, setUser] = useState(null)
    const [login, setLogin] = useState(null)
    useEffect(() => {
        setUser(getCurrentUserDetails())
        setLogin(isLoggedIn())
    }, [])
    return (


        <Card className='border-0 shadow-sm mt-3'>
            <CardBody>
                <h3>{post.title}</h3>
                <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0, 70) + "...." }}>
                </CardText>

                <div>
                    <Link className='btn btn-secondary border-0' to={'/postpage/' + post.postId}>Read More</Link>

                    {/* <Link className='btn btn-secondary border-0' to={'/posts/' + post.postId}>Read More</Link> */}
                    {userContextData.user.login && (user && user.id === post.user.id ? <Button onClick={(event) => deletePost(post)} color='danger' className="ms-2">Delete</Button> : '')}
                    {userContextData.user.login && (user && user.id === post.user.id ? <Button tag={Link} to={`/user/update-blog/${post.postId}`} color='warning' className="ms-2">Update</Button> : '')}

                </div>
            </CardBody>
        </Card>

    )
}

export default Post