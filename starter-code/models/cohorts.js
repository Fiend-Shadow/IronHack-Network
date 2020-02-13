const mongoose = require("mongoose");
const Schema = mongoose.Schema;

cohortSchema = new Schema(
    {
        cohort_name: {type: String ,requierd : true ,enum: ["webDev","UX/UI","data"]},
        cohort_date:{type: Date , requierd: true},
        city: {type: String, enum:["BCN", "MAD" ,"MIA"],default: BCN},
        members:[{type: Schema.Types.ObjectId, ref: "User"}]
    }
    ,{
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
          }   
    }
)



const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;