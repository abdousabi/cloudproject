frontend (HTML/CSS/JavaScript)
Le frontend est structuré en HTML avec des styles CSS pour la mise en page et l'apparence. Le fichier HTML définit plusieurs sections pour différentes interactions utilisateur, comme la création de tweets, l'affichage des tweets par utilisateur ou sujet, le retweeting, et l'affichage de listes d'utilisateurs et de sujets. Chaque section contient des formulaires et des boutons qui, une fois actionnés, déclenchent des appels JavaScript spécifiques à des endpoints API.

Les styles CSS sont utilisés pour améliorer visuellement l'expérience utilisateur, avec des règles définissant l'apparence des boutons, des zones de texte, etc., rendant l'interface intuitive et facile à utiliser.

Le JavaScript associé ajoute une interactivité dynamique au frontend. Les écouteurs d'événements sont attachés aux formulaires et boutons pour intercepter les actions de l'utilisateur, comme la soumission d'un formulaire de tweet ou le clic sur un bouton pour récupérer des tweets. À l'aide de l'API Fetch, le JavaScript effectue des requêtes HTTP asynchrones (AJAX) vers l'API Flask backend, envoyant des données (pour les requêtes POST) ou récupérant des informations (pour les requêtes GET). Les réponses reçues de l'API sont ensuite traitées et utilisées pour mettre à jour dynamiquement le contenu de la page sans rechargement, par exemple, en affichant les tweets récupérés ou en listant les noms d'utilisateurs.

Backend (Flask/Redis)
Le backend est construit avec Flask, un framework web léger en Python. Flask est configuré pour interagir avec une base de données Redis, utilisée pour stocker et récupérer des données de tweets. Les endpoints API sont définis pour différentes actions telles que la création de tweets, la récupération de tweets par utilisateur ou sujet, le retweet, ainsi que pour lister les utilisateurs et les sujets.

Lorsqu'un tweet est créé via une requête POST au backend, Flask récupère les données du corps de la requête, les traite (par exemple, en les formatant ou en les validant), et les stocke dans Redis. Pour le stockage, Flask utilise les commandes Redis appropriées pour ajouter des données à la base de données, où chaque tweet peut être stocké comme une chaîne JSON dans une liste Redis.

Pour les requêtes GET, Flask interroge Redis pour récupérer les données nécessaires, les filtre ou les trie selon les besoins de la requête, puis renvoie les résultats au client sous forme de JSON. Par exemple, pour récupérer les tweets d'un utilisateur spécifique, Flask parcourt la liste des tweets stockés, filtre ceux correspondant au nom d'utilisateur demandé, et les renvoie au client.

Intégration et Flux de Données
Création de Tweets : L'utilisateur remplit le formulaire et soumet un nouveau tweet. JavaScript capture cet événement, extrait les données du formulaire, et les envoie au backend via une requête POST. Flask reçoit ces données, les enregistre dans Redis, et renvoie une réponse de succès.

Récupération et Affichage de Tweets : L'utilisateur demande à voir des tweets par utilisateur ou sujet, ou bien tous les tweets. JavaScript envoie une requête GET appropriée au backend. Flask interroge Redis, filtre les résultats si nécessaire, et renvoie les données. JavaScript utilise ces données pour mettre à jour le contenu de la page web.
