import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addCategories } from '../../../services/allApis';
import { toast } from 'react-toastify';
import { addSkillCategoryContext } from '../../../Context/ContextApi';

function AddSkillCategory() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({ categoryName: '' });

  const { setAddSkillCategoryResponse } = useContext(addSkillCategoryContext);

  const handleClose = () => {
    setShow(false);
    setData({ categoryName: '' }); // Reset input when modal closes
  };

  const handleShow = () => setShow(true);

  const handleAdd = async () => {
    const trimmedCategoryName = data.categoryName.trim(); // Remove extra spaces

    if (!trimmedCategoryName) {
      toast.warning("Enter a valid category name");
      return;
    }

    const header = {
      'Content-type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`,
    };

    try {
      const res = await addCategories(header, { categoryName: trimmedCategoryName });

      if (res.status === 200) {
        setAddSkillCategoryResponse(res);
        toast.success("Category added successfully!");
        handleClose();
      } else {
        toast.error("Failed to add category. Please try again.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Something went wrong! Try again later.");
    }
  };

  return (
    <div>
      <button className='btn btn-success' onClick={handleShow}>Add Category</button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={data.categoryName}
            onChange={(e) => setData({ categoryName: e.target.value })}
            placeholder='Category Name'
            className='form-control'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleAdd}
            disabled={!data.categoryName.trim()} // Disable if input is empty
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddSkillCategory;
