import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, Col, Container, Row, Form, Button, Modal } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import 'react-toastify/dist/ReactToastify.css';
import { DeleteModal } from "Common/DeleteModal";
import {
    facultyPaginationList as onFacultyPagination,
    addFacultyList as onAddFacultyList,
    updateFacultyList as onUpdateFacultyList,
    deleteFacultyList as onDeleteFacultyList,
    createFacultyQrCodeList as onCreateFacultyQrCodeList
} from "slices/faculty/thunk";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import Pagination from "Common/Pagination";

const Faculty = () => {

    document.title = "Faculty list";
    const dispatch = useDispatch<any>();
    const history = useNavigate();
    const location = useLocation();
    const [qrUrl, setQrUrl] = useState<string | null>(null);
    const [qrModalVisible, setQrModalVisible] = useState<boolean>(false);

    const facultyPagination = useSelector((state: any) => state.Faculty.facultyList);
    console.log(facultyPagination);

    const [pagination, setPagination] = useState(1);
    const size = 10;

    useEffect(() => {
        dispatch(onFacultyPagination({ page: pagination, size }));
    }, [dispatch, pagination]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        params.set("page", pagination.toString());
        history(`?${params.toString()}`, { replace: true });
    }, [pagination, history, location.search]);

    const [listView, setListView] = useState<any>();
    const [FacultyLists, setFacultyLists] = useState<any>(null);
    const [addFaculty, setAddFaculty] = useState<boolean>(false);
    const [editFaculty, setEditFaculty] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [edit, setEdit] = useState<any>();

    const handleCloseFaculty = () => setAddFaculty(false);
    const handleShowFaculty = () => setAddFaculty(true);

    const handleEdit = useCallback((item: any) => {
        const lastItem = item.row.original;
        setAddFaculty(true);
        setEditFaculty(true);
        setEdit({
            id: lastItem.id,
            name: lastItem.name
        });
    }, []);

    const handleChange = (ele: any) => {
        let search = ele.target.value.toLowerCase();
        if (search) {
            setListView(facultyPagination.content?.filter((item: any) =>
                item.name.toLowerCase().includes(search)
            ));
        } else {
            setListView(facultyPagination.content);
        }
    };

    const handleDeleteShow = (ele: any) => {
        setShow(true);
        setFacultyLists(ele);
    };

    const handleDeleteClose = () => {
        setShow(false);
    };

    const deleteModalFunction = async () => {
        const id = FacultyLists.row.original.id;
        if (!id) return;
        await dispatch(onDeleteFacultyList(id));
        const current = listView.length - 1; 
        if (current <= 0 && pagination > 1) {
            setPagination(pagination - 1);
        } else {
            await dispatch(onFacultyPagination({ page: pagination, size }));
        }
        setShow(false);
    };
    



    useEffect(() => {
        setListView(facultyPagination?.content || []);
    }, [facultyPagination]);

    const handleQrClick = async (id: number) => {
        try {
            const blob = await dispatch(onCreateFacultyQrCodeList(id)).unwrap();
            const url = URL.createObjectURL(blob);
            setQrUrl(url);
            setQrModalVisible(true);
        } catch (err) {
            toast.error("QR Code yoki PDF olishda xatolik", { autoClose: 2000 });
        }
    };

    const columns = useMemo(
        () => [
            {
                header: (
                    <Form.Check>
                        <Form.Check.Input type="checkbox" value="option" id="checkAll" />
                        <Form.Check.Label htmlFor="checkAll"></Form.Check.Label>
                    </Form.Check>
                ),
                cell: () => (
                    <Form.Check className="checkbox-product-list">
                        <Form.Check.Input type="checkbox" value="2" id="checkbox-2" />
                        <Form.Check.Label htmlFor="checkbox-2"></Form.Check.Label>
                    </Form.Check>
                ),
                id: "#",
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                header: "№",
                enableColumnFilter: false,
                enableSorting: false,
                cell: (cell: any) => <span>{cell.row.index + 1}</span>
            },
            {
                header: "Name",
                accessorKey: "name",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Status",
                accessorKey: "status",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "CreatedAt",
                accessorKey: "createdAt",
                enableColumnFilter: false,
                enableSorting: true,
            },
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
                            <Link to="#" className="btn btn-subtle-secondary btn-icon btn-sm edit-item-btn"
                                onClick={() => handleEdit(cell)}>
                                <i className="ph-pencil"></i>
                            </Link>
                        </li>
                        <li className="mx-2">
                            <Link to="#" className="btn btn-subtle-danger btn-icon btn-sm remove-item-btn"
                                onClick={() => handleDeleteShow(cell)}>
                                <i className="ph-trash"></i>
                            </Link>
                        </li>
                    </ul>
                )
            },
        ], [handleEdit]
    );

    const formik: any = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: (edit && edit.name) || '',
            id: edit && edit.id,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Name"),
        }),

        onSubmit: (values: any) => {
            if (editFaculty) {
                const data = { name: values.name, id: values.id };
                dispatch(onUpdateFacultyList({ updateFormData: data, id: values.id }))
                    .then(() => {
                        dispatch(onFacultyPagination({ page: pagination, size }));
                    });
                formik.resetForm();
            } else {
                const data = { name: values.name };
                dispatch(onAddFacultyList(data))
                    .then(() => {
                        dispatch(onFacultyPagination({ page: pagination, size }));
                    });
                formik.resetForm();
            }

            setEdit(null);
            setEditFaculty(false);
            handleCloseFaculty();
        }
    });

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
                                            <h6 className="card-title mb-0">Faculty List</h6>
                                        </Col>
                                        <Col xl={2} md={3}>
                                            <div className="search-box">
                                                <Form.Control
                                                    type="text"
                                                    className="search"
                                                    placeholder="Search faculty..."
                                                    onChange={handleChange}
                                                />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>
                                        <Col className="col-md-auto">
                                            <div className="hstack gap-2">
                                                <Button className="btn btn-subtle-danger d-none" id="remove-actions">
                                                    <i className="ri-delete-bin-2-line"></i>
                                                </Button>
                                                <Button variant="secondary" onClick={handleShowFaculty}>
                                                    <i className="bi bi-plus-circle align-baseline me-1"></i> Add Faculty
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body className="mt-3">
                                    {listView && listView.length > 0 ? (
                                        <>
                                            <TableContainer
                                                key={facultyPagination?.totalElements}
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
                                                    totalPages={facultyPagination?.totalPages}
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

            <DeleteModal
                show={show}
                handleClose={handleDeleteClose}
                deleteModalFunction={deleteModalFunction}
            />

            <Modal show={addFaculty} onHide={handleCloseFaculty}>
                <Modal.Header closeButton>
                    <Modal.Title>{editFaculty ? "Update Faculty" : "Add Faculty"}</Modal.Title>
                </Modal.Header>
                <Form autoComplete="off" onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <div className="mb-3">
                            <Form.Label htmlFor="Customer-Name-input">
                                Faculty Name<span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="Customer-Name-input"
                                name="name"
                                placeholder="Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={!!formik.errors.name}
                            />
                            {formik.errors.name && formik.touched.name && (
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.name}
                                </Form.Control.Feedback>
                            )}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            className="btn btn-ghost-danger"
                            onClick={handleCloseFaculty}
                        >
                            <i className="bi bi-x-lg align-baseline me-1"></i> Close
                        </Button>
                        <Button type="submit" variant="primary" id="add-btn">
                            {editFaculty ? "Update" : "Add Faculty"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

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

            <ToastContainer />
        </React.Fragment>
    );
};

export default Faculty;
