import { StationInformation, StatusLookup } from "../types";

export const stations: StationInformation[] = [
  {
    station_id: "1",
    name: "Station 1",
    address: "Address 1",
    lat: 52.52,
    lon: 13.41,
    capacity: 10,
  },
  {
    station_id: "2",
    name: "Station 2",
    address: "Address 2",
    lat: 53.55,
    lon: 14.45,
    capacity: 15,
  },
];

export const statusLookup: StatusLookup = {
  "1": {
    is_installed: true,
    is_renting: true,
    num_bikes_available: 10,
    num_docks_available: 0,
    last_reported: 1622033400,
    is_returning: true,
    station_id: "1",
  },
  "2": {
    is_installed: true,
    is_renting: true,
    num_bikes_available: 0,
    num_docks_available: 15,
    last_reported: 1622033400,
    is_returning: true,
    station_id: "2",
  },
};
