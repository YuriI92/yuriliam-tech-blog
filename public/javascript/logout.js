async function logout(e) {
    e.preventDefault();

    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        window.location.replace('/');
        return;
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#logout-btn').addEventListener('click', logout);
