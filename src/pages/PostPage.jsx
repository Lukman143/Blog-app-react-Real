import { Link, useParams } from "react-router-dom";
import Base from "../components/Base";
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap";
import { useEffect } from "react";
import { singlePost } from "../services/post-service";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/Helper";
import { isLoggedIn } from "../auth/authtoken";
import { createComment } from "../services/post-service";

const PostPage = () => {
    // here we fetched postId from url parameter  <Link className='btn btn-secondary border-0' to={'/postpage/'+post.postId}>Read More</Link>
    const { postId } = useParams()

    const [post, setPost] = useState(null)


    const [comment, setComment] = useState({
        content: ''
    })

    useEffect(() => {
        singlePost(postId).then((data) => {


            console.log(data)
            setPost(data)
        }).catch((error) => {
            toast.error("error while fetching post from server")
        })

    }, [])


    const submitPost = () => {

        if (!isLoggedIn()) {
            toast.error("Need to login first !!")
            return
        }

        if (comment.content.trim() === '') {
            return
        }
        createComment(comment, post.postId)
            .then(data => {
                console.log(data)
                toast.success("comment added ..")
                setPost({
                    ...post,
                    comments: [...post.comments, data.data]
                })
                setComment({
                    content: ''
                })
            }).catch(error => {
                console.log(error)
            })
    }


    return (
        <Base>
            <Container className="mt-3">

                <Link to="/">Home</Link> / {post && (<Link to="" >  {post.title} </Link>)}
                <Row>
                    <Col md={{
                        size: 12
                    }}></Col>
                    <Card className="mt-3 ps-2 ">
                        {
                            post && (
                                <CardBody>
                                    <CardText>
                                        Posted by <b>{post.user.name}</b> on <b>{new Date(post.addedDate).toDateString()}</b>
                                    </CardText>

                                    <CardText><spam className="text-muted">{post.category.categoryTitle}</spam></CardText>

                                    <div className="divder" style={{
                                        width: '100%',
                                        height: '1px',
                                        background: '#e2e2e2'

                                    }}></div>

                                    <CardText><h3>{post.title}</h3></CardText>

                                    <div className="image-container mt-4 shadow" style={{ maxWidth: '50%' }}>
                                        <img className="img-fluid" src={BASE_URL + '/post/image/' + post.imageName} alt="" />
                                    </div>

                                    <CardText className="mt-3" dangerouslySetInnerHTML={{ __html: post.content }} ></CardText>


                                </CardBody>
                            )
                        }
                    </Card>
                </Row>
                <Row>
                    <Col md={{
                        size: 8,
                        offset: 3
                    }}></Col>
                    <h3>Comments ( {post ? post.comments.length : 0} )</h3>

                    {
                        post && post.comments.map((c, index) => (
                            <Card className="mt-4 border-0" key={index}>
                                <CardBody>
                                    <CardText>
                                        {c.content}
                                    </CardText>
                                </CardBody>
                            </Card>
                        ))
                    }

                    <Card className="mt-4 border-0" >
                        <CardBody>

                            <Input
                                type="textarea"
                                placeholder="Enter comment here"
                                value={comment.content}
                                onChange={(event) => setComment({ content: event.target.value })}
                            />

                            <Button onClick={submitPost} className="mt-2" color="primary">Submit</Button>
                        </CardBody>
                    </Card>


                </Row>


            </Container>
        </Base>
    )

}
export default PostPage;