import 'babel-polyfill';
import 'isomorphic-fetch';
import uuid from 'uuid';


export default class BirdcageRepository {
    getTweets() {
        return fetch('http://127.0.0.1:5984/birdcage/_design/tweets/_view/all')
            .then(r => r.json())
            .then(v => v.rows.map(r => r.value))
            .catch(e => console.log(e))
    }

    async initDb() {
        await fetch('http://127.0.0.1:5984/birdcage', {method: 'DELETE'})
            .then(() => console.log('db deleted'));

        await fetch('http://127.0.0.1:5984/birdcage', {method: 'PUT'})
            .then(() => console.log('db created'));

        const tweetView = {
            "_id": "_design/tweets",
            "language": "javascript",
            "views": {
                "all": {
                    "map": "function(doc) { if (doc.type == 'tweet')  emit(doc.priority, doc) }"
                }
            }
        };
        await fetch(`http://127.0.0.1:5984/birdcage/_design/tweets`, {method: 'PUT', body: JSON.stringify(tweetView)})
            .then(() => console.log('tweet view created'));


        const tweet = {
            type: 'tweet',
            title: 'Use CouchDB',
            priority: Date.now(),
            created: new Date(),
            tweeted: null,
            count: 0,

        };
        await fetch(`http://127.0.0.1:5984/birdcage/${uuid.v4()}`, {method: 'PUT', body: JSON.stringify(tweet)})
            .then(() => console.log('tweet created'));


    }
}
