async function addPost(e) {
    e.preventDefault();

    const title = document.querySelector('#new-title').value.trim();
    const contents = document.querySelector('#new-content').value.trim();
    const user_id = this.getAttribute('data-user');

    console.log(title, contents, user_id);
    let response;
    if (title && contents) {
        response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                contents,
                user_id
            }),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (response.ok) {
        window.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.add-post-form').addEventListener('submit', addPost);
