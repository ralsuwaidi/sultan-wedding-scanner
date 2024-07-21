// src/components/Modal.js

import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

function Modal({ content, scannedValue, onClose }) {
    const isScannedBefore = content.message.toLowerCase().includes('scanned before') || content.message.toLowerCase().includes('error');

    return (
        <dialog className="modal" id="my_modal_1">
            <div className="modal-box">
                <div>
                    <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${isScannedBefore ? 'bg-red-100' : 'bg-green-100'}`}>
                        {isScannedBefore ? (
                            <XMarkIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        ) : (
                            <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                        )}
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                        <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            {isScannedBefore ? 'Scan Failed' : 'Scan Successful'}
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500 dark:text-white">
                                {content.message}
                            </p>
                            <p className="text-sm text-gray-500">
                                Ticket Number: {scannedValue}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 sm:mt-6">
                    <form method="dialog">
                        <button
                            onClick={onClose}
                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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