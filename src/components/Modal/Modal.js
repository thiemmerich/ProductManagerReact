import React from 'react';

import './Modal.css';

const Modal = ({ show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className='formTitle'>
        <h1>Cadastro de produto</h1>
        <button >X</button>
      </div>
      <section className="modal-main">
        {children}
      </section>
    </div>
  );
};

export default Modal;