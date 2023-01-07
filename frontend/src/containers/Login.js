import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../lib/ContextLib";
import { useFormFields } from "../lib/HooksLib";
import PasswordChecklist from "react-password-checklist";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { onError } from "../lib/errorLib";
import "./Login.css";

import { Link } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  //let congitoUser = new BehaviorSubject(null);
  const {userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const [myuser,setUser]=useState();
  const [isChanging, setIsChanging] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    oldPassword: "",
    newPassword:"",
    confirmPassword: "",
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }
  function validateFormChange() {
    return (
      fields.oldPassword.length > 0 &&
      fields.confirmPassword.length > 0 &&
      fields.newPassword.match(/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/)&&
      fields.newPassword.match(/[a-z]/)&&
      fields.newPassword.match(/[A-Z]/)&&
      fields.newPassword.length > 8 &&
      fields.newPassword === fields.confirmPassword
    );
  }
  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const user = await Auth.signIn(fields.email, fields.password)
      
        setUser(user);
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          userHasAuthenticated(true);
          setIsNewUser(true);
          //nav(`/password/)`);
        }
        else{
          userHasAuthenticated(true);
          //console.log(user);
          setIsNewUser(false);
          
          nav("/files",{state: { myEmail: fields.email}});
        }
     // });
      
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  async function handleChangeClick(event) {
    event.preventDefault();

    setIsChanging(true);

    try {
      //const currentUser = await Auth.currentAuthenticatedUser();
      //console.log(fields.email,fields.oldPassword,fields.newPassword);
      //await Auth.signIn(fields.email, fields.oldPassword)
      //.then(async (user) => {
        //congitoUser.next(user);

      await Auth.completeNewPassword(myuser, fields.newPassword);
        setIsNewUser(false);
        userHasAuthenticated(true);
        nav("/files");
     // });
      
    

      //nav("/files");
    } catch (error) {
      onError(error);
      setIsNewUser(false);
      setIsChanging(false);
    }
  }
  function normalLogin(){
    return(
    <div className="Login">
    <Form onSubmit={handleSubmit}>
      <Form.Group size="lg" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          autoFocus
          type="email"
          value={fields.email}
          onChange={handleFieldChange}
        />
      </Form.Group>
      <Form.Group size="lg" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={fields.password}
          onChange={handleFieldChange}
        />
      </Form.Group>
      <Link to="/reset">Forgot password?</Link>
      <LoaderButton
        block="true"
        size="lg"
        type="submit"
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        Login
      </LoaderButton>
      
    </Form>
  </div>);
  }
  function renderNewPassword(){
    return(
    <div className="ChangePassword">
    <form onSubmit={handleChangeClick}>
      <FormGroup bsSize="large" controlId="oldPassword">
        <FormLabel>Old Password</FormLabel>
        <FormControl
          type="password"
          onChange={handleFieldChange}
          value={fields.oldpassword}
        />
      </FormGroup>
      <hr />
      <FormGroup bsSize="large" controlId="newPassword">
        <FormLabel>New Password</FormLabel>
        <FormControl
          type="password"
          onChange={handleFieldChange}
          value={fields.newPassword}
        />
      </FormGroup>
      <FormGroup bsSize="large" controlId="confirmPassword">
        <FormLabel>Confirm Password</FormLabel>
        <FormControl
          type="password"
          onChange={handleFieldChange}
          value={fields.confirmPassword}
        />
      </FormGroup>
      <PasswordChecklist
				rules={["minLength","specialChar","number","capital","match","lowercase"]}
				minLength={8}
				value={fields.newPassword}
		  	 valueAgain={fields.confirmPassword}
				/>

      <LoaderButton
        block
        type="submit"
        bsSize="large"
        disabled={!validateFormChange()}
        isLoading={isChanging}
      >
        Change Password
      </LoaderButton>
    </form>
  </div>
   );
  }

  return (
    <div className="Home">
    {isNewUser ?  renderNewPassword(): normalLogin()}
  </div>
  );
}