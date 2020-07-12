import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import apiKey from "../config/tmbdConf";
import API from "../tmdbApi/tmdbApi";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal14: false,
      details: Object(),
    };
  }

  toggle = (nr) => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
  };

  fetchMovieDetails(id) {
    var self = this;
    let tmdb = new API(apiKey.apiKey);

    tmdb.fetchMovieDetails(id).then((resp, err) => {
      if (resp) {
        self.state.details = resp;
      }
    });
  }

  render() {
    this.fetchMovieDetails(this.props.movieID);
    return (
      <MDBContainer>
        <MDBBtn color="primary" onClick={this.toggle(14)}>
          Description
        </MDBBtn>
        <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
          <MDBModalHeader toggle={this.toggle(14)}>
            {this.props.original_title}
          </MDBModalHeader>
          <MDBModalBody>
            Overview :<br /> <br />
            {this.props.overview}
            <hr />
          </MDBModalBody>
          <MDBModalBody>
            Released in : <br /> <br /> {this.props.released}
            <hr />
          </MDBModalBody>
          <MDBModalBody>
            Tagline : <br /> <br />
            {this.state.details.tagline}
            <hr />
          </MDBModalBody>
          <MDBModalBody>
            HomePage : <br /> <br />
            {this.state.details.homepage ? "" : "No homepage"}
          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle(14)}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}
