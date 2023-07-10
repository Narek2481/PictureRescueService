import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RemoveScroll } from 'react-remove-scroll';
import { editModal } from "../../../redux/modal/modalSlice";

const modal = {
  position: "fixed",
  zIndex: 1000000001,
  left: 0,
  top: 0,
  width: "100vw",
  height: "100vh",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.8)"
};

const close = {
  position: "absolute",
  top: 15,
  right: 35,
  color: "#f1f1f1",
  fontSize: 40,
  fontWeight: "bold",
  cursor: "pointer"
};

const modalContent = {
  display: "flex",
  alignItems: "center",
  width: "85%",
  height: "100%",
  margin: "auto"
};

export const Modal = ({ src, children }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.modalData.modal);
  const paylod = { modal: !isOpen, modalImg: src }
  return <div className="text-center" style={{ cursor: "pointer" }} onClick={() => {
    dispatch(editModal(paylod))
  }}> {children}</div>;
};

export const ModalContent = ({ children }) => {
  const isOpen = useSelector((state) => state.modal.modalData);
  const dispatch = useDispatch();
  return (

    <RemoveScroll>

      <div style={modal}>
        <span style={close} onClick={() => dispatch(editModal({ modal: !isOpen.modal, modalImg: isOpen.modalImg }))}>
          &times;
        </span>
        <div style={modalContent}>{children}</div>
      </div>

    </RemoveScroll>

  );
};