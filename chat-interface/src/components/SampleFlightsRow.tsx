import React, { useState, useEffect } from 'react';

export interface Flight {
  id: number;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureTime: string;
  price: string;
}

const sampleFlights: Flight[] = [
  {
    id: 1,
    airline: 'Alaska',
    flightNumber: 'AS101',
    departure: 'Seattle',
    arrival: 'London',
    departureTime: '10:00 AM',
    price: '$500'
  },
  {
    id: 2,
    airline: 'United',
    flightNumber: 'UA202',
    departure: 'Seattle',
    arrival: 'London',
    departureTime: '12:00 PM',
    price: '$550'
  },
  {
    id: 3,
    airline: 'Spirit',
    flightNumber: 'NK303',
    departure: 'Seattle',
    arrival: 'London',
    departureTime: '02:00 PM',
    price: '$600'
  }
];

const SampleFlightsRow: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 second loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        padding: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}>
        <div style={{ 
          width: '20px', 
          height: '20px', 
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #0055A4',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        overflowX: 'auto',
        padding: '10px',
        gap: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        background: 'white'
      }}
    >
      {sampleFlights.map(flight => (
        <div
          key={flight.id}
          style={{
            minWidth: '200px',
            border: '1px solid #0055A4',
            borderRadius: '8px',
            padding: '10px',
            backgroundColor: 'white'
          }}
        >
          <div><strong>{flight.airline} - {flight.flightNumber}</strong></div>
          <div>{flight.departure} to {flight.arrival}</div>
          <div>{flight.departureTime}</div>
          <div>{flight.price}</div>
          <button
            style={{
              marginTop: '8px',
              padding: '5px 10px',
              backgroundColor: '#0055A4',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => console.log(`Booked flight: ${flight.flightNumber}`)}
          >
            Book
          </button>
        </div>
      ))}
    </div>
  );
};

export default SampleFlightsRow;
