import DocumentHeader from './DocumentHeader';
import ComposeSidebar from './ComposeSideBar';
import ComposeBody from './ComposeBody';
import 'bootstrap/dist/css/bootstrap.min.css';

const ComposePage = () => {
  return (
    <>
      <DocumentHeader />
      <div className="d-flex flex-column flex-md-row">
  <div className="sidebar-left border-end" style={{ width: '100%', maxWidth: '300px' }}>
    <ComposeSidebar />
  </div>

  <div className="flex-grow-1 pt-3 content-area border-md-end">
    <ComposeBody />
  </div>

  <div className="sidebar-right border-start d-none d-lg-block" style={{ width: '300px' }}>
    {/* Right sidebar (if needed) */}
  </div>
</div>
    </>
  );
};

export default ComposePage;