import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const StatistikPage = () => {
    const selectedAcademy = useSelector((state: any) => state.Overall.selectedAcademy);

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
        <Row style={{ margin: "20px 0" }}>
            <Col
                xl={12}
                style={{
                    padding: "20px 20px",
                    background: "#FFF",
                    borderRadius: "8px",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                    marginBottom: "20px",
                }}
            >
                {/* Title va foiz */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "15px",
                    }}
                >
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

                {/* List */}
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
            </Col>

            {/* Departamentlar */}
            <Row
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 20,
                    marginLeft: 0,
                    padding: 0,
                }}
            >
                {selectedAcademy?.departments?.map((item: any) => (
                    <Col
                        key={item?.id}
                        style={{
                            flex: "1 1 calc(50% - 10px)",
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
                                alignItems: "center",
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
        </Row>
    );
};

export default StatistikPage;
