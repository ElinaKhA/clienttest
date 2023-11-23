import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export default class EditBookModal extends Component {
  constructor(props) {
    super(props);
     this.state = {
       book:{
         bid: props.bid,
         bname: props.bname,
         bauthor: props.bauthor,
         bgenre: props.bgenre,
         bstatus: props.bstatus,
       }
     }; 
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange=(event)=> {
    const name = event.target.name;
    const value = event.target.value;
  
    this.setState((prevState) => ({
      book: {
        ...prevState.book,
        [name]: value,
      },
    }));
  }

handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:5202/api/Books/' + this.props.bid,{
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },  body: JSON.stringify(this.state.book
        )
    })
    .then(response => {
      if (response.ok) {
        this.props.onHide(); // Закрыть модальное окно
      } else {
        // Обработка ошибки
      }
    })
    .then(data => {
      // Обработка данных здесь
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    })
  }


  render() {
    return (
      <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Form onSubmit={this.handleSubmit}>

            <Form.Group controlId="id">
                <Form.Label>Book Id</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  defaultValue={this.props.bid}
                  required
                  disabled
                  placeholder="Id"
                 
                />
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Book Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={this.props.bname}
                  required
                  placeholder="Название книги"
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="author">
                <Form.Label>Book Author</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  defaultValue={this.props.bauthor}
                  required
                  placeholder="Автор книги"
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="genre">
                <Form.Label>Book Genre</Form.Label>
                <Form.Control
                  type="text"
                  name="genre"
                  defaultValue={this.props.bgenre}
                  required
                  placeholder="Жанр книги"
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="status">
                <Form.Label>Book Status</Form.Label>
                <Form.Control
                  type="text"
                  name="status"
                  defaultValue={this.props.bstatus}
                  required
                  placeholder="Статус книги"
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group>
                <Button variant="primary" type="submit">
                  Изменить
                </Button>
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
