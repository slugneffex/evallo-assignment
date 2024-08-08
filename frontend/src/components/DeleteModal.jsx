// DeleteModal.js
import React from 'react';

function DeleteModal({
  isOpen,
  close,
  title,
  message,
  action,
  actionText = 'Delete',
  cancelText = 'Cancel',
  containerClassName = '',
  containerStyle = {},
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={close}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-sm ${containerClassName}`}
        style={containerStyle}
        onClick={(e) => e.stopPropagation()} // Prevents the modal from closing when clicking inside
      >
        <div className="flex flex-col items-center">
          {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
          {message && <p className="text-gray-700 mb-6 text-center">{message}</p>}
          <div className="flex gap-4">
            <button
              onClick={action}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              {actionText}
            </button>
            <button
              onClick={close}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
