import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';

function Tickets() {
  const { isError, isLoading, isSuccess, message, tickets } = useSelector(
    (state) => state.ticket
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());

    if (isError) {
      toast.error(message);
    }

    return () => {
      if (isSuccess || tickets) {
        dispatch(reset());
      }
    };
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url='/' />
      <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
}

export default Tickets;
