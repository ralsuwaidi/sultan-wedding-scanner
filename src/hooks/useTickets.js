import { useState, useCallback } from 'react';
import { fetchTickets as fetchTicketsFromAPI } from '../utils/ticketUtils';

export function useTickets() {
    const [tickets, setTickets] = useState([]);

    const fetchTickets = useCallback(async () => {
        const fetchedTickets = await fetchTicketsFromAPI();
        setTickets(fetchedTickets);
    }, []);


    return { tickets, fetchTickets };
}