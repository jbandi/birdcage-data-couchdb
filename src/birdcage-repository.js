// import 'babel-polyfill';

export default class BirdcageRepository {
    getTweets() {
        return fetch('http://localhost:5984/birdcage/_design/tweets/_view/all', {headers: {'Cache-Control': 'no-cache'}})
            .then(r => r.json())
            .then(v => v.rows.map(r => r.value))
            .catch(e => console.log(e))
    }
}
