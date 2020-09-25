import React from "react";

import ReactDOM from "react-dom";

import { MemoryRouter, Route } from "react-router-dom";

import Page2 from "./Page2";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <Page2 />
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});