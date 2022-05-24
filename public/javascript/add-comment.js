async function commentFormHandler(e) {
    e.preventDefault();

    const comment = document.querySelector('#comment-text').value.trim();
    const user_id = document.querySelector('#comment-text').getAttribute('data-user');
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ 
            comment,
            user_id,
            post_id
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        window.location.reload();
        return;
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);