import React, { useEffect, useMemo, useState } from "react";
import { Card, Col, Container, Row, Form, Button, Modal } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { createSelector } from "reselect";
import {
    getApplicationList as onGetApplicationList,
    deleteApplicationList as onDeleteApplication,
    changeApplicationStatusList as onChangeStatus,
    getApplicationQrCodeList as onGetApplicationQrCodeList
} from "slices/application/thunk";
import Pagination from "Common/Pagination";

// URL query olish uchun hook
const useQuery = () => new URLSearchParams(useLocation().search);

const Application = () => {
    document.title = "Application list";
    const dispatch = useDispatch<any>();
    const history = useNavigate();
    const query = useQuery();
    const location = useLocation();

    // Pagination state
    const pageFromUrl = parseInt(query.get("page") || "1");
    const [pagination, setPagination] = useState(pageFromUrl);
    const size = 10;

    // Redux state selector
    const selectApplication = createSelector(
        (state: any) => state.Application,
        (application) => ({
            applicationList: application.applicationList,
            loading: application.loading,
        })
    );
    const { applicationList } = useSelector(selectApplication);
    console.log(applicationList);

    const totalPages = useSelector(
        (state: any) => state.Application.applicationList?.totalPages || 1
    );

    // Local states
    const [listView, setListView] = useState<any[]>([]);
    const [activeButton, setActiveButton] = useState("pending");
    const [fromDate, setFromDate] = useState<string>("");
    const [toDate, setToDate] = useState<string>("");
    const [qrUrl, setQrUrl] = useState<string | null>(null);
    const [qrModalVisible, setQrModalVisible] = useState<boolean>(false);
    const [selectedApp, setSelectedApp] = useState<any | null>(null);
    const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);

    // Filter + search
    const handleChange = (e: any) => {
        let search = e.target.value;
        if (search) {
            setListView(applicationList.content?.filter((item: any) => {
                return item.fullName?.toLowerCase().includes(search.toLowerCase());
            }));
        } else {
            setListView(applicationList.content?.filter((item: any) =>
                item.status?.toLowerCase().includes(activeButton)
            ));
        }
    };

    const handleSort = (e: any) => {
        let status = e.target.value;
        setActiveButton(status);
        filterList(status, fromDate, toDate);
    };

    const handleFromDate = (e: any) => {
        const value = e.target.value;
        setFromDate(value);
        filterList(activeButton, value, toDate);
    };

    const handleToDate = (e: any) => {
        const value = e.target.value;
        setToDate(value);
        filterList(activeButton, fromDate, value);
    };

    // Filter function
    const filterList = (status: string, from: string, to: string) => {
        let filtered = applicationList.content || [];

        if (status) {
            filtered = filtered.filter((item: any) =>
                item.status?.toLowerCase().includes(status.toLowerCase())
            );
        }
        if (from) {
            filtered = filtered.filter((item: any) =>
                new Date(item.createdDate) >= new Date(from)
            );
        }
        if (to) {
            filtered = filtered.filter((item: any) =>
                new Date(item.createdDate) <= new Date(to)
            );
        }

        setListView(filtered);
    };

    // Accept / Reject / Delete actions
    const handleAccept = async (item: any) => {
        await dispatch(onChangeStatus({ id: item.id, status: "ACCEPTED" }));
        toast.success("Application accepted ✅", { autoClose: 2000 });

        // Yangilash
        dispatch(onGetApplicationList({ data: { page: pagination, size } }));
    };

    const handleReject = async (item: any) => {
        await dispatch(onChangeStatus({ id: item.id, status: "REJECTED" }));
        toast.warning("Application rejected ❌", { autoClose: 2000 });

        // Yangilash
        dispatch(onGetApplicationList({ data: { page: pagination, size } }));
    };

    const handleDelete = async (item: any) => {
        try {
            await dispatch(onDeleteApplication(item.id)).unwrap();
            toast.success("Application deleted 🗑️", { autoClose: 2000 });

            // Ro‘yxatni qayta yuklash
            dispatch(onGetApplicationList({ data: { page: pagination, size } }));

            // Local state’dan ham olib tashlash
            setListView(prev => prev.filter((el: any) => el.id !== item.id));
        } catch (err) {
            toast.error("O‘chirishda xatolik ❌", { autoClose: 2000 });
        }
    };

    // QR Code modal
    const handleQrClick = async () => {
        try {
            const blob = await dispatch(onGetApplicationQrCodeList()).unwrap();
            const url = URL.createObjectURL(blob);
            setQrUrl(url);
            setQrModalVisible(true);
        } catch (err) {
            toast.error("QR Code yoki PDF olishda xatolik", { autoClose: 2000 });
        }
    };

    // Reduxdan list olish
    useEffect(() => {
        const data = {
            page: pagination,
            size: size,
        };
        dispatch(onGetApplicationList({
            data,
            from: fromDate || undefined,
            to: toDate || undefined,
            status: activeButton ? activeButton.toUpperCase() : undefined,
        }));
    }, [dispatch, pagination, activeButton]);

    // URL param update
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        params.set("page", pagination.toString());
        history(`?${params.toString()}`, { replace: true });
    }, [pagination, history, location.search]);

    // Reduxdan kelgan data → local state
    useEffect(() => {
        if (applicationList?.content) {
            // Agar status filter ishlatayotgan bo'lsa, filter qilib beramiz
            if (activeButton) {
                filterList(activeButton, fromDate, toDate);
            } else {
                setListView(applicationList.content);
            }
        }
    }, [applicationList]);



    // Table columns
    const columns = useMemo(
        () => [
            {
                header: "№",
                cell: (cell: any) => <span>{cell.row.index + 1}</span>,
            },
            {
                header: "Full Name",
                accessorKey: "fullName",
                cell: (cell: any) => {
                    const text = cell.getValue() || "";
                    return text.split(" ").length > 15
                        ? text.split(" ").slice(0, 15).join(" ") + "..."
                        : text;
                },
            },
            {
                header: "Phone",
                accessorKey: "phoneNumber",
            },
            {
                header: "Description",
                accessorKey: "description",
                cell: (cell: any) => {
                    const text = cell.getValue() || "";
                    return text.split(" ").length > 15
                        ? text.split(" ").slice(0, 15).join(" ") + "..."
                        : text;
                },
            },
            {
                header: "Rector Name",
                accessorKey: "rektorName",
            },
            {
                header: "Status",
                accessorKey: "status",
            },
            {
                header: "Created Date",
                accessorKey: "createdDate",
            },
            {
                header: "Action",
                cell: (cell: any) => {
                    const item = cell.row.original;
                    return (
                        <ul className="d-flex gap-2 list-unstyled mb-0">
                            <li>
                                {/* View Icon */}
                                <Link
                                    to="#"
                                    className="btn btn-subtle-primary btn-icon btn-sm"
                                    onClick={() => {
                                        setSelectedApp(item);
                                        setDetailModalVisible(true);
                                    }}
                                >
                                    <i className="ph-eye"></i>
                                </Link>
                            </li>

                            {item.status?.toLowerCase() === "pending" && (
                                <>
                                    <li>
                                        <Link
                                            to="#"
                                            className="btn btn-subtle-danger btn-icon btn-sm"
                                            onClick={() => handleReject(item)}
                                        >
                                            <i className="ph-x-thin"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="btn btn-subtle-success btn-icon btn-sm"
                                            onClick={() => handleAccept(item)}
                                        >
                                            <i className="ph-check-thin"></i>
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li>
                                <Link
                                    to="#"
                                    className="btn btn-subtle-warning btn-icon btn-sm"
                                    onClick={() => handleDelete(item)}
                                >
                                    <i className="ph-trash"></i>
                                </Link>
                            </li>
                        </ul>
                    );
                },
            },
        ],
        []
    );

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row id="application">
                        <Col lg={12}>
                            <Card>
                                <Card.Header>
                                    <Row className="align-items-center g-2">
                                        <Col lg={3} className="me-auto">
                                            <h6 className="card-title mb-0">Application List</h6>
                                        </Col>
                                        <Col className="col-md-auto">
                                            <Button variant="info" size="sm" onClick={handleQrClick}>
                                                <i className="bi bi-qr-code"></i> QR
                                            </Button>
                                        </Col>
                                        <Col className="col-md-auto">
                                            <Form.Select className="search" onChange={handleSort}>
                                                <option value="PENDING">Pending</option>
                                                <option value="ACCEPTED">Accepted</option>
                                                <option value="REJECTED">Rejected</option>
                                                <option value="ARCHIVED">Archived</option>
                                                <option value="MEETING">Meeting</option>
                                            </Form.Select>
                                        </Col>
                                        <Col className="col-md-auto">
                                            <Form.Control type="date" value={fromDate} onChange={handleFromDate} />
                                        </Col>
                                        <Col className="col-md-auto">
                                            <Form.Control type="date" value={toDate} onChange={handleToDate} />
                                        </Col>
                                        <Col xl={2} md={3}>
                                            <div className="search-box">
                                                <Form.Control
                                                    type="text"
                                                    className="search"
                                                    placeholder="Search application..."
                                                    onChange={handleChange}
                                                />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Header>

                                <Card.Body className="mt-3">
                                    {listView && listView.length > 0 ? (
                                        <>
                                            <TableContainer
                                                isPagination={false}
                                                columns={columns}
                                                data={listView || []}
                                                customPageSize={10}
                                                divClassName="table-responsive table-card"
                                                tableClass="table table-centered align-middle table-custom-effect table-nowrap mb-0"
                                                theadClass="table-light"
                                                PaginationClassName="align-items-center mt-4 pt-3"
                                                isBordered={false}
                                            />
                                            <div className="d-flex align-items-center justify-content-end mt-4 pt-3">
                                                <Pagination
                                                    currentPage={pagination}
                                                    totalPages={totalPages}
                                                    onPageChange={(page: number) => setPagination(page)}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div id="noresult">
                                            <div className="text-center py-4">
                                                <div className="avatar-md mx-auto mb-4">
                                                    <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-5xl">
                                                        <i className="bi bi-search"></i>
                                                    </div>
                                                </div>
                                                <h5 className="mt-2">Sorry! No Result Found</h5>
                                            </div>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* QR modal */}
            <Modal show={qrModalVisible} onHide={() => setQrModalVisible(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>QR Code / PDF</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {qrUrl ? (
                        <iframe src={qrUrl} width="100%" height="500px" title="QR Code Preview" />
                    ) : (
                        <p>Hech narsa topilmadi</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            const a = document.createElement("a");
                            a.href = qrUrl!;
                            a.download = "application_qrcode.pdf";
                            a.click();
                        }}
                    >
                        Yuklab olish
                    </Button>
                    <Button variant="secondary" onClick={() => setQrModalVisible(false)}>
                        Yopish
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Detail Modal */}
            <Modal
                show={detailModalVisible}
                onHide={() => setDetailModalVisible(false)}
                size="lg"
                centered
            >
                {/* <Modal.Header closeButton>
                    <Modal.Title>Application Details</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    {selectedApp ? (
                        <div>
                            <p><strong>Full Name:</strong> {selectedApp.fullName}</p>
                            <p><strong>Phone:</strong> {selectedApp.phoneNumber}</p>
                            <p><strong>Description:</strong> {selectedApp.description}</p>
                            <p><strong>Rector Name:</strong> {selectedApp.rektorName}</p>
                            <p><strong>Status:</strong> {selectedApp.status}</p>
                            <p><strong>Created Date:</strong> {selectedApp.createdDate}</p>
                        </div>
                    ) : (
                        <p>No data</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDetailModalVisible(false)}>
                        Yopish
                    </Button>
                </Modal.Footer>
            </Modal>


            <ToastContainer />
        </React.Fragment>
    );
};

export default Application;


