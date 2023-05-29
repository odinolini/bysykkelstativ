import { MapContainer, TileLayer, Circle, Popup, Tooltip } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { StationInformation, StatusLookup } from "../../types";
import StationCard from "../StationCard";
import "leaflet/dist/leaflet.css";
import "./map.css";

interface MapProps {
  stations: StationInformation[] | undefined;
  statusLookup: StatusLookup;
}

const Map = ({ stations, statusLookup }: MapProps) => {
  const osloPosition: LatLngExpression = [59.93, 10.73];

  if (!stations || !statusLookup) return null;

  return (
    <div className="map-container">
      <MapContainer
        center={osloPosition}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stations.map((station) => (
          <Circle
            key={station.station_id}
            center={[station.lat, station.lon]}
            radius={20}
          >
            <Tooltip permanent direction="top" className="tooltip">
              <ul>
                <li>
                  <span role="img" aria-label="Ledige sykler">
                    🚲
                  </span>{" "}
                  {statusLookup[
                    station.station_id
                  ]?.num_bikes_available.toString()}
                </li>
                <li>
                  <span role="img" aria-label="Ledige låser">
                    🅿️
                  </span>{" "}
                  {statusLookup[
                    station.station_id
                  ]?.num_docks_available.toString()}
                </li>
              </ul>
            </Tooltip>
            <Popup autoClose>
              <StationCard
                key={station.station_id}
                station={station}
                status={statusLookup[station.station_id]}
              />
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
