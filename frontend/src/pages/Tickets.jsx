import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

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

  return <div>Tickets</div>;
}

export default Tickets;
