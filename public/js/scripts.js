const sendBtn = document.querySelector('#send__btn');
const getBtn = document.querySelector('#get__btn');
const findBtn = document.querySelector('#find__btn');
let userNameField = document.querySelector('#uname');
let passwordField = document.querySelector('#psword');

const user = {
    userName: '',
    password: ''
};

const baseURL = "http://localhost:3500/api";
const authURL = "http://localhost:3500/auth";

const getDataFromForm = () =>{
    user.userName = userNameField.value;
    user.password = passwordField.value;    
};

sendBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    getDataFromForm();
    console.log(user)
    sendUser();
});

const sendUser = async () =>{
    try {
        const response = await fetch(baseURL,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            }, 
            body:JSON.stringify(user)
        });
        if(!response.ok){
            const message = response.status;
            throw new Error(message);
        }
        console.log("Enviado + ", user);
    } catch (error) {
        console.log(error);
    };
};

getBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    getDataFromServer();
});

findBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    getDataFromForm();
    findDataFromServer();
});

const getDataFromServer = async () =>{
    try {
        const response = await fetch(baseURL, {
            method:"GET"
        });
        if(!response.ok){
            const message = response.status;
            throw new Error(message);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    };
};

const findDataFromServer = async ()  =>{
    try {
        const response = await fetch(authURL,{
            method: "POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(user)
        });
        if(!response.ok){
            const message = response.status;
            throw new Error(message);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};