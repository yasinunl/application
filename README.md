# Basic Freelancer Website
This is a Flask-based freelancer website that uses SQLAlchemy for the database and JWTManager for authentication.

**Table of Contents:**
1. [Recommended Technologies](#recommended-technologies)
1. [Initial Setup](#initial-setup)
1. [Installation](#installation)
1. [Some Informations about the project](#some-informations-about-the-project)
1. [Schemas](#schemas)
1. [Run Setup](#run-setup)
1. [Photos](#photos)
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
## Photos

<details>
<summary>Photos Of App</summary>

<details>
<summary>Root Page</summary>

![Sign Up Modal](./imagesOfApp/fullModal.png)
</details>
<details>
<summary>Full Page no Log In</summary>
<details>
<summary>Home  Page</summary>

![Sign Up Modal](./imagesOfApp/fullPageWithoutLogin.png)
</details>
<details>
<summary>Freelancers Page</summary>

![Sign Up Modal](./imagesOfApp/fullPageWithoutLogin1.png)
</details>
<details>
<summary>Jobs Page</summary>

![Sign Up Modal](./imagesOfApp/fullPageWithoutLogin2.png)
</details>
</details>
<details>
<summary>Full Page after Login</summary>

![Sign Up Modal](./imagesOfApp/fullPage.png)
</details>
<details>
<summary>Left Content</summary>
As you see there are two button when you click one of them you will see that
<details>
<summary>Freelancers</summary>

![Sign Up Modal](./imagesOfApp/leftcontent.png)
</details>
<details>
<summary>Jobs</summary>

![Sign Up Modal](./imagesOfApp/leftcontent1.png)
</details>
</details>
<details>
<summary>Profile</summary>

![Sign Up Modal](./imagesOfApp/profileDetail.png)
</details>
<details>
<summary>Job Detail</summary>

![Sign Up Modal](./imagesOfApp/jobDetail.png)
</details>
<details>
<summary>Freelancers Profiles</summary>

![Sign Up Modal](./imagesOfApp/freelancerDetail.png)
</details>
<details>
<summary>Modals</summary>
<details>
<summary>Sign Up</summary>

![Sign Up Modal](./imagesOfApp/signup.png)
</details>
<details>
<summary>Log In Modal</summary>

![Sign Up Modal](./imagesOfApp/login.png)
</details>
<details>
<summary>Message Modal (to contact)</summary>

![Sign Up Modal](./imagesOfApp/sendMessage.png)
</details>
<details>
<summary>Inbox Modal</summary>

![Sign Up Modal](./imagesOfApp/inboxModal.png)
</details>
<details>
<summary>Sendbox Modal</summary>

![Sign Up Modal](./imagesOfApp/sendbox.png)
</details>
<details>
<summary>Share New Post</summary>

![Sign Up Modal](./imagesOfApp/newPostModal.png)
![Sign Up Modal](./imagesOfApp/newPostModal1.png)
![Sign Up Modal](./imagesOfApp/newPostModal2.png)
</details>
</details>
<details>
<summary>Mobile Version</summary>

![Sign Up Modal](./imagesOfApp/smallone.png)
![Sign Up Modal](./imagesOfApp/smallone1.png)
</details>
</details>