import React, { useState } from "react";
import Seat from "./Seat";

const SeatBooking = ({
  bookTickets,
  bookedSeats,
  maxLimit,
  onReset,
  totalSeats,
  lastBookedSeats,
}) => {
  const [bookingCount, setBookingCount] = useState(1);
  return (
    <div className="w-full h-full flex items-center justify-evenly">
      <div className="space-y-2 w-full md:max-w-sm mt-4 bg-white rounded-md shadow-md px-2 py-4 ">
        <div className="display flex gap-2">
          <h3 className="font-semibold text-lg tracking-wide">Book seats</h3>
          <div className="flex gap-1">
            {lastBookedSeats.map((seatNumber) => (
              <Seat seatNum={seatNumber} bookingStatus={true} />
            ))}
          </div>
        </div>
        <div className="flex gap-2 w-full justify-between">
          <input
            className="w-md border focus:outline-none focus:ring-2 focus:border-0 rounded-md px-4 py-2 text-sm"
            onChange={(e) => setBookingCount(parseInt(e.target.value))}
            type="number"
            min={1}
            max={Math.min(maxLimit, totalSeats - bookedSeats)}
            value={bookingCount}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") {
                bookTickets(parseInt(bookingCount));
              }
            }}
          />
          <button
            className={`px-4 py-2 font-semibold tracking-wider bg-blue-400 text-white rounded-md shadow-md hover:bg-blue-500 disabled:bg-gray-500 w-56`}
            onClick={() => bookTickets(parseInt(bookingCount))}
            disabled={
              bookingCount < 1 ||
              bookingCount >
                Math.min(Math.min(maxLimit, totalSeats - bookedSeats))
            }
          >
            Book
          </button>
        </div>
        <button
          className="px-4 py-2 font-semibold tracking-wider bg-blue-400 text-white rounded-md shadow-md w-full hover:bg-blue-500"
          onClick={onReset}
        >
          Reset Booking
        </button>
      </div>
    </div>
  );
};

export default SeatBooking;
