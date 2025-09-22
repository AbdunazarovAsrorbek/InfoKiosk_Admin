import React from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Breadcrumb from "Common/BreadCrumb";
import { useNavigate } from "react-router-dom";
import backImg from "../../assets/img/back.png"
const StatisticsPage = () => {
    const selectedAcademy = useSelector((state: any) => state.Overall.selectedAcademy);
    const navigate = useNavigate();

    if (!selectedAcademy) {
        return (
            <Row>
                <Col
                    xl={12}
                    style={{
                        background: "#fff",
                        margin: "20px 10px",
                        padding: "12px 18px",
                        borderRadius: "8px",
                        color: "#000",
                        fontSize: 16,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                >
                    To'liq ma'lumotlarni ko'rish uchun kerakli bo'limni tanlang
                </Col>
            </Row>
        );
    }

    const getRateColor = (rate: number) => {
        if (rate < 3) return "text-danger";
        if (rate < 4) return "text-warning";
        return "text-success";
    };

    const getPercentColor = (percent: number) => {
        if (percent < 60) return "text-danger";
        if (percent <= 70) return "text-warning";
        return "text-success";
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <button onClick={() => navigate(-1)}
                        style={{
                            width: "40px",
                            height: "40px",
                            margin: "10px 0",
                            background: "#FFF",
                            border: "none",
                            borderRadius: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    > <img src={backImg} style={{ width: "30px", height: "30px" }} alt="" /> </button>
                    <Breadcrumb title="Statistics Page" pageTitle="CRM" />
                    <Row>
                        <Col lg="12">
                            <Card>
                                <Card.Body>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "15px" }}>
                                        <h3 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>
                                            {selectedAcademy?.name} Statistikasi
                                        </h3>
                                        <span
                                            className={getPercentColor(selectedAcademy?.percentRate)}
                                            style={{ fontSize: 18, fontWeight: 700 }}
                                        >
                                            {selectedAcademy?.percentRate}%
                                        </span>
                                    </div>
                                    <ul style={{ margin: 0, padding: 0, listStyle: "none", fontSize: 15, lineHeight: 1.6 }}>
                                        <li><b>Ovozlar soni:</b> {selectedAcademy?.rateCount}</li>
                                        <li>
                                            <b>O‘rtacha baho:</b>{" "}
                                            <span
                                                className={getRateColor(selectedAcademy?.averageRate)}
                                                style={{ fontWeight: 600 }}
                                            >
                                                {selectedAcademy?.averageRate}
                                            </span>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <h4 className="card-title mb-4">Main Statistics Page</h4>

                    <Card style={{ background: "none" }}>
                        <Card.Body style={{ padding: "0 10px" }}>
                            <Row style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                {selectedAcademy?.departments?.map((item: any) => (
                                    <Col
                                        key={item?.id}
                                        style={{
                                            // flex: "1 1 calc(45% - 10px)",
                                            minWidth: "35%",
                                            maxWidth: "48%",
                                            marginTop: 15,
                                            padding: "15px 18px",
                                            background: "#fff",
                                            borderLeft: "4px solid #0d6efd",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginBottom: "15px",
                                            }}
                                        >
                                            <h5 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
                                                {item?.name}
                                            </h5>
                                            <span
                                                className={getPercentColor(item?.percentRate)}
                                                style={{ fontSize: 16, fontWeight: 700 }}
                                            >
                                                {item?.percentRate}%
                                            </span>
                                        </div>
                                        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 14, lineHeight: 1.6 }}>
                                            <li><b>Ovozlar soni:</b> {item?.rateCount}</li>
                                            <li>
                                                <b>O‘rtacha baho:</b>{" "}
                                                <span
                                                    className={getRateColor(item?.averageRate)}
                                                    style={{ fontWeight: 600 }}
                                                >
                                                    {item?.averageRate}
                                                </span>
                                            </li>
                                        </ul>
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </React.Fragment >
    );
};

export default StatisticsPage;
