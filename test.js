import 'babel-polyfill';
import assert from 'assert';

import {repo} from './lib/index';

describe('Tweet Repository', () => {
   it('should return tweets', done => {
       const tweets = repo.getTweets()
           .then(tweets => {
               assert(tweets.length > 0);
               done();
           })
       ;
   })
});
