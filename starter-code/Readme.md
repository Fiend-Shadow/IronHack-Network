## Description 

IronHack network platform for sharing posts checking on cohort collegues and checking incoming events.

## User Stories

- 404 :As a user I want to see a nice 404 page when I go to a page that doesnt exist.
- 505 :As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- homepage :As a user I want to be able to see posts, sign up, and log in from the homepage.
- sign up :As a user I want be able to sign up to the web so that I can post and contact with my cohort collegues.
- login :As a user I want to be able to log in on the web page so I can be on my account on the platform.
- logout :As a user I want to be able to log out to make sure that I am offling and no one can access my account.
- check friend profile: As a user I want to be able to access to one of my collegues profile to see his posts, image, and links.
- check profile: As a user I want to be able access my profile, edit my links, edit my posts, delete my posts, and change my image.


## Backlog
List of other features outside of the MVPs scope:
- Calendar implementation
- ...

## ROUTES:

- GET / 
  - renders the home page

- GET /sign-up
  - renders the sign-up (form) page

- POST /sign-up
  - renders the log-in (form) page
  - body:
    - userName
    - password
    - cohort_name
    - cohort_date
    - city

- GET /log-in
  - renders the log-in (form) page

- POST /log-in
  - renders the user-interface page
  - body:
    - userName
    - password

- GET /user-interface
  - renders the user-interface page

- POST /user-interface
  - renders the user-interface page
  - body:
    - postContent
    - postImg_url

- GET /user-profil
  - renders the user-profil page

- POST /user-profil
  - renders the user-profil page
  - body:
    - links
    - postContent
    - postImg_url

- GET /user-contact-interface
  - renders the user-contact-interface page

- POST /user-contact-interface
  - renders the user-contact-interface page
  - body:
    - links
    - postContent
    - postImg_url

## Api-Routes

- GET : "/" : Main page route. Renders home index view.
- Get : "/log-in" : Renders Login view.
- Post : "/log-in" : Sends Login form data to the server {email,password}

## Models
User = {
    {
        
        password: {type: String, required: true},
        isAdmin: {type: Boolean, default: false},
        userName: {type: String, required: true},
        CohortDate: [{type: Schema.Types.ObjectId, ref: "Cohort"}],
        links: [{url: String, description: String}],
        postIds: [{type: Schema.Types.ObjectId, ref: Post}],
        image_url: {type: String, required: true}
    },
    {
        timestamps:{
          createdAt: "created_at",
          updatedAt: "updated_at"
    }
}
Post = {
    {
        postContent: {type: String, required: true},
        postImg_url: {type: String},
        userId: {{type: Schema.Types.ObjectId, ref: "User"}}
    },
    {
       timestamps:{
         createdAt: "created_at",
         updatedAt: "updated_at"
    }
}
Cohort = {
        {
        cohort_name: {type: String ,requierd : true ,enum: {WebDev,UI,data}},
        cohort-date:{type: Date , requierd: true},
        city: {type: String, enum:[BCN,MAD, Maiami],default: BCN},
        members:[{type: Schema.Types.ObjectId, ref: User}]
        
    },
    {
        timestamps:{
         createdAt: "created_at",
         updatedAt: "updated_at"
    }
}


## Links

### Trello
[Link to your trello board](https://trello.com/b/8pazd2Im/kanban-template)


### Git
[Repository Link](https://github.com/Fiend-Shadow/IronHack-Network)

### Slides
[Slides Link](http://slides.com)
