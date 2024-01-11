import { useState } from "react";
import Base from "../components/Base";
import { Card, CardBody, CardHeader, Container, Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth/authtoken";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import { useContext } from 'react'


const Login = () => {

    const [loginDetail, setLoginDetail] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState(null);


    const userContxtData = useContext(userContext)


    //this is for navigating after login to dashboard
    const navigate = useNavigate()

    const handleChange = (event, field) => {

        console.log(event.target.value)
        console.log(field)

        setLoginDetail({ ...loginDetail, [field]: event.target.value })

    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(loginDetail)
        //validation

        if (loginDetail.username.trim() == '' || loginDetail.password.trim() == '') {
            toast.error("Username or Password is required..!")
            return;
        }
        //submit data to server to generate token

        loginUser(loginDetail).then((data) => {
            console.log("user login", data);

            // Access the token
            const token = data.token;

            doLogin(data)

            console.log("login details stored to local storage");
            //redirect to user dashboard page

            userContxtData.setUser({
                data: data.user,
                login: true,
            });

            toast.success("login success");
            navigate("/user/dashboard")


        }).catch(error => {
            console.log(error.response.data.message)

            if ('Invalid username or password !!' === error.response.data.message) {
                console.log(true);
                setError(error);
            }

            if (error?.response?.status == 404 || error?.response?.status == 400) {
                toast.error(error.response.data.message)

            } else

                toast.error("Something went wrong on server ")
        })


    }

    const handleReset = () => {
        setLoginDetail({
            username: '',
            password: ''
        })
    }

    return (
        <Base ><div >
            <Container>
                <Row className="mt-4">
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card color="dark" inverse>
                            <CardHeader><h3>Login Here !!</h3></CardHeader>

                            <CardBody>
                                {/* creating form */}
                                <Form onSubmit={handleFormSubmit}>
                                    {/* email field */}
                                    <FormGroup>
                                        <Label for="email">Enter Email</Label>
                                        <Input type="email" placeholder="Enter here" id="email"
                                            onChange={(e) => handleChange(e, 'username')} value={loginDetail.username}></Input>
                                    </FormGroup>

                                    {/* password field */}
                                    <FormGroup>
                                        <Label for="password">Enter Password</Label>
                                        <Input type="password" placeholder="Enter here" id="password"
                                            onChange={(e) => handleChange(e, 'password')} value={loginDetail.password}></Input>
                                    </FormGroup>

                                    {/* Forgot Password link */}
                                    {error?.response?.data?.message === 'Invalid username or password !!' && (
                                        <FormGroup>
                                            <p className="text-danger mb-0">Forgot your password? <a href="/forgot-password">Reset it here.</a></p>
                                        </FormGroup>
                                    )}
                                    {/* buttons */}
                                    <Container className="text-center">
                                        <Button color="info" outline>Submit</Button>
                                        <Button color="danger" outline className="ms-2" type="reset" onClick={handleReset}>Reset</Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
        </Base>)
}
export default Login;