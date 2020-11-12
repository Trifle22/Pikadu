let menuToggle = document.querySelector('#menu-toggle');

let menu = document.querySelector('.sidebar');

const regExpEmail = /^\w+@\w+\.\w{2,}$/;


const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignUp = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');
const exitElem = document.querySelector('.exit');
const editELem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');

const editUsername = document.querySelector('.edit-username');
const editPhotoURL= document.querySelector('.edit-photo');
userAvatarElem = document.querySelector('.user-avatar');

const postsWrapper = document.querySelector('.posts');


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
  logIn(email, password, handler) {
    if (!regExpEmail.test(email)) return alert('Введите корректный e-mail')
    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('такого пользователя не существует');
    }
  },
  logOut(handler) {
    this.user = null;
    handler();
  },
  signUp(email, password, handler) {
    if (!regExpEmail.test(email)) return alert('Введите корректный e-mail');
    if (!email.trim() || !password.trim()) {
      alert('Введите данные');
      return;
    } else {

    }

    if (!this.getUser(email)) {
      const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};
      listUsers.push(user)
      this.authorizedUser(user);
      handler();
    } else {
      alert('такой пользователь существует')
    }
  },

  editUser(userName, userPhoto, handler) {
    if (userName) {
      this.user.displayName = userName;
    }
    if (userPhoto) {
      this.user.photo  = userPhoto;
    }

    handler();
  },

  getUser(email) {
    return listUsers.find(item => item.email === email);
  },
  authorizedUser(user) {
    this.user = user;
  }
};

const setPosts = {
  allPosts: [
    {
      title: 'Заголовок поста',
      text: 'у меня скоро голова лопнет',
      tags: ['свежее','новое','горячее','мое','случайность'],
      author: 'alex@mail.com',
      date: '11.11.2020, 19:54:00',
      like: 15,
      comments: 20,
    },
    {
      title: 'Заголовок поста2',
      text: 'изучение джава скрипт',
      tags: ['свежее','новое','мое','случайность'],
      author: 'alexKhrom@mail.com',
      date: '10.11.2020, 21:54:00',
      like: 45,
      comments: 12,
    },
    {
      title: 'Заголовок поста3',
      text: 'программирование это классно',
      tags: ['свежее','новое','мое','случайность'],
      author: 'alexKhrom@mail.com',
      date: '10.11.2020, 22:54:00',
      like: 45,
      comments: 12,
    },
  ],
};

const toggleAuthDom = () => {
  const user = setUsers.user;
  
  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
}


const showAllPosts = () => {
  let postsHTML = '';

  setPosts.allPosts.forEach(post => {
    postsHTML += `
    <section class="post">
    <div class="post-body">
      <h2 class="post-title">
        ${post.title}
      </h2>
      <p class="post-text">
        ${post.text}
      </p>
      <div class="tags">
        <span class="tag">#свежее</span>
      </div>
    </div>
    <div class="post-footer">
      <div class="post-buttons">
        <button class="likes post-button">
          <svg width="19" height="20" class="icon icon-like">
            <use xlink:href="img/icons.svg#like"></use>
          </svg>
          <span class="likes-counter">
            ${post.like}
          </span>
        </button>
        <button class="comments post-button">
          <svg width="21" height="21" class="icon icon-comment">
            <use xlink:href="img/icons.svg#comment"></use>
          </svg>
          <span class="comments-counter">
            ${post.comments}
          </span>
        </button>
        <button class="save post-button">
          <svg width="19" height="19" class="icon icon-save">
            <use xlink:href="img/icons.svg#save"></use>
          </svg>
        </button>
        <button class="share post-button">
          <svg width="17" height="19" class="icon icon-share">
            <use xlink:href="img/icons.svg#share"></use>
          </svg>
        </button>
      </div>
      <div class="post-author">
        <div class="author-about">
          <a href="" class="author-username">Alexander Khromchenkov</a>
          <span class="post-time">${post.date}</span>
        </div>
        <a src="" alt="" class="author-link">
          <img src="img/avatar.jpg" alt="avatar" class="author-avatar">
        </a>
      </div>
    </div>
  </section>
    `;
  });


  postsWrapper.innerHTML = postsHTML;
}

const init = () => {
  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
  
    setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });
  
  loginSignUp.addEventListener('click', event => {
    event.preventDefault();
  
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
  
    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });
  
  exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
  });
  
  editELem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  });
  
  
  editContainer.addEventListener('submit', event => {
    event.preventDefault();
    setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
    editContainer.classList.remove('visible');
  });
  
  menuToggle.addEventListener('click', function (event) {
    event.preventDefault();
    menu.classList.toggle('visible');
  });


  showAllPosts();
  toggleAuthDom();
}

document.addEventListener('DOMContentLoaded', init);

