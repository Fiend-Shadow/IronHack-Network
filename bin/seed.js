const mongoose = require("mongoose");
const User = require("./../models/users");



const users = [{
    userName: "admin",
    password: "$2b$12$V0arFBMTFXFKx9F5OOLubuzfh0FLck75F24jNh0fIJjQl8VdmRxr6",
    isAdmin: true,
    links: [{url: "github.com", description: "my github"},{url: "gmail.com",description:"my gmail" }],
    image_url: "./images/logo-admin-png-7.png",
    
}]
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () =>{
        
      const pr =  User.create(users);
    
      return pr;
    } ).then((createdUsers)=> {
        console.log(`Created ${createdUsers.length} users`);
        const pr = mongoose.connection.close();
        return pr;
    })
    .then(() => {console.log("Connection closed !")})
    .catch( (err) => console.error('Error connecting to mongo', err));

