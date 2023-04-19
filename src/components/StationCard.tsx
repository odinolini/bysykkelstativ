import { StationInformation, StationStatus } from "../types";

interface StationCardProps {
  station: StationInformation;
  status?: StationStatus;
}

const StationCard = ({ station, status }: StationCardProps) => {
  return (
    <li className="station-card">
      <h1>{station.name}</h1>
      <p>
        {station.address}.{" "}
        {status?.last_reported && (
          <span>
            Sist oppdatert{" "}
            {/* multiply reported with 1000 to get timestamp in ms */}
            {new Date(status?.last_reported * 1000).toLocaleTimeString()}
          </span>
        )}
      </p>
      <hr />
      <p>
        Ledige sykler:
        <span className="emphasis"> {status?.num_bikes_available}</span>
      </p>
      <p>
        Ledige låser:
        <span className="emphasis"> {status?.num_docks_available}</span> av{" "}
        <span className="emphasis"> {station.capacity}</span>
      </p>
    </li>
  );
};

export default StationCard;
