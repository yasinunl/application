# Basic Freelancer Website
This is a Flask-based freelancer website that uses SQLAlchemy for the database and JWTManager for authentication.

**Table of Contents:**
1. [Recommended Technologies](#recommended-technologies)
1. [Initial Setup](#initial-setup)
1. [Installation](#installation)
1. [Some Informations about the project](#some-informations-about-the-project)
1. [Schemas](#schemas)
1. [Run Setup](#run-setup)
## Recommended Technologies
- React
- TailwindCSS
- Flask for API requests
- PostgreSQL

## Initial Setup
1- Must have Python 3, React 13.4.0 and PostgreSQL, TailwindCSS installed

2- Make sure Postgres is running on your machine

3- Before run app.py you should create a database named 'freelancer'

## Installation
```shell
pip install flask
pip install flask_sqlalchemy
pip install flask_jwt_extended
pip install flask_cors
```

## Some Informations about the project

I created a complex website with a clear user interface, prioritizing secure user-server communication. The sign-up process is user-friendly, but some security measures were sacrificed for ease of database comprehension. Despite some issues with cookies, the website is fully functional and meets user needs.

## Schemas
```py
#apiServer/.env
export JWT_SECRET_KEY = "JWT_SECRET_KEY"
```
```py
#apiServer/app.py
...
from db import create_app
from db.initialize_db import createDB

...
CORS(...expose_headers=[..."Access_Token","refresh_token"],)
# To share access token and refresh token in headers. 
# I couldn't take cookies in React so I had to find another way to connect secure.

```
```js
/* freelancer/src/context/ApiContext.js
 */
const userLogin = async (user) => {
    ...
const axiosCreate = axios.create({});
const response = await axiosCreate.post("user/login", user);
```
- I tried to take as a cookie but I couldn't take cookies. If you know why, can you connect with me
```js
// This is the way which I tried but I can't see the cookies
const axiosCreate = axios.create({});
const response = await axiosCreate.post("user/login", user, {
    headers: {
        withCredentials: true
    }
}); 
```

## Run Setup
1- First run API
```powershell
# p1server
python app.py
```
2- Run React Project
```powershell
#freelance
npm run start
```
