/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userModuleSelector, getUser } from '../modules/users';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
@connect((state) => ({
  users: userModuleSelector(state).users,
  business: userModuleSelector(state).business
}))
class App extends React.Component {
  componentWillMount(){
    console.log('this props+++++++++++++', this.props);
    this.props.dispatch(getUser());
  }
  render() {
    if (this.props.users.loading) {
      return  (<div>loading</div>)
    }
     return (
      <div>
        <p>we are here</p>
        <ol>
        {this.props.users.users.map(user => <li>{user.name}</li>)}
        </ol>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
