import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faCheck,
  faCircleExclamation,
  faClipboardUser,
  faComment,
  faHome,
} from '@fortawesome/free-solid-svg-icons'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button, Dashboard, Loader, Toast } from '../../../../components/common'
import { axiosInstance } from '../../../../config'
import Swal from 'sweetalert2'

const EmailScheduler = () => {
  useEffect(() => {
    document.title = 'Create a Greet'
  }, [])

  const [isLoading, setIsLoading] = useState(false)

  // Func: Handle form submit
  const handleFormSubmit = (values) => {
    setIsLoading(true)

    const payload = {
      name: values.name,
      position: values.position,
      department: values.department,
      message: values.message,
    }

    axiosInstance
      .post('/atm/greetings', payload)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Greet created successfully.',
        })
      })
      .catch((error) => {
        if (error.code == 'ERR_NETWORK')
          return Toast('Cannot connect with backend API.', 'error', {})
        Toast(error.response.data.data, 'error', {})
      })
      .finally(() => {
        setIsLoading(false)
        formik.resetForm()
      })
  }

  // Func: Formik definition
  const formik = useFormik({
    initialValues: {
      to: '',
      from: '',
      date: '',
      time: '09:00',
      cc: '',
      subject: '',
      message: '',
    },
    validationSchema: Yup.object({
      to: Yup.string()
        .email('Must be a valid email.')
        .required('Please enter an email.'),
      from: Yup.string()
        .email('Must be a valid email.')
        .required('Please enter an email.'),
      date: Yup.date().required('Select a date to send email.'),
      cc: Yup.string(),
      subject: Yup.string().required('Enter subject for your email.'),
      message: Yup.string().required('Enter message body for your email.'),
    }),
    onSubmit: (values) => handleFormSubmit(values),
  })

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Dashboard
          sectionLinks={[
            {
              section: 'Options',
              children: [
                {
                  path: '/admin-task-mgt/dashboard',
                  name: 'Dashboard',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faComment}
                    />
                  ),
                },
                {
                  path: '/admin-task-mgt/greetings',
                  name: 'Greetings',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faComment}
                    />
                  ),
                },
                {
                  path: '/content-space',
                  name: 'Content Space',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faClipboardUser}
                    />
                  ),
                },
                {
                  path: '/admin-task-mgt/scheduler',
                  name: 'Scheduling',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faHome}
                    />
                  ),
                },
                {
                  path: '/admin-task-mgt/budgeting',
                  name: 'Budgeting',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faHome}
                    />
                  ),
                },
                {
                  path: '/admin-task-mgt/reports',
                  name: 'Reports',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faHome}
                    />
                  ),
                },
                {
                  path: '/logout',
                  name: 'Logout',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faArrowRightFromBracket}
                    />
                  ),
                },
              ],
            },
          ]}
        >
          <div className="block mt-6 p-8">
            <p className="text-3xl font-semibold mb-4">Email Scheduling:</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="px-8">
            <div className="col lg:mr-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
                {/* TO */}
                <div className="lg:mb-8">
                  <label
                    htmlFor="to"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    To:
                  </label>
                  <input
                    type="text"
                    id="to"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    value={formik.values.to}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.to && formik.touched.to ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.to}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* TO End */}

                {/* From */}
                <div className="lg:mb-8">
                  <label
                    htmlFor="from"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    From:
                  </label>
                  <input
                    type="text"
                    id="from"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    value={formik.values.from}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.from && formik.touched.from ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.from}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* From End */}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
                {/* Date */}
                <div className="lg:mb-8">
                  <label
                    htmlFor="date"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Schedule Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.date && formik.touched.date ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.date}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Date End */}

                {/* Time */}
                <div className="lg:mb-8">
                  <label
                    htmlFor="session-start-time"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Schedule Time:
                  </label>
                  <select
                    id="time"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    value={formik.values.time}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="09:00">09:00 AM</option>
                    <option value="09:15">09:15 AM</option>
                    <option value="09:30">09:30 AM</option>
                    <option value="09:45">09:45 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="10:15">10:15 AM</option>
                    <option value="10:30">10:30 AM</option>
                    <option value="10:45">10:45 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="11:15">11:15 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="11:45">11:45 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:15">12:15 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="12:45">12:45 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="13:15">01:15 PM</option>
                    <option value="13:30">01:30 PM</option>
                    <option value="13:45">01:45 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="14:15">02:15 PM</option>
                    <option value="14:30">02:30 PM</option>
                    <option value="14:45">02:45 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="15:15">03:15 PM</option>
                    <option value="15:30">03:30 PM</option>
                    <option value="15:45">03:45 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="16:15">04:15 PM</option>
                    <option value="16:30">04:30 PM</option>
                    <option value="16:45">04:45 PM</option>
                    <option value="17:00">05:00 PM</option>
                    <option value="17:15">05:15 PM</option>
                    <option value="17:30">05:30 PM</option>
                    <option value="17:45">05:45 PM</option>
                    <option value="18:00">06:00 PM</option>
                  </select>
                  {formik.errors.time && formik.touched.time ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.time}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Time End */}
              </div>

              {/* CC */}
              <div className="mb-8">
                <label
                  htmlFor="cc"
                  className="block mb-2 text-xl font-medium text-gray-900"
                >
                  CC (Optional):
                </label>
                <input
                  type="text"
                  id="cc"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="..."
                  value={formik.values.cc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.cc && formik.touched.cc ? (
                  <div className="error text-red-400 p-4 text-lg">
                    <FontAwesomeIcon
                      className="mr-4 text-2xl"
                      icon={faCircleExclamation}
                    />
                    {formik.errors.cc}
                  </div>
                ) : (
                  ''
                )}
              </div>
              {/* CC End */}

              {/* Subject */}
              <div className="mb-8">
                <label
                  htmlFor="subject"
                  className="block mb-2 text-xl font-medium text-gray-900"
                >
                  Subject:
                </label>
                <input
                  type="text"
                  id="subject"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="..."
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.subject && formik.touched.subject ? (
                  <div className="error text-red-400 p-4 text-lg">
                    <FontAwesomeIcon
                      className="mr-4 text-2xl"
                      icon={faCircleExclamation}
                    />
                    {formik.errors.subject}
                  </div>
                ) : (
                  ''
                )}
              </div>
              {/* Subject End */}
            </div>

            {/* Session Description: */}
            <div className="mb-8">
              <label
                htmlFor="session-desc"
                className="block mb-2 text-xl font-medium text-gray-900"
              >
                Message:
              </label>
              <textarea
                id="message"
                rows="4"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your thoughts here..."
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.message && formik.touched.message ? (
                <div className="error text-red-400 p-4 text-lg">
                  <FontAwesomeIcon
                    className="mr-4 text-2xl"
                    icon={faCircleExclamation}
                  />
                  {formik.errors.message}
                </div>
              ) : (
                ''
              )}
            </div>
            {/* Session Description: End */}

            <Button
              type="submit"
              className="text-xl border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72"
            >
              <FontAwesomeIcon
                className="text-xl mx-4 hover:cursor-pointer"
                icon={faCheck}
              />
              Schedule Email
            </Button>
          </form>
          <br />
          <br />
        </Dashboard>
      )}
    </>
  )
}

export default EmailScheduler
