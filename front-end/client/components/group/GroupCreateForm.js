import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/shared/validations/groupcreate';
import axios from 'axios';

class GroupCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: localStorage.getItem('id'),
      name: '',
      description: '',
      errors: {},
      //isLoading: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      axios.post('http://127.0.0.1:8000/group/', this.state)
        .then(res => {
        console.log(res);
        //this.context.router.push('/main');
      }).catch(res => {console.log(res.error)});

    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, name, description} = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Create new group</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div> }

        <TextFieldGroup
          field="name"
          label="Groupname"
          value={name}
          error={errors.name}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field="description"
          label="Description"
          value={description}
          error={errors.description}
          onChange={this.onChange}
        />

        <div className="form-group"><button className="btn btn-primary btn-lg" >Create</button></div>
      </form>
    );
  }
}

export default GroupCreateForm;
