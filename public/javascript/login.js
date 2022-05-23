async function loginFormHandler(e) {
    e.preventDefault();

    const url = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    console.log(url);

    // if username and password has value, fetch signup api route
    if (username && password) {
        let response;
        if (url === 'signup') {
            response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            });
        } else if (url === 'login') {
            response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        if (response.ok) {
            window.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);