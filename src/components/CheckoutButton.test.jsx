import { render, screen, fireEvent, act } from "@testing-library/react";
import axios from "axios";
import CheckoutButton from "./CheckoutButton";

jest.mock("axios");

describe("CheckoutButton", () => {
  it("renders without crashing", async () => {
    const members = [
      { id: 1, payment_due: true, adult: true, player: "yes" },
      { id: 2, payment_due: true, adult: false, player: "no" },
    ];

    axios.post.mockResolvedValue({ data: "https://example.com" });

    await act(async () => {
      render(<CheckoutButton members={members} />);
    });

    expect(screen.getByText("Payments Due")).toBeInTheDocument();

    const payButton = screen.getByRole("button", { name: /pay membership/i });
    expect(payButton).toBeInTheDocument();
    fireEvent.click(payButton);

    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
