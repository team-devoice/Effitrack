const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userName = /^[a-zA-Z0-9_-]{3,16}$/;

const validateEmail = (email) => {
  return emailRegex.test(email);
};

const validateUserName = (username) =>{
    return userName.test(username);
}


export {validateEmail, validateUserName};