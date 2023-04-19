import { useCallback, useEffect, useState } from "react";
import { StationInformation, StationStatus } from "../types";

const useBysykkelApi = () => {
  const [stations, setStations] = useState<StationInformation[]>();
  const [statusLookup, setStatusLookup] = useState<{
    [key: string]: StationStatus;
  }>({});

  const [stationsIsLoading, setStationsIsLoading] = useState(true);
  const [statusIsLoading, setStatusIsLoading] = useState(true);
  const isLoading = stationsIsLoading || statusIsLoading;
  const [hasError, setHasError] = useState(false);

  const getStations = useCallback(async () => {
    setStationsIsLoading(true);
    fetch(
      "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json"
    )
      .then((res) => res.json())
      .then((json) => {
        setStations(json.data.stations);
        setStationsIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setHasError(true);
      });
  }, []);

  const getStationStatus = useCallback(async () => {
    setStatusIsLoading(true);
    fetch("https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json")
      .then((res) => res.json())
      .then((json) => {
        const lookup: { [id: number]: StationStatus } = {};
        const stationStatus = json.data.stations;

        for (const status of stationStatus) {
          lookup[status.station_id] = status;
        }

        setStatusLookup(lookup);
        setStatusIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setHasError(true);
      });
  }, []);

  useEffect(() => {
    getStations();
    getStationStatus();
  }, [getStations, getStationStatus]);

  return {
    stations,
    statusLookup,
    isLoading,
    hasError,
  };
};

export default useBysykkelApi;
