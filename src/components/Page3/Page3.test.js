import React from "react";

import ReactDOM from "react-dom";

import { MemoryRouter, Route } from "react-router-dom";

import Page3 from "./Page3";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <Page3 />
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});