import React from "react";

export default function Register() {
  return (
    <>
      <Form>
        <Row>
          <Col xs='6'>
          <Stack gap='3'>
              <h2>Register</h2>
              <Form.Control type="text" placeholder="name"/>
          </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
}
