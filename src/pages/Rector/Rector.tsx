import React, { useEffect, useMemo, useState } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import { DeleteModal } from "Common/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
    getRectorList as onGetRectorList,
    deleteRectorList as onDeleteRectorList,
} from "slices/rector/thunk";

const Rector = () => {
    document.title = "Rector List";

    const dispatch = useDispatch<any>();
    const rectorPagination = useSelector((state: any) => state.Rector.rectorList);
    console.log(rectorPagination);

    const [listView, setListView] = useState<any>([]);
    const [show, setShow] = useState<boolean>(false);
    const [RectorLists, setRectorLists] = useState<any>(null);

    useEffect(() => {
        dispatch(onGetRectorList());
    }, [dispatch]);

    useEffect(() => {
        setListView(rectorPagination?.content || []);
    }, [rectorPagination]);

    const handleDeleteShow = (ele: any) => {
        setShow(true);
        setRectorLists(ele);
    };

    const handleDeleteClose = () => setShow(false);

    const deleteModalFunction = () => {
        const deleteData = RectorLists?.row?.original?.id;
        if (deleteData) {
            dispatch(onDeleteRectorList(deleteData)).then(() => {
                dispatch(onGetRectorList());
            });
        }
        setShow(false);
    };

    const handleSearch = (e: any) => {
        let search = e.target.value.toLowerCase();
        if (search) {
            setListView(
                rectorPagination.content?.filter((item: any) =>
                    item.name.toLowerCase().includes(search)
                )
            );
        } else {
            setListView(rectorPagination.content);
        }
    };

    const columns = useMemo(
        () => [
            {
                header: "№",
                cell: (cell: any) => <span>{cell.row.index + 1}</span>,
            },
            {
                header: "Full Name",
                accessorKey: "name",
            },
            {
                header: "Banner",
                cell: (cell: any) => (
                    <div className="bg-light rounded" style={{ width: "100px", height: "60px" }}>
                        <img
                            src={`data:image/${cell.row.original.bannerBase64?.startsWith("iVBORw0KGgo") ? "png" : "jpeg"};base64,${cell.row.original.bannerBase64 || ""}`}
                            alt="banner"
                            className="img-fluid w-100 h-100 rounded"
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                ),
            },
            {
                header: "Image",
                cell: (cell: any) => (
                    <div
                        className="bg-light rounded-circle"
                        style={{ width: "60px", height: "60px" }}
                    >
                        <img
                            src={`data:image/${cell.row.original.imgBase64?.startsWith("iVBORw0KGgo") ? "png" : "jpeg"};base64,${cell.row.original.imgBase64 || ""}`}
                            alt="rector"
                            className="img-fluid rounded-circle"
                            style={{ width: "60px", height: "60px", objectFit: "cover" }}
                        />
                    </div>
                ),
            },
            {
                header: "Position",
                accessorKey: "position",
            },
            {
                header: "Short Info",
                cell: (cell: any) => (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: (cell.row.original.shortInfo || "")
                                .slice(0, 30)
                        }}
                    />
                ),
            },
            {
                header: "Content",
                cell: (cell: any) => (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: (cell.row.original.content || "")
                                .slice(0, 60)
                                .replace(/<p>/g, '<p style="margin:0">'),
                        }}
                    />
                ),
            },
            {
                header: "Action",
                cell: (cell: any) => (
                    <ul className="d-flex gap-2 list-unstyled mb-0">
                        <li>
                            <Link
                                to={`/rector/edit/${cell.row.original.id}`}
                                className="btn btn-subtle-secondary btn-icon btn-sm"
                            >
                                <i className="ph-pencil"></i>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="btn btn-subtle-danger btn-icon btn-sm"
                                onClick={() => handleDeleteShow(cell)}
                            >
                                <i className="ph-trash"></i>
                            </Link>
                        </li>
                    </ul>
                ),
            },
        ],
        []
    );



    return (
        <div className="page-content">
            <Container fluid>
                <Row>
                    <Col lg={12}>
                        <Card>
                            <Card.Header>
                                <Row className="align-items-center g-2">
                                    <Col lg={3} className="me-auto">
                                        <h6 className="card-title mb-0">Rectorate List</h6>
                                    </Col>
                                    <Col xl={2} md={3}>
                                        <div className="search-box">
                                            <Form.Control
                                                type="text"
                                                className="search"
                                                placeholder="Search rector..."
                                                onChange={handleSearch}
                                            />
                                            <i className="ri-search-line search-icon"></i>
                                        </div>
                                    </Col>
                                    <Col className="col-md-auto">
                                        <div className="hstack gap-2">
                                            <Link to="/rector/create" className="btn btn-secondary">
                                                <i className="bi bi-plus-circle me-1"></i> Add Rector
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body className="mt-3">
                                {listView && listView.length > 0 ? (
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

            <DeleteModal
                show={show}
                handleClose={handleDeleteClose}
                deleteModalFunction={deleteModalFunction}
            />
        </div>
    );
};

export default Rector;
