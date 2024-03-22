import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import EmployeeNavBar from '../../../components/common/navbar/employee/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendar,
  faMoneyBillTransfer,
  faMagnifyingGlass,
  faHome,
  faEye,
  faXmark,
  faCamera,
  faPrint,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons'
import { pdf } from '@react-pdf/renderer'

import { Dashboard } from '../../../components/common'
import axios from 'axios'
import Swal from 'sweetalert2'
import PDF from '../pdf/PDF.jsx'
import { Toast } from '../../../components/common'

const AdminAttendanceDashboard = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([])
  useEffect(() => {
    document.title = 'Admin Attendance Dashboard'
    const fetchAttendanceRecords = async () => {
      try {
        const records = await axios.get(
          'http://localhost:4444/api/attendanceTracker/'
        )

        const recordsWithIDs = records.data.map((record, index) => ({
          ...record,
          id: index + 1,
        }))
        setAttendanceRecords(recordsWithIDs)
      } catch (error) {
        console.error('Error fetching attendance receords: ', error)
      }
    }
    fetchAttendanceRecords()
    const interval = setInterval(() => {
      setRefreshCounter(prevRefreshCounter => prevRefreshCounter + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [])

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const navigate = useNavigate()

  const filteredData = attendanceRecords.filter((record) =>
    record.fullName.toLowerCase().includes(searchQuery)
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  }

  // Function to set the selected _id when the eye button is clicked
  const handleViewClick = (_id) => {
    // Store the _id in session storage
    sessionStorage.setItem('selectedId', _id)
    // Set the selected _id in state
    setSelectedId(_id)

    // Use navigate within the onClick function
    navigate(`/attendance-tracker/view/${_id}`)
  }

  const handleDeleteClick = async (_id) => {
    console.log(_id)

    try {
      const response = await fetch(
        `http://localhost:4444/api/attendanceTracker/${_id}`,
        {
          method: 'DELETE',
        }
      )

      if (response.status === 204) {
        // Success
        Swal.fire({
          icon: 'success',
          title: 'Record Deleted',
          showConfirmButton: false,
          timer: 1500, // Display for 1.5 seconds
        })

        // Reload the page after a short delay
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else if (response.status === 404) {
        // Profile not found
        Swal.fire({
          icon: 'error',
          title: 'Record not found',
          text: 'The specified Record does not exist.',
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while deleting the Record. Please try again later.',
        })
      }
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the Record. Please try again later.',
      })
    }
  }

  const handlePrint = (e) => {
    e.preventDefault(); 
  
    const pdfDoc = <PDF sampleData={attendanceRecords} />;
  
    pdf(pdfDoc)
      .toBlob()
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'Attendance_Records.pdf';
        a.style.display = 'none';
  
        document.body.appendChild(a);
        a.click();
  
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      });
  };

  const handleNotify = async (record) => {
    try {
      const emailData = {
        recipient: record.email,
        subject: 'Attendance alert',
        greet: 'Hello ' + record.fullName,
        emailBody:
          'You are late today. If you can, after regular office hours, cover the late hours. Otherwise, contact the HR division. Thank you',
      };
  
      const response = await axios.post('http://localhost:4444/api/attendanceTracker/email', emailData);
  
      if (response.status === 200) {
        // Email sent successfully
        Toast(`Informed employee over the email: ${record.email}`, 'success', {});
      } else {
        // Email sending failed
        Toast('Operation failed', 'error', {});
      }
    } catch (error) {
      // Error occurred during the API call
      Toast('Operation failed', 'error', {});
      console.error('Error sending email:', error);
    }
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
            {
              path: '/leave-manager/adminDashboard',
              name: 'Leaves',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faCalendarDays}
                />
              ),
            },
          ],
        },
      ]}
    >
      <>
        <EmployeeNavBar />
        <div className="col-md-12 order-md-2">
          <div className="container-fluid">
            <div class="d-flex">
              <div class="p-2">
                <h2
                  style={{
                    color: 'red',
                    fontSize: '26px',
                    marginTop: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  Attendance
                </h2>
              </div>
              <div class="ml-auto p-2">
                <form action="" style={{ marginTop: '20px' }}>
                  <div className="p-1 bg-light d-flex rounded rounded-pill shadow-sm mb-4">
                    <div className="input-group">
                      <input
                        type="search"
                        placeholder="Search Here"
                        aria-describedby="button-addon1"
                        className="form-control border-0 bg-light"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />

                      {/* Scanner window */}
                      <div className="mr-3">
                        <Link to="/attendance-tracker/scanner">
                          <button className="btn btn-danger" onClick={''}>
                            <FontAwesomeIcon icon={faCamera} /> Scanner
                          </button>
                        </Link>
                      </div>
                      {/* PDF */}
                      <div className="mr-2">
                        <button
                          className="btn btn-danger"
                          onClick={handlePrint}
                        >
                          <FontAwesomeIcon icon={faPrint} /> Print
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {attendanceRecords.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">
                      <div className="form-check">
                        <input
                          className="form-check-input position-static"
                          type="checkbox"
                          id="blankCheckbox"
                          value="option1"
                          aria-label="..."
                        />
                      </div>
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">Employee ID</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Time</th>
                    <th scope="col">view</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((record) => (
                    <tr key={record.id}>
                      <td scope="row">
                        <div className="form-check">
                          <input
                            className="form-check-input position-static"
                            type="checkbox"
                            id="blankCheckbox"
                            value="option1"
                            aria-label="..."
                          />
                        </div>
                      </td>
                      <td>{record.fullName}</td>
                      <td>{record.employeeID}</td>
                      <td>{record.email}</td>
                      {/* <td>{record.department}</td> */}
                      <td>{record.scannedDate}</td>
                      <td>
                        {' '}
                        <div className="col">
                          <button
                            className="btn btn-danger"
                            id="viewRecord"
                            name="viewRecord"
                            onClick={() => handleViewClick(record._id)}
                          >
                            <FontAwesomeIcon
                              className="mr-1 text-2x1 text-dark"
                              icon={faEye}
                            />
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="col">
                          <button
                            className="btn btn-danger"
                            id="deleteRecord"
                            name="deleteRecord"
                            onClick={() => handleDeleteClick(record._id)}
                          >
                            <FontAwesomeIcon
                              className="mr-1 text-2x1 text-dark"
                              icon={faXmark}
                            />
                          </button>
                        </div>
                      </td>

                      <td>
                        {record.scannedDate === null ||
                        new Date(record.scannedDate).getHours() < 8 ||
                        (new Date(record.scannedDate).getHours() === 8 &&
                          new Date(record.scannedDate).getMinutes() < 30) ? (
                          <button
                            className="btn btn-success"
                            onClick={() => handleNotify(record)}
                            disabled
                          >
                            <span style={{ visibility: 'hidden' }}>Notify</span>
                          </button>
                        ) : (
                          <button
                            className="btn btn-danger text-dark"
                            onClick={() => handleNotify(record)}
                          >
                            Notify
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No records available</p>
            )}

            <div className="text-center ">
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-danger mx-3"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                Page {currentPage} of{' '}
                {Math.ceil(filteredData.length / itemsPerPage)}
                <button
                  className="btn btn-danger mx-3"
                  onClick={handleNextPage}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredData.length / itemsPerPage)
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </Dashboard>
  )
}

export default AdminAttendanceDashboard
