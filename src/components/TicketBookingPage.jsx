import React, { useReducer, useState } from "react";
import SeatBooking from "./SeatBooking";
import SeatsPanel from "./SeatsPanel";

const TOTAL_SEATS = 80;
const SEATS_PER_ROW = 7;
const MAX_BOOKING_LIMIT = 7;

// will generate the coach seats as metioned in question
// the array position will be TRUE if the sear is booked
const generateInitialSeats = () => {
  const rows = [];
  let remainingSeats = TOTAL_SEATS;

  while (remainingSeats > 0) {
    const rowSeatCount = Math.min(SEATS_PER_ROW, remainingSeats);
    rows.push(Array(rowSeatCount).fill(false));
    remainingSeats -= rowSeatCount;
  }

  return rows;
};

// helper function for booking the tickets

// finds all to available seats and marks their coordinates
const getAvailableSeats = (seatsGrid) => {
  const available = [];
  seatsGrid.forEach((row, rowIndex) => {
    row.forEach((isBooked, colIndex) => {
      if (!isBooked) {
        available.push([rowIndex, colIndex]);
      }
    });
  });
  return available;
};

// tries to allocate seats in same
const findSameRowChunk = (availableSeats, count) => {
  for (let i = 0; i <= availableSeats.length - count; i++) {
    const chunk = availableSeats.slice(i, i + count);
    if (chunk.at(0)[0] === chunk.at(-1)[0]) return chunk;
  }
  return null;
};

// tries to allocate closest seats possible
const findClosestChunk = (availableSeats, count) => {
  let bestChunk = null;
  let minDistance = Infinity;

  for (let i = 0; i <= availableSeats.length - count; i++) {
    const chunk = availableSeats.slice(i, i + count);
    const [startRow, startCol] = chunk[0];
    const [endRow, endCol] = chunk[chunk.length - 1];

    const startIndex = startRow * SEATS_PER_ROW + startCol;
    const endIndex = endRow * SEATS_PER_ROW + endCol;
    const distance = endIndex - startIndex;

    if (distance < minDistance) {
      minDistance = distance;
      bestChunk = chunk;
    }
  }
  return bestChunk;
};

const TicketBookingPage = () => {
  const [seats, setSeats] = useState(generateInitialSeats());
  const [totalBooked, setTotalBooked] = useState(0);
  const [lastBookedSeats, setLastBookedSeats] = useState([])
  const bookTickets = (requestedCount) => {
    if(isNaN(requestedCount)){
      alert("Invalid input, please enter a positive integer.")
      return
    }
    if (requestedCount > MAX_BOOKING_LIMIT) {
      alert(
        `Can't booked more than ${MAX_BOOKING_LIMIT} tickets at a time !!!`
      );
      return
    }
    if (requestedCount <= 0) {
      alert(`Can only book tickets in range 1-${MAX_BOOKING_LIMIT}`);
      return
    }
    if (requestedCount > TOTAL_SEATS - totalBooked) {
      alert("Request tickets is more than the available tickets !!!!");
      return
    }
    setSeats((prevSeats) => {
      const newSeats = prevSeats.map((row) => [...row]);
      const availableSeats = getAvailableSeats(prevSeats);

      let seatsToBook = findSameRowChunk(availableSeats, requestedCount);
      if (!seatsToBook) {
        seatsToBook = findClosestChunk(availableSeats, requestedCount);
      }
      if (seatsToBook) {
        setLastBookedSeats(seatsToBook.map(([row, col]) => row * SEATS_PER_ROW + col + 1))
        seatsToBook.forEach(([row, col]) => {
          newSeats[row][col] = true;
        });
      }
      return newSeats;
    });
    alert(`Booked ${requestedCount} tickets successfully.`)
    setTotalBooked((prev) => prev + requestedCount);
  };

  const clearAllBookings = () => setSeats(generateInitialSeats());

  return (
    <div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 my-auto bg-gray-50">
        <SeatsPanel
          seats={seats}
          seatsPerRow={SEATS_PER_ROW}
          totalSeats={TOTAL_SEATS}
          bookedSeats={totalBooked}
        />
        <SeatBooking
          bookTickets={bookTickets}
          bookedSeats={totalBooked}
          maxLimit={MAX_BOOKING_LIMIT}
          onReset={clearAllBookings}
          totalSeats={TOTAL_SEATS}
          lastBookedSeats = {lastBookedSeats}
        />
      </div>
    </div>
  );
};

export default TicketBookingPage;
