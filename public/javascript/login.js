async function loginFormHandler(e) {
    e.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const url = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    let response;

    if (username && password) {
        if (url === 'signup') {
            response = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            });
        } else if (url === 'login') {
            response = await fetch('/api/login', {
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
