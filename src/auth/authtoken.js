//isLoggedIn => it will check user logged in or not

export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    if (data != null)
        return true;
    else return false;
}


//doLogin=> data => data set to local storage{ we have tow storage in browesr local storage and session storage if u store data in local storege token will activated or stored until its exprration not over and
// session storage maens if u closed browser or sesion time over so it will get deleted in session storge}

export const doLogin = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
    //console.log("login details stored to local storage")
    // next()
}

//doLogout remove from local storage
export const doLogout = () => {
    localStorage.removeItem("data");
    // next()
}


// get current user

export const getCurrentUserDetails = () => {
    if (isLoggedIn)
        return JSON.parse(localStorage.getItem("data"))?.user;
    else return false;
}





// get token

export const getToken = () => {
    if (isLoggedIn)
        return JSON.parse(localStorage.getItem("data"))?.token;
    else return null;
}




