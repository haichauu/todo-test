import axios from 'axios';

const baseUrl  = 'http://127.0.0.1:3000'

const request  = axios.create({
    baseURL: baseUrl,
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
    }});

export async function signInApi(email: string, password: string) {

    return new Promise((resolve, reject) => {
        request.post(`${baseUrl}/auth/email/login`, {
            email, password
        })
            .then(function (response) {
                resolve(response.data?.data)
            })
            .catch(function (error) {
                reject(error)
            });
    })
}




export async function addNewTodoApi(token: string, name: string) {

    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/task/todo`, {
            name
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(function (response) {
                resolve(response.data?.data)
            })
            .catch(function (error) {
                reject(error)
            });
    })
}

export async function deleteTodoApi(token: string, id: number) {

    return new Promise((resolve, reject) => {
        axios.delete(`${baseUrl}/task/todo/${id}`, {headers: {
                'Authorization': `Bearer ${token}`
            }})
            .then(function (response) {
                resolve(response.data?.data)
            })
            .catch(function (error) {
                reject(error)
            });
    })
}


export async function signUpApi(email: string, password: string) {

    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/auth/email/register`, {
            email, password
        }, {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true
            },
        })
            .then(function (response) {
                resolve(response.data?.data)
            })
            .catch(function (error) {
                reject(error)
            });
    })
}

export async function getTodosApi(token: string) {

    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/task/todo`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(function (response) {
                resolve(response.data?.data)
            })
            .catch(function (error) {
                reject(error)
            });
    })
}
