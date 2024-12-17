import React from 'react';
import PropTypes from 'prop-types';

function DeleteButtonModal({
    isOpen,
    message,
    onConfirm,
    onCancel,
    confirmText = "Yes",
    cancelText = "No"
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md text-center w-96">
                <p className="mb-4">{message}</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        {confirmText}
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}

DeleteButtonModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string
};


export default DeleteButtonModal;