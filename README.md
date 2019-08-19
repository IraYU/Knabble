This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


**Note: to improve application performance and do deeper testing we can use React + D3 + `react-faux-dom` [https://github.com/Olical/react-faux-dom] So, using the faux dom we can use all the D3.js API methods and explore snapshot testing**


### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

**Note: there is only one test for lineChart component that shows rendering without crashing. But unfortunately we can render only svg tag.
This is because of Enzyme is limited to what React exposes, and React is not aware of the appended elements by D3.js.
There is the information that it can be fixed by using `react-faux-dom` [https://github.com/Olical/react-faux-dom]**
