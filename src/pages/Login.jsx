import { useState, useEffect } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const LoginPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  const useSetter = (setter) => (e) => {
    setter(e.target.value);
  };

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

  return (
    <main className='registration-page-container'>
      <Form>
        <Row form>
          <Col xs={12}>
            <FormGroup>
              <Label for='email'>Email</Label>
              <Input
                type='email'
                name='email'
                id='email'
                placeholder='user@exmaple.com'
                onChange={useSetter(setEmail)}
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
                onChange={useSetter(setPassword)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Button disabled={!isValid}>Sign Up</Button>
        </Row>
      </Form>
    </main>
  );
};

export default LoginPage;
