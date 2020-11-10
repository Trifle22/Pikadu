let menuToggle = document.querySelector('#menu-toggle');

let menu = document.querySelector('.sidebar');

menuToggle.addEventListener('click', function (event) {
  event.preventDefault();
  menu.classList.toggle('visible');
});


const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignUp = document.querySelector('.login-signup');

const listUsers = [
  {
    id: '01',
    email: 'alex@mail.com',
    password: '12345',
    displayName: 'alex',
  },
  {
    id: '02',
    email: 'alexKhrom@mail.com',
    password: '123456',
    displayName: 'alexKhrom',
  },
];

const setUsers = {
  user: null,
  logIn(email, password) {

  },
  logOut() {
    console.log("logOut");
  },
  signUp(email, password) {
    if (!this.getUser(email)) {
      listUsers.push({email, password, displayName: email})
    } else {
      alert('такой пользователь существует')
    }
  },
  getUser() {
    console.log(123);
  }
};

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  setUsers.logIn(emailValue, passwordValue);
});

loginSignUp.addEventListener('click', event => {
  event.preventDefault();

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  setUsers.signUp(emailValue, passwordValue);
});


