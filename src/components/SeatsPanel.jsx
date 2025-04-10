import React from "react";
import Seat from "./Seat";

const SeatsPanel = ({ seats, seatsPerRow, totalSeats, bookedSeats }) => {
  return (
    <div className="w-fit space-y-3">
      <h2 className="font-semibold text-xl tracking-wider text-center">Ticket Booking</h2>
      {/* panel to show seats status */}
      <div className="border p-4 rounded w-fit bg-white">
        {seats.map((row, rowNum) => (
          <div key={rowNum} className="mb-2 w-full flex justify-start gap-2">
            {row.map((seat, seatNum) => (
              <Seat
                seatNum={seatsPerRow * rowNum + seatNum + 1}
                bookingStatus={seat}
                key={seatsPerRow * rowNum + seatNum + 1}
              />
            ))}
          </div>
        ))}
      </div>
      {/* seats counts badge */}
      <div className="w-fit gap-2 flex justify-between">
        <span className="px-6 py-3 bg-red-600 text-white rounded-md shadow-md font-bold text-xs md:text-base">
          Boooked Seats = {bookedSeats}
        </span>
        <span className="px-6 py-3 bg-green-600 text-white rounded-md shadow-md font-bold text-xs md:text-base">
          Available Seats = {totalSeats - bookedSeats}
        </span>
      </div>
    </div>
  );
};

export default SeatsPanel;
