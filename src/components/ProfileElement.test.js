import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for the "toBeInTheDocument" matcher
import ProfileElement from "./ProfileElement";

describe("<ProfileElement />", () => {
  it("renders the provided label and value", () => {
    const label = "Name";
    const value = "John Doe";

    const { getByText } = render(
      <ProfileElement label={label} value={value} />
    );

    expect(getByText(label)).toBeInTheDocument();
    expect(getByText(value)).toBeInTheDocument();
  });
});
