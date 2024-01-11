import React, { useState } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button, Container,Col,Row } from 'reactstrap';
import { toast } from 'react-toastify';
//import { resetPassword } from '../services/user-service'; // Import your reset password service
import { useNavigate } from 'react-router-dom';
import Base from "../components/Base";


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = (event) => {
        event.preventDefault();

        // Add validation for email if needed
        if (!email.trim()) {
            toast.error('Email is required.');
            return;
        }

        // // Call your reset password service here
       
    };

    return (
        <Base>
            <div>
                <Container>
                    <Row className="mt-4">
                        <Col sm={{ size: 6, offset: 3 }}>
                            <Card>
                                <CardBody>
                                    <Form onSubmit={handleResetPassword}>
                                        <FormGroup>
                                            <Label for="email">Enter Email</Label>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                id="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                            />
                                        </FormGroup>
                                        <Button color="info" outline type="submit">
                                            Reset Password
                                        </Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div></Base>
    );
};

export default ForgotPassword;
