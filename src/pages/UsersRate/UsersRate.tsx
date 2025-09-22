import React, { useEffect, useMemo, useState } from "react";
import { Card, Col, Container, Row, Form, } from "react-bootstrap";
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
    const [listView, setListView] = useState<any>();

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
    console.log(usersRateList);



    useEffect(() => {
        const data = {
            page: pagination,
            size: size
        };
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

    const columns = useMemo(
        () => [
            {
                header: (
                    <Form.Check>
                        <Form.Check.Input type="checkbox" value="option" id="checkAll" />
                        <Form.Check.Label htmlFor="checkAll"></Form.Check.Label>
                    </Form.Check>
                ),
                cell: (cell: any) => {
                    return (
                        <Form.Check className="checkbox-product-list">
                            <Form.Check.Input type="checkbox" value="2" id="checkbox-2" />
                            <Form.Check.Label htmlFor="checkbox-2"></Form.Check.Label>
                        </Form.Check>
                    );
                },
                id: "#",
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                header: "№",
                enableColumnFilter: false,
                enableSorting: false,
                cell: (cell: any) => {
                    return (
                        <span>{cell.row.index + 1}</span>
                    )
                }
            },

            {
                header: "Faculty",
                accessorKey: "facultyName",
                enableColumnFilter: false,
                enableSorting: true,
            },

            {
                header: "Department",
                accessorKey: "departmentName",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Rate",
                accessorKey: "rate",
                enableColumnFilter: false,
                enableSorting: true,
            },

            {
                header: "Description",
                accessorKey: "description",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Phone Number",
                accessorKey: "phoneNumber",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Created At",
                accessorKey: "createdDate",
                enableColumnFilter: false,
                enableSorting: false,
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
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {listView.map((row: any, rowIndex: number) => (
                                                            <tr key={rowIndex}>
                                                                {columns.map((col: any, colIndex: number) => (
                                                                    <td key={colIndex}>
                                                                        {col.cell
                                                                            ? col.cell({ row: { original: row, index: rowIndex } })
                                                                            : row[col.accessorKey]}
                                                                    </td>
                                                                ))}
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
            <ToastContainer />
        </React.Fragment>
    );
};

export default UsersRate;