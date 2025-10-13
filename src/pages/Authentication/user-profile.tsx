import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import withRouter from "Common/withRouter";
import Breadcrumb from "Common/BreadCrumb";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import {
    getAdminById as onGetAdminById,
    updateAdmin as onUpdateAdmin,
    changePassword
} from "slices/thunk";

const UserProfile = () => {
    document.title = "Profile";
    const dispatch = useDispatch<any>();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const passwordValidationSchema = Yup.object({
        oldPassword: Yup.string()
            .required("Old password required"),

        newPassword: Yup.string()
            .min(8, "Parol kamida 8 ta belgidan iborat bo‘lishi kerak")
            .matches(/[A-Z]/, "Parolda kamida bitta katta harf bo‘lishi kerak")
            .matches(/\d/, "Parolda kamida bitta raqam bo‘lishi kerak")
            .required("New password required"),
    });
    const admin = useSelector((state: any) => state.Admin.adminProfile);

    useEffect(() => {
        dispatch(onGetAdminById());
    }, [dispatch]);

    const profileFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: admin?.id || "",
            fullName: admin?.fullName || "",
            username: admin?.username || "",
            email: admin?.email || "",
            phone: admin?.phone || "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Full name required"),
            username: Yup.string().required("Username required"),
            email: Yup.string().email("Invalid email").required("Email required"),
            phone: Yup.string().required("Phone required"),
        }),
        onSubmit: (values) => {
            dispatch(onUpdateAdmin({ updateFormData: values, id: values.id }));
        },
    });

    const passwordFormik = useFormik({
        initialValues: { oldPassword: "", newPassword: "" },
        validationSchema: passwordValidationSchema,
        onSubmit: (values) => {
            dispatch(changePassword({
                oldPassword: values.oldPassword,
                newPassword: values.newPassword
            }));
        }
    });

    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumb title="Profile" pageTitle="Controller" />

                <Row>
                    <Col lg="12">
                        <Card className="mb-4">
                            <Card.Body className="d-flex">
                                <div style={{
                                    width: 65,
                                    height: 65,
                                    borderRadius: "50%",
                                    background: "#CCC",
                                    marginRight: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <h6 style={{ fontSize: 25, padding: 0, margin: 0 }}>
                                        {admin?.fullName?.[0]}.
                                    </h6>
                                </div>
                                <div className="flex-grow-1 align-self-center">
                                    <h5 style={{ padding: "0", margin: "0", fontWeight: 'bold' }}>Full Name: <span style={{ fontWeight: "500" }}>{admin?.fullName}</span></h5>
                                    <p style={{ padding: "3px 0", margin: "0", fontWeight: 'bold' }}>Username: <span style={{ fontWeight: "500" }}>{admin?.username}</span></p>
                                    <p style={{ padding: "0", margin: "0", fontWeight: 'bold' }}>Role: <span style={{ fontWeight: "500" }}>{admin?.roleName}</span></p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Update Profile */}
                <Row>
                    <Col lg="8">
                        <Card className="mb-4">
                            <Card.Body>
                                <h4 className="card-title mb-4">Update Profile</h4>
                                <Form onSubmit={profileFormik.handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control type="text" name="fullName" value={profileFormik.values.fullName} onChange={profileFormik.handleChange} isInvalid={!!profileFormik.errors.fullName} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control type="text" name="username" value={profileFormik.values.username} onChange={profileFormik.handleChange} isInvalid={!!profileFormik.errors.username} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" name="email" value={profileFormik.values.email} onChange={profileFormik.handleChange} isInvalid={!!profileFormik.errors.email} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control type="text" name="phone" value={profileFormik.values.phone} onChange={profileFormik.handleChange} isInvalid={!!profileFormik.errors.phone} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div className="text-end">
                                        <Button type="submit" variant="primary">Update Profile</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Change Password */}
                    <Col lg={4}>
                        <Card className="mb-4">
                            <Card.Body>
                                <h4 className="card-title mb-4">Change Password</h4>
                                <Form onSubmit={passwordFormik.handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Old Password</Form.Label>
                                        <div className="d-flex align-items-center">
                                            <Form.Control
                                                type={showOldPassword ? "text" : "password"}
                                                name="oldPassword"
                                                value={passwordFormik.values.oldPassword}
                                                onChange={passwordFormik.handleChange}
                                                isInvalid={passwordFormik.submitCount > 0 && !!passwordFormik.errors.oldPassword}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline-secondary"
                                                onClick={() => setShowOldPassword(!showOldPassword)}
                                                style={{ marginLeft: 5 }}
                                            >
                                                {showOldPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                            </Button>
                                        </div>
                                        <Form.Control.Feedback type="invalid">
                                            {passwordFormik.errors.oldPassword}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>New Password</Form.Label>
                                        <div className="d-flex align-items-center">
                                            <Form.Control
                                                type={showNewPassword ? "text" : "password"}
                                                name="newPassword"
                                                value={passwordFormik.values.newPassword}
                                                onChange={passwordFormik.handleChange}
                                                onBlur={passwordFormik.handleBlur}
                                                isInvalid={passwordFormik.submitCount > 0 && !!passwordFormik.errors.newPassword}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline-secondary"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                style={{ marginLeft: 5 }}
                                            >
                                                {showNewPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                            </Button>
                                        </div>

                                        {passwordFormik.submitCount > 0 && passwordFormik.errors.newPassword && (
                                            <div style={{ color: "red", marginTop: "5px", fontSize: "0.9rem" }}>
                                                {passwordFormik.errors.newPassword}
                                            </div>
                                        )}
                                    </Form.Group>

                                    <div className="text-end">
                                        <Button type="submit" variant="primary">Change Password</Button>
                                    </div>
                                </Form>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default withRouter(UserProfile);
