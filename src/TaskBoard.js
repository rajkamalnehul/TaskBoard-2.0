/** @format */

import React, { useState, useEffect } from "react";
import "./TaskBoard.css";
import logo from "./assets/logo.png";
import { useStateValue } from "./StateProvider";
import {
  Avatar,
  IconButton,
  Drawer,
  Button,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FaceIcon from "@material-ui/icons/Face";
import EmailIcon from "@material-ui/icons/Email";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "./Modal.js";
import Tasks from "./Tasks";
import { db, auth } from "./firebase";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

function TaskBoard() {
  const [{ user }] = useStateValue();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        //console.log(snapshot.docs.map((doc) => doc.data()
        setTasks(
          snapshot.docs.map((doc) => ({ id: doc.id, text: doc.data().text }))
        );
      });
  }, []);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const addTask = () => {
    db.collection("todos").add({
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
    setOpenModal(false);
  };

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
      history.push("/signin");

      // console.log("user", user);
    }
  };

  return (
    <div className="taskboard">
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="profile">
          <IconButton>
            <AccountCircleIcon
              style={{ fontSize: 50 }}
              onClick={handleDrawer}
            />
          </IconButton>

          <Drawer
            variant="temporary"
            anchor="right"
            open={open}
            onClose={() => setOpen(false)}
          >
            <div className="slider">
              <div className="slider_header">
                <div className="slider_headerContent">
                  <div className="logo">
                    <img src={logo} alt="logo" />
                  </div>
                </div>
              </div>
              <div classname="slider_body">
                <div className="Profile_pic">
                  <div className="avatar">
                    <Avatar src={`https://picsum.photos/50/50`} />
                    <span>Profile</span>
                  </div>
                </div>

                <div className="user_details">
                  <FaceIcon fontSize="large" />
                  <span>{user ? user?.displayName : "Hello,Guest"}</span>
                </div>

                <div className="user_details">
                  <EmailIcon fontSize="large" />
                  <span>{user ? user?.email : "Email Not Verified"}</span>
                </div>
                <div className="button_container">
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={handleAuthentication}
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
      <div className="taskboad_body">
        <div className="tasks_container">
          {tasks.map((todo) => (
            <Tasks todo={todo} />
          ))}
        </div>
      </div>

      <Modal show={openModal}>
        <div className="modal_content">
          <div className="modal_input">
            <FormControl>
              <InputLabel>Add a Task</InputLabel>
              <Input value={input} onChange={(e) => setInput(e.target.value)} />
            </FormControl>
          </div>
          <IconButton>
            <AddCircleIcon style={{ fontSize: 60 }} onClick={addTask} />
          </IconButton>
          <CloseIcon onClick={handleModal} />
        </div>
      </Modal>

      <div className="taskboard_footer">
        <IconButton>
          <AddCircleIcon style={{ fontSize: 60 }} onClick={handleModal} />
        </IconButton>
      </div>
    </div>
  );
}

export default TaskBoard;
