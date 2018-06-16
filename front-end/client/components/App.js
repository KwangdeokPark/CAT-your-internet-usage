import React from 'react';
import NavigationBarPage from './NavigationBar/NavigationBarPage';
import FlashMessagesList from './flash/FlashMessagesList';



class App extends React.Component {
  render() {
    return (
      <div className="container">
        <NavigationBarPage />
        <FlashMessagesList />
        {this.props.children}
      </div>
    );
  }
}

export default App;
