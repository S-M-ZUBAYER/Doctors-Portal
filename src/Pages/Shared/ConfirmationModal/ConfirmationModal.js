import React from 'react';

const ConfirmationModal = ({ title, message, closeModal, successAction, modalData, successActionName }) => {
    return (
        <div>
            {/* The button to open modal */}


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={() => successAction(modalData)}
                            htmlFor="confirmation-modal"
                            className="btn btn-error"
                        >{successActionName}</label>
                        <button onClick={closeModal} className="btn btn-outline">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;