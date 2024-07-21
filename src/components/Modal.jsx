// src/components/Modal.js

import React from 'react';

function Modal({ content, scannedValue, onClose }) {
    const textColor = content.type === 'success' ? 'text-green-800' :
        content.type === 'error' ? 'text-red-800' : 'text-gray-800';

    const isScannedBefore = content.message.toLowerCase().includes('scanned before');

    return (
        <dialog className="modal" id="my_modal_1">
            <div className="modal-box">
                {isScannedBefore && (
                    <div role="alert" className="alert alert-error">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Error! Ticket has been scanned before.</span>
                    </div>
                )}

                {!isScannedBefore && (
                    <div role="alert" className="alert alert-success">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Success</span>
                    </div>
                )}

                <p>{content.message}</p>
                <p>Ticket Number: {scannedValue}</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button
                            className="btn btn-primary"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}

export default Modal;