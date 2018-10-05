const options = {
    timeout: 10000, // timeout of 10s (5s is the default)
   
    // see https://github.com/cujojs/rest/blob/master/docs/interceptors.md#module-rest/interceptor/retry
    retry: {
      initial: 100,
      multiplier: 2,
      max: 15e3
    }
  }

const bgg = require('bgg')(options);
 
bgg('thing', {type: 'boardgame', id: '110327'})
  .then(function(results){
    console.log(results);
  });