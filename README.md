Data plays a very critical role in everybody life, protecting the same data is very important thing.
Hackers has almost succeeded in hacking all kind of servers and http requests.
Recent technology named BlockChain Technology, uses a different mechanism to store the data, which is comparatively
difficult to hack the data.
if we make use of same technology to save our patient data, it even becomes more safer and secure.

In this application, we have created a form for patient registration any data which is provided in that form will be stored using
BlockChain technology.

This registration form is created as microservice, which can be executed independently and can be plugged in based on the need.
this works independently because it has its own way to store the data. UI is created using React, the hash we create in this application
is a random value and that is encrypted. Encryption mechanism used in this application is AES256.
This hash along with previous hash value will be sent to the service to save the data.
Data gets saved only if the previous hash will matching with the last hash value in the Database.
if the previous hash doesn't match then our block won't get attached to the existing database.

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
