import React, { useState, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCalendar,
  faMoneyBillTransfer,
  faArrowRightToFile,
} from '@fortawesome/free-solid-svg-icons';
import { AdminNavbar, EmployeeNavBar } from '../../../components/common';
import { Dashboard } from '../../../components/common';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateProfile = () => {
  const { id } = useParams();

  useEffect(() => {
    const endpoint = `http://localhost:4444/api/paymentProfile/profiles/${id}`;

    // Make a GET request using Axios to fetch data
    axios
      .get(endpoint)
      .then((response) => {
        if (response.status === 200) {
          setFormData(response.data);
        } else {
          console.error('Error fetching profile:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]);

  const rowsData = [
    {
      id: 1,
      name: '',
      base_salary: '',
      traineeType: '',
      department: '',
      employeeId: '',
      allowances: '',
      email: '',
    },
  ];

  const [formData, setFormData] = useState(rowsData[0]); 
  const [validation, setValidation] = useState({
    base_salary: { valid: true, error: '' },
    allowances: { valid: true, error: '' },
    description: { valid: true, error: '' },
  });

  const createPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    page.drawText('Payment profile document', {
      x: 50,
      y: 350,
      size: 30,
      color: rgb(0, 0, 0), // Black color
    });

    let y = 320;
    Object.entries(formData).forEach(([key, value]) => {
      // Exclude the _id field when printing the document
      if (key !== '_id') {
        page.drawText(`${key}: ${value}`, {
          x: 50,
          y: y,
          size: 12,
          color: rgb(0, 0, 0),
        });
        y -= 20; 
      }
    });

    const pdfBytes = await pdfDoc.save();

    // Create a blob from the PDF data
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create a URL for the blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const endpoint = `http://localhost:4444/api/paymentProfile/profiles/${id}`;

    console.log(formData)

    axios
      .put(endpoint, formData)
      .then((response) => {
        if (response.status === 200) {
          console.log('Profile updated successfully');
          navigateBack();
        } else {
          console.error('Error updating profile:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const navigateBack = () => {
    window.location.href = '/payment-manager/profiles'; 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the input field
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let valid = true;
    let error = '';

    if (fieldName === 'base_salary' || fieldName === 'allowances') {
      if (isNaN(value) || parseFloat(value) <= 0) {
        valid = false;
        error = 'Value must be a positive number';
      }
    } else if (fieldName === 'description') {
      if (value.length < 15) {
        valid = false;
        error = 'Description must be at least 15 characters';
      }
    }

    setValidation((prevValidation) => ({
      ...prevValidation,
      [fieldName]: { valid, error },
    }));
  };

  const isInvalid = () => {
    // Check if any of the fields is invalid
    return (
      !validation.base_salary.valid ||
      !validation.allowances.valid ||
      !validation.description.valid
    );
  };

  return (
    <Dashboard
      sectionLinks={[
        {
          section: 'Menu',
          children: [
            {
              path: '/profile-mgt/HRmanager/dashboard',
              name: 'Home',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faHome}
                />
              ),
            },
            {
              path: '/attendance-tracker/adminDashboard',
              name: 'Attendance',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faCalendar}
                />
              ),
            },
            {
              path: '/payment-manager/dashboard',
              name: 'Payment',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faMoneyBillTransfer}
                />
              ),
            },
          ],
        },
      ]}
    >
      <>
        <EmployeeNavBar />
        <div className="container">
          <div className="mb-5">
            <h5 className="text-danger">{formData.traineeType}</h5>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col md-2">
              <button
                onClick={createPdf}
                class="btn btn-danger btn-lg active"
                role="button"
                aria-pressed="true"
              >
                PDF{' '}
                <FontAwesomeIcon
                  icon={faArrowRightToFile}
                  style={{ fontSize: 15 }}
                />
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="employeeId">Trainee ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="employeeId"
                    name="employeeId"
                    value={formData.employeeID}
                    disabled
                    placeholder="Enter Employee ID"
                  />
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor="name">Base Salary</label>
                  <input
                    type="text"
                    className={`form-control ${
                      validation.base_salary.valid ? '' : 'is-invalid'
                    }`}
                    id="name"
                    name="base_salary"
                    value={formData.base_salary}
                    onChange={handleInputChange}
                    placeholder="Update Base Salary"
                  />
                  <div className="invalid-feedback">
                    {validation.base_salary.error}
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor="name">Allowances</label>
                  <input
                    type="text"
                    className={`form-control ${
                      validation.allowances.valid ? '' : 'is-invalid'
                    }`}
                    id="name"
                    name="allowances"
                    value={formData.allowances}
                    onChange={handleInputChange}
                    placeholder="Change allowances"
                  />
                  <div className="invalid-feedback">
                    {validation.allowances.error}
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    type="text"
                    className={`form-control ${
                      validation.description.valid ? '' : 'is-invalid'
                    }`}
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter Description"
                  />
                  <div className="invalid-feedback">
                    {validation.description.error}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button
                type="submit"
                className="btn btn-danger"
                style={{ color: 'red' }}
                disabled={isInvalid()}
                onClick={handleSubmit}
              >
               Update
              </button>
            </div>
          </form>
        </div>
      </>
    </Dashboard>
  );
}

export default UpdateProfile;
