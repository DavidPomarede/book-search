import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Saved extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>

          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
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

export default Saved;








// import React, { Component } from "react";

// import DeleteBtn from "../components/DeleteBtn";
// import SaveBtn from "../components/SaveBtn";
// import Jumbotron from "../components/Jumbotron";
// import API from "../utils/API";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
// import { Input, FormBtn } from "../components/Form";
// import SearchForm from "../components/SearchForm";
// import SearchResults from "../components/SearchResults";



// const axios = require('axios');
// class Saved extends Component {
//   state = {
//     books: [],
//     title: "",
//     author: "",
//     synopsis: "",
//     search: "",
//     book: "",
//     error: ""
//   };

//   // componentDidMount() {
//   //   // this.loadBooks();

//   // }

//   loadBooks = () => {
//     API.getBooks()
//       .then(res =>
//         this.setState({ books: res.data, title: "", author: "", synopsis: "" })
//       )
//       .catch(err => console.log(err));
//   };

//   deleteBook = id => {
//     API.deleteBook(id)
//       .then(res => this.loadBooks())
//       .catch(err => console.log(err));
//   };

//   saveBook = id => {
//     const book = { ...this.state }
//     this.props.saveBook(book)
//     console.log(book);
//   }
// //  handleInputChange = event => {
// //     this.setState({ search: event.target.value });
// //   };
//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//   };

//   handleFormSubmit = event => {
//     event.preventDefault();
//     if (this.state.title) {
//       API.searchBooks({
//         query: this.state.title
//       })
//         .then(res => 

//         this.setState({ books: res.data }))

//         .catch(err => console.log(err));
//     }
//   };


//   // searchGoogleBooks = () => {
//   //   API.searchBooks()

//   //     .then(res =>

//   //       this.setState({
//   //         books: res.data
//   //       })
//   //     )

//   //     .catch(err => console.log(err));
//   // };
//   handleFormSubmit = event => {
//     event.preventDefault();
//     API.searchBooks(this.state.search)
//       .then(res => {
//         if (res.data.status === "error") {
//           throw new Error(res.data.message);
//         }
//         this.setState({ results: res.data.message, error: "" });
//       })
//       .catch(err => this.setState({ error: err.message }));
//   };
//   // searchGoogleBooks = event => {
//   //   event.preventDefault();
//   //   API.searchBooks(this.state.search)
//   //     .then(res => {
//   //       if (res.data.status === "error") {
//   //         throw new Error(res.data.message);
//   //       }
//   //       this.setState({ books: res.data, error: "" });
//   //     })
//   //     .catch(err => this.setState({ error: err.message }));
//   // };


//   render() {
//     return (
//       <Container fluid>
//         <Row>
//           <Col size="md-12">
//             <Jumbotron size='sm-12'>
//               <h1>React Google Book Search</h1>
//               <p>Search for and Save Books of Interest</p>
//             </Jumbotron>
//             {/* <form>
//             Search Books
//               <Input
//                 value={this.state.search}
//                 onChange={this.handleInputChange}
//                 name="search"
//                 placeholder="Title (required)"
//               /> 
//               <FormBtn
//                 disabled={!this.state.search}
//                 onClick={this.searchGoogleBooks}
//               >
//                 Submit
//               </FormBtn>
//             </form> */}
//             {/* <SearchForm
//               handleFormSubmit={this.handleFormSubmit}
//               handleInputChange={this.handleInputChange}
//               search={this.state.search}
//             />
//             <SearchResults results={this.state.results} /> */}

//           </Col>
//           </Row>
//           <Row>
//           <Col size="md-12 sm-12">

//             {this.state.books ? (

//               <List>
//               {this.state.books.map(book => (

//                   // <ListItem className="media my-4 rounded shadow p-2" key={book.id}>
//                   //   <img src={book.img ? book.img : ""} className="mr-3" alt="..." />
//                   //   <div className="media-body">
//                   //     <h5 className="mt-0 mb-1">{book.title} <span className="font-italic">by {book.author}</span></h5>
//                   //     <Link to={"/books/" + book._id}>
//                   //       <strong>
//                   //         {book.title} by {book.author}
//                   //       </strong>
//                   //     </Link>
//                   //     <p className="overflow-auto description">{book.description}</p>
//                   //     <a className="btn btn-primary" target="_blank" rel="noopener noreferrer" href={"/books/" + book._id}>View</a> {" "}
//                   //     <SaveBtn key="book.id" book={book} savebook={this.saveBook} />
//                   //     <DeleteBtn onClick={() => this.deleteBook(book._id)} />
//                   //   </div>
//                   // </ListItem>


//                   <ListItem key={book._id}>
//                     <Link to={"/books/" + book._id}>
//                       <strong>
//                         {book.title} by {book.author}
//                       </strong>
//                     </Link>
//                     <DeleteBtn onClick={() => this.deleteBook(book._id)} />
//                   </ListItem>
//                 ))}
//               </List> 
//             ) : (
//               <h3>No Results to Display</h3>
//             )}
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }

// export default Saved;




