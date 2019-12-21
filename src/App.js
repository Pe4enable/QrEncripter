import React, {PureComponent} from 'react';

import './App.css';
import './main.css';
import QrReader from './components/qr-reader/qrReader'
import QRGenerator from './components/qr-generator/qrGenerator'

const run = async func => {
  try {
    await func();
  } catch (error) {
    setTimeout(run, 1000, func);
  }
};
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        place: '',
        startTime: '',
      },
      warning: '',
    };
  }

  getWarning = warning => this.setState({ warning });

  render (){
    const {
      data,
      warning,
    } = this.state;
  return (
    <main className="block-body">
    <div className="block-container-site">
      <div className="block-right-container-site">
       <QRGenerator/>
       <QrReader/>
      </div>
    </div>

  </main>
  );
}
}

export default App;
