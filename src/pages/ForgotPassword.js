import React, { useState } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button, Container,Col,Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Base from "../components/Base";
import { resetPasswordRequest } from "../services/post-service";
import OtpVerification from './OtpVerification ';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    const handleResetPassword = (event) => {
        event.preventDefault();

        // Add validation for email if needed
        if (!email.trim()) {
            toast.error('Email is required.');
            return;
        }

        // // Call your reset password service here
       // Call your reset password service here
       resetPasswordRequest(email)
       .then((data) => {
           // Handle the response as needed
           console.log('Reset password response:', data);

           setSuccess(true);
           // You can use the response data or show a success message
           toast.success('Password reset request successful. Check your email for further instructions.');

           // Optionally, navigate to another page
           // navigate('/login');
       })
       .catch((error) => {
           // Handle errors here
           console.error('Error resetting password:', error);
           toast.error('Error resetting password. Please try again.');
       });



    };

    return (
        <Base>
            <div>
                <Container>
                    <Row className="mt-4">
                        <Col sm={{ size: 6, offset: 3 }}>
                            <Card>
                                <CardBody>
                                {success ? (
                                        // Render the new component after success
                                        <OtpVerification email={email} />
                                    ) : (
                                        // Render the reset password form
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
                                    )}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div></Base>
    );
};

export default ForgotPassword;
