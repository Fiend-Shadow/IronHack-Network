const mongoose = require("mongoose");
const Cohort = require("./../models/cohorts");

const dbName = "IronHack-Network";

const cohorts = [{
        cohort_name: "WebDev",
        cohort_date:"2020-01-01",
        
        members:[]
},
{
    cohort_name: "UX/UI",
    cohort_date:"2020-01-01",
    
    members:[]   
},
{
  cohort_name: "WebDev",
  cohort_date:"2020-04-01",
  
  members:[]
},
{
cohort_name: "UX/UI",
cohort_date:"2020-04-01",

members:[ ]   
}]

mongoose.connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () =>{
    
  const pr =  Cohort.create(cohorts);

  return pr;
} )
.then((createdCohorts)=> {
    console.log(`Created ${createdCohorts.length} cohorts`);
    const pr = mongoose.connection.close();
    return pr;
})
.then(() => {console.log("Connection closed !")})
.catch( (err) => console.error('Error connecting to mongo', err));

