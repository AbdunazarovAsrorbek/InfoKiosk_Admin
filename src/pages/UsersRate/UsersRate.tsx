import React, { useEffect, useMemo, useState } from "react";
import { Card, Col, Container, Row, Form, Modal, Button } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import {
    getUsersRateList as onGetUsersRateList
} from "slices/usersRate/thunk";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createSelector } from "reselect";
import Pagination from "Common/Pagination";
import { useNavigate, useLocation } from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().search);

const UsersRate = () => {
    document.title = "Users Rate";
    const dispatch = useDispatch<any>();
    const history = useNavigate()
    const query = useQuery();
    const location = useLocation();
    const [listView, setListView] = useState<any>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);

    const pageFromUrl = parseInt(query.get('page') || "1");
    const [pagination, setPagination] = useState(pageFromUrl);
    const size = 10;

    const totalPages = useSelector(
        (state: any) => state.UsersRate.usersRateList?.totalPages || 1
    );

    const selectUsersRateList = createSelector(
        (state: any) => state.UsersRate,
        (usersRate) => ({
            usersRateList: usersRate.usersRateList
        })
    );

    const { usersRateList } = useSelector(selectUsersRateList);

    useEffect(() => {
        const data = { page: pagination, size: size };
        dispatch(onGetUsersRateList({ data }));
    }, [dispatch, pagination]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        params.set("page", pagination.toString());
        history(`?${params.toString()}`, { replace: true });
    }, [pagination, history, location.search]);

    const handleChange = (ele: any) => {
        let search = ele.target.value.toLowerCase();
        if (search) {
            setListView(
                usersRateList.content?.filter((item: any) =>
                    item.name?.toLowerCase().includes(search) ||
                    item.facultyName?.toLowerCase().includes(search) ||
                    item.departmentName?.toLowerCase().includes(search) ||
                    item.rate?.toString().toLowerCase().includes(search) ||
                    item.description?.toLowerCase().includes(search) ||
                    item.phoneNumber?.toLowerCase().includes(search) ||
                    item.createdDate?.toLowerCase().includes(search)
                )
            );
        } else {
            setListView(usersRateList.content);
        }
    };

    useEffect(() => {
        setListView(usersRateList?.content || []);
    }, [usersRateList]);

    const openModal = (row: any) => {
        setSelectedRow(row);
        setShowModal(true);
    };

    const truncateText = (text: string, limit: number ) => {
        if (!text) return "";
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    };

    const columns = useMemo(
        () => [
            {
                header: "№",
                cell: (cell: any) => <span>{cell.row.index + 1}</span>,
            },
            {
                header: "Faculty",
                accessorKey: "facultyName",
                render: (val: string) => truncateText(val, 35),
            },
            {
                header: "Department",
                accessorKey: "departmentName",
                render: (val: string) => truncateText(val, 35),
            },
            {
                header: "Rate",
                accessorKey: "rate",
            },
            {
                header: "Description",
                accessorKey: "description",
                render: (val: string) => truncateText(val, 30),
            },
            {
                header: "Phone Number",
                accessorKey: "phoneNumber",
            },
            {
                header: "Created At",
                accessorKey: "createdDate",
            },
        ], []
    );

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row id="FacultyList">
                        <Col lg={12}>
                            <Card>
                                <Card.Header>
                                    <Row className="align-items-center g-2">
                                        <Col lg={3} className="me-auto">
                                            <h6 className="card-title mb-0">Users Rate List</h6>
                                        </Col>
                                        <Col xl={2} md={3}>
                                            <div className="search-box">
                                                <Form.Control
                                                    type="text" className="search"
                                                    placeholder="Search users rate..."
                                                    onChange={(e: any) => handleChange(e)}
                                                />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body className="mt-3">
                                    {listView && listView.length > 0 ? (
                                        <>
                                            <div className="table-responsive table-card">
                                                <table className="table table-centered align-middle table-custom-effect table-nowrap mb-0">
                                                    <thead className="table-light">
                                                        <tr>
                                                            {columns.map((col: any, index: number) => (
                                                                <th key={index}>{col.header}</th>
                                                            ))}
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {listView.map((row: any, rowIndex: number) => (
                                                            <tr key={rowIndex}>
                                                                {columns.map((col: any, colIndex: number) => (
                                                                    <td key={colIndex}>
                                                                        {col.cell
                                                                            ? col.cell({ row: { original: row, index: rowIndex } })
                                                                            : col.render
                                                                                ? col.render(row[col.accessorKey])
                                                                                : row[col.accessorKey]}
                                                                    </td>
                                                                ))}
                                                                <td>
                                                                    <Button
                                                                        variant="link"
                                                                        onClick={() => openModal(row)}
                                                                        className="btn btn-subtle-primary btn-icon btn-sm">
                                                                       <i className="ph-eye"></i>
                                                                </Button>
                                                            </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>

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

            {/* Modal */ }
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>User Rate Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedRow && (
                        <div>
                            <p><b>Faculty:</b> {selectedRow.facultyName}</p>
                            <p><b>Department:</b> {selectedRow.departmentName}</p>
                            <p><b>Rate:</b> {selectedRow.rate}</p>
                            <p><b>Description:</b> {selectedRow.description}</p>
                            <p><b>Phone:</b> {selectedRow.phoneNumber}</p>
                            <p><b>Created At:</b> {selectedRow.createdDate}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </React.Fragment >
    );
};

export default UsersRate;
