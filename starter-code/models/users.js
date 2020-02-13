const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
      userName: {type: String, required: true},
      password: {type: String, required: true},
      isAdmin: {type: Boolean, default: false},
      links: [{url: String, description: String}],
      image_url: {type: String, required: true},
      cohortDate: [{type: Schema.Types.ObjectId, ref: "Cohort"}],
      postIds: [{type: Schema.Types.ObjectId, ref: "Post"}]

    }
    ,{
        timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at"
        }
    }
)

const User = mongoose.model("User", userSchema);

module.exports = User;