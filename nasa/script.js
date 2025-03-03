// Elements
const loginPopup = document.getElementById('login-popup');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const pictureContainer = document.getElementById('picture-container');

let accounts = [];

fetch('accounts.json')
    .then(response => response.json())
    .then(data => {
        accounts = data;
        handleLogin();
    })
    .catch(error => {
        console.error('Error loading accounts:', error);
    });

function handleLogin() {
    const savedCredentials = JSON.parse(localStorage.getItem('loginInfo'));
    console.log('Saved credentials from localStorage:', savedCredentials); //  for debbuging

    if (savedCredentials) {
        const { username, password } = savedCredentials;
        console.log('Attempting auto-login with:', username, password); //  for debbuging

        // Search for the username in the accounts array and check if the password matches
        const userAccount = accounts.find(account => account.username === username);

        if (userAccount && userAccount.password === password) {
            console.log('Auto-login successful for:', username); //  for debbuging
            loginPopup.style.display = 'none';
            fetchNasaImages();
        } else {
            console.log('Invalid saved credentials:', username, password); //  for debbuging
            loginPopup.style.display = 'block';
        }
    } else {
        console.log('No saved credentials, showing login form'); //  for debbuging
        loginPopup.style.display = 'block';
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        console.log('Form submitted with:', username, password); // for debbuging

        const userAccount = accounts.find(account => account.username === username);

        if (userAccount && userAccount.password === password) {
            console.log('Login successful for:', username); //  for debbuging

            loginPopup.style.display = 'none';

            localStorage.setItem('loginInfo', JSON.stringify({ username, password }));

            fetchNasaImages();
        } else {
            console.log('Invalid login attempt:', username, password);
            alert('Invalid username or password');
        }
    });
}

function fetchNasaImages() {
    const apiKey = 'ygyu9iRYOesr0U1AU7jbS39CwFfztMP2DNiN1bfr';
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=100`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayImages(data);
        })
        .catch(error => {
            console.error('Error fetching NASA images:', error);
        });
}

function displayImages(images) {
    pictureContainer.innerHTML = `
      <button id="logout-btn" class="logout">Logout</button><bR>
    <h1 style="display:block;width:100%">Behold the wonders of space</h1>`;

    images.forEach(image => {
        const imgElement = document.createElement('img');

        imgElement.dataset.src = image.url;
        imgElement.alt = image.title;
        imgElement.classList.add('nasa-image');
        imgElement.setAttribute('loading', 'lazy');
        pictureContainer.appendChild(imgElement);
    });
    const logOutBTN = document.getElementById('logout-btn');
    logOutBTN.addEventListener('click', () => {
        localStorage.removeItem('loginInfo');
        location.reload();
    });

    lazyLoadImages();
}

function lazyLoadImages() {
    const images = document.querySelectorAll('.nasa-image');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '0px 0px 100px 0px',
    });

    images.forEach(img => {
        observer.observe(img);
    });
}
