import { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import './App.css';
import { supabase } from "./lib/supabaseConfig"

function App() {
  const [tickets, setTickets] = useState([]);
  const [scannedValue, setScannedValue] = useState(null);
  const [scanedTimes, setScanedTimes] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchTickets();
  }, []);

  async function fetchTickets() {
    const { data, error } = await supabase.from('ticket').select('*');
    console.log(data)
    if (error) {
      console.error('Error fetching tickets:', error);
    } else {
      setTickets(data);
    }
  }

  function handleReset() {
    setScannedValue(null);
    setIsModalOpen(false);
    setModalContent({ type: '', message: '' });
  }

  async function handleScan(result) {
    if (result) {
      const value = result[0].rawValue
      console.log(value)
      setScannedValue(value);
      await checkAndUpdateTicket(value);
    }
  }

  async function checkAndUpdateTicket(scannedId) {
    const existingTicket = tickets.find(ticket => ticket.id.toString() === scannedId);
    console.log(scannedId)

    if (existingTicket) {
      // update the ticket
      const { data, error } = await supabase
        .from('ticket')
        .update({ times_scanned: existingTicket.times_scanned + 1 })
        .eq('id', scannedId);

      if (error) {
        console.error('Error updating ticket:', error);
        setModalContent({ type: 'error', message: 'Error updating ticket' });
      } else {
        const timesScanned = existingTicket.times_scanned;
        setScanedTimes(timesScanned);
        setModalContent({ type: 'info', message: 'Ticket scanned ', timesScanned });
      }
    } else {

      const { error } = await supabase
        .from('ticket')
        .insert([{ id: scannedId }]);

      if (error) {
        console.error('Error creating ticket:', error);
        setModalContent({ type: 'error', message: 'Error creating ticket' });
      } else {
        setModalContent({ type: 'success', message: 'New ticket created successfully' });
      }
    }

    setIsModalOpen(true);
    fetchTickets(); // Refresh the tickets list
  }

  return (
    <div className="w-screen h-screen relative">
      <Scanner onScan={handleScan} allowMultiple={true} />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`p-6 rounded-lg shadow-xl ${modalContent.type === 'success' ? 'bg-green-100' :
            modalContent.type === 'error' ? 'bg-red-100' : 'bg-white'
            }`}>
            <h2 className={`text-xl font-bold mb-4 ${modalContent.type === 'success' ? 'text-green-800' :
              modalContent.type === 'error' ? 'text-red-800' : 'text-gray-800'
              }`}>
              {modalContent.type === 'success' ? 'Success' :
                modalContent.type === 'error' ? 'Error' : 'Info'}
            </h2>
            <p>{modalContent.message}</p>
            <p>Scanned value: {scannedValue}</p>
            <p>Scanned times: {scanedTimes}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleReset}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;