import { useState, useEffect } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import firebase from 'firebase';

import { ROUTE_HOME, ROUTE_PROFILE } from '../constants';

import { setSetter, useAuthContext } from '../utils';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();

  const Auth = useAuthContext();

  useEffect(() => {
    let invalid = [email, password].some((current) => {
      return current.length === 0;
    });
    invalid = invalid || password !== passwordConfirm;
    if (invalid) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [email, password, passwordConfirm]);

  const onSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((res) => {
            console.log({ res });
            if (res.user) {
              Auth.setUserEmail(res.user.email);
              Auth.setIsLoggedIn(true);
              // history.push(ROUTE_PROFILE);
            }
          })
          .catch((e) => {
            console.error({ e });
          });
      });
  };

  if (Auth.isLoggedIn) {
    history.replace(ROUTE_PROFILE);
    return;
  }

  return (
    <main className='page-container'>
      <Form onSubmit={onSubmit}>
        <Row form>
          <Col xs={12}>
            <FormGroup>
              <Label for='email'>Email</Label>
              <Input
                type='email'
                name='email'
                id='email'
                placeholder='user@exmaple.com'
                onChange={setSetter(setEmail)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col xs={12}>
            <FormGroup>
              <Label for='password'>Password</Label>
              <Input
                type='password'
                name='password'
                id='password'
                placeholder='password placeholder'
                onChange={setSetter(setPassword)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col xs={12}>
            <FormGroup>
              <Label for='passwordConfirm'>Confirm Password</Label>
              <Input
                type='password'
                name='passwordConfirm'
                id='passwordConfirm'
                placeholder='password placeholder'
                onChange={setSetter(setPasswordConfirm)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Button disabled={!isValid}>Sign Up</Button>
        </Row>
      </Form>
      <div className='link-block'>
        <NavLink to={ROUTE_HOME}>Switch to Login</NavLink>
      </div>
    </main>
  );
};

export default RegistrationPage;
