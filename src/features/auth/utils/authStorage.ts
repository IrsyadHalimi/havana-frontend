const ACCESS_TOKEN="accessToken";

const REFRESH_TOKEN="refreshToken";

const USER="user";

export const authStorage={

saveSession(
    accessToken:string,
    refreshToken:string,
    user:any
){

    localStorage.setItem(
        ACCESS_TOKEN,
        accessToken
    );

    localStorage.setItem(
        REFRESH_TOKEN,
        refreshToken
    );

    localStorage.setItem(
        USER,
        JSON.stringify(user)
    );

},

clear(){

    localStorage.removeItem(
        ACCESS_TOKEN
    );

    localStorage.removeItem(
        REFRESH_TOKEN
    );

    localStorage.removeItem(
        USER
    );

},

getAccessToken(){

    return localStorage.getItem(
        ACCESS_TOKEN
    );

},

getUser(){

    const user=
        localStorage.getItem(USER);

    return user
        ? JSON.parse(user)
        : null;

}

}