# belajar-expressjs-rest-api
Belajar REST API service dengan ExpressJS

# Table of Contents
* [Installation](#installation)
  * [Prerequisites](#prerequisites)
  * [Project Setup](#project-setup)
* [Running Project](#running-project)
* [API Spec](#api-spec)
  * [User Registration](#user-registration)
  * [User Login](#user-login)
  * [User Profile](#user-profile)
* [CHANGELOG - How This Project Was Built](./CHANGELOG.md)

# Installation
## Prerequisites
1. NodeJS + NPM latest LTS version.
2. MongoDB 4.4 or newest version.

## Project Setup
1. Clone this project by run following command
```
git clone https://github.com/hadihammurabi/belajar-expressjs-rest-api.git
```

2. Go to **belajar-expressjs-rest-api** directory by run following command
```
cd belajar-expressjs-rest-api
```

3. Install all required dependencies by run following command
```
npm i
```

4. Copy **.env.example** to **.env** file by run following command
```
cp .env.example .env
```

5. Configure app and database options inside **.env** file

# Running Project
Once project ready, you can run using following command.

Production mode:
```
npm start
```

Development mode:
```
npm run dev
```

# API Spec
## User Registration
Create a new user using email, password, name, and gender.

### Request
<table>
  <tr>
    <td>HTTP Method</td>
    <td>POST</td>
  </tr>
  <tr>
    <td>Endpoint</td>
    <td>/auth/register</td>
  </tr>
  <tr>
    <td>Headers</td>
    <td>
      Content-Type: application/json
    </td>
  </tr>
  <tr>
    <td>Body</td>
    <td>
      <pre>{
  "email": "hadihammurabi@gmail.com",
  "password": "123123",
  "nama":"Hadi Hidayat Hammurabi",
  "jenis_kelamin":"l"
}</pre>
    </td>
  </tr>
</table>

### Response
#### Success
<table>
  <tr>
    <td>Status</td>
    <td>200</td>
  </tr>
  <tr>
    <td>Body</td>
    <td>
      <pre>{
  "_id":"60d5d77b8a4fce15df41b1c1",
  "email":"hadihammurabi@gmail.com",
  "nama":"Hadi Hidayat Hammurabi",
  "jenis_kelamin":"l",
  "__v":0
}</pre>
    </td>
  </tr>
</table>

#### Fail
<table>
  <tr>
    <td>Status</td>
    <td>400</td>
  </tr>
  <tr>
    <td>Body</td>
    <td>
      <pre>{
  "error":{
    "email": {
      "name":"ValidationError",
      "message":"Path `email` already used."
    }
  }
}</pre>
    </td>
  </tr>
</table>

## User Login
Login using email and password to get JWT token.

### Request
<table>
  <tr>
    <td>HTTP Method</td>
    <td>POST</td>
  </tr>
  <tr>
    <td>Endpoint</td>
    <td>/auth/login</td>
  </tr>
  <tr>
    <td>Headers</td>
    <td>
      Content-Type: application/json
    </td>
  </tr>
  <tr>
    <td>Body</td>
    <td>
      <pre>{
  "email": "hadihammurabi@gmail.com",
  "password": "123123"
}</pre>
    </td>
  </tr>
</table>

### Response
#### Success
<table>
  <tr>
    <td>Status</td>
    <td>200</td>
  </tr>
  <tr>
    <td>Body</td>
    <td>
      <pre>{
  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDVkNzdiOGE0ZmNlMTVkZjQxYjFjMSIsImlhdCI6MTYyNDYyNzY3M30.2Sz00zzUNlTtDoUriYNdCPvXJd8uF5iK32y9vB8cJe0",
  "type":"Bearer"
}</pre>
    </td>
  </tr>
</table>

#### Fail
<table>
  <tr>
    <td>Status</td>
    <td>400</td>
  </tr>
  <tr>
    <td>Body</td>
    <td>
      <pre>{
  "error": {
    "credential": {
      "name":"AuthError",
      "message":"Invalid email or password."
    }
  }
}</pre>
    </td>
  </tr>
</table>

## User Profile
Get user profile that signed in, identified by authorization header that contains JWT token.

### Request
<table>
  <tr>
    <td>HTTP Method</td>
    <td>GET</td>
  </tr>
  <tr>
    <td>Endpoint</td>
    <td>/auth/profile</td>
  </tr>
  <tr>
    <td>Headers</td>
    <td>
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDVkNzdiOGE0ZmNlMTVkZjQxYjFjMSIsImlhdCI6MTYyNDYyNzY3M30.2Sz00zzUNlTtDoUriYNdCPvXJd8uF5iK32y9vB8cJe0
    </td>
  </tr>
</table>

### Response
#### Success
<table>
  <tr>
    <td>Status</td>
    <td>200</td>
  </tr>
  <tr>
    <td>Body</td>
    <td>
      <pre>{
  "data": {
      "_id":"60d53be41416cf16b979e76d",
      "email":"tes@mail.com",
      "jenis_kelamin":"l",
      "nama":"Tes User",
      "__v":0
    }
}</pre>
    </td>
  </tr>
</table>

#### Fail
<table>
  <tr>
    <td>Status</td>
    <td>403</td>
  </tr>
  <tr>
    <td>Body</td>
    <td>
      <pre>{
  "message": "Akses tidak diizinkan."
}</pre>
    </td>
  </tr>
</table>
