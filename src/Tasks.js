/** @format */

import React, { useState } from "react";
import "./Tasks.css";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { db } from "./firebase";
import Modal from "./Modal";
import { IconButton, FormControl, Input, InputLabel } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleIcon from "@material-ui/icons/AddCircle";
function Tasks(props) {
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState("");

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const updateTask = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        text: input,
      },
      { merge: true }
    );
    setOpenModal(false);
    setInput("");
  };

  return (
    <div className="list-items">
      <div className="text">
        <AssignmentTurnedInIcon />
        <p>{props.todo.text}</p>
      </div>
      <Modal show={openModal}>
        <div className="modal_content">
          <div className="modal_input">
            <FormControl>
              <InputLabel>Edit Task</InputLabel>
              <Input
                placeholder={props.todo.text}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </FormControl>
          </div>
          <IconButton>
            <AddCircleIcon style={{ fontSize: 60 }} onClick={updateTask} />
          </IconButton>
          <CloseIcon onClick={handleModal} />
        </div>
      </Modal>
      <div className="edit-delete">
        <EditIcon onClick={handleModal} />
        <DeleteIcon
          onClick={(e) => db.collection("todos").doc(props.todo.id).delete()}
        />
      </div>
    </div>
  );
}

export default Tasks;
