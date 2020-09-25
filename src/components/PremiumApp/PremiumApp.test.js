import React from "react";

import ReactDOM from "react-dom";

import PremiumApp from "./PremiumApp";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<PremiumApp />, div);

  ReactDOM.unmountComponentAtNode(div);
});
