import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckBoxInput from "./CheckBoxInput";

test("renders the provided label and options, and calls change handler when clicked", () => {
  const mockChange = jest.fn();
  const formData = {
    label: "Test Label",
    options: [
      {
        id: "1",
        name: "option1",
        label: "Option 1",
        message: "Option 1 message",
        parent: "parent1",
      },
      {
        id: "2",
        name: "option2",
        label: "Option 2",
        message: "Option 2 message",
        parent: "parent2",
      },
    ],
  };

  const { getAllByText, getByLabelText, getByText } = render(
    <CheckBoxInput formData={formData} change={mockChange} />
  );

  const labelElements = getAllByText("Test Label");
  expect(labelElements.length).toBe(2);
  expect(getByText("Option 1")).toBeInTheDocument();
  expect(getByText("Option 2")).toBeInTheDocument();

  userEvent.click(getByLabelText("Option 1"));
});
