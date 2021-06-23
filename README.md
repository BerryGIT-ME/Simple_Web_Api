# HackerBay_SimpleAPI

This is a simple web API built that exposes three endpionts

#### Login endpiont (/api/login)
This is a publicly accessible endpoint for user authorization. 
Request body should contain req.body.username = 'some arbitrary username', req.body.password='some arbitrary password'.
only valid strings are accepted, if either the username or password is empty or undefined the request is denied.
it returns a signed Json Web Token(JWT, https://jwt.io/) which is used to validate future requests.


#### Patch endpiont (/api/patch)
This is a protected endpoint. To access it, the req.headers.authorization must be set to the returned signed web token.
If the token is not sent along with the request, the request is denied.
The json data and patch must be sent in the req.body as req.body.data = 'json object to patch', req.body.patch='an array of patches'.
if the req.body.data is ommitted, the api responds with a message to include it


#### Thumbnail endpiont (/api/thumbnail)
This is a protected endpoint. To access it, the req.headers.authorization must be set to the returned signed web token.
If the token is not sent along with the request, the request is denied. It accepts the url of an image and resize the image.
The image url is set in the req.body.url. Only valid url's are accepted, for any invalid url, the request will be denied or aborted


### NPM Packages used
#### express
Used to create the server
#### jsonwebtoken
Used to sign in and authorize users
#### winston
Used for logging
#### swagger-jsDoc swagger-ui-express
Used for documentation see localhost:{port}/api-docs
#### mocha chai chai-http
Used for testing
#### jsonpatch
Used for performing the json patch operations
#### joi
Used for input field validatins
#### image-thumbnail
Used for resizing images

For more information about these packages please visit https://www.npmjs.com/
