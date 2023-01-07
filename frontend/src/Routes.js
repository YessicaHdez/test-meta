import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Files from "./containers/Files";
import NewDataElement from "./containers/NewDataElement";
import DataElement from "./containers/DataElement";
import ResetPassword from "./containers/ResetPassword";
import EditFile from "./containers/EditFile";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
//import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Unauthorized from "./containers/Unauthorized";

export default function Links() {
  return (
    <Routes>
      <Route path="/home" element={<AuthenticatedRoute><Home /></AuthenticatedRoute>} />
      <Route path="/" element={<Files />}/>
      <Route path="/files" element={<AuthenticatedRoute><Files /></AuthenticatedRoute>} />
      <Route path="/filesEdit" element={<AuthenticatedRoute><EditFile /></AuthenticatedRoute>} />
      <Route path="/login" element={<Login /> } />

      <Route path="/unautho" element={<Unauthorized />} />


      <Route path="/dataElement/:id" element={<AuthenticatedRoute><DataElement /></AuthenticatedRoute>} />
      <Route path="/newDataElement" element={<AuthenticatedRoute><NewDataElement /></AuthenticatedRoute>} />
      
      <Route path="*" element={<NotFound />} />
      <Route path="/reset"element={<ResetPassword />}/>
    </Routes>
  );
}