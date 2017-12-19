// higher order components

// A higher order component (HOC) is a component that renders another components
// The goal is to reuse code
// We do this with: 1. Render hijacking, 2. prop manipulation, and 3. abstract state

import React from 'react';
import ReactDOM from 'react-dom';

// Lower order component
const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

// This is a regular function (not a React component)).  But it returns the higher order component
// It is called with the component that we want to wrap
const withAdminWarning = (WrappedComponent) => {
  // Return a component, in this case a stateless functional component
  // If we don't write {...props}, then the props won't get passed down.  ...props spreads out every property on props and passes them down as props.  In other words, we pass all of the props passed into the higher order component and pass them directly to the child
  return (props) => (
    <div>
      <p>This is private info. Please don't share!</p>
      <WrappedComponent {...props}/>
    </div>
  );
};

// Higher order component
const AdminInfo = withAdminWarning(Info);

// requireAuthentication

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Please login to view the info.</p>
      )}
    </div>
  )
}

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={true} info="These are the details" />, document.getElementById('app'));
