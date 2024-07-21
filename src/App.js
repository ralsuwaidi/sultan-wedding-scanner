import React from 'react';
import QRScanner from './components/QRScanner';
import Modal from './components/Modal';
import { useTicketManagement } from './hooks/useTicketManagement';
import './App.css';

function App() {
  const {
    modalContent,
    scannedValue,
    scanedTimes,
    handleScan,
    handleReset
  } = useTicketManagement();

  return (
    <div className="w-screen h-screen">
      <QRScanner onScan={handleScan} />
      <Modal
        content={modalContent}
        scannedValue={scannedValue}
        scanedTimes={scanedTimes}
        onClose={handleReset}
      />
    </div>
  );
}

export default App;