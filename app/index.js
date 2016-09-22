var React = require('react');
var ReactDOM = require('react-dom');

var CommentBox = React.createClass({

  handleCommentSubmit: function (email) {
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
  },

  render: function () {
    return (
      <div className="commentBox">
        <h1>Email Form</h1>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
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
    //console.log(email);
    if(!email){
      return;
    }
    this.props.onCommentSubmit({email: email});
    this.setState({email: ''});
  },

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
        <h1 className="commentAuthor">
          {this.props.author}
        </h1>
        {this.props.children}
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/test.php" />,
  document.getElementById('app')
);