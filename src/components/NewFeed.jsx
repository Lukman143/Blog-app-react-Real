import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllPost as loadAllPosts } from '../services/post-service'
import { Row, Col, Pagination, PaginationItem, PaginationLink, Container } from 'reactstrap'
import Post from './Post'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component'
import { deletePostService } from '../services/post-service'
function NewFeed() {


    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        lastPage: false,
        pageNumber: ''

    })

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        console.log("loading posts")
        console.log(currentPage)
        changePage(currentPage)

    }, [currentPage])


    const changePage = (pageNumber = 0, pageSize = 5) => {
        if (pageNumber > postContent.pageNumber && postContent.lastPage) {
            return
        }
        if (pageNumber < postContent.pageNumber && postContent.pageNumber == 0) {
            return
        }
        loadAllPosts(pageNumber, pageSize).then(data => {
            setPostContent({
                content: [...postContent.content, ...data.content],
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                pageSize: data.pageSize,
                lastPage: data.lastPage,
                pageNumber: data.pageNumber
            })

            console.log(data);

        }).catch(error => {
            toast.error("Error in loading posts")

        })
    }



    function deletePost(post) {
        //going to delete post
        console.log(post)

        deletePostService(post.postId).then(res => {
            console.log(res)
            toast.success("post is deleled..")

            let newPostContents = postContent.content.filter(p => p.postId != post.postId)
            setPostContent({ ...postContent, content: newPostContents })

        })
            .catch(error => {
                console.log(error)
                toast.error("error in deleting post")
            })
    }


    const changePageInfinite = () => {
        console.log("page chagned")
        setCurrentPage(currentPage + 1)

    }

    return (
        <div className="container-fluid">
            <Row>
                <Col md={
                    {
                        size: 12

                    }
                }>

                    <h1 className='danger'>Blogs Count  ( {postContent?.totalElements} )</h1>
                    <InfiniteScroll
                        dataLength={postContent.content.length}
                        next={changePageInfinite}
                        hasMore={!postContent.lastPage}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {
                            postContent.content.map((post, index) => (
                                <Post deletePost={deletePost} post={post} key={index} />
                            ))
                        }

                    </InfiniteScroll>
                    {/* <Container className='mt-3'>
                        <Pagination size='lg'>
                            <PaginationItem onClick={() => changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber == 0}>
                                <PaginationLink previous>
                                    Previous
                                </PaginationLink>
                            </PaginationItem>

                            {
                                [...Array(postContent.totalPages)].map((item, index) => (


                                    <PaginationItem onClick={() => changePage(index)} active={index == postContent.pageNumber} key={index}>
                                        <PaginationLink>

                                            {index + 1}

                                        </PaginationLink>
                                    </PaginationItem>

                                ))
                            }


                            <PaginationItem onClick={() => changePage(postContent.pageNumber+1)} disabled={postContent.lastPage}>
                                <PaginationLink next>
                                    Next
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>

                    </Container> */}






                </Col>
            </Row>
        </div>


    )
}

export default NewFeed









// import React, { useState } from 'react'
// import { useEffect } from "react";
// import { getAllPost } from '../services/post-service';
// import { Row, Col, Pagination, PaginationItem, PaginationLink, Container } from 'reactstrap';
// import Post from './Post';
// import { toast } from 'react-toastify';

// function NewFeed() {


//     const [postcontent, setPostContent] = useState({
//         content: [],
//         pageNumber: ''
//         ,
//         pageSize: ''
//         ,
//         totalElements: ''
//         ,
//         totalPages: '',
//         lastPage: false

//     })

//     //load all data from server
//     useEffect(() => {

//         changePage(0)

//     }, [])


//     const changePage = (pageNumber = 0, pageSize = 5) => {


//         console.log(pageNumber)
//         console.log(postcontent.pageNumber)



//         if (pageNumber > postcontent.pageNumber & postcontent.lastPage) {

//             return

//         }

//         if (pageNumber < postcontent.pageNumber & postcontent.pageNumber == 0) {

//             return

//         }

//         getAllPost(pageNumber, pageSize).then((data) => {
//             setPostContent(data)
//             console.log(data)
//         }).catch((error) => {
//             toast.error("error in loading post")
//         })

//     }

//     return (
//         <div className='container-fluid'>
//             <Row>
//                 <Col md={
//                     { size: 10, offset: 1 }
//                 }>
//                     <h1> Blogs count {postcontent?.totalElements}</h1>

//                     {
//                         postcontent.content.map((post) => (
//                             <Post post={post} key={post.postId} />
//                         ))}


//                     <Container className='mt-3'>
//                         <Pagination size='lg'>
//                             <PaginationItem onClick={() => changePage(postcontent.pageNumber - 1)} disabled={postcontent.pageNumber == 0}>
//                                 <PaginationLink
//                                     previous
//                                 > Pre</PaginationLink>

//                             </PaginationItem>



//                             {[...Array(postcontent.totalPages)].map((item, index) =>
//                             (<PaginationItem active={index == postcontent.pageNumber} onClick={() => changePage(index)}>
//                                 <PaginationLink >
//                                     {index + 1}
//                                 </PaginationLink>
//                             </PaginationItem>
//                             )
//                             )}



//                             <PaginationItem onClick={() => changePage(postcontent.pageNumber + 1)} disabled={postcontent.lastPage} >
//                                 <PaginationLink
//                                     next
//                                 >Next</PaginationLink>

//                             </PaginationItem>
//                         </Pagination>
//                     </Container>
//                 </Col>
//             </Row>
//         </div >
//     )

// }

// export default NewFeed