<!-- Answers to the Short Answer Essay Questions go here -->

1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.

In the context of authorization, middleware is code that is executed on the (req,res) homies before the code moves on to be received by another function via next().

Sessions are used by a server to uniquely identify clients accessing the server data so that the server remembers who the client is based on the session data. The server creates the session, sends a cookie to the client, and the client saves the cookie. The server then uses the given cookie to identify the associated session. 

bcrypt is a library package used to hash passwords. bcrypt salts the password as part of the hashing process, protecting the server from rainbow table attacks. 

2.  What does bcrypt do in order to prevent attacks?

bcrypts salts the password and adds a cost factor that makes it so that a specific amount of time passes in between the rounds of hashing done on a password. 

3.  What are the three parts of the JSON Web Token?

The header, the payload, and the signature. 

The header is an object with the name of the algorithm used to generate the token and the type of token that is being generated. 

The payload contains statements about an entity (usually information about the user) and additional data. 

The signature is generated by first encoding/hashing the header, the payload, and a secret, and then passing these encoded items to the algorithm specified in the header. The secret key is a string that only the server knows. 

In the end, the signature comprises the encrypted header, payload, and secret as a string as follows:
    "encryptedHeader.encryptedPayload.encryptedSecret".
