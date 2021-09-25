# Currency_Converter

My Website Link: https://vpremcurrency.ccbp.tech/

## Installation

1. Push/Copy git repository into your project

   command> git pull https://github.com/vanapallipremkumar/Currency-Converter
   main

2. Run the command "npm install" to install all the packages mentioned in the
   "package.json"
3. After installing the packages run the command "npm start" to start the server

## Language Details

    . React JS
    . HTML
    . CSS

## Features

    . Responsive Website
    . Easy to use/understand
    . Can be signin with google gmail account.

## Authentication Routes

### Accessible Routes

1. /signin
2. /signup
3. /forgot-password

**NOTE 1:** You can use your browser navigations to go backward or forward
between the above-mentioned routes.

### Signin Route

    . Here you can log in with your **Gmail** or by **creating the new account**.
    . For Created users user details will be **stored** within the browsers **localStorage**.
    . For registered login you have to enter your **username** and **password** which were created while signing up.
    . If you want to create a new account, you can click on **Sign up** button. Then, you will be redirected to sign up Route
    . If you forgot your password, you can change your password using **forgot password** option
    . Once you log in with valid credentials, you will be redirected to **home** Route.
    . If you log in to the home Route you won't be redirected to the sign in Route until either you log out or clearing to browser cookies.

### sign up Route

    . Here you can create a new account by mentioning a new username, password, date of birth.
    . If the username is already assigned to another account, you will be notified with an error.
    . Once you click the **Sign Up** button with valid details, You will be redirected to the sign in Route.
    . When we create the new account, the password, and date of birth will be encrypted and stored in localStorage.

### Forgot Password

    . Here you can reset the password using your username and your date of birth.
    . If you provide any invalid details, you will be notified by an error message.
    . If you provide valid details, a password input will appear and then you can change your password.
    . Once you change the password, you will be redirected to the sign in Route.

## Home Route

**NOTE 2:** If you did not log in and use the home route path to enter, the
Route will redirect to the login Route itself.

    . Initially Route will be loaded with all the 160 country's currencies according to 1 UAE Dirham.
    . You can search the country details by using their name, currency name, or amount.
    . All the countries are in alphabetical order with respect to the country codes.
    . We can convert 1 country value to another country by changing the selection options.
    . We can change the API key without changing the code by entering the API key into the API key input field.
    . We can log out from the Route. Once you click logout, you will be redirected to the sign in Route. You can't go backward to the home Route.

## API key

. **API website:** https://app.exchangerate-api.com . Above API gives us 1500
free API callings each month. . You can log in with your google mail or by
creating a new account to get a free API key. . Instructions will be provided on
the website.

**The above API provides currency values for 160 countries.**

**NOTE 3:** I provided an API key within the site. But it won't work for long
due to its API calling limit. Make sure to use your API.
