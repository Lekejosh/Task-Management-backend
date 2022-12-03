# Task Management API

## Getting Started

These instructions will get a copy of the project up and running on your machine for development and testing purposes.

### Prerequisites

To run this project locally, the following tools need to be installed:

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)

### Installation

Clone the project:

```
git clone https://github.com/Lekejosh/Task-Management-backend
```

Move into the project directory and install it's dependencies:

```
cd Task-Management-backend/
npm install
```
In the config folder create a file name "config.js"

Then paste and replace the below with your personal credentials

```
DB_URI = your db url here... example => 'mongodb://localhost:27017/taskManagement'

JWT_SECRET= Your JWT Secret here

JWT_EXPIRE = 5d

COOKIE_EXPIRE=5

PORT =4000 // Don't change this

SMPT_SERVICE=your service provider here... example=> gmail

SMPT_HOST= Host here... example=> stmp.gmail.com

SMPT_PORT=465

SMPT_MAIL=email address here

SMPT_PASSWORD=email password here
```

To start the dev API server run the following command:

```
npm run dev
```
### MongoDB Data

The database will initially be empty, meaning that no words will be returned from the API. To populate your local MongoDB database, read through [Locally Populating Dictionary Data](#populating-data)

## Usage

### Documentation

This is the documentaion of the api

### REGISTER USER

```
/api/v1/register

```

For example:

```
POST:  http://localhost:4000/api/v1/register


```

```
Body
```

```json
{
  "firstName": "Joshua",
  "lastName": "Adeleke",
  "password": "1234567890",
  "email": "lekejosh6wf@gmail.com"
}
```

```
Response -400
```

```json
{
  "success": false,
  "message": "User Already Exists"
}
```

```
Response - 201
```

```json
{
  "success": true,
  "user": {
    "firstName": "Joshua",
    "lastName": "Adeleke",
    "email": "lekejosh6wf@gmail.com",
    "password": "$2a$10$HnwC.Xksoa4kXUXDLNRA2OrI88RnkeOcxXP0Hm2uU4e1Qy/h02wmm",
    "role": "user",
    "_id": "638b1c0ff700c7f51a31745e",
    "created": "2022-12-03T09:51:11.288Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGIxYzBmZjcwMGM3ZjUxYTMxNzQ1ZSIsImlhdCI6MTY3MDA2MTA3MSwiZXhwIjoxNjcwNDkzMDcxfQ.VsTxLIyU1ACTusl888cYXY210qwM6GMkslv58EsMiIA"
}
```

### LOGIN USER

```
/api/v1/login

```

For example:

```
POST:  http://localhost:4000/api/v1/login


```

```
Body
```

```json
{
  "email": "lekejosh6wf@gmail.com",
  "password": "1234567890"
}
```

```
Response - 401
```

```json
{
  "success": false,
  "message": "Invalid email or Password"
}
```

```
Response -200
```

```json
{
  "success": true,
  "user": {
    "_id": "638b1c0ff700c7f51a31745e",
    "firstName": "Joshua",
    "lastName": "Adeleke",
    "email": "lekejosh6wf@gmail.com",
    "password": "$2a$10$HnwC.Xksoa4kXUXDLNRA2OrI88RnkeOcxXP0Hm2uU4e1Qy/h02wmm",
    "role": "user",
    "created": "2022-12-03T09:51:11.288Z",
    "__v": 0,
    "lastLoggedIn": "2022-12-03T09:52:44.895Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGIxYzBmZjcwMGM3ZjUxYTMxNzQ1ZSIsImlhdCI6MTY3MDA2MTE2NSwiZXhwIjoxNjcwNDkzMTY1fQ.foDVUc97sWPgt4gQhdGJDjVkaoA5FNMDGRjU_gCrXlY"
}
```

### USER DETAILS

```
/api/v1/me

```

For example:

```
GET:  http://localhost:4000/api/v1/me


```

```
Response - 401
```

```json
{
  "success": false,
  "message": "Please Login to access this resource"
}
```

```
Response -200
```

```json
{
  "success": true,
  "user": {
    "_id": "638b1c0ff700c7f51a31745e",
    "firstName": "Joshua",
    "lastName": "Adeleke",
    "email": "lekejosh6wf@gmail.com",
    "role": "user",
    "created": "2022-12-03T09:51:11.288Z",
    "__v": 0,
    "lastLoggedIn": "2022-12-03T09:52:44.895Z"
  }
}
```

### LOGOUT USER

```
/api/v1/logout

```

For example:

```
GET:  http://localhost:4000/api/v1/logout


```

```
Response - 401
```

```json
{
  "success": false,
  "message": "Please Login to access this resource"
}
```

```
Response --200
```

```json
{
  "sucess": true,
  "Message": "logged out successfully"
}
```

### FORGOT PASSWORD

```
/api/v1/password/forgot

```

For example:

```
POST:  http://localhost:4000/api/v1/password/forgot


```

```
Body
```

```json
{
  "email": "lekejosh6wf@gmail.com"
}
```

```
Respons - 404
```

```json
{
  "success": false,
  "message": "User Not Found"
}
```

```

Response
```

```json
{
  "success": true,
  "message": "Email sent to lekejosh6wf@gmail.com successfully"
}
```

### RESET PASSWORD

```
/api/v1/password/reset/:token

```

For example:

```
PUT:  http://localhost:4000/api/v1/password/reset/2f21043200b397ba7f4b1cce746aa9d184e85766


```

```
Body
```

```json
{
  "password": "qwertyuiop",
  "confirmPassword": "qwertyuiop"
}
```

```
Response - 400
```

```json
{
  "success": false,
  "message": "Reset Password Token is invalid or has expired"
}
```

```
Response - 200
```

```json
{
  "success": true,
  "user": {
    "_id": "638b1c0ff700c7f51a31745e",
    "firstName": "Joshua",
    "lastName": "Adeleke",
    "email": "lekejosh6wf@gmail.com",
    "role": "user",
    "created": "2022-12-03T09:51:11.288Z",
    "__v": 0,
    "lastLoggedIn": "2022-12-03T09:58:36.176Z",
    "password": "$2a$10$a5ZOP7tCww1YJFalSRRBLuqCUNgUcvFvlNTHW7pEA4jfGfo7z/uXq"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGIxYzBmZjcwMGM3ZjUxYTMxNzQ1ZSIsImlhdCI6MTY3MDA2MzAyNCwiZXhwIjoxNjcwNDk1MDI0fQ.LlhxLr3zcgddXgbTB50q0hJmq_tD-_aqobWkSOJn7Mw"
}
```

### UPDATE PROFILE

```
/api/v1/profile/update

```

For example:

```
PUT:  http://localhost:4000/api/v1/profile/update


```

```
Body
```

```json
{
  "firstName": "User",
  "lastName": "001",
  "email": "oluwaronaldo7@gmail.com"
}
```

```
Response - 401
```

```json
{
  "success": false,
  "message": "Please Login to access this resource"
}
```

```
Response -200
```

```json
{
  "success": true,
  "user": {
    "_id": "638b1c0ff700c7f51a31745e",
    "firstName": "User",
    "lastName": "001",
    "email": "oluwaronaldo7@gmail.com",
    "role": "user",
    "created": "2022-12-03T09:51:11.288Z",
    "__v": 0,
    "lastLoggedIn": "2022-12-03T09:58:36.176Z"
  }
}
```

### ALL USERS -- ADMIN

```
/api/v1/users

```

For example:

```
GET:  http://localhost:4000/api/v1/admin/users
```
```
Response - 401
```

```json
{
  "success": false,
  "message": "Please Login to access this resource"
}
```
```
Response - 403
```

```json
{
  "success": false,
  "message": "Role: user is not allowed to access this resource"
}
```

```
Response - 200
```

```json
{
  "success": true,
  "users": [
    {
      "_id": "638a96ce5bf6fb242c9e845c",
      "firstName": "hua",
      "lastName": "leke",
      "email": "admin@gmail.com",
      "role": "admin",
      "created": "2022-12-03T00:22:38.290Z",
      "__v": 0,
      "lastLoggedIn": "2022-12-03T10:29:41.838Z"
    },
    {
      "_id": "638b1c0ff700c7f51a31745e",
      "firstName": "User",
      "lastName": "001",
      "email": "oluwaronaldo7@gmail.com",
      "role": "user",
      "created": "2022-12-03T09:51:11.288Z",
      "__v": 0,
      "lastLoggedIn": "2022-12-03T09:58:36.176Z"
    }
  ]
}
```

### SINGLE USER -- ADMIN

```
/api/v1/admin/user/:id

```

For example:

```
GET:  http://localhost:4000/api/v1/admin/user/638b1c0ff700c7f51a31745e
```
```
Response - 401
```

```json
{
  "success": false,
  "message": "Please Login to access this resource"
}
```
```
Response - 403
```
```json
{
  "success": false,
  "message": "Role: user is not allowed to access this resource"
}
```

```
Response - 200
```

```json
{
  "success": true,
  "user": {
    "_id": "638b1c0ff700c7f51a31745e",
    "firstName": "User",
    "lastName": "001",
    "email": "oluwaronaldo7@gmail.com",
    "role": "user",
    "created": "2022-12-03T09:51:11.288Z",
    "__v": 0,
    "lastLoggedIn": "2022-12-03T09:58:36.176Z"
  }
}
```

### UPDATE USER -- ADMIN

```
/api/v1/admin/user/:id

```

For example:

```
PUT:  localhost:4000/api/v1/admin/user/638b1c0ff700c7f51a31745e


```

```
body
```

```json
{
  "firstName": "User",
  "email": "lekejosh6wf@gmail.com",
  "role": "user"
}
```
```
Response - 401
```

```json
{
  "success": false,
  "message": "Please Login to access this resource"
}
```
```
Response - 403
```

```json
{
  "success": false,
  "message": "Role: user is not allowed to access this resource"
}
```

```
Response - 200
```

```json
{
  "success": true,
  "message": "User Updated Successfully"
}
```

### DELETE USER -- ADMIN

```
/api/v1/admin/user/:id

```

For example:

```
DELETE:  localhost:4000/api/v1/admin/user/638b1c0ff700c7f51a31745e


```
```
Response - 401
```

```json
{
  "success": false,
  "message": "Please Login to access this resource"
}
```
```
Response - 403
```

```json
{
  "success": false,
  "message": "Role: user is not allowed to access this resource"
}
```

```
Response - 200
```

```json
{
  "success": true,
  "message": "User Deleted Successfully"
}
```

### CREATE TASK

```
/api/v1/task/create

```

For example:

```
POST:  http://localhost:4000/api/v1/task/create


```

```
Body
```

```json
{
  "date": "01-02-2001",
  "prority": "Very Important",
  "description": "Some Urgent"
}
```

```
Response - 401
```

```json
{
  "success": false,
  "message": "Please Login to access this resource"
}
```

```
Response - 200
```

```json
{
  "success": true,
  "task": {
    "date": "2001-01-01T23:00:00.000Z",
    "prority": "Very Important",
    "description": "Some Urgent",
    "completed": false,
    "user": "638a96ce5bf6fb242c9e845c",
    "_id": "638b28c95efe287e61939835",
    "__v": 0
  }
}
```

### GET USER TASKS

```
/api/v1/task/my

```

For example:

```
GET:  http://localhost:4000/api/v1/task/my


```

```
Response - 401
```

```json
{
  "success": false,
  "message": "Please Login to access this resource"
}
```

```
Response - 200
```

```json
{
  "success": true,
  "task": [
    {
      "_id": "638b28c95efe287e61939835",
      "date": "2001-01-01T23:00:00.000Z",
      "prority": "Very Important",
      "description": "Some Urgent",
      "completed": false,
      "user": "638a96ce5bf6fb242c9e845c",
      "__v": 0
    },
    {
      "_id": "638b28f45efe287e6193983a",
      "date": "2022-01-01T23:00:00.000Z",
      "prority": "Very Important",
      "description": " Urgent",
      "completed": false,
      "user": "638a96ce5bf6fb242c9e845c",
      "__v": 0
    }
  ]
}
```

### UPDATE TASKS

```
/api/v1/task/:id/update

```

For example:

```
PUT:  localhost:4000/api/v1/task/638b28c95efe287e61939835/update


```

```body

```

```json
{
  "date": "01-03-2022",
  "prority": "Very Important",
  "description": "Some Urgent",
  "completed": true
}
```

```
Response - 401
```

```json
{
  "success": false,
  "message": "Please Login to access this resource"
}
```

```
Response - 200
```

```json
{
  "success": true,
  "task": {
    "_id": "638b28c95efe287e61939835",
    "date": "2022-01-02T23:00:00.000Z",
    "prority": "Very Important",
    "description": "Some Urgent",
    "completed": true,
    "user": "638a96ce5bf6fb242c9e845c",
    "__v": 0
  }
}
```
