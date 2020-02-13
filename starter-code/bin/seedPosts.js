const mongoose = require("mongoose");
const Post = require("./../models/posts");

const dbName = "IronHack-Network";

const posts = [{
    postContent: "I am dumb",
    
    userId: "5e4563a0bdbd9c781c5212ca"
},{
    postContent: "I am SMART !!!",
    
    userId: "5e4563a0bdbd9c781c5212c7"
},{
    postContent: "I am DONE !!!",
    
    userId: "5e4563a0bdbd9c781c5212c7"
},{
    postContent: "I am TIRED !!!",
    
    userId: "5e4563a0bdbd9c781c5212ca"
},{
    postContent: "I need a cigarette !!!",
    
    userId: "5e4563a0bdbd9c781c5212ca"
}];

mongoose.connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () =>{
    
  const pr =  Post.create(posts);

  return pr;
} )
.then((createdPosts)=> {
    console.log(`Created ${createdPosts.length} cohorts`);
    const pr = mongoose.connection.close();
    return pr;
})
.then(() => {console.log("Connection closed !")})
.catch( (err) => console.error('Error connecting to mongo', err));

