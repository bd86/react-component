import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

class CommentBox extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
  }

  handleCommentSubmit(email) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: email,
      success: function(data) {
        console.log(data);
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    return(
      <div className="commentBox">
        <h1>Email Form</h1>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }

}

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: ''};
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    console.log(e.target.value);
    this.setState({email: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let email = this.state.email.trim();
    if(!email) {
      return;
    }
    this.props.onCommentSubmit({email: email});
    this.setState({email: ''});
  }

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text"
                placeholder="Enter your email address"
                value={this.state.email}
                onChange={this.handleEmailChange} />
        <input type="submit" value="Post" />
      </form>
    );
  }

}


ReactDOM.render(
  //localhost:8000
  <CommentBox url="http://localhost:8000/submit.php" />,
  document.getElementById('app')
);