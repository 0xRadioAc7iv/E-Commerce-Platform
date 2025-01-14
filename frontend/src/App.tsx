import { BrowserRouter, Route, Routes } from "react-router-dom";
import Success from "./pages/success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
