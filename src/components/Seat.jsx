import React from 'react'

const Seat = ({seatNum, bookingStatus}) => {
  return (
    <span className={`w-8 h-8 text-xs grid place-content-center text-center px-2 py-1 box-border text-white font-bold tracking-wider rounded-sm shadow-md ${bookingStatus ? "bg-red-500": "bg-green-500"}`}>
      {seatNum}
    </span >
  )
}

export default Seat
