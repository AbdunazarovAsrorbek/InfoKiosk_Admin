import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import withRouter from "Common/withRouter";
import Breadcrumb from "Common/BreadCrumb";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import { createAdmin, blockAdmin, unblockAdmin, getAllAdmins } from "slices/thunk";

const Admins = () => {
    document.title = "Admins";
    const dispatch = useDispatch<any>();
    const [showCreatePassword, setShowCreatePassword] = useState(false);

    const allAdmins = useSelector((state: any) => state.Admin.allAdmins);

    useEffect(() => {
        dispatch(getAllAdmins());
    }, [dispatch]);

    const createFormik = useFormik({
        initialValues: { username: "", password: "", fullName: "", email: "", phoneNumber: "" },
        validationSchema: Yup.object({
            username: Yup.string().required(),
            password: Yup.string().required(),
            fullName: Yup.string().required(),
            email: Yup.string().email().required(),
            phoneNumber: Yup.string().required()
        }),
        onSubmit: (values) => dispatch(createAdmin(values))
    });

    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumb title="Admins" pageTitle="Controller" />

                <Row>

                    {/* All Admins List */}
                    <Col lg={12}>
                        <Card className="mb-4">
                            <Card.Body>
                                <h4 className="card-title mb-4">All Admins</h4>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Full Name</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(allAdmins || []).map((admin: any, index: number) => (
                                            typeof admin === "object" ? (
                                                <tr key={admin.id || index}>
                                                    <td>{admin.id}</td>
                                                    <td>{admin.fullName}</td>
                                                    <td>{admin.username}</td>
                                                    <td>{admin.email}</td>
                                                    <td>{admin.phone}</td>
                                                    <td>{admin.status === "BLOCKED" ? "Blocked" : "Enabled"}</td>
                                                    <td>
                                                        {admin.status === "BLOCKED" ? (
                                                            <Button size="sm" variant="success" onClick={() => dispatch(unblockAdmin(admin.id))}>
                                                                Unblock
                                                            </Button>
                                                        ) : (
                                                            <Button size="sm" variant="danger" onClick={() => dispatch(blockAdmin(admin.id))}>
                                                                Block
                                                            </Button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ) : null
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Create Admin */}
                    <Col lg={12}>
                        <Card className="mb-4">
                            <Card.Body>
                                <h4 className="card-title mb-4">Create Admin</h4>
                                <Form onSubmit={createFormik.handleSubmit}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control type="text" name="fullName" value={createFormik.values.fullName} onChange={createFormik.handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" name="username" value={createFormik.values.username} onChange={createFormik.handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Password</Form.Label>
                                        <div className="d-flex align-items-center">
                                            <Form.Control
                                                type={showCreatePassword ? "text" : "password"}
                                                name="password"
                                                value={createFormik.values.password}
                                                onChange={createFormik.handleChange}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline-secondary"
                                                onClick={() => setShowCreatePassword(!showCreatePassword)}
                                                style={{ marginLeft: 5 }}
                                            >
                                                {showCreatePassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                            </Button>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" value={createFormik.values.email} onChange={createFormik.handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="text" name="phoneNumber" value={createFormik.values.phoneNumber} onChange={createFormik.handleChange} />
                                    </Form.Group>
                                    <Button type="submit" className="mt-2">Create Admin</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </div>
    );
};

export default withRouter(Admins);
