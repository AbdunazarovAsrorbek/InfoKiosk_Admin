import React, { useEffect, useMemo, useState } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import { DeleteModal } from "Common/DeleteModal";
import {
    departmentPaginationList as onDepartmentPaginationList,
    deleteDepartmentList as onDeleteDepartmentList,
    createDepartmentQrCodeList as OnCreateDepartmentQrCodeList,
} from "slices/department/thunk";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Pagination from "Common/Pagination";

const Department = () => {
    document.title = "Department list";
    const dispatch = useDispatch<any>();
    const history = useNavigate();
    const location = useLocation();

    const departmentPagination = useSelector((state: any) => state.Department.departmentList);
    console.log("xxxxxxxxxxxxxxx", departmentPagination);

    const [pagination, setPagination] = useState(1);
    const size = 10;

    useEffect(() => {
        dispatch(onDepartmentPaginationList({ page: pagination, size }));
    }, [dispatch, pagination]);


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        params.set("page", pagination.toString());
        history(`?${params.toString()}`, { replace: true });
    }, [pagination, history, location.search]);

    const [listView, setListView] = useState<any[]>([]);
    const [DepartmentLists, setDepartmentLists] = useState<any>(null);
    const [show, setShow] = useState<boolean>(false);

    const [qrUrl, setQrUrl] = useState<string | null>(null);
    const [qrModalVisible, setQrModalVisible] = useState<boolean>(false);

    const handleChange = (ele: any) => {
        const search = ele.target.value.toLowerCase();
        setListView(
            search
                ? (departmentPagination.content || []).filter((item: any) => item.name.toLowerCase().includes(search))
                : departmentPagination.content || []
        );;
    };

    const handleDeleteShow = (ele: any) => {
        setShow(true);
        setDepartmentLists(ele);
    };
    const handleDeleteClose = () => setShow(false);

    const deleteModalFunction = async () => {
        const deleteData = DepartmentLists?.row?.original?.id;
        if (deleteData) {
            dispatch(onDeleteDepartmentList(deleteData))
                .unwrap()
                .then(() => {
                    toast.success("Department Deleted Successfully", { autoClose: 2000 });
                    dispatch(onDepartmentPaginationList({ page: pagination, size }));
                })
                .catch(() => toast.error("Department Delete Failed", { autoClose: 2000 }));
        }
        setShow(false);
    };

    useEffect(() => {
        setListView(departmentPagination.content || []);
    }, [departmentPagination]);

    const handleQrClick = async (id: number) => {
        try {
            const blob = await dispatch(OnCreateDepartmentQrCodeList(id)).unwrap();
            const url = URL.createObjectURL(blob);
            setQrUrl(url);
            setQrModalVisible(true);
        } catch (err) {
            toast.error("QR Code yoki PDF olishda xatolik", { autoClose: 2000 });
        }
    };

    const columns = useMemo(
        () => [
            { header: "№", enableColumnFilter: false, enableSorting: false, cell: (cell: any) => <span>{cell.row.index + 1}</span> },
            { header: "Name", accessorKey: "name", cell: (cell: any) => cell.row.original?.name?.slice(0, 25) || "", enableColumnFilter: false, enableSorting: true },
            { header: "Faculty", accessorKey: "facultyName", cell: (cell: any) => cell.row.original?.facultyName?.slice(0, 25) || "", enableColumnFilter: false, enableSorting: true },
            { header: "Short Info", accessorKey: "shortInfo", cell: (cell: any) => cell.row.original?.shortInfo?.slice(0, 25) || "", enableColumnFilter: false, enableSorting: true },
            { header: "Content", accessorKey: "content", cell: (cell: any) => cell.row.original?.content?.slice(0, 25) || "", enableColumnFilter: false, enableSorting: true },
            { header: "Status", accessorKey: "status", enableColumnFilter: false, enableSorting: true },
            {
                header: "QR Code",
                enableColumnFilter: false,
                enableSorting: false,
                cell: (cell: any) => (
                    <Button variant="info" size="sm" onClick={() => handleQrClick(cell.row.original.id)}>
                        <i className="bi bi-qr-code"></i> QR
                    </Button>
                ),
            },
            {
                header: "Action",
                enableColumnFilter: false,
                enableSorting: false,
                cell: (cell: any) => (
                    <ul className="d-flex gap-2 list-unstyled mb-0">
                        <li>
                            <Link to={`/createDepartment/${cell.row.original.id}`} className="btn btn-subtle-primary btn-icon btn-sm">
                                <i className="ph-pencil"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="btn btn-subtle-danger btn-icon btn-sm remove-item-btn" onClick={() => handleDeleteShow(cell)}>
                                <i className="ph-trash"></i>
                            </Link>
                        </li>
                    </ul>
                ),
            },
        ],
        [dispatch]
    );

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row id="facultyList">
                        <Col lg={12}>
                            <Card>
                                <Card.Header>
                                    <Row className="align-items-center g-2">
                                        <Col lg={3} className="me-auto">
                                            <h6 className="card-title mb-0">Department List</h6>
                                        </Col>
                                        <Col xl={2} md={3}>
                                            <Form.Control type="text" placeholder="Search department..." onChange={handleChange} />
                                        </Col>
                                        <Col className="col-md-auto">
                                            <Link to="/createDepartment">
                                                <Button variant="secondary">
                                                    <i className="bi bi-plus-circle me-1"></i> Add Department
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body style={{ marginTop: "15px" }}>
                                    {listView?.length ? (
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
                                                    totalPages={departmentPagination?.totalPages}
                                                    onPageChange={(page: number) => setPagination(page)}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-4">
                                            <h5>No results found</h5>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <DeleteModal show={show} handleClose={handleDeleteClose} deleteModalFunction={deleteModalFunction} />

            {qrModalVisible && qrUrl && (
                <div className="qr-preview-modal" style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999
                }}>
                    <div style={{ width: "80%", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", position: "relative" }}>
                        <Button style={{ position: "absolute", top: "10px", right: "21px" }} onClick={() => setQrModalVisible(false)}>Close</Button>
                        <a href={qrUrl} download style={{ marginBottom: "10px", display: "inline-block" }}>
                            Download QR / PDF
                        </a>
                        <iframe src={qrUrl} width="100%" height="600" style={{ border: "1px solid #ccc", borderRadius: "8px" }} title="QR/PDF Preview" />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default Department;
