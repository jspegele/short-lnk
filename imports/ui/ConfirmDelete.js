import React from 'react'

export default (props) => (
  <div className="confirm-form">
      <h1>Delete Link</h1>
      <p><strong>Are you sure you want to permanently delete this link?</strong></p>
      <p>
        The tiny link will no longer work for any users.  You should be sure to remove 
        all references to this tiny link from your website, social media, etc. before 
        deleting. All statistics will be deleted for this link.
      </p>
      <p>
        Note: The "Hide" button can be used to hide a tiny link from your dashbaord 
        without breaking the link and deleting statis.
      </p>
      <button className="button button--tertiary" onClick={props.handleModalClose}>Cancel</button>
      <button className="button button--tertiary" onClick={props.handleHide}>Hide</button>
      <button className="button button--destructive" onClick={props.handleDelete}>Delete</button>
  </div>
)