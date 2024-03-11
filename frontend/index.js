document.addEventListener('DOMContentLoaded', function() {
    // Écouteur d'événement pour soumettre le formulaire de création de tweet
    document.getElementById('tweetForm').addEventListener('submit', createTweet);
});

function createTweet(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    const username = document.getElementById('username').value;
    const subject = document.getElementById('subject').value;
    const content = document.getElementById('content').value;

    fetch('http://localhost:5000/tweets', { // Modifier l'URL ici
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
        // Effacer le formulaire après la création du tweet
        document.getElementById('tweetForm').reset();
    })
    .catch(error => console.error('Erreur lors de la création du tweet:', error));
}

// Fonction pour récupérer les tweets par utilisateur
function getTweetsByUsername() {
    const username = document.getElementById('userForTweets').value;
    fetch(`http://localhost:5000/tweets/${username}`) // Modifier l'URL ici
        .then(response => response.json())
        .then(data => {
            console.log(`Tweets de ${username}:`, data);
            // Afficher les tweets par utilisateur dans la section correspondante
            document.getElementById('userTweets').innerHTML = JSON.stringify(data);
        })
        .catch(error => console.error(`Erreur lors de la récupération des tweets de ${username}:`, error));
}

// Fonction pour récupérer les tweets par sujet
function getTweetsBySubject() {
    const subject = document.getElementById('subjectForTweets').value;
    fetch(`http://localhost:5000/subjects/${subject}`) // Modifier l'URL ici
        .then(response => response.json())
        .then(data => {
            console.log(`Tweets sur ${subject}:`, data);
            // Afficher les tweets par sujet dans la section correspondante
            document.getElementById('subjectTweets').innerHTML = JSON.stringify(data);
        })
        .catch(error => console.error(`Erreur lors de la récupération des tweets sur ${subject}:`, error));
}

// Fonction pour retweeter un tweet
function retweet() {
    const tweetContent = document.getElementById('tweetContent').value; // Récupérer le contenu du tweet
    fetch('http://localhost:5000/retweet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: tweetContent }) // Envoyer le contenu du tweet
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message retweet:', data.message);
    })
    .catch(error => console.error('Erreur lors du retweet:', error));
}


// Fonction pour récupérer tous les noms d'utilisateur
// Fonction pour récupérer tous les noms d'utilisateur
function getAllUsernames() {
    fetch('http://localhost:5000/usernames')
        .then(response => response.json())
        .then(data => {
            console.log('Tous les noms d\'utilisateur:', data);
            displayUsernames(data); // Appel de la fonction pour afficher les noms d'utilisateur sur la page web
        })
        .catch(error => console.error('Erreur lors de la récupération des noms d\'utilisateur:', error));
}

// Fonction pour récupérer tous les sujets
function getAllSubjects() {
    fetch('http://localhost:5000/allsubjects')
        .then(response => response.json())
        .then(data => {
            console.log('Tous les sujets:', data);
            displaySubjects(data); // Appel de la fonction pour afficher les sujets sur la page web
        })
        .catch(error => console.error('Erreur lors de la récupération des sujets:', error));
}

// Appel des fonctions pour récupérer et afficher les noms d'utilisateur et les sujets

// Fonction pour afficher tous les noms d'utilisateur sur la page web
function displayUsernames(usernames) {
    const usernamesContainer = document.getElementById('usernames'); 
    usernamesContainer.innerHTML = ''; // Effacer le contenu précédent

    const userList = document.createElement('ul'); 
    usernames.forEach(username => {
        const usernameItem = document.createElement('li'); // Créer un élément de liste pour chaque nom d'utilisateur
        usernameItem.textContent = username;
        userList.appendChild(usernameItem);
    });

    usernamesContainer.appendChild(userList); 
}

// Fonction pour afficher tous les sujets sur la page web
function displaySubjects(subjects) {
    const subjectsContainer = document.getElementById('subjects'); 
    subjectsContainer.innerHTML = ''; // Effacer le contenu précédent

    const subjectList = document.createElement('ul'); 
    subjects.forEach(subject => {
        const subjectItem = document.createElement('li'); // Créer un élément de liste pour chaque sujet
        subjectItem.textContent = subject;
        subjectList.appendChild(subjectItem); 
    });

    subjectsContainer.appendChild(subjectList); 
}
