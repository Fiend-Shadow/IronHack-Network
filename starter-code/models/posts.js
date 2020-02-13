const mongoose = require("mongoose");
const Schema = mongoose.Schema;


postSchema = new Schema(
    {
        postContent: {type: String, required: true},
        postImg_url: {type: String},
        userId: {type: Schema.Types.ObjectId, ref: "User"}
    },
    
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
          }
    
    }
)



const Post = mongoose.model("Post", postSchema);

module.exports = Post;