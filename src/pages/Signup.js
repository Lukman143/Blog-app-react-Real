import { Card, CardBody, CardHeader, Container, Form, FormGroup, Label, Input, Button, Row, Col, FormFeedback } from "reactstrap";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { singhUp } from "../services/user-service";


const Signup = () => {



    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        about: ''
    })


    // //use useEffect
    // useEffect(() => {
    //     console.log(data)
    // }, [data])


    const [error, setError] = useState({
        errors: {},
        isError: false
    })


    // handle chnage fun
    const handleChnage = (event, property) => {
        //dynamic setting value
        setData({ ...data, [property]: event.target.value })
    }
    //reset data
    const resetData = () => {
        setData({
            name: '',
            email: '',
            password: '',
            about: ''
        });
    }

    //submit form

    const onSubmit = (event) => {
        // added this cos when we click on submit button so page will load and to stop that default behaviour we used event.preventDefault()
        event.preventDefault()

        //data validate 
    
        // send data to server
    
        singhUp(data).then((resp) => {
            toast.success("User registred successfully !! userId "+ resp.id);
            console.log(data)
            console.log("success log",resp)
            resetData()

        }).catch((error) => {
            console.log(error)
            console.log("something went wrong...  !!");
            // handle error in proper way
            setError({
                errors: error,
                isError: true
            })
        })

        console.log(data)
    }


    return (
        <Base><div>
            <Container>
                <Row className="mt-4">
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card color="dark" inverse>
                            <CardHeader><h3>Fill Inforamation to register !!</h3></CardHeader>

                            <CardBody>
                                {/* creating form */}
                                <Form>
                                    {/* name field */}
                                    <FormGroup>
                                        <Label for="name">Enter Name</Label>
                                        <Input type="text"
                                            placeholder="Enter here" id="name"
                                            onChange={(e) => handleChnage(e, 'name')}
                                            value={data.name}
                                            invalid={error.errors?.response?.data?.name ? true : false}></Input>

                                        <FormFeedback>{error.errors?.response?.data?.name}</FormFeedback>

                                    </FormGroup>

                                    {/* email field */}
                                    <FormGroup>
                                        <Label for="email">Enter Email</Label>
                                        <Input type="email"
                                            placeholder="Enter here"
                                            id="email" onChange={(e) => handleChnage(e, 'email')}
                                            value={data.email} invalid={error.errors?.response?.data?.email ? true : false}></Input>

                                        <FormFeedback>{error.errors?.response?.data?.email}</FormFeedback>

                                    </FormGroup>

                                    {/* password field */}
                                    <FormGroup>
                                        <Label for="password">Enter Password</Label>
                                        <Input type="password" placeholder="Enter here" id="password"
                                            onChange={(e) => handleChnage(e, 'password')} value={data.password}
                                            invalid={error.errors?.response?.data?.password ? true : false}></Input>

                                        <FormFeedback>{error.errors?.response?.data?.password}</FormFeedback>

                                    </FormGroup>

                                    {/* about field */}
                                    <FormGroup>
                                        <Label for="about">About</Label>
                                        <Input type="textarea" placeholder="Enter here" id="about"
                                            style={{ height: "100px" }} onChange={(e) => handleChnage(e, 'about')}
                                            value={data.about} invalid={error.errors?.response?.data?.about ? true : false}></Input>
                                        <FormFeedback>{error.errors?.response?.data?.about}</FormFeedback>
                                    </FormGroup>

                                    {/* buttons field */}
                                    <Container className="text-center">
                                        <Button outline color="light" onClick={onSubmit}>Register</Button>
                                        <Button outline color="light" className="ms-2" type="reset" onClick={resetData}>Reset</Button>
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
export default Signup;