import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Files from "./containers/Files";
import NewDataElement from "./containers/NewDataElement";
import DataElement from "./containers/DataElement";
export default function Links() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/files" element={<Files />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dataElement/:id" element={<DataElement />} />
      <Route path="/newDataElement" element={<NewDataElement />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}