# Project 4 - Codestream App

## Table of contents

- [Description](#description)
- [Deployement](#deployement)
- [Timeframe & Working Team](#timeframe--working-team)
  - [Home page](#home-page)
  - [Stream page](#stream-page)
  - [Signup page](#signup-page)
  - [Login page](#login-page)
  - [Unique Post page](#unique-post-page)
  - [My Stream](#my-stream)
  - [Dashboard](#dashboard)
  - [Other user's page](#other-users-page)
- [Breif](#breif)
- [Planning](#planning)
- [Build Code Process](#build-code-process)
  - [Comment component code](#comment-component)
  - [Like component code](#like-component)
  - [Cloudinary component code](#Cloudinary-component)
- [Wins](#wins)
- [Key Learning/Takeway ](#key-learningtakeaway)
- [Bugs](#bugs)
- [Future Improvements](#future-improvements)

## Description
### Technical requirement

Work by yourself.
Build a full-stack application by making your own backend and your own front-end
Use Postgress and flask python to build your own API.
Consume your API with a separate front-end built with React
Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
Have a visually impressive design to kick your portfolio up a notch and have something to wow future clients & employers. ALLOW time for this.
Be deployed online so it's publicly accessible.


### main app

I decided to work on a developper focussed social media where users can signup and login. Each user would be able to:
-Post on the main channel
-update they own posts
-delete they own post
-Update account details
-Upload picture from their device 
-look for other users
-See other users profils and stream
-Comment and like on each posts

## Deployement

We have use Netify to deploy our Front end and Heroku to deploy our backend

[Link to the APP](https://codestreamsocialmedia.netlify.app/)

Frontend
1. Clone repository
2. Navigate to the project directory
3. Run `npm i`
4. Run `npm run dev` - This should then open a localhost page in your browser

Backend
1. Clone repository
2. Navigate to the project directory
3. Run `pipenv instal`
4. Run  `pipenv run python seed.py` 
5. Run `pipenv run flask run  `

## Timeframe & Working Team

This was a 9 days project to be worked alone
-I worked strategecally seting clear tasks on a daily basis to acheive 
-After everyday I was reviewing and adapting what needed to be done for the following day depending on progress made

Technologie used
Frontend app using React.js to use the builder interface using a router on the main app
Hybrid CSS using Bulma as a framework  and some custom CSS
Flask, SQLAchemy and Marshmallow to build our API

### Home page

![Home page](./src/assets/images/Home.png)

### Stream page

![Stream page](./src/assets/images/Stream.png)

### Signup page

![Signup page](./src/assets/images/Signup.png)

### Unique post page

![Unique post page](./src/assets/images/Post.png)

### My stream

![My stream](./src/assets/images/MyStream.png)

### Dashboard

![Dashboard](./src/assets/images/Dashboard.png)

### Other user's page

![Other user's page](./src/assets/images/users.png)

## Breif
The objective of this project was to build a React application using our own API we learned during our classes lessons.

### Front End
This had to included APi fetching, Routing and mapping onl secting whta was needed from the API.
The document structure had to use Different component using router and routes on the main app

### Back end
We had to build the back end using flask python
-Model: This is where all our model and schemas are located and were we tell our backend what element are mandatory to create a new entry.
-Controller: This is where we had all our function depending on what we wanted the user to do(Example: create and account or a new wine or just login) we included all our routes on our controllers too 

We used Prostgress as our SQL

We also had a seed folder where all our original database was going to be seeded originally 


## Planning
### Front end
```plaintext
|--public
|   |--_redirect
|--src
|   |--assets
|   |    |--images
|   |--components
|   |      |--AboutUs.tsx
|   |      |--Comment.tsx
|   |      |--ContactUs.tsx
|   |      |--Dashboard.tsx
|   |      |--Footer.tsx
|   |      |--Home.tsx
|   |      |--Login.tsx
|   |      |--MyStream.tsx
|   |      |--Navbar.tsx
|   |      |--Post.tsx
|   |      |--PostcardFull.tsx
|   |      |--PostcardFullComment.tsx
|   |      |--PostList.tsx
|   |      |--ShowPost.tsx
|   |      |--Signup.tsx
|   |      |--UpdtateAccount.tsx
|   |      |--UpdateAvatar.tsx
|   |      |--UpdateComment.tsx
|   |      |--UpdatedPost.tsx
|   |      |--UserCard.tsx
|   |      |--UserDashboard.tsx
|   |      |--UserList.tsx
|   |      |--UserPosts.tsx
|   |--interfaces
|   |      |--comment.ts
|   |      |--like.ts
|   |      |--post.ts
|   |      |--user.ts
|   |--styles
|   |    |--main.scss
|   |--App.tsx
|   |--index.d.ts
|   |--main.tsx
|   |--README.MD

```
### Back end
```plaintext
|--config
|   |--environment.py
|--controllers
|   |--comment_controller.py
|   |--post_controller.py
|   |--like_controller.py
|   |--user_controller.py
|--middleware
|   |--secure_route.py
|--models
|   |--comment_model.py
|   |--post_model.py
|   |--user_model.py
|--serializers
|   |--comment_serializer.py
|   |--post_serializer.py
|   |--user_serializer.py
|--.env
|--app.py
|--pipfile
|--pipfile.lock
|--Procfile
|--seed.py

```

## Build Code Process
I initiated the project by seting up the backend structure and the react basic framework and started building on this.
I was particulary proud of comment, like and add picture functionallities


### Comment component
#### Front End
```jsx
  function handleChange(e: any) {
    const fieldName = e.target.name
    const newFormData = structuredClone(formData)
    newFormData[fieldName as keyof typeof formData] = e.target.value
    setFormData(newFormData)
    setErrorData("")
  }

  async function commentPost(e: SyntheticEvent) {
    try {
      const token = localStorage.getItem('token')
      const resp = await axios.post(`${baseUrl}/posts/${id}/comments`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const newFormData = structuredClone(formData)
      if (resp.data.message) {
        throw new Error(resp.data.message);
      }
      location.reload()
    } catch (e: any) {
      setErrorData(e.message)
    }
  }
```
#### Back end
```jsx
@router.route("/posts/<int:post_id>/comments", methods=["POST"])
@secure_route
def create_comment(post_id):

    comment_dictionary = request.json

    existing_post = PostModel.query.get(post_id)
    if not existing_post:
        return {"message": "No post found"}, HTTPStatus.NOT_FOUND

    try:
        comment = comment_serializer.load(comment_dictionary)
        comment.user_id = g.current_user.id
        comment.post_id = post_id
        comment.save()
    except ValidationError as e:
        return {"errors": e.messages, "message": "Something went wrong"}

    return comment_serializer.jsonify(comment), HTTPStatus.CREATED
```

### Like componnent
#### Front end
```jsx
  function checkIfLiked() {
    like.filter(like => {
      if (like.user.id === currentUser?.id) {
        liked = "liked"
      }
    })
  }
  checkIfLiked()
  async function handleLike(e: SyntheticEvent) {
    try {
      const token = localStorage.getItem('token')
      const resp = await axios.post(`${baseUrl}/posts/${id}/likes`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (resp.data.message) {
        throw new Error(resp.data.message);
      }
      location.reload()
    } catch (e: any) {
      setErrorData(e.message)
    }

  }
  async function handleDislike(e: SyntheticEvent) {
    try {
      like.filter(async like => {
        if (like.user.id === currentUser?.id) {
          const token = localStorage.getItem('token')
          const resp = await axios.delete(`${baseUrl}/likes/${like.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        }
        location.reload()
      })

    } catch (error) {
    }
  }
```

#### Back end
```jsx
@router.route("/posts/<int:post_id>/likes", methods=["POST"])
@secure_route
def like(post_id):
    existing_post = PostModel.query.get(post_id)
    if not existing_post:
        return {"message": "No post found"}, HTTPStatus.NOT_FOUND
    try:
        like = like_serializer.load({})
        like.user_id = g.current_user.id
        like.post_id = post_id
        like.save()
    except ValidationError as e:
        return {
            "errors": e.message,
            "message": "Something went wrong",
        }, HTTPStatus.BAD_REQUEST
    except Exception as e:
        return {"message": "Something went very wrong"}
    return like_serializer.jsonify("Liked")

@router.route("/likes/<int:like_id>", methods=["DELETE"])
@secure_route
def remove_like(like_id):

    like = LikeModel.query.get(like_id)
    if not like:
        return {"message": "No like found"}, HTTPStatus.NOT_FOUND

    like.remove()
    return {"message": "like Deleted"}, HTTPStatus.OK
```
## Wins
After this project I now feel much more comfident developing a fullstack app using react.js and flask python
I understand how a back end work and how all my end point are talking to each orther
The ability to add a picture from the device was a big win for me as I wanted to get this feature from the previeous project

The comment and Like feature was also something big as it took me a whole day of research and coding for each feature 

## Key learning/Takeaway
1/ If I would have to do this project again I would build my backend models differently and think a little bit more on what are the main feature needed and what is dependant of what. As a result I was not able to have cascading deleting. 

## Bugs
Due to  a lack of time and my models being structure in the way it is. the user is unable to delete a post that has dependencies (comments or likes)

## Future Improvements
-Have the functionalities to like and comment on other comments
-Have the functionallity to contact other user
-Have the functionallity to follow other user and be followed by other users