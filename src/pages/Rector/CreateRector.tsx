import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createRectorList as onCreateRectorList,
  updateRectorList as onUpdateRectorList,
  getRectorList as onGetRectorList,
} from "slices/rector/thunk";
import { Editor } from "@tinymce/tinymce-react";
import { Card, Form, Button } from "react-bootstrap";
import Dropzone from "react-dropzone";



const CreateRector = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const rectorList = useSelector((state: any) => state.Rector.rectorList);
  const editorRef = useRef<any>(null);

  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  const current = rectorList?.content?.find((r: any) => r.id === Number(id));

  useEffect(() => {
    dispatch(onGetRectorList());
  }, [dispatch]);

  useEffect(() => {
    if (current) {
      if (current.bannerBase64) {
        setBannerPreview(`data:image/*;base64,${current.bannerBase64}`);
        formik.setFieldValue("banner", current.bannerBase64);
      }
      if (current.imgBase64) {
        setImgPreview(`data:image/*;base64,${current.imgBase64}`);
        formik.setFieldValue("image", current.imgBase64);
      }
    }
  }, [current]);
  

  const formik: any = useFormik({
    enableReinitialize: true,
    initialValues: {
        name: current?.name || "",
        banner: current?.bannerBase64 || "",  
        image: current?.imgBase64 || "",    
        position: current?.position || "",
        content: current?.content || "",
        shortInfo: current?.shortInfo || "",
      },
      
      
    validationSchema: Yup.object({
      name: Yup.string().required("Name required"),
      banner: Yup.string().required("Banner required"),
      image: Yup.string().required("Image required"),
      position: Yup.string().required("Position required"),
      content: Yup.string().required("Content required"),
      shortInfo: Yup.string().required("Short info required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      
      if (id) {
        dispatch(onUpdateRectorList({ id: Number(id), data: values })).then((res:any) =>
          console.log(res)
          
          // navigate("/rector")
        );
      } else {
        dispatch(onCreateRectorList(values)).then(() => navigate("/rector"));
      }
    },
  });

  const handleFileChange = (file: File, field: string) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(",")[1];
        formik.setFieldValue(field, base64String);

        if (field === "banner") {
          setBannerPreview(reader.result?.toString() || null);
        } else if (field === "image") {
          setImgPreview(reader.result?.toString() || null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">{id ? "Edit Rector" : "Create Rector"}</h5>
              </div>
              <div className="card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          className={`form-control ${
                            formik.touched.name && formik.errors.name
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        {formik.touched.name && formik.errors.name && (
                          <div className="invalid-feedback">
                            {formik.errors.name}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Position</label>
                        <input
                          type="text"
                          name="position"
                          value={formik.values.position}
                          onChange={formik.handleChange}
                          className={`form-control ${
                            formik.touched.position && formik.errors.position
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        {formik.touched.position && formik.errors.position && (
                          <div className="invalid-feedback">
                            {formik.errors.position}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Short Info</label>
                        <textarea
                          name="shortInfo"
                          rows={3}
                          value={formik.values.shortInfo}
                          onChange={formik.handleChange}
                          className={`form-control ${
                            formik.touched.shortInfo && formik.errors.shortInfo
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        {formik.touched.shortInfo && formik.errors.shortInfo && (
                          <div className="invalid-feedback">
                            {formik.errors.shortInfo}
                          </div>
                        )}
                      </div>

                      <Card className="mb-3">
                        <Card.Body>
                          <Card.Title className="mb-3">Content:</Card.Title>
                          <Editor
                            apiKey="al9ig6955nahjappojktglfuwby2sttv30hlpu3a44ucgtl5"
                            onInit={(evt, editor) =>
                              (editorRef.current = editor)
                            }
                            value={formik.values.content}
                            onEditorChange={(newValue) =>
                              formik.setFieldValue("content", newValue)
                            }
                            init={{
                              height: 400,
                              menubar: true,
                              plugins:
                                "preview link image code table lists wordcount fullscreen",
                              toolbar:
                                "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | code fullscreen preview",
                              content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                              branding: false,
                            }}
                          />
                          {formik.touched.content && formik.errors.content && (
                            <div className="text-danger mt-1">
                              {formik.errors.content}
                            </div>
                          )}
                        </Card.Body>
                      </Card>
                    </div>

                    <div className="col-lg-4">
                      <Card className="p-3 shadow-sm border-0">
                        {/* Banner */}
                        <div className="mb-4">
                          <Form.Label
                            htmlFor="banner-input"
                            className="fw-semibold mb-2"
                          >
                            Banner
                          </Form.Label>
                          <Dropzone
                            onDrop={(acceptFile: any) => {
                              handleFileChange(acceptFile[0], "banner");
                            }}
                            accept="image/*"
                            multiple={false}
                          >
                            {(dropzoneProps: any) => (
                              <div>
                                <div
                                  className="dropzone dz-clickable text-center p-4 border rounded"
                                  {...dropzoneProps.getRootProps()}
                                  style={{
                                    cursor: "pointer",
                                    minHeight: "50px",
                                  }}
                                >
                                  <input
                                    {...dropzoneProps.getInputProps()}
                                    name="banner"
                                    id="banner-input"
                                    onBlur={formik.handleBlur}
                                  />
                                  <div className="dz-message needsclick">
                                    <i className="display-6 text-muted ri-upload-cloud-2-fill" />
                                  </div>
                                </div>
                                {bannerPreview && (
                                  <div className="mt-3 d-flex align-items-center gap-3">
                                    <img
                                      src={bannerPreview}
                                      alt="banner-preview"
                                      className="rounded"
                                      style={{
                                        minWidth: "120px",
                                        maxWidth: "120px",
                                        height: "70px",
                                        objectFit: "cover",
                                      }}
                                    />
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      onClick={() => {
                                        setBannerPreview(null);
                                        formik.setFieldValue("banner", "");
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </Dropzone>
                          {formik.errors.banner && formik.touched.banner ? (
                            <Form.Control.Feedback
                              type="invalid"
                              className="d-block mt-1"
                            >
                              {formik.errors.banner}
                            </Form.Control.Feedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Form.Label
                            htmlFor="image-input"
                            className="fw-semibold mb-2"
                          >
                            Rector Image
                          </Form.Label>
                          <Dropzone
                            onDrop={(acceptFile: any) => {
                              handleFileChange(acceptFile[0], "image");
                            }}
                            accept="image/*"
                            multiple={false}
                          >
                            {(dropzoneProps: any) => (
                              <div>
                                <div
                                  className="dropzone dz-clickable text-center p-4 border rounded"
                                  {...dropzoneProps.getRootProps()}
                                  style={{
                                    cursor: "pointer",
                                    minHeight: "50px",
                                  }}
                                >
                                  <input
                                    {...dropzoneProps.getInputProps()}
                                    name="image"
                                    id="image-input"
                                    onBlur={formik.handleBlur}
                                  />
                                  <div className="dz-message needsclick">
                                    <i className="display-6 text-muted ri-upload-cloud-2-fill" />
                                  </div>
                                </div>
                                {imgPreview && (
                                  <div className="mt-3 d-flex align-items-center gap-3">
                                    <img
                                      src={imgPreview}
                                      alt="img-preview"
                                      className="rounded-circle"
                                      style={{
                                        width: 70,
                                        height: 70,
                                        objectFit: "cover",
                                      }}
                                    />
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      onClick={() => {
                                        setImgPreview(null);
                                        formik.setFieldValue("image", "");
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </Dropzone>
                          {formik.errors.image && formik.touched.image ? (
                            <Form.Control.Feedback
                              type="invalid"
                              className="d-block mt-1"
                            >
                              {formik.errors.image}
                            </Form.Control.Feedback>
                          ) : null}
                        </div>
                      </Card>
                      <div className="d-flex justify-content-end gap-2 mt-3">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate("/rector")}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {id ? "Update" : "Create"}
                    </button>
                  </div>
                    </div>
                    
                  </div>

       
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRector;
