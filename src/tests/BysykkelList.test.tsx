import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BysykkelList from "../components/BysykkelList";
import { stations, statusLookup } from "./mockData";

describe("Bysykkellist", () => {
  it("renders loading message when isLoading is true", () => {
    render(
      <BysykkelList
        stations={stations}
        statusLookup={statusLookup}
        isLoading={true}
      />
    );

    expect(screen.getByText(/Laster bysykkel-data/)).toBeVisible();
  });

  it("renders all stations when isLoading is false", () => {
    render(
      <BysykkelList
        stations={stations}
        statusLookup={statusLookup}
        isLoading={false}
      />
    );

    stations.forEach((station) => {
      expect(screen.getByText(station.name)).toBeVisible();
    });
  });

  it("can filter station list by text", async () => {
    const user = userEvent.setup();
    render(
      <BysykkelList
        stations={stations}
        statusLookup={statusLookup}
        isLoading={false}
      />
    );

    expect(screen.getByText(/Station 1/)).toBeVisible();
    expect(screen.getByText(/Station 2/)).toBeVisible();

    const searchInput = screen.getByLabelText(/Søk på stativnavn/);

    await user.type(searchInput, "Station 1");

    expect(screen.getByText(/Station 1/)).toBeVisible();
    expect(screen.queryByText(/Station 2/)).toBeNull();
  });

  it("filters stations based on available bikes and parking filters", async () => {
    const user = userEvent.setup();
    render(
      <BysykkelList
        stations={stations}
        statusLookup={statusLookup}
        isLoading={false}
      />
    );

    expect(screen.getByText(/Station 1/)).toBeVisible();
    expect(screen.getByText(/Station 2/)).toBeVisible();

    const bikesFilterCheckbox = screen.getByText(
      /Vis kun stativer med ledige sykler/
    );
    const parkingFilterCheckbox = screen.getByText(
      /Vis kun stativer med ledige låser/
    );

    await user.click(bikesFilterCheckbox);
    expect(screen.queryByText(/Station 2/)).toBeNull();

    await user.click(parkingFilterCheckbox);
    expect(screen.queryByText(/Station 1/)).toBeNull();
  });
});
