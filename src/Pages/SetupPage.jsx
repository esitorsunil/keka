import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DocumentHeader from './DocumentHeader';

const Setup = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const name = watch('name');
  const description = watch('description');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('setupName') || '';
    const savedDescription = localStorage.getItem('setupDescription') || '';
    setValue('name', savedName);
    setValue('description', savedDescription);
  }, [setValue]);

  const onSubmit = (data) => {
    localStorage.setItem('setupName', data.name);
    localStorage.setItem('setupDescription', data.description);
    localStorage.setItem('documentTemplate', JSON.stringify(data));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const modules = {
    toolbar: {
      container: '#toolbar',
    },
  };

  return (
    <>
      <DocumentHeader />
      <div className="ms-4 mt-4 py-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-start">
            <div style={{ width: '40%' }}>
              <div className="mb-4">
                <h5 className="mb-2">Name</h5>
                <input
                  type="text"
                  className={`form-control px-3 py-2 ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="e.g. Offer Letter, Stipend Hike Letter"
                  {...register('name', {
                    required: 'Name is required',
                    validate: (value) =>
                      /^[A-Za-z\s]+Letter$/.test(value.trim()) ||
                      'Name should end with "Letter" and contain only letters',
                  })}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name.message}</div>
                )}
              </div>

              <div className="mb-4">
                <h5 className="mb-2">Describe this document template</h5>
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={(value) => setValue('description', value)}
                  modules={modules}
                  className="bg-white custom-quill-editor"
                  placeholder="Write your description here..."
                />
                <div id="toolbar" className="border-top-0">
                  <span className="ql-formats">
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-link" />
                  </span>
                </div>
              </div>

              <button type="submit" className="btn purple px-4">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

      {showToast && (
        <div className="toast show position-fixed bottom-0 start-50 translate-middle-x mb-3" role="alert">
          <div className="toast-header bg-success text-white border-0">
            <strong className="me-auto">Success</strong>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowToast(false)}
            />
          </div>
          <div className="toast-body">
            Setup data saved successfully!
          </div>
        </div>
      )}
    </>
  );
};

export default Setup;
