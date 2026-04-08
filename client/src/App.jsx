import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";
import InterviewPage from "./pages/InterviewPage.jsx";
import InterviewReport from "./pages/InterviewReport.jsx";
import InterviewHistory from "./pages/InterviewHistory.jsx";
import Pricing from "./pages/Pricing.jsx";
import CareerCopilot from "./pages/CareerCopilot.jsx";
export const ServerUrl = "https://prep-ai-o7jq.onrender.com";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user", {
          withCredentials: true,
        });
        dispatch(setUserData(result.data.user)); //setting the user data in the redux store
      } catch (error) {
        console.log("Error fetching current user:", error);
        dispatch(setUserData(null)); // If there's an error, set user data to null
      }
    };
    getUser();
  }, [dispatch]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/history" element={<InterviewHistory />}></Route>
        <Route path="/report/:id" element={<InterviewReport />}></Route>
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/career-copilot" element={<CareerCopilot />}></Route>
      </Routes>
    </div>
  );
}

export default App;
