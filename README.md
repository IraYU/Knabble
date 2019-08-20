This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

**Note: Due to the lack of time, deep experience in testing d3 library and documentation for it, I didn’t manage to implement all the needed tests to cover implemented features. There is only one test for lineChart component that shows rendering without crashing. Unfortunately it almost useless since in test the only thing we have rendered is svg tag, but React can’t get inside of it and get access to the inner d3 elements but Enzyme is limited to what React exposes. There is no much information in public to solve it while keeping all the advantages of d3, probably it might be solved by using react-faux-dom (https://github.com/Olical/react-faux-dom), anyway this is a field for growth for me.**
