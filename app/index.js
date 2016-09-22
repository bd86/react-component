var React = require('react');
var ReactDOM = require('react-dom');

var CommentBox = React.createClass({
  render: function () {
    return (
      <div className="commentBox">
        <h1>Email Form</h1>
        <CommentForm />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function () {
    return (
      <div className="commentList">
        <Comment author="bryan">This is my comment!</Comment>
      </div>
    )
  }
});

var CommentForm = React.createClass({

  getInitialState: function () {
    return {email: ''};
  },

  handleEmailChange: function (e) {
    //console.log(e.target.value);
    this.setState({email: e.target.value});
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var email = this.state.email.trim();
    console.log(email);
    if(!email){
      return;
    }
    this.setState({email: ''});
  },
//test
  render: function () {
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
});

var Comment = React.createClass({
  render: function () {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('app')
);