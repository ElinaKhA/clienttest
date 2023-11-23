import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export default class AddBookModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
        newBook:{
            Name: "",
            Author: "",
            Genre: "",
            Status: ""
        }
     
    };
  }
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
        newBook: {
            ...prevState.newBook,
            [name]: value
        }
    }));
}
handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:5202/api/Books', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.newBook)
    })
    .then(response => {
        if (response.status === 201) {
            // Книга успешно создана
            this.props.onHide(); // Закрыть модальное окно после создания
        } else {
            // Обработка ошибки
        }
    });
}




  render() {
    return (
      <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="Name">
                <Form.Label>Book Name</Form.Label>
                <Form.Control
                  type="text"
                  name="Name"
                  value={this.state.newBook.Name}
                  onChange={this.handleInputChange}
                  required
                  placeholder="Название книги"
                />
              </Form.Group>

              <Form.Group controlId="Author">
                <Form.Label>Book Author</Form.Label>
                <Form.Control
                  type="text"
                  name="Author"
                  value={this.state.newBook.Author}
                  onChange={this.handleInputChange}
                  required
                  placeholder="Автор книги"
                />
              </Form.Group>

              <Form.Group controlId="Genre">
                <Form.Label>Book Genre</Form.Label>
                <Form.Control
                  type="text"
                  name="Genre"
                  value={this.state.newBook.Genre}
                  onChange={this.handleInputChange}
                  required
                  placeholder="Жанр книги"
                />
              </Form.Group>

              <Form.Group controlId="Status">
                <Form.Label>Book Status</Form.Label>
                <Form.Control
                  type="text"
                  name="Status"
                  value={this.state.newBook.Status}
                  onChange={this.handleInputChange}
                  required
                  placeholder="Статус книги"
                />
              </Form.Group>

              <Form.Group>
                <Button variant="primary" type="submit">
                  Сохранить
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
