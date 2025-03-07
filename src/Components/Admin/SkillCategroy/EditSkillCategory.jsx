import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editCategory } from '../../../services/allApis';
import { editSkillCategoryContext } from '../../../Context/ContextApi';
import { toast } from 'react-toastify';

function EditSkillCategory({ data }) {
  const [show, setShow] = useState(false);
  const { setEditSkillCategoryResponse } = useContext(editSkillCategoryContext);
  const [category, setCategory] = useState({ categoryName: '' });

  useEffect(() => {
    setCategory(data);
  }, [data]);

  const handleClose = () => {
    setShow(false);
    setCategory(data); 
  };

  const handleShow = () => setShow(true);

  const handleEdit = async () => {
    const trimmedName = category.categoryName.trim();

    if (!trimmedName) {
      toast.warning("Category name cannot be empty!");
      return;
    }

    try {
      const res = await editCategory(category.categoryId, { categoryName: trimmedName });

      if (res.status === 200) {
        setEditSkillCategoryResponse(res);
        toast.success("Category updated successfully!");
        handleClose();
      } else {
        toast.error("Failed to update category. Try again.");
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <button className="btn btn-warning" onClick={handleShow}>Edit</button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={category.categoryName}
            onChange={(e) => setCategory({ ...category, categoryName: e.target.value })}
            placeholder="Category Name"
            className="form-control"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button
            variant="primary"
            onClick={handleEdit}
            disabled={!category.categoryName.trim()} 
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditSkillCategory;
