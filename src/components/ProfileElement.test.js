import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for the "toBeInTheDocument" matcher
import ProfileElement from "./ProfileElement"; // adjust the path as necessary

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

  // You can add more tests, e.g., tests for different props, tests for any interaction logic (if added in the future), etc.
});
