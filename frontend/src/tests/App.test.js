import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("Renderira App bez errora", () => {
    render(<App />);
});