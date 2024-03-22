import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Logout } from './pages/common'

// Page  Imports from bellow
import Home from './pages/home'
import ManagerLogin from './pages/login/manager'
import InternLogin from './pages/login/intern'
import AdminLogin from './pages/login/admin'
import {
  TrainingScheduleMgtAdminDashboard,
  CreateSessionPage,
  TrainingScheduleMgtAdminLogin,
  TrainingScheduleMgtInternLogin,
  TrainingScheduleMgtManagerDashboard,
  TrainingScheduleMgtManagerLogin,
  TrainingScheduleMgtInternDashboard,
  AdminViewSessionsPage,
  AdminViewSessionPage,
  EditSessionPage,
  ManagerViewSessionsPage,
  ManagerViewSessionPage,
} from './pages/training-schedule-mgt'
import ActivityMgtDashboard from './pages/activity-mgt-systm/dashboard'
import InstructorLogin from './pages/activity-mgt-systm/login'
import Activity from './pages/activity-mgt-systm/activity'
import Member from './pages/activity-mgt-systm/member'
import CreateActivity from './pages/activity-mgt-systm/activity/create'
import AddMember from './pages/activity-mgt-systm/member/addMember'
import ActivityReport from './pages/activity-mgt-systm/report'
import SummarySheet from './pages/activity-mgt-systm/summarySheet'
import {
  AdminAttendanceDashboard,
  EmployeeDashboard,
  CreateQR,
  QRCodeScanner,
  ATAdminLogin,
  EmployeeLogin,
  ViewRecord,
  ATManagerLogin,
} from './pages/attendance-tracker'
import {
  CreateProfile,
  FinancialDashboard,
  ViewProfile,
  PaymentProfileDashboard,
  UpdateProfile,
} from './pages/payment-mgt'

import {
  AdminLeaveDashboard,
  UpdateLeaveStatus,
  ViewLeaveAdmin,
  CreateLeave,
  UpdateLeaveEMP,
  ViewLeaveEmp,
  ViewLeavesEMP,
} from './pages/leave-mgt'

import HRAdminLogin from './pages/admin-task-mgt/login'
import AdminTaskMgtDashboard from './pages/admin-task-mgt/dashboard'
import {
  AdminTaskMgtGreetingsPage,
  EmailScheduler,
  Scheduler,
  SessionScheduler,
  SubmitGreet,
  ViewGreet,
  ViewGreets,
} from './pages/admin-task-mgt'

import {
  HRMDashboard
} from './pages/employee-mgt'

