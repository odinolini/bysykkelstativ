import { useState } from "react";
import { StationInformation } from "../types";
import StationCard from "./StationCard";
import useBysykkelApi from "../hooks/useBysykkelApi";

const BysykkelList = () => {
  const { stations, statusLookup, isLoading, hasError } = useBysykkelApi();

  const [searchValue, setSearchValue] = useState("");
  const [hasAvailableBikesFilter, setAvailableBikesFilter] = useState(false);
  const [hasAvailableParkingFilter, setAvailableParkingFilter] =
    useState(false);

  if (hasError) {
    return (
      <div>
        <p className="error">Noe gikk galt! Prøv igjen senere.</p>
      </div>
    );
  }

  const searchFilter = (el: StationInformation) =>
    el.name.toLowerCase().includes(searchValue.toLowerCase());

  const availableBikesFilter = (el: StationInformation) =>
    hasAvailableBikesFilter
      ? statusLookup[el.station_id].num_bikes_available > 0
      : true;

  const availableParkingFilter = (el: StationInformation) =>
    hasAvailableParkingFilter
      ? statusLookup[el.station_id].num_docks_available > 0
      : true;

  return (
    <div aria-live="polite" aria-busy={isLoading}>
      {isLoading && <div className="loading">Laster bysykkel-data </div>}

      <div className="station-list">
        <fieldset>
          <input
            className="search"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Søk på stativnavn"
          />
          <label htmlFor="availableBikes">
            <input
              id="availableBikes"
              type="checkbox"
              checked={hasAvailableBikesFilter}
              onChange={() => setAvailableBikesFilter((prev) => !prev)}
            />
            Vis kun stativer med ledige sykler
          </label>
          <label htmlFor="hasCapacity">
            <input
              id="hasCapacity"
              type="checkbox"
              checked={hasAvailableParkingFilter}
              onChange={() => setAvailableParkingFilter((prev) => !prev)}
            />
            Vis kun stativer med ledige låser
          </label>
        </fieldset>
        <ul>
          {stations
            ?.filter(searchFilter)
            .filter(availableBikesFilter)
            .filter(availableParkingFilter)
            .map((station) => (
              <StationCard
                key={station.station_id}
                station={station}
                status={statusLookup[station.station_id]}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default BysykkelList;
