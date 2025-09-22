import React, { useEffect, useRef } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    addDepartmentList as onCreateDepartmentList,
    updateDepartmentList as onUpdateDepartmentList,
    getDepartmentById as onGetDepartmentById,
} from "slices/department/thunk";
import { getFacultyList as onGetFacultyList } from "slices/faculty/thunk";
import { createSelector } from "reselect";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

import { Editor } from "@tinymce/tinymce-react";

interface FormValues {
    name: string;
    facultyId?: number;
    shortInfo: string;
    content: string;
}

const CreateDepartment = () => {
    document.title = "Create / Edit Department";
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { id } = useParams(); 
    const editorRef = useRef<any>(null);

    const selectFacultyContent = createSelector(
        (state: any) => state.Faculty.facultyList,
        (facultyList) => facultyList.content || []
    );
    const faculty = useSelector(selectFacultyContent);

    const formik = useFormik<FormValues>({
        initialValues: {
            name: "",
            facultyId: undefined,
            shortInfo: "",
            content: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please enter name"),
            facultyId: Yup.number()
                .required("Please select a Faculty")
                .typeError("Please select a Faculty"),
            shortInfo: Yup.string().required("Please enter short info"),
            content: Yup.string().required("Please enter content"),
        }),
        onSubmit: async (values, { resetForm }) => {
            const DepartmentDto = {
                name: values.name,
                facultyId: values.facultyId,
                shortInfo: values.shortInfo,
                content: values.content,
            };

            try {
                if (id) {
                    await dispatch(
                        onUpdateDepartmentList({ id, updateFormData: DepartmentDto })
                    ).unwrap();
                    // toast.success("Department updated successfully!");
                } else {
                    await dispatch(onCreateDepartmentList(DepartmentDto)).unwrap();
                    toast.success("Department created successfully!");
                }
                // navigate("/department");
            } catch (err) {
                toast.error("Failed to save department");
            }
        }
    });

    useEffect(() => {
        dispatch(onGetFacultyList());
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(onGetDepartmentById(id)).then((res: any) => {
                if (res?.payload) {
                    formik.setValues({
                        name: res.payload.name || "",
                        facultyId: res.payload.facultyId || "",
                        shortInfo: res.payload.shortInfo || "",
                        content: res.payload.content || "",
                    });
                    editorRef.current?.setContent(res.payload.content || "");
                }
            });
        }
    }, [id, dispatch]);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <Card.Header>
                                    <h6 className="card-title mb-0">
                                        {id ? "Edit Department" : "Create Department"}
                                    </h6>
                                </Card.Header>
                                <Card.Body>
                                    <Form autoComplete="off" onSubmit={formik.handleSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                isInvalid={formik.touched.name && !!formik.errors.name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Faculty</Form.Label>
                                            <Form.Select
                                                name="facultyId"
                                                value={formik.values.facultyId || ""}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                isInvalid={
                                                    formik.touched.facultyId && !!formik.errors.facultyId
                                                }
                                            >
                                                <option value="">Select Faculty...</option>
                                                {faculty.map((f: any) => (
                                                    <option key={f.id} value={f.id}>
                                                        {f.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.facultyId}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Short Info</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                name="shortInfo"
                                                value={formik.values.shortInfo}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                isInvalid={
                                                    formik.touched.shortInfo &&
                                                    !!formik.errors.shortInfo
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.shortInfo}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Card className="mb-3">
                                            <Card.Title className="mb-3">Content:</Card.Title>
                                            <Editor
                                                apiKey="al9ig6955nahjappojktglfuwby2sttv30hlpu3a44ucgtl5"
                                                onInit={(evt, editor) => (editorRef.current = editor)}
                                                //   initialValue={formik.values.content}
                                                // initialValue="<p></p>"
                                                value={formik.values.content}
                                                onEditorChange={(newValue) => formik.setFieldValue("content", newValue)}
                                                init={{
                                                    height: 500,
                                                    menubar: "file edit view insert format tools table help",
                                                    plugins:
                                                        "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table wordcount help quickbars emoticons",
                                                    toolbar:
                                                        "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | fullscreen preview save | insertfile image media link anchor codesample",
                                                    content_style:
                                                        "body { font-family: Helvetica, Arial, sans-serif; font-size:14px }",
                                                    branding: false,
                                                }}
                                            />
                                            {formik.touched.content && formik.errors.content && (
                                                <div className="text-danger mt-1">
                                                    {formik.errors.content}
                                                </div>
                                            )}
                                        </Card>

                                        <Button type="submit" variant="primary">
                                            {id ? "Update" : "Create"}
                                        </Button>
                                    </Form>
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

export default CreateDepartment;
