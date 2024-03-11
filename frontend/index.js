/* eslint-disable no-unused-vars */
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('tweetForm').addEventListener('submit', createTweet);
});

function createTweet(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const subject = document.getElementById('subject').value;
    const content = document.getElementById('content').value;

    fetch('http://localhost:5000/tweets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tweet: {
                username: username,
                subject: subject,
                content: content
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message:', data.message);
        document.getElementById('tweetForm').reset();
    })
    .catch(error => console.error('Erreur lors de la création du tweet:', error));
}

function getTweetsByUsername() {
    const username = document.getElementById('userForTweets').value;
    fetch(`http://localhost:5000/tweets/${username}`)
        .then(response => response.json())
        .then(data => {
            console.log(`Tweets de ${username}:`, data);
            document.getElementById('userTweets').innerHTML = JSON.stringify(data);
        })
        .catch(error => console.error(`Erreur lors de la récupération des tweets de ${username}:`, error));
}

function getTweetsBySubject() {
    const subject = document.getElementById('subjectForTweets').value;
    fetch(`http://localhost:5000/subjects/${subject}`)
        .then(response => response.json())
        .then(data => {
            console.log(`Tweets sur ${subject}:`, data);
            document.getElementById('subjectTweets').innerHTML = JSON.stringify(data);
        })
        .catch(error => console.error(`Erreur lors de la récupération des tweets sur ${subject}:`, error));
}

function retweet() {
    const tweetContent = document.getElementById('tweetContent').value;
    fetch('http://localhost:5000/retweet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: tweetContent })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message retweet:', data.message);
    })
    .catch(error => console.error('Erreur lors du retweet:', error));
}

function getAllUsernames() {
    fetch('http://localhost:5000/usernames')
        .then(response => response.json())
        .then(data => {
            console.log('Tous les noms d\'utilisateur:', data);
            displayUsernames(data);
        })
        .catch(error => console.error('Erreur lors de la récupération des noms d\'utilisateur:', error));
}

function getAllSubjects() {
    fetch('http://localhost:5000/allsubjects')
        .then(response => response.json())
        .then(data => {
            console.log('Tous les sujets:', data);
            displaySubjects(data);
        })
        .catch(error => console.error('Erreur lors de la récupération des sujets:', error));
}

function displayUsernames(usernames) {
    const usernamesContainer = document.getElementById('usernames');
    usernamesContainer.innerHTML = '';

    const userList = document.createElement('ul');

    usernames.forEach(username => {
        const usernameItem = document.createElement('li');
        usernameItem.textContent = username;
        userList.appendChild(usernameItem);
    });

    usernamesContainer.appendChild(userList);
}

function displaySubjects(subjects) {
    const subjectsContainer = document.getElementById('subjects');
    subjectsContainer.innerHTML = '';

    const subjectList = document.createElement('ul');

    subjects.forEach(subject => {
        const subjectItem = document.createElement('li');
        subjectItem.textContent = subject;
        subjectList.appendChild(subjectItem);
    });

    subjectsContainer.appendChild(subjectList);
}
/* eslint-enable no-unused-vars */
