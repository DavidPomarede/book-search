import React, { Component } from "react";

// import DeleteBtn from "../components/DeleteBtn";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";

import axios from 'axios';

    const API_URL = `https://www.googleapis.com/books/v1/volumes`;




class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: "",
    search: "",
    book: "",
    error: "",
    items: [],
    saved: []
  };

  // componentDidMount() {
  //   // this.loadBooks();

  // }

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

  // saveBook = id => {
  //   const book = { ...this.state }
  //   this.props.saveBook(book)
  //   console.log(book);
  // }

    saveBook = (book) => {
      console.log(book);
    const bookData = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.smallThumbnail,
      infoLink: book.volumeInfo.infoLink,
      publishedDate: book.volumeInfo.publishedDate
    }
    console.log(bookData);
    API.saveBook(bookData)
      .then(console.log("did I do it?"))
      .catch(err => console.log(err));
    }

//  handleInputChange = event => {
//     this.setState({ search: event.target.value });
//   };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title) {
  //     API.searchBooks({
  //       query: this.state.title
  //     })
  //       .then(res => 

  //       this.setState({ books: res.data }))

  //       .catch(err => console.log(err));
  //   }
  // };


  // searchGoogleBooks = () => {
  //   API.searchBooks()

  //     .then(res =>

  //       this.setState({
  //         books: res.data
  //       })
  //     )

  //     .catch(err => console.log(err));
  // };
  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   API.searchBooks(this.state.search)
  //     .then(res => {
  //       if (res.data.status === "error") {
  //         throw new Error(res.data.message);
  //       }
  //       this.setState({ results: res.data.message, error: "" });
  //     })
  //     .catch(err => this.setState({ error: err.message }));
  // };


    // fetchBooks = async () => {
    //     // Ajax call to API using Axios
    //     const result = await axios.get(`${API_URL}?q=${this.state.search}`);
    //     // Books result
    //     console.log(result.data);
    // };

    // Submit handler
    searchGoogleBooks = (e) => {
        // Prevent browser refreshing after form submission
        e.preventDefault();
        // Call fetch books async function
        this.fetchBooks();
    };

fetchBooks = async () => {
  const result = await axios.get(`${API_URL}?q=${this.state.search}`);
  this.setState({ books: result.data, error: "" });
};
  // searchGoogleBooks = event => {
  //   event.preventDefault();
  //   API.searchBooks(this.state.search)
  //     .then(res => {
  //       if (res.data.status === "error") {
  //         throw new Error(res.data.message);
  //       }
  //       this.setState({ books: res.data, error: "" });
  //     })
  //     .catch(err => this.setState({ error: err.message }));
  // };


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
            Search Books
              <Input
                value={this.state.search}
                // value={searchTerm}
                onChange={this.handleInputChange}
                name="search"
                placeholder="Title (required)"
              /> 
              <FormBtn
                disabled={!this.state.search}
                onClick={this.searchGoogleBooks}
              >
                Submit
              </FormBtn>
            </form>
            {/* <SearchForm
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
              search={this.state.search}
            />
            <SearchResults results={this.state.results} /> */}

          </Col>
          </Row>
          <Row>
          <Col size="md-12 sm-12">

            {this.state.books.items  ? (

                <ul>
                    {
                      this.state.books.items.map((book, index) => {
                        return (
                          <li key={index} className="list-group-item">
                            <div className="row">
                                <div className="col-2">
                              <a href={book.volumeInfo.infoLink}><img alt={`${book.volumeInfo.title} book`} src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`} /></a>
                                </div>
                                <div className="col-3">
                              <a href={book.volumeInfo.infoLink}><h3>{book.volumeInfo.title}</h3></a>
                              <p>by: {book.volumeInfo.authors}</p>
                              <p>{book.volumeInfo.publishedDate}</p>
                                </div>
                                <div className="col">
                                <p>{book.volumeInfo.description}</p>
                                <SaveBtn key="book.id" book={book} onClick={() => this.saveBook(book)} />

                                </div>
                            </div>
                          </li>
                        );
                      })
                    }
                  </ul>
              //   {this.state.books.map(book => (

              //     <ListItem className="media my-4 rounded shadow p-2" key={book.id}>
              //       <img src={book.img ? book.img : ""} className="mr-3" alt="..." />
              //       <div className="media-body">
              //         <h5 className="mt-0 mb-1">{book.title} <span className="font-italic">by {book.author}</span></h5>
              //         {/* <Link to={"/books/" + book._id}>
              //           <strong>
              //             {book.title} by {book.author}
              //           </strong>
              //         </Link> */}
              //         <p className="overflow-auto description">{book.description}</p>
              //         <a className="btn btn-primary" target="_blank" rel="noopener noreferrer" href={"/books/" + book._id}>View</a> {" "}
              //         <SaveBtn key="book.id" book={book} savebook={this.saveBook} />
              //         {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
              //       </div>
              //     </ListItem>


              //     // <ListItem key={book._id}>
              //     //   <Link to={"/books/" + book._id}>
              //     //     <strong>
              //     //       {book.title} by {book.author}
              //     //     </strong>
              //     //   </Link>
              //     //   <DeleteBtn onClick={() => this.deleteBook(book._id)} />
              //     // </ListItem>
              //   ))}
              // </List>
            ) : (
              <h3>No Results to Display -- Try (re)Submitting a Query!</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
