import { useState, useEffect } from 'react';
import { useTickets } from './useTickets';
import { handleScan as scanTicket } from '../utils/ticketUtils';

export function useTicketManagement() {
    const [scannedValue, setScannedValue] = useState(null);
    const [scanedTimes, setScanedTimes] = useState(0);
    const [modalContent, setModalContent] = useState({ type: '', message: '' });

    const { tickets, fetchTickets } = useTickets();

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const handleReset = () => {
        setScannedValue(null);
        setModalContent({ type: '', message: '' });
        fetchTickets()
    };

    const handleScan = async (result) => {
        if (result) {


            const value = result[0].rawValue;
            setScannedValue(value);
            console.log(tickets)
            const { modalContent, scanedTimes } = await scanTicket(value, tickets);
            setModalContent(modalContent);
            setScanedTimes(scanedTimes);
            document.getElementById('my_modal_1').showModal()
        }
    };

    return {
        modalContent,
        scannedValue,
        scanedTimes,
        handleScan,
        handleReset
    };
}