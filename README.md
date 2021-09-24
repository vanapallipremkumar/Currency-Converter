# Currency_Converter

## Installation
1) Push/Copy git repository in to your project
2) Run the command "npm install" to install all the packages mentioned in the "package.json"
3) After installing the packages run the command "npm start" to start the server

## Authentication Page
## Accessible Routes
1) /signin
2) /signup
3) /forgot-password
**NOTE 1:** You can use your browser navigations to go backward or forward between above mentioned routes.

### Signin Page
	i)   Here you can login with your **gmail** or by **creating the new account**.
	ii)  For Created users user details will be **stored** with in the browsers **localStorage**.
	iii) For registered login you have to enter your **username** and **password** which created while signing up.
	iv)  If you want to create new account, you can click on **Sign up** button. Then, you will be redirected to sign up page
	v)   If you forgot your password, you can change your password using **forgot password** option
	vi)  Once you login with valid credentials, you will be redirected to **home** page.
	vii) If you login to home page you won't be redirected to signin page until either you logout or clearing to browser cookies.

### sign up page
	i)   Here you can create a new account by mentioning new username, password, date of birth.
	ii)  If the username is already assigned to another account, you will be notified with an error.
	iii) Once you click the **Sign Up** button with valid details, You will be redirected to SignIn page.
	iv)  When we create the new account, password and date of birth will be encrypted and stored in localStorage.

### Forgot Password
	i)   Here you can reset password using your username and your date of birth.
	ii)  If you provide any invalid details, you wil be notified by an error message.
	iii) If you provide valid details, a password input will be appeared and then you can change your password.
	iv) Once you change the password, you will be redirected to signin page.

### Home Page
	**NOTE 2:** If you did not logged and use the home route path to enter, the page will redirect to login page itself.
	i)  Initally page will be loaded with all the 160 countries currencies according to 1 UAE Dirham.

## API key

  1) **API website:** https://app.exchangerate-api.com
  2) Above API gives us 1500 free api callings each month.
  3) You can login with your google mail or by creating new account to get a free api key.
  4) Instructions will be provided with in the website.

**The above API provides currency values for 160 countries.**

**NOTE 1:** I provided an api key within the app. But it won't work for long due to it's api calling limit. Make sure to use your own API.
