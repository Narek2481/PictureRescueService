import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit_modal } from "../../../reducers/modal/modal_slice";

const modal = {
  position: "fixed",
  zIndex: 1,
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
    const is_open = useSelector((state) => state.modal.modal_data.modal);
    const paylod = {modal:!is_open,modal_img:src}
  return <div  style={{cursor:"pointer"}} onClick={()=> {
    dispatch(edit_modal(paylod))
  }}> {children}</div>;
};

export const ModalContent = ({ children }) => {
    const is_open = useSelector((state) => state.modal.modal_data);
    const dispatch = useDispatch();
  return (
    <div style={modal}>
      <span style={close} onClick={() => dispatch(edit_modal({modal:!is_open.modal,modal_img:is_open.modal_img}))}>
        &times;
      </span>
      <div style={modalContent}>{children}</div>
    </div>
  );
};