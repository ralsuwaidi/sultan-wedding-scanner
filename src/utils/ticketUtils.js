import { supabase } from "../lib/supabaseConfig";

export async function fetchTickets() {
    const { data, error } = await supabase.from('ticket').select('*');
    if (error) {
        console.error('Error fetching tickets:', error);
        return [];
    }
    return data;
}

export async function handleScan(scannedId, tickets) {
    await fetchTickets()
    const existingTicket = tickets.find(ticket => ticket.id.toString() === scannedId.toString());
    console.log(existingTicket)
    console.log(scannedId)
    console.log(tickets)

    if (existingTicket) {
        return await updateTicket(existingTicket);
    } else {
        return await createTicket(scannedId);
    }
}

async function updateTicket(existingTicket) {
    const { data, error } = await supabase
        .from('ticket')
        .update({ times_scanned: existingTicket.times_scanned + 1 })
        .eq('id', existingTicket.id);


    if (error) {
        console.error('Error updating ticket:', error);
        return {
            modalContent: { type: 'error', message: 'Error updating ticket' },
            scanedTimes: existingTicket.times_scanned
        };
    }

    return {
        modalContent: { type: 'info', message: 'Ticket Scanned Before' },
        scanedTimes: existingTicket.times_scanned + 1
    };
}

async function createTicket(scannedId) {
    const { error } = await supabase
        .from('ticket')
        .insert([{ id: scannedId }]);

    if (error) {
        console.error('Error creating ticket:', error);
        return {
            modalContent: { type: 'error', message: 'Ticket has been scanned before!' },
            scanedTimes: 0
        };
    }

    return {
        modalContent: { type: 'success', message: 'New ticket created successfully' },
        scanedTimes: 1
    };
}