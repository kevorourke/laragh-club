import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
describe("Footer component", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("renders without crashing", () => {
    expect(
      screen.getByText(/Laragh United GAA, Inc. All rights reserved./i)
    ).toBeInTheDocument();
  });

  it("renders social media links", () => {
    const facebookLink = screen.getByRole("link", { name: /facebook/i });
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute(
      "href",
      "https://www.facebook.com/LaraghUnitedGAA/"
    );

    const instagramLink = screen.getByRole("link", { name: /instagram/i });
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute(
      "href",
      "https://www.instagram.com/laraghutd/"
    );

    const twitterLink = screen.getByRole("link", { name: /twitter/i });
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute(
      "href",
      "https://twitter.com/LaraghUnitedGAA"
    );
  });
});