// =================================================================================
function App() {
  useEffect(() => {
    document.title = 'HR DevHub'
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Misc Routes */}
        <Route path="/logout" element={<Logout />} />
        {/* Misc Routes */}

        {/* Login Routes */}
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/manager" element={<ManagerLogin />} />
        <Route path="/login/intern" element={<InternLogin />} />
        {/* Login Routes */}

        {/* Employee Management Routes - Hansaka ====================================== */}
        <Route
          path="/profile-mgt/HRmanager/dashboard"
          element={<HRMDashboard />}
        />

        {/*Employee management Routes - Hansaka ====================================== */}


        {/* Admin Task Management Routes - AKILA ====================================== */}
        <Route path="/admin-task-mgt/login" element={<HRAdminLogin />} />
        <Route
          path="/admin-task-mgt/dashboard"
          element={<AdminTaskMgtDashboard />}
        />
        <Route
          path="/admin-task-mgt/greetings"
          element={<AdminTaskMgtGreetingsPage />}
        />
        <Route path="/admin-task-mgt/greetings/view" element={<ViewGreets />} />
        <Route
          path="/admin-task-mgt/greetings/view/:id"
          element={<ViewGreet />}
        />
        <Route
          path="/admin-task-mgt/greetings/create"
          element={<SubmitGreet />}
        />
        <Route path="/admin-task-mgt/scheduler" element={<Scheduler />} />
        <Route
          path="/admin-task-mgt/scheduler/email-scheduler"
          element={<EmailScheduler />}
        />
        <Route
          path="/admin-task-mgt/scheduler/session-scheduler"
          element={<SessionScheduler />}
        />
        {/* Admin Task Management Routes End - AKILA ====================================== */}

        {/* Training Schedule Management Routes - SHALINDA ====================================== */}
        <Route
          path="/training-schedule-mgt/admin/dashboard"
          element={<TrainingScheduleMgtAdminDashboard />}
        />
        <Route
          path="/training-schedule-mgt/manager/dashboard"
          element={<TrainingScheduleMgtManagerDashboard />}
        />
        <Route
          path="/training-schedule-mgt/intern/dashboard"
          element={<TrainingScheduleMgtInternDashboard />}
        />
        <Route
          path="/training-schedule-mgt/admin/sessions/create"
          element={<CreateSessionPage />}
        />
        <Route
          path="/training-schedule-mgt/admin/sessions/edit/:id"
          element={<EditSessionPage />}
        />
        <Route
          path="/training-schedule-mgt/admin/login"
          element={<TrainingScheduleMgtAdminLogin />}
        />
        <Route
          path="/training-schedule-mgt/manager/login"
          element={<TrainingScheduleMgtManagerLogin />}
        />
        <Route
          path="/training-schedule-mgt/intern/login"
          element={<TrainingScheduleMgtInternLogin />}
        />
        <Route
          path="/training-schedule-mgt/admin/sessions"
          element={<AdminViewSessionsPage />}
        />
        <Route
          path="/training-schedule-mgt/admin/sessions/:id"
          element={<AdminViewSessionPage />}
        />
        <Route
          path="/training-schedule-mgt/manager/sessions"
          element={<ManagerViewSessionsPage />}
        />
        <Route
          path="/training-schedule-mgt/manager/sessions/:id"
          element={<ManagerViewSessionPage />}
        />
        {/* Training Schedule Management Routes - SHALINDA ====================================== */}

        {/* Training School Activity Management Routes ====================================== */}
        <Route
          path="/training-scl-activity-mgt/login"
          element={<InstructorLogin />}
        ></Route>
        <Route
          path="/training-scl-activity-mgt/dashboard"
          element={<ActivityMgtDashboard />}
        ></Route>
        <Route
          path="/training-scl-activity-mgt/activity"
          element={<Activity />}
        ></Route>
        <Route
          path="/training-scl-activity-mgt/activity/create"
          element={<CreateActivity />}
        ></Route>
        <Route
          path="/training-scl-activity-mgt/member"
          element={<Member />}
        ></Route>
        <Route
          path="/training-scl-activity-mgt/member/addMember"
          element={<AddMember />}
        ></Route>
        <Route
          path="/training-scl-activity-mgt/report"
          element={<ActivityReport />}
        ></Route>
        <Route
          path="/training-scl-activity-mgt/summarysheet"
          element={<SummarySheet />}
        ></Route>
        {/* Training School Activity Management Routes ====================================== */}

        {/* ATTENDANCE TRACKER ROUTES - SANDUN ====================================== */}
        {/* ATTENDANCE TRACKER ROUTES - SANDUN */}

        {/* EMPLOYEE Login*/}
        <Route path="/attendance-tra
        cker" element={<EmployeeLogin />} />

        {/* Admin Login*/}
        <Route path="/attendance-tracker/adlogin" element={<ATAdminLogin />} />

        {/* Manager Login for Scanner*/}
        <Route path="/attendance-tracker/scannerlogin" element={<ATManagerLogin />} />

        <Route
          path="/attendance-tracker/adminDashboard"
          element={<AdminAttendanceDashboard />}
        />

        {/* EMPLOYEE ATTENDANCE VIEW Record */}
        <Route path="/attendance-tracker/view/:id" element={<ViewRecord />} />

        {/* EMPLOYEE ATTENDANCE HOME */}
        <Route
          path="/attendance-tracker/employeeDashboard"
          element={<EmployeeDashboard />}
        />

        {/* QR Create WINDOW */}
        <Route path="/attendance-tracker/newQR" element={<CreateQR />} />

        {/* QR SCANNER WINDOW */}
        <Route path="/attendance-tracker/scanner" element={<QRCodeScanner />} />

        {/* PAYMENT MANAGER */}

        {/* PAYMENT DASHBOARD */}
        <Route
          path="/payment-manager/dashboard"
          element={<FinancialDashboard />}
        />

        {/* VIEW PAYMENT PROFILES */}
        <Route
          path="/payment-manager/profiles"
          element={<PaymentProfileDashboard />}
        />

        {/* VIEW PAYMENT PROFILE */}
        <Route
          path="/payment-manager/profiles/view/:id"
          element={<ViewProfile />}
        />

        {/* CREATE PAYMENT PROFILE */}
        <Route
          path="/payment-manager/profiles/create"
          element={<CreateProfile />}
        />

        {/* UPDATE PAYMENT PROFILE */}
        <Route
          path="/payment-manager/profiles/update/:id"
          element={<UpdateProfile />}
        />

        {/* ATTENDANCE TRACKER ROUTES END - SANDUN */}

        {/* Intern end */}

        {/* Leave Management */}
        {/* Admin */}
        <Route
          path="/leave-manager/adminDashboard"
          element={<AdminLeaveDashboard />}
        />
        <Route
          path="/leave-manager/adminUpdate/:id"
          element={<UpdateLeaveStatus />}
        />
        <Route
          path="/leave-manager/adminView/:id"
          element={<ViewLeaveAdmin />}
        />

        {/* Employee */}
        <Route path="/leave-manager/empDashboard" element={<ViewLeavesEMP />} />
        <Route
          path="/leave-manager/empUpdate/:id"
          element={<UpdateLeaveEMP />}
        />
        <Route path="/leave-manager/empView/:id" element={<ViewLeaveEmp />} />
        <Route path="/leave-manager/create" element={<CreateLeave />} />

        {/* ATTENDANCE TRACKER ROUTES END - SANDUN ====================================== */}

        {/* LOGOUT */}
        <Route path="/logout" element={<Home />} />

        <Route path="*" element={<>404 Page Not Found</>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App