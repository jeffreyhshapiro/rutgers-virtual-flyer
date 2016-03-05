// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: '1qx0RwFFzsev4FUl6OyZ8Q',
  consumer_secret: 'BEXfjU3AGkVMYfKNil2ON3Rzi1E',
  token: '92Ft81q1waTiOixHnOOAbeG2BNDRwwzz',
  token_secret: 'yrpc4_6PHI4zdx4X9f_C7Nl7_xo',
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: 'food', location: 'New Brunswick, NJ' })
.then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err);
});

// See http://www.yelp.com/developers/documentation/v2/business
// yelp.business('yelp-san-francisco')
//   .then(console.log)
//   .catch(console.error);

// yelp.phoneSearch({ phone: '+15555555555' })
//   .then(console.log)
//   .catch(console.error);

// // A callback based API is also available:
// yelp.business('yelp-san-francisco', function(err, data) {
//   if (err) return console.log(error);
//   console.log(data);
// });