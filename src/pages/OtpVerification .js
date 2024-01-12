import React, { useState } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button, Container, Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtpVerification = ({ email }) => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    const handleVerifyAndSetPassword = async (event) => {
        event.preventDefault();

        // Add validation for OTP and new password if needed
        if (!otp.trim() || !newPassword.trim()) {
            toast.error('OTP and new password are required.');
            return;
        }

        // Perform the OTP verification and set new password logic here
        // You may need to call an API endpoint for OTP verification and password update
        try {
            const response = await axios.post('http://localhost:9191/api/v1/auth/reset-password/confirm', {
                resetToken: otp,
                newPassword: newPassword,
            });

            // Assuming the API returns a success message
            toast.success("Password successfully reset.");
            navigate('/login');

            // Optionally, navigate to another page
            // navigate('/login');
        } catch (error) {
            // Handle errors, display an error message, or redirect the user to an error page
            console.error('Error during OTP verification and password update:', error);

            // Display an error message to the user
            toast.error('Failed to verify OTP and update password. Please try again.');
        }
    };

    return (
        <Container>
            <Row className="mt-4">
                <Col sm={{ size: 6, offset: 3 }}>
                    <Card>
                        <CardBody>
                            <Form onSubmit={handleVerifyAndSetPassword}>
                                <FormGroup>
                                    <Label for="otp">Enter OTP</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter the OTP received in your email"
                                        id="otp"
                                        onChange={(e) => setOtp(e.target.value)}
                                        value={otp}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="newPassword">Enter New Password</Label>
                                    <Input
                                        type="password"
                                        placeholder="Enter your new password"
                                        id="newPassword"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        value={newPassword}
                                    />
                                </FormGroup>
                                <Button color="info" outline type="submit">
                                    Verify and Set Password
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default OtpVerification;
