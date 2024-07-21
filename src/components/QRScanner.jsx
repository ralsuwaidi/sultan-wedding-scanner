import React from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

function QRScanner({ onScan }) {
    return <Scanner onScan={onScan} allowMultiple={true} scanDelay={2000} />;
}

export default QRScanner;