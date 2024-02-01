import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import {RecordVideo} from './RecordVideo';
import {RecordAudio} from './RecordAudio';
import {RecordScreen} from './RecordScreen';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="text-center py-5 bg-blue-500 text-white">
          <nav>
            <ul className="flex justify-around mt-4">
              <li><Link to="/record-video">Record Video</Link></li>
              <li><Link to="/record-audio">Record Audio</Link></li>
              <li><Link to="/screen-recorder">Screen Recorder</Link></li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/record-video" element={<RecordVideo />} />
          <Route path="/record-audio" element={<RecordAudio />} />
          <Route path="/screen-recorder" element={<RecordScreen />} />
          <Route path="*" element={<RecordVideo />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;