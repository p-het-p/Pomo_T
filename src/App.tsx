import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Timer from './Timer';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Timer />} />
      </Routes>
    </BrowserRouter>
  );
}
