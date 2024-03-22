import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Login } from '../../../../components/common'
import { useLogin } from '../../../../hooks'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TrainingScheduleMgtManagerLogin = () => {
  const { login } = useLogin()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Please enter your email address.'),
      password: Yup.string().required('Please enter your password.'),
    }),
    onSubmit: (values) =>
      login(values, 'manager', '/training-schedule-mgt/manager/dashboard'),
  })

  return (
    <Login
      title="Manager Login"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
      illustrationUrl="/static/illustrations/Manager-Login.svg"
      quoteText="Leadership and learning are indispensable to each other."
      quoteAuthor="John F. Kennedy"
    >
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        <div className="mb-8">
          <label
            htmlFor="email"
            className="block mb-2 text-xl font-medium text-gray-900"
          >
            Manager Email:
          </label>
          <input
            type="text"
            id="email"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="me@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="error text-red-400 p-4 text-lg">
              <FontAwesomeIcon
                className="mr-4 text-2xl"
                icon={faCircleExclamation}
              />
              {formik.errors.email}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="mb-8">
          <label
            htmlFor="password"
            className="block mb-2 text-xl font-medium text-gray-900"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="error text-red-400 p-4 text-lg">
              <FontAwesomeIcon
                className="mr-4 text-2xl"
                icon={faCircleExclamation}
              />
              {formik.errors.password}
            </div>
          ) : (
            ''
          )}
        </div>

        <Button
          type="submit"
          className="text-xl border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72 block mx-auto mb-8"
        >
          Login
        </Button>

        <hr />

        <p className="text-center my-8 text-xl">OR</p>
        <p className="text-center text-xl">Login with a different role:</p>
        <div className="flex justify-center">
          <Link to="/training-schedule-mgt/admin/login">
            <Button className="text-md border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-8 py-1.5 my-4 block mx-4">
              Training Schedule Admin
            </Button>
          </Link>

          <Link to="/training-schedule-mgt/manager/login">
            <Button className="text-md border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-8 py-1.5 my-4 block mx-4">
              Manager Login
            </Button>
          </Link>

          <Link to="/training-schedule-mgt/intern/login">
            <Button className="text-md border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-8 py-1.5 my-4 block mx-4">
              Intern Login
            </Button>
          </Link>
        </div>

        <Link
          to="/"
          className="block mx-auto text-xl mt-6 border-b-black border-b-2 w-fit mb-8"
        >
          Back to home
        </Link>
      </form>
    </Login>
  )
}

export default TrainingScheduleMgtManagerLogin
