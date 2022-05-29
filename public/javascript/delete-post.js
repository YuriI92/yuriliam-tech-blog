async function deletePost(e) {
    e.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        window.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#delete-post').addEventListener('click', deletePost);
