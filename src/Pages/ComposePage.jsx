import React from 'react';
import DocumentHeader from '../DocumentHeader';
import ComposeSidebar from './ComposeSideBar';
import ComposeBody from './ComposeBody';
import 'bootstrap/dist/css/bootstrap.min.css';

const ComposePage = () => {
  return (
    <>
      <DocumentHeader />
      <div className="d-flex">
        <div style={{ width: '300px', borderRight: '1px solid #ddd' }}>
          <ComposeSidebar />
        </div>
        <div className="flex-grow-1 pt-3" style={{ borderRight: '1px solid #ddd' }}>
          <ComposeBody />
        </div>
        <div style={{ width: '300px', borderRight: '1px solid #ddd' }}>
          
        </div>
      </div>
    </>
  );
};

export default ComposePage;