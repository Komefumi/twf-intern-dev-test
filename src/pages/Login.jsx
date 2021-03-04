import { useState, useEffect } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import firebase from 'firebase';

import { ROUTE_SIGNUP, ROUTE_PROFILE } from '../constants';

import { setSetter, useAuthContext } from '../utils';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();

  const Auth = useAuthContext();

  useEffect(() => {
    let invalid = [email, password].some((current) => {
      return current.length === 0;
    });
    if (invalid) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [email, password]);

  const onSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user) {
          Auth.setUserEmail(res.user.email);
          Auth.setIsLoggedIn(true);
          // history.push(ROUTE_PROFILE);
        }

        return;
      })
      .catch((e) => {
        console.error({ e });
      });
  };

  if (Auth.isLoggedIn) {
    history.replace(ROUTE_PROFILE);
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
                onChange={setSetter(setPassword)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Button disabled={!isValid}>Log In</Button>
        </Row>
      </Form>
      <div className='link-block'>
        <NavLink to={ROUTE_SIGNUP}>Switch to Signup</NavLink>
      </div>
    </main>
  );
};

export default LoginPage;
