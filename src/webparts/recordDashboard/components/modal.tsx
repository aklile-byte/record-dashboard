import * as React from "react";
import "./modal.css";

const Modal = ({ handleClose, show, children }) => {
  console.log("under modal");
  console.log(show);
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        {/* <button type="button" onClick={handleClose}>
          Close
        </button> */}
      </section>
    </div>
  );
};

export default Modal;
