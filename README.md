Overview

This project shows possibilities of d3js library to work in pair with React. For a given standard line chart there are the following features implemented:
* Capability for zoom via right-click-and-drag in the chart area 
* Ability to select portions of the line via left-click-and-drag, highlighting the selected dots in a different color
* Allow each dot to be left-click-and-dragged verticallyresulting in a corresponding change in the chart line

#### Running

In the project directory execute:

### `npm start`

This will run the app in the development mode and you will also see any lint errors in the console.

Open [http://localhost:3000] to view it in the browser.

**Note: The page will reload if you make edits.**

#### Testing

In the project directory execute:

### `npm test`

This will launch the test runner in the interactive watch mode.

**Note: Due to the lack of time, deep experience in testing d3 library and documentation for it, I didn’t manage to implement all the needed tests to cover implemented features. There is only one test for lineChart component that shows rendering without crashing. Unfortunately it almost useless since in test the only thing we have rendered is svg tag, but React can’t get inside of it and get access to the inner d3 elements but Enzyme is limited to what React exposes. There is no much information in public to solve it while keeping all the advantages of d3, probably it might be solved by using react-faux-dom [https://github.com/Olical/react-faux-dom].**
