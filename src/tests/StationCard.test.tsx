import { render, screen } from "@testing-library/react";
import StationCard from "../components/StationCard";
import { stations, statusLookup } from "./mockData";

describe("StationCard", () => {
  const station = stations[0];
  const status = statusLookup[station.station_id];

  it("renders name, address, last updated, available bikes and available locks", () => {
    render(<StationCard station={station} status={status} />);

    expect(screen.getByText(station.name)).toBeVisible();
    expect(screen.getByText(station.address + ".")).toBeVisible();

    const availableBikes = screen.getByText(/Ledige sykler:/);
    expect(availableBikes).toHaveTextContent(/Ledige sykler: 10/);

    const availableDocks = screen.getByText(/Ledige låser:/);
    expect(availableDocks).toHaveTextContent(/Ledige låser: 0 av 10/);
  });

  it("renders timestamp as readable time", () => {
    render(<StationCard station={station} status={status} />);

    const lastUpdated = screen.getByText(/Sist oppdatert/);
    expect(lastUpdated).toHaveTextContent(/Sist oppdatert 14:50:00/);
  });
});
