/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Services from "./pages/Services";
import LostAndFound from "./pages/LostAndFound";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import LoginSignup from "./pages/LoginSignup";
import Error from "./pages/Error";
import ReportLostPetForm from "./components/lostandfound/ReportLostPetForm";
import TermsUsers from "./pages/TermsUsers";
import TermsVendors from "./pages/TermsVendors";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen bg-white flex flex-col">
          <Routes>
            {/* Routes WITH Header and Footer */}
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <main className="flex-grow">
                    <Home />
                    <Carousel />
                  </main>
                  <Footer />
                </>
              }
            />

            <Route
              path="/services"
              element={
                <>
                  <Header />
                  <main className="flex-grow">
                    <Services />
                    <Carousel />
                  </main>
                  <Footer />
                </>
              }
            />
            
            <Route
              path="/lostandfound"
              element={
                <>
                  <Header />
                  <main className="flex-grow">
                    <LostAndFound />
                    <Carousel />
                  </main>
                  <Footer />
                </>
              }
            />

            <Route
              path="/report-lost-pet"
              element={
                <>
                  <Header />
                  <main className="flex-grow">
                    <ReportLostPetForm />
                  </main>
                  <Footer />
                </>
              }
            />

            <Route
              path="/login"
              element={
                <>
                  <Header />
                  <main className="flex-grow">
                    <LoginSignupRedirect />
                  </main>
                  <Footer />
                </>
              }
            />

            <Route
              path="/terms-users"
              element={
                <>
                  <Header />
                  <main className="flex-grow">
                    <TermsUsers />
                  </main>
                  <Footer />
                </>
              }
            />

            <Route
              path="/terms-vendors"
              element={
                <>
                  <Header />
                  <main className="flex-grow">
                    <TermsVendors />
                  </main>
                  <Footer />
                </>
              }
            />

            <Route
              path="/privacy-policy"
              element={
                <>
                  <Header />
                  <main className="flex-grow">
                    <PrivacyPolicy />
                  </main>
                  <Footer />
                </>
              }
            />

            {/* Example Protected Route */}
            {/* <Route
              path="/dashboard"
              element={
                <>
                  <Header />
                  <main className="flex-grow">
                    <ProtectedRoute>
                      <div className="p-10 text-xl">Welcome to your Dashboard 🎉</div>
                    </ProtectedRoute>
                  </main>
                  <Footer />
                </>
              }
            /> */}

            {/* 404 Error Page - WITHOUT Header and Footer for full-screen experience */}
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Redirect if already logged in
const LoginSignupRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  return user ? <Navigate to="/" replace /> : <LoginSignup />;
};

export default App;