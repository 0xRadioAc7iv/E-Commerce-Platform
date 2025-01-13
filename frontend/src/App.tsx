import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Success from "./pages/success";

function App() {
  <Router>
    <Routes>
      <Route path="/success" element={<Success />} />
    </Routes>
  </Router>;
}

export default App;
