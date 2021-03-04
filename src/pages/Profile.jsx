import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, FormGroup, Label, Row, Col } from 'reactstrap';
import DatePicker from 'react-datepicker';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';

import { ROUTE_HOME } from '../constants';
import { useAuthContext } from '../utils';

const ProfilePage = () => {
  const isInitialMount = useRef(true);

  const detailsRef = useRef(firebase.firestore().collection('details'));
  const [dob, setDob] = useState(new Date());
  const [dobGained, setDobGained] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();

  const Auth = useAuthContext();

  useEffect(() => {
    // console.log(detailsRef.current);
    detailsRef.current
      .where('email', '==', Auth.userEmail)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log({ data });
        if (data.length) {
          setDob(new Date(data[0].dob));
          setDobGained(true);
        }
      });
  }, [Auth.userEmail]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (dob) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [dob]);

  const logout = (e) => {
    Auth.setUserEmail('');
    Auth.setIsLoggedIn(false);
    history.replace(ROUTE_HOME);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    detailsRef.current
      .add({
        email: Auth.userEmail,
        dob: dob.toString(),
      })
      .then((res) => {
        console.log('It worked?');
        console.log({ res });
        setDobGained(true);
      })
      .catch((e) => {
        console.log('Well...');
        console.error({ e });
      });
  };

  if (!Auth.isLoggedIn) {
    history.replace(ROUTE_HOME);
    return;
  }

  return (
    <main className='page-container'>
      <Form onSubmit={onSubmit}>
        <Row form>
          <Col xs={12}>
            <FormGroup>
              <Label for='dob'>Date of Birth</Label>&nbsp;
              <DatePicker
                id='dob'
                selected={dob}
                onChange={(date) => setDob(date)}
                disabled={dobGained}
              />
            </FormGroup>
          </Col>
        </Row>
        {!dobGained && (
          <Row form>
            <Button disabled={!isValid}>Save</Button>
          </Row>
        )}
        <Row className='logout-button-section' form>
          <Button onClick={logout}>Logout</Button>
        </Row>
      </Form>
    </main>
  );
};

export default ProfilePage;
