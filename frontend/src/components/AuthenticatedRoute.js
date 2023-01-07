import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../lib/ContextLib";
import { useNavigate } from "react-router-dom";

export default function AuthenticatedRoute({ children }) {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAppContext();
  const nav = useNavigate();

  if (!isAuthenticated) {
    nav(`/${pathname}`);
  }

  return children;
}