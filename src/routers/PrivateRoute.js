import React from 'react';
import { connect } from 'react-redux';
// import the Redirect component from react-router-dom
import { Route, Redirect } from 'react-router-dom';
// We import Header here because we want it showing up just on the private pages
import Header from '../components/Header';


// This is how we implicitly return JSX
// export const PrivateRoute = () => (
// );

// Create a new component called PrivateRoute.  It accepts props.  We destructure props to get the properties described below
// One of the properties is the lowercase c component.  We are going to render it and we will need an uppercase name for that, so we are renaming it to an uppercase C Component
export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  // spread operator and destructuring
  // We can use ...rest to create a variable called rest with all of the properties that we did not destructure
  // ...rest is just a variable name.  We can instead use ...props or ...anythingElse.
  ...rest
}) => (
  // Start off using a route, route gets props passed to it, but NOT component or isAuthenticated, since we destructured that OFF of props above
  //
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <div>
        {/* Show the header component only when we're logged in. */}
        <Header />
        {/* if the user is authenticated, we render <Component> with props passed in that are already destructured / spread out */}
        <Component {...props}/>
      </div>

    ) : (
      // if the user is not authenticated, we redirect them with the Redirect component from react-router-dom
      <Redirect to="/" />
    )
  )}/>
);

// This is how we implicitly return an object
// const mapStateToProps = (state) => ({
// });

// This function takes in the state and returns an object with the property isAuthenticated equal to true if we are authenticated and false otherwise
const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
