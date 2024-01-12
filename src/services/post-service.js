import { privateAxios, myAxios } from "./Helper";
import axios from 'axios';

export const createPost = (postData) => {
    console.log(postData)
    return privateAxios.post('/user/' + postData.userId + '/category/' + postData.categoryId + '/posts', postData).then((response =>
        response.data
    ))
};



//get all post
export const getAllPost = (pageNumber, pageSize) => {
    return myAxios.get("/posts?pageNumber=" + pageNumber + "&pageSize=" + pageSize + '&sortBy=addedDate&sortDir=desc').then(response =>
        response.data
    )
}

//get single post
export const singlePost = (postId) => {

    return myAxios.get("/posts/" + postId).then(response => response.data)

}


//load single post of given id
export const loadPost = (postId) => {
    return myAxios.get("/posts/" + postId).then((reponse) => reponse.data);
  };


// create comment 
export const createComment = (comment, postId) => {
    return privateAxios.post("/post/" + postId + "/comments", comment);
};

//upload post banner image

export const uploadPostImage = (image, postId) => {
    let formData = new FormData();
    formData.append("image", image);
    return privateAxios
        .post("/post/image/upload/" + postId, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => response.data);
};

//update post banner image

export const updatePostImage = (image, postId) => {
    let formData = new FormData();
    formData.append("image", image);
    return privateAxios
        .put("/update/image/" + postId, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => response.data);
};


//get cateory wise posts
export function loadPostCategoryWise(categoryId) {
    return privateAxios
        .get("/category/" + categoryId + "/posts")
        .then((res) => res.data);
}

export function loadPostUserWise(userId) {
    return privateAxios.get("/user/" + userId + "/posts").then((res) => res.data);
}

//delete post
export function deletePostService(postId) {
    return privateAxios.delete("/posts/" + postId).then((res) => res.data);
}

//update post
export function updatePost(post, postId) {
    console.log(post);
    return privateAxios.put("/posts/" + postId, post).then((resp) => resp.data);
}

// reset password call


export function resetPasswordRequest (email) {
  const apiUrl = 'http://localhost:9191/api/v1/auth/reset-password/request';
  
  // Prepare the payload
  const requestData = {
    email: email
  };

  // Make the API request
  return axios.post(apiUrl, requestData)
    .then(response => {
      // Handle the response here
      console.log("Email data"+response.data);
      return response.data;
    })
    .catch(error => {
      // Handle errors here
      console.error('Error making reset password request:', error);
      throw error; // You might want to handle errors in your component
    });
};


