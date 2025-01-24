import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, user }) {
    // Check local storage for remembered user or authentication
    const rememberedUser = localStorage.getItem("rememberedUser");

    if (!user && !rememberedUser) {
        return <Navigate to="/Login" replace />;
    }

    return children;
}

export default ProtectedRoute;
