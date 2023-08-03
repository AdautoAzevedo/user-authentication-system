const registerBtn = document.querySelector('#register__btn');
let userNameField = document.querySelector('#uname');
let passwordField = document.querySelector('#psword');

const user = {
    userName: '',
    password: ''
};

const baseURL = "http://localhost:3500/api";

const getDataFromForm = () =>{
    user.userName = userNameField.value;
    user.password = passwordField.value;    
};

registerBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    getDataFromForm();
    console.log(user)
    registerUser();
});


const registerUser = async () =>{
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