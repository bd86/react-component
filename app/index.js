import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

const divStyle = {
    backgroundColor: "#0b243b",
    marginBottom: 50,
}

class EmailsBox extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this)
  }

  handleEmailSubmit(email) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: email,
      success: function(data) {
        if(data.error == false){
          $('.modal_error').empty()
                            .append('<p>'+data.msg+'</p>')
                            .removeClass('alert-danger')
                            .addClass('alert-success')
                            .show();
            window.location = data.link;
        }else{
          $('.modal_error').empty()
                            .append('<p>'+data.msg+'</p>')
                            .removeClass('alert-success')
                            .addClass('alert-danger')
                            .show();
            console.log('BAD');
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    return(
      <div className="container" style={divStyle}>
        <h1>Email Form</h1>
        <EmailForm onEmailSubmit={this.handleEmailSubmit} />
      </div>
    );
  }

}

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: ''};
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    //console.log(e.target.value);
    this.setState({email: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let email = this.state.email.trim();
    if(!email) {
      return;
    }
    this.props.onEmailSubmit({email: email});
    this.setState({email: ''});
  }

  render() {
    return (
      <form className="EmailForm" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-md-5 col-md-offset-2">
            <input type="text"
                    style={{height:65}}
                    placeholder="Enter your email address"
                    className="form-control input-lg"
                    value={this.state.email}
                    onChange={this.handleEmailChange} />
          </div>
          <div className="col-xs-8 col-xs-offset-2 col-md-5 col-md-offset-0">
            <input type="submit" value="Download Now" className="btn2 btn-lg btn-default"/>
          </div>
        </div>
      </form>
    );
  }

}


ReactDOM.render(
  //localhost:8000
  <EmailsBox url="ajax/submit.php" />,
  document.getElementById('form1')
);

ReactDOM.render(
  //localhost:8000
  <EmailsBox url="ajax/submit.php" />,
  document.getElementById('form2')
);