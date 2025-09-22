import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import withRouter from 'Common/withRouter';

const ParticlesAuth = ({ children }: any) => {
    return (
        <React.Fragment>
            <div className="auth-page-wrapper py-5 position-relative d-flex align-items-center justify-content-center vh-100">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={10}>
                            <Card className="mb-0"
                                style={{ background: "none", boxShadow: "none" }}
                            >
                                <Row className="g-0 align-items-center">
                                    {/* Pass Children */}
                                    {children}
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default withRouter(ParticlesAuth);