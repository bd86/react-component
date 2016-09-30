import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

const TopForm = {
  form: {
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: "#0b243b",
    marginBottom: 50,
    color: "white"
  },
  btn: {
    backgroundColor: "#fed176",
    color: "#0b243b",
    border: "none",
    fontSize: 2.2+"em"
  }
}

const BottomForm = {
  form: {
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: "#fed176",
    marginBottom: 50,
    color: "#0b243b"
  },
  btn: {
    backgroundColor: "#0b243b",
    color: "#fff",
    border: "none",
    fontSize: 2.2+"em"
  }
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
      <div className="container" style={this.props.formstyle.form}>
        <EmailForm onEmailSubmit={this.handleEmailSubmit}
                   btnstyle={this.props.formstyle.btn}
                   message={this.props.message}
                   title={this.props.title} />
        <small>
          <div className="text-center">
            By submitting, you understand that you may receive periodic email
            communications from Charisma House and that you may unsubscribe at any time.
            <a href="/privacy-policy.html">Learn More.</a>
          </div>
        </small>
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
          <p className="text-center" style={{fontSize:2.4+"em"}}>{this.props.message}<i>{this.props.title}</i></p>
          <div className="col-md-5 col-md-offset-2">
            <input type="email"
                    style={{height:65}}
                    placeholder="Enter your email address"
                    className="form-control input-lg"
                    value={this.state.email}
                    onChange={this.handleEmailChange} />
          </div>
          <div className="col-xs-8 col-xs-offset-2 col-md-5 col-md-offset-0">
            <input type="submit" value="Download Now" style={this.props.btnstyle} className="btn btn-lg btn-default" />
          </div>
        </div>
      </form>
    );
  }

}

ReactDOM.render(
  <EmailsBox url="ajax/submit.php"
             formstyle={TopForm} />,
  document.getElementById('form1')
);

ReactDOM.render(
  <EmailsBox url="ajax/submit.php"
             formstyle={BottomForm}
             message="Download Your FREE Copy of "
             title="Book Title" />,
  document.getElementById('form2')
);