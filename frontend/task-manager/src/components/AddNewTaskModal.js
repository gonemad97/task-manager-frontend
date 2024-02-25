import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


const AddNewTaskModal = (props) => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(undefined);
    const [date, setDate] = useState("");
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const minDate = () => {
      const today = new Date().toISOString().split('T')[0];
      return today;
    };

    const handleSubmit = async(e) => {
      e.preventDefault();
      let body = {
        title: title
      }
      if(description) {
        body.description = description;
      }
      if(date) {
        body.deadline = date;
      }

    try {
      let res = await fetch("http://127.0.0.1:5000/tasks", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let taskRefreshResult = await fetch("http://127.0.0.1:5000/tasks?status=incomplete");
      let tasksJson = await taskRefreshResult.json();
      props.setTasks(tasksJson);

      if (res.status === 200 || res.status === 201) {
        setTitle("");
        setDescription("");
        setDate("");
      } else {
        console.log(e.message)
      }
    } catch (err) {
      console.log(err);
    }
    }
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Add New Task +
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="addTaskForm.ControlTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Buy groceries" value={title} onChange={(e) => setTitle(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="addTaskForm.ControlDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Don't forget tomatoes!" value={description} onChange={(e) => setDescription(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="addTaskForm.ControlDate">
                <Form.Label>Due By</Form.Label>
                <Form.Control type="date" value={date} min={minDate()} onChange={(e) => setDate(e.target.value)}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" type="submit" onClick={(e) => {handleSubmit(e); handleClose();}} >Create</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default AddNewTaskModal