import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "../App";
import useBysykkelApi from "../hooks/useBysykkelApi";

vi.mock("../hooks/useBysykkelApi");

describe("App", () => {
  it("renders the header", () => {
    (useBysykkelApi as any).mockImplementation(() => ({
      stations: undefined,
      statusLookup: {},
      isLoading: false,
      hasError: false,
    }));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Bysykkelstativer")).toBeInTheDocument();
  });

  it("renders the error message when there is an error", async () => {
    (useBysykkelApi as any).mockImplementation(() => ({
      stations: [],
      statusLookup: {},
      isLoading: false,
      hasError: true,
    }));

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(
      await screen.findByText("Noe gikk galt! Prøv igjen senere.")
    ).toBeInTheDocument();
  });

  it('renders the BysykkelList component when the route is "/"', () => {
    (useBysykkelApi as any).mockImplementation(() => ({
      stations: [],
      statusLookup: {},
      isLoading: false,
      hasError: false,
    }));

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("bysykkellist")).toBeInTheDocument();
  });

  it('renders the Map component when the route is "/kart"', () => {
    (useBysykkelApi as any).mockImplementation(() => ({
      stations: [],
      statusLookup: {},
      isLoading: false,
      hasError: false,
    }));
    const { container } = render(
      <MemoryRouter initialEntries={["/kart"]}>
        <App />
      </MemoryRouter>
    );

    expect(container.getElementsByClassName("map-container").length).toBe(1);
  });
});
