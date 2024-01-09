import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
import { loadAllCategoris } from "../services/user-service";
import JoditEditor from "jodit-react";
import { createPost as doCreatePost } from "../services/post-service";
import { getCurrentUserDetails } from "../auth/authtoken";
import { toast } from "react-toastify";
import { uploadPostImage } from "../services/post-service";
const AddPost = () => {

    const [categories, setCategories] = useState([])

    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: ''
    });



    const [user, setUser] = useState(undefined)

    const [image, setImage] = useState(null)



    useEffect(
        () => {
            setUser(getCurrentUserDetails())
            loadAllCategoris().then((data) => {
                setCategories(data)

            }).catch((error) => {
                console.log(error)
            })
        }, []
    )


    
    const resetForm = () => {
        // Reset the form fields to their initial state
        setPost({
          ...post,
          title: '',
          content: '',
          categoryId: 0, // Set it to the default category or any initial value
        });
    };
    

    const editor = useRef(null);
    const [content, setContent] = useState('');
    const feildChanaged = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value })
    }

    const ContentChanaged = (data) => {
        setPost({ ...post, 'content': data })
    }



    //create post function

    const createPost = (event) => {

        event.preventDefault();


        if (post.title.trim() === '') {
            toast.error("Post title required")
            return;
        }


        if (post.content.trim() === '') {
            toast.error("Post content required")
            return;
        }

        if (post.categoryId.trim() === '') {
            toast.error("Select category")
            return;
        }

        post['userId'] = user.id;

        //submit post data on server
        doCreatePost(post).then(data => {




            uploadPostImage(image,data.postId).then(data=>{
               // toast.success("Image Uploaded !!")
            }).catch(error=>{
                //toast.error("Error in uploading image")
                console.log(error)
            })



           toast.success("post created")
            console.log(post)


    

            setPost({
                title: '',
                content: '',
                categoryId: ''
            });
        }).catch((error) => {
            console.log(error)
            toast.error("Something went wrong on server...!")
        })

    }


    //handling file chagne event
    const handleFileChange = (event) => {
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }


    return (
        <div className="wrapper">

            <Card className="shadow-sm border-0 mt-2">
                <CardBody>
                    <h3>What going in your mind ?</h3>
                    {/* {JSON.stringify(post)} */}

                    <Form onSubmit={createPost}>

                        <div className="my3">
                            <Label for="tittle" >Post tittle</Label>
                            <Input type="text" id="title" name="title" placeholder="Enter here" className="rounded-0" onChange={feildChanaged} />
                        </div>

                        <div className="my3">
                            <Label for="content" >Post content</Label>
                            <JoditEditor ref={editor} value={post.content}
                                onChange={(newContent) => ContentChanaged(newContent)}


                            />

                            {/* <Input type="textarea" id="content" placeholder="Enter here" className="rounded-0" style={{ height: '300px' }} /> */}
                        </div>

                        {/* file field  */}

                        <div className="mt-3">
                            <Label for="image">Select Post banner</Label>
                            <Input id="image" type="file" accept="image/png, image/jpg" onChange={handleFileChange} />
                        </div>

                        <div className="my3">
                            <Label for="category" >Post category</Label>
                            <Input type="select" id="categoryId" placeholder="Enter here" className="rounded-0"
                                name="categoryId" onChange={feildChanaged} defaultValue={0}>


                                <option defaultValue={0}>--Select category--</option>
                                {categories.map((category) => (
                                    <option value={category.categoryId} key={category.categoryId}>
                                        {category.categoryTitle
                                        }</option>
                                ))}

                            </Input>
                        </div>
                        <Container className="text-center mt-2">
                            <Button className="rounded-0" color="primary">
                                Create Post
                            </Button>
                            <Button
          className="rounded-0 ms-2"
          color="danger"
          onClick={resetForm} // Call resetForm when the button is clicked
        >
          Reset Content
        </Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}
export default AddPost;