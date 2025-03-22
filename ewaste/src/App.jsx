import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AwarenessPage from "./Pages/Awarenesspage";
import LoginPage from "./Pages/Loginpage";
import SignUpPage from "./Pages/Signuppage";
import ScannerPage from "./Pages/ScannerPage";
import SchedulePickupPage from "./Pages/SchedulePickupPage";
import DropPointPage from "./Pages/DropPointPage";
import RewardPage from "./Pages/RewardPage";
import TrackDevicePage from "./Pages/TrackDevicePage";
import InstructionsPage from "./Pages/InstructionsPage";
import FeedbackPage from "./Pages/FeedbackPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./Components/AuthComponents/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/awareness" element={<AwarenessPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/scanner" element={<ScannerPage />} />
          <Route path="/instructions" element={<InstructionsPage />} />
          <Route path="/drop-points" element={<DropPointPage />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/schedule-pickup" element={<SchedulePickupPage />} />
            <Route path="/rewards" element={<RewardPage />} />
            <Route path="/track-device" element={<TrackDevicePage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
