import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: "",
    search: "",
    book: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  saveBook = id => {
    const book = { ...this.state }
    this.props.saveBook(book)
    console.log(book);
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.find({
        title: this.state.title
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron size='sm-12'>
              <h1>React Google Book Search</h1>
              <p>Search for and Save Books of Interest</p>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              /> Search Books
              <FormBtn
                disabled={!this.state.title}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </Col>
          </Row>
          <Row>
          <Col size="md-12 sm-12">

            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (

                  <ListItem className="media my-4 rounded shadow p-2" key={book.id}>
                    <img src={book.img ? book.img : ""} className="mr-3" alt="..." />
                    <div className="media-body">
                      <h5 className="mt-0 mb-1">{book.title} <span className="font-italic">by {book.author}</span></h5>
                      {/* <Link to={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </Link> */}
                      <p className="overflow-auto description">{book.description}</p>
                      <a className="btn btn-primary" target="_blank" href={"/books/" + book._id}>View</a> {" "}
                      <SaveBtn key="book.id" book={book} savebook={this.saveBook} />
                      {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
                    </div>
                  </ListItem>


                  // <ListItem key={book._id}>
                  //   <Link to={"/books/" + book._id}>
                  //     <strong>
                  //       {book.title} by {book.author}
                  //     </strong>
                  //   </Link>
                  //   <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  // </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
