import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { MemoryRouter } from "react-router-dom";

describe("Header", () => {
  it("renders header title", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toBeVisible();
    expect(title).toHaveTextContent("Bysykkelstativer");
  });

  it("renders navigation links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const listLink = screen.getByRole("link", { name: "Listevisning" });
    const mapLink = screen.getByRole("link", { name: "Kartvisning" });

    expect(listLink.getAttribute("href")).toBe("/");
    expect(mapLink.getAttribute("href")).toBe("/kart");
  });
});
