from flask import Flask, request, jsonify
from redis import Redis
import json
from flask_cors import CORS
from flask_redis import FlaskRedis

app = Flask(__name__)
app.config['REDIS_URL'] = 'redis://localhost:6379/0'  #connexion à Redis
redis = FlaskRedis(app)
CORS(app)  

@app.route('/tweets', methods=['GET'])
def get_tweets():
    tweets = redis.lrange('tweets', 0, -1)
    return jsonify([tweet.decode('utf-8') for tweet in tweets])

@app.route('/tweets', methods=['POST'])
def create_tweet():
    if 'tweet' not in request.json:
        return jsonify({'error': 'Missing tweet in request'}), 400

    tweet = request.json['tweet']
    redis.lpush('tweets', json.dumps(tweet))
    return jsonify({'message': 'Tweet created'}), 201

@app.route('/tweets/<string:username>', methods=['GET'])
def get_tweets_by_username(username):
    tweets = redis.lrange('tweets', 0, -1)  # Récupérer tous les tweets
    user_tweets = [json.loads(tweet.decode('utf-8')) for tweet in tweets if json.loads(tweet.decode('utf-8'))['username'] == username]
    return jsonify(user_tweets)

@app.route('/tweets/', methods=['GET'])
def get_all_tweets():
    # Logique pour récupérer tous les tweets
    tweets = redis.lrange('tweets', 0, -1)
    return jsonify([tweet.decode('utf-8') for tweet in tweets])
@app.route('/usernames', methods=['GET'])
def get_usernames():
    tweets = redis.lrange('tweets', 0, -1)
    usernames = set()
    for tweet in tweets:
        tweet_dict = json.loads(tweet.decode('utf-8'))
        usernames.add(tweet_dict['username'])
    return jsonify(list(usernames))



@app.route('/subjects/<string:subject>', methods=['GET'])
def get_tweets_by_subject(subject):
    tweets = redis.lrange('tweets', 0, -1)
    subject_tweets = [json.loads(tweet.decode('utf-8')) for tweet in tweets if json.loads(tweet.decode('utf-8'))['subject'] == subject]
    return jsonify(subject_tweets)
@app.route('/allsubjects', methods=['GET'])
def get_allsubjects():
    tweets = redis.lrange('tweets', 0, -1)
    subjects = set()
    for tweet in tweets:
        tweet_dict = json.loads(tweet.decode('utf-8'))
        subjects.add(tweet_dict['subject'])
    return jsonify(list(subjects))

@app.route('/retweet', methods=['POST'])
def retweet():
    if 'content' not in request.json:
        return jsonify({'error': 'Missing content in request'}), 400

    tweet_content = request.json['content']
    tweets = redis.lrange('tweets', 0, -1)

    for tweet in tweets:
        tweet = json.loads(tweet)
        if tweet['content'] == tweet_content:
            # Effectuez l'action de retweet ici
            return jsonify({'message': 'Retweet successful'}), 200

    # Si aucun tweet correspondant n'est trouvé, renvoyez une erreur
    return jsonify({'error': 'Tweet not found'}), 404


    
   
if __name__ == '__main__':
    app.run(debug=True)
