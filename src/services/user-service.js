import { myAxios } from "./Helper";

export const singhUp = (user) => {
    return myAxios.post("/auth/register", user).then((response =>
        response.data
    ))
};


export const loginUser = (loginDetail) => {
    return myAxios.post("/auth/login", loginDetail).then((response =>
        response.data
    ))
};



export const loadAllCategoris = () => {
    return myAxios.get("/categories/").then(response => {
        return response.data
    })
}

export const getUser = (userId) => {
    return myAxios.get("/users/"+userId).then((resp) => resp.data);
  };