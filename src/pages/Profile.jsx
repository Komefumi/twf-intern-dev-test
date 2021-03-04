import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import DatePicker from 'react-datepicker';

const ProfilePage = (props) => {
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(new Date());
  const [isValid, setIsValid] = useState(false);

  const useSetter = (setter) => (e) => {
    setter(e.target.value);
  };

  useEffect(() => {
    let invalid = [email].some((current) => {
      return current.length === 0;
    });
    if (invalid) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [email, dob]);

  return (
    <main className='page-container'>
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
              <Label for='dob'>Date of Birth</Label>
              <DatePicker
                id='dob'
                selected={dob}
                onChange={(date) => setDob(date)}
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

export default ProfilePage;
