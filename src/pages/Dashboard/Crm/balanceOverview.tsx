import { useEffect, useMemo, useState } from 'react'
import { Button, Card, Col, Table, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOverallList as onGetOverallList } from "../../../slices/overallStatistics/thunk";
import { setSelectedAcademy } from 'slices/overallStatistics/reducer';
import { BasicColumn } from './charts';
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";

const generateUniqueColors = (count: number) => {
    const colors: string[] = [];
    while (colors.length < count) {
        const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
        if (!colors.includes(color)) {
            colors.push(color);
        }
    }
    return colors;
};

const BalanceOverview = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const selectOverallList = (state: any) => state.Overall?.overallList;
    const overallList = useSelector(selectOverallList);

    // inputlar uchun state
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    useEffect(() => {
        const today = dayjs().format("YYYY-MM-DD");
        dispatch(onGetOverallList({ from: "1975-01-01", to: today }));
    }, [dispatch]);

    const chartData = useMemo(() => {
        if (!overallList || !Array.isArray(overallList)) return [];
        return overallList.map((academy: any) => ({
            name: academy.name,
            data: [academy.averageRate],
        }));
    }, [overallList]);

    const chartColors = generateUniqueColors(overallList?.length || 0);

    const getRateColor = (rate: number) => {
        if (rate < 3) return "text-danger ";
        if (rate < 4) return "text-warning ";
        return "text-success";
    };

    const getPercentColor = (percent: number) => {
        if (percent < 60) return "text-danger ";
        if (percent <= 70) return "text-warning ";
        return "text-success ";
    };

    // tugmalar uchun handler
    const handleFilter = (range: "1m" | "6m" | "1y" | "all") => {
        const today = dayjs().format("YYYY-MM-DD");
        let fromDate = "";

        if (range === "1m") fromDate = dayjs().subtract(1, "month").format("YYYY-MM-DD");
        if (range === "6m") fromDate = dayjs().subtract(6, "month").format("YYYY-MM-DD");
        if (range === "1y") fromDate = dayjs().subtract(1, "year").format("YYYY-MM-DD");
        if (range === "all") fromDate = "1975-01-01";

        dispatch(onGetOverallList({ from: fromDate, to: today }));
    };

    // custom input filter
    const handleCustomFilter = () => {
        if (from && to) {
            dispatch(onGetOverallList({ from, to }));
        }
    };

    return (
        <Col xl={12}>
            <Card className="card-height-100">
                <Card.Header className="align-items-center d-flex justify-content-between">
                    <h6 className="card-title mb-0">Overall Statistika</h6>
                    <div className='d-flex gap-1'>
                        <Button className="btn-subtle-secondary btn-sm" onClick={() => handleFilter("all")}>Umumiy</Button>
                        <Button className="btn-subtle-secondary btn-sm" onClick={() => handleFilter("1m")}>1 Oyli</Button>
                        <Button className="btn-subtle-secondary btn-sm" onClick={() => handleFilter("6m")}>6 Oyli</Button>
                        <Button className="btn-subtle-primary btn-sm" onClick={() => handleFilter("1y")}>1 Yilli</Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    {/* Custom From-To filter */}
                    <div className="d-flex gap-2 mb-3">
                        <Form.Control
                            type="date"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            placeholder="Boshlanish sanasi"
                        />
                        <Form.Control
                            type="date"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            placeholder="Tugash sanasi"
                        />
                        <Button className="btn-primary btn-sm" onClick={handleCustomFilter}>
                            Filter
                        </Button>
                    </div>

                    <BasicColumn periodData={chartData} dataColors={chartColors} />

                    <div className="table-responsive mt-3">
                        <Table className="align-middle table-nowrap mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">Academy</th>
                                    <th scope="col">Ovozlar soni</th>
                                    <th scope="col">O‘rtacha baho</th>
                                    <th scope="col">Foiz</th>
                                    <th scope="col">Progress</th>
                                    <th scope="col">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {overallList?.length > 0 ? (
                                    overallList?.map((academy: any, index: number) => (
                                        <tr key={academy.id}>
                                            <td className="fw-semibold text-start">
                                                <i
                                                    className="bi bi-diamond-fill me-1"
                                                    style={{ color: chartColors[index] }}
                                                ></i>
                                                {academy.name}
                                            </td>
                                            <td>{academy.rateCount}</td>
                                            <td>
                                                <span className={getRateColor(academy.averageRate)}>
                                                    {academy.averageRate}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={getPercentColor(academy.percentRate)}>
                                                    {academy.percentRate}%
                                                </span>
                                            </td>
                                            <td>
                                                <div className="progress progress-sm">
                                                    <div
                                                        className={`progress-bar ${getPercentColor(academy.percentRate).replace("text-", "bg-")}`}
                                                        role="progressbar"
                                                        style={{ width: `${academy.percentRate}%` }}
                                                        aria-valuenow={academy.percentRate}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    ></div>
                                                </div>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-link p-0"
                                                    onClick={() => {
                                                        dispatch(setSelectedAcademy(academy));
                                                        navigate("/statisticsPage");
                                                    }}
                                                >
                                                    View All <i className="bi bi-arrow-right"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center text-muted">
                                            No data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default BalanceOverview;
