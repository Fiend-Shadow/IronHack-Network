const mongoose = require("mongoose");
const User = require("./../models/users");

const dbName = "IronHack-Network";

const users = [{
    userName: "David",
    password: "David123",
    isAdmin: false,
    links: [{url: "github.com", description: "my github"},{url: "gmail.com",description:"my gmail" }],
    image_url: "https://media.giphy.com/media/QwmiazKyDlBH1sQVPU/giphy.gif"
    
},{
    userName: "Tarek",
    password: "Tarek123",
    isAdmin: false,
    links: [{url: "github.com", description: "my github"},{url: "gmail.com",description:"my gmail" }],
    image_url: "https://media.giphy.com/media/QwmiazKyDlBH1sQVPU/giphy.gif"
    
},{
    userName: "Valentin",
    password: "Valentin123",
    isAdmin: false,
    links: [{url: "github.com", description: "my github"},{url: "gmail.com",description:"my gmail" }],
    image_url: "https://media.giphy.com/media/QwmiazKyDlBH1sQVPU/giphy.gif"
  
},{
    userName: "Val",
    password: "Val123",
    isAdmin: false,
    links: [{url: "github.com", description: "my github"},{url: "gmail.com",description:"my gmail" }],
    image_url: "https://media.giphy.com/media/QwmiazKyDlBH1sQVPU/giphy.gif"
   
},{
    userName: "Chloe",
    password: "Chloe123",
    isAdmin: false,
    links: [{url: "github.com", description: "my github"},{url: "gmail.com",description:"my gmail" }],
    image_url: "https://media.giphy.com/media/QwmiazKyDlBH1sQVPU/giphy.gif"
  
}];

mongoose.connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true, useUnifiedTopology: true})
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

