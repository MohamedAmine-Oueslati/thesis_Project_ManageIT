import jwtDecode from 'jwt-decode';
import Dashboard from 'views/Dashboard.js';
import Notifications from 'views/Notifications.js';
//Projects Histories
import ProjectHistoryEmployees from 'views/ProjectHistoryEmployees';
import ProjectHistoryHeads from 'views/ProjectHistoryHeads';
import ProjectHistoryMethods from 'views/ProjectHistoryMethods.js';
import ProjectHistoryIT from 'views/ProjectHistoryIT.js';
import ProjectHistoryCEO from 'views/ProjectHistoryCEO.js';
// Projects Informations
import ProjectInfoHeads from 'views/ProjectInfoHeads.js';

import CreateProject from 'views/CreateProject.js';
import ChangePassword from 'views/ChangePassword.js';

// import Login from 'views/Login.js';
import AddEmployee from 'views/AddEmployee.js';
import AddHead from 'views/AddHead.js';
import RemoveEmployee from 'views/RemoveEmployee.js';
import RemoveHead from 'views/RemoveHead.js';
import UpdateProject from 'views/UpdateProject.js';
import ScheduleMeeting from 'views/ScheduleMeeting.js';
import Meetings from 'views/Meetings.js';
import UserProfile from 'views/UserProfile.js';

var user = localStorage.getItem('token');
var routes;

if (user && jwtDecode(user).role === 'Employee') {
  routes = [
    {
      path: '/user-profile',
      name: 'User Profile',
      rtlName: 'ملف تعريفي للمستخدم',
      icon: 'tim-icons icon-single-02',
      component: UserProfile,
      layout: '/admin',
    },
    {
      path: '/change-password',
      name: 'Change Password',
      rtlName: 'تحديث مشروع',
      icon: 'tim-icons icon-key-25',
      component: ChangePassword,
      layout: '/admin',
    },

    {
      path: '/create-project',
      name: 'Create A New Project',
      rtlName: 'إنجاز مشروع',
      icon: 'tim-icons icon-map-big',
      component: CreateProject,
      layout: '/admin',
    },
    {
      path: '/update-project',
      name: 'Request A New Feature',
      rtlName: 'تحديث مشروع',
      icon: 'tim-icons icon-pencil',
      component: UpdateProject,
      layout: '/admin',
    },

    {
      path: '/projects-history-employees',
      name: 'Projects History',
      rtlName: 'أرشيف المشاريع',
      icon: 'tim-icons icon-single-copy-04',
      component: ProjectHistoryEmployees,
      layout: '/admin',
    },
    // {
    //   path: '/project-info-employees',
    //   name: 'Project Info',
    //   rtlName: 'أرشيف المشاريع',
    //   icon: 'tim-icons icon-notes',
    //   component: ProjectInfoEmployees,
    //   layout: '/admin',
    // },
    {
      path: '/my-scheduled-meetings',
      name: 'My Scheduled Meetings',
      rtlName: 'اجتماع مجدول',
      icon: 'tim-icons icon-bullet-list-67',
      component: Meetings,
      layout: '/admin',
    },
    {
      path: '/notifications',
      name: 'Notifications',
      rtlName: 'إخطارات',
      icon: 'tim-icons icon-bell-55',
      component: Notifications,
      layout: '/admin',
    },
    {
      path: '/my-dashboard',
      name: 'My Dashboard',
      rtlName: 'لوحة القيادة',
      icon: 'tim-icons icon-chart-pie-36',
      component: Dashboard,
      layout: '/admin',
    },
  ];
} else if (
  (user &&
    jwtDecode(user).role === 'Head' &&
    jwtDecode(user).department === 'Financial') ||
  (user &&
    jwtDecode(user).role === 'Head' &&
    jwtDecode(user).department === 'Accounting') ||
  (user &&
    jwtDecode(user).role === 'Head' &&
    jwtDecode(user).department === 'Marketing')
) {
  routes = [
    {
      path: '/user-profile',
      name: 'User Profile',
      rtlName: 'ملف تعريفي للمستخدم',
      icon: 'tim-icons icon-single-02',
      component: UserProfile,
      layout: '/admin',
    },
    {
      path: '/change-password',
      name: 'Change Password',
      rtlName: 'تحديث مشروع',
      icon: 'tim-icons icon-key-25',
      component: ChangePassword,
      layout: '/admin',
    },

    {
      path: '/create-project',
      name: 'Create A New Project',
      rtlName: 'إنجاز مشروع',
      icon: 'tim-icons icon-map-big',
      component: CreateProject,
      layout: '/admin',
    },
    {
      path: '/update-project',
      name: 'Request A New Feature',
      rtlName: 'تحديث مشروع',
      icon: 'tim-icons icon-pencil',
      component: UpdateProject,
      layout: '/admin',
    },

    {
      path: '/projects-history-heads',
      name: 'Recieved Projects',
      rtlName: 'أرشيف المشاريع',
      icon: 'tim-icons icon-single-copy-04',
      component: ProjectHistoryHeads,
      layout: '/admin',
    },
    // {
    //   path: '/project-info-heads',
    //   name: 'Project Info',
    //   rtlName: 'أرشيف المشاريع',
    //   icon: 'tim-icons icon-notes',
    //   component: ProjectInfoHeads,
    //   layout: '/admin',
    // },
    {
      path: '/ScheduleMeeting',
      name: 'Schedule A Meeting',
      rtlName: 'اجتماع مجدول',
      icon: 'tim-icons icon-time-alarm',
      component: ScheduleMeeting,
      layout: '/admin',
    },
    {
      path: '/my-scheduled-meetings',
      name: 'My Scheduled Meetings',
      rtlName: 'اجتماع مجدول',
      icon: 'tim-icons icon-bullet-list-67',
      component: Meetings,
      layout: '/admin',
    },
    {
      path: '/notifications',
      name: 'Notifications',
      rtlName: 'إخطارات',
      icon: 'tim-icons icon-bell-55',
      component: Notifications,
      layout: '/admin',
    },
    {
      path: '/my-dashboard',
      name: 'My Dashboard',
      rtlName: 'لوحة القيادة',
      icon: 'tim-icons icon-chart-pie-36',
      component: Dashboard,
      layout: '/admin',
    },
  ];
} else if (
  user &&
  jwtDecode(user).role === 'Head' &&
  jwtDecode(user).department === 'Human Ressources'
) {
  routes = [
    {
      path: '/user-profile',
      name: 'User Profile',
      rtlName: 'ملف تعريفي للمستخدم',
      icon: 'tim-icons icon-single-02',
      component: UserProfile,
      layout: '/admin',
    },
    {
      path: '/change-password',
      name: 'Change Password',
      rtlName: 'تحديث مشروع',
      icon: 'tim-icons icon-key-25',
      component: ChangePassword,
      layout: '/admin',
    },

    {
      path: '/create-project',
      name: 'Create A New Project',
      rtlName: 'إنجاز مشروع',
      icon: 'tim-icons icon-map-big',
      component: CreateProject,
      layout: '/admin',
    },
    {
      path: '/update-project',
      name: 'Request A New Feature',
      rtlName: 'تحديث مشروع',
      icon: 'tim-icons icon-pencil',
      component: UpdateProject,
      layout: '/admin',
    },

    {
      path: '/projects-history-heads',
      name: 'Recieved Projects',
      rtlName: 'أرشيف المشاريع',
      icon: 'tim-icons icon-single-copy-04',
      component: ProjectHistoryHeads,
      layout: '/admin',
    },
    // {
    //   path: '/project-info-heads',
    //   name: 'Project Info',
    //   rtlName: 'أرشيف المشاريع',
    //   icon: 'tim-icons icon-notes',
    //   component: ProjectInfoHeads,
    //   layout: '/admin',
    // },
    {
      path: '/ScheduleMeeting',
      name: 'Schedule A Meeting',
      rtlName: 'اجتماع مجدول',
      icon: 'tim-icons icon-time-alarm',
      component: ScheduleMeeting,
      layout: '/admin',
    },
    {
      path: '/my-scheduled-meetings',
      name: 'My Scheduled Meetings',
      rtlName: 'اجتماع مجدول',
      icon: 'tim-icons icon-bullet-list-67',
      component: Meetings,
      layout: '/admin',
    },
    {
      path: '/notifications',
      name: 'Notifications',
      rtlName: 'إخطارات',
      icon: 'tim-icons icon-bell-55',
      component: Notifications,
      layout: '/admin',
    },
    {
      path: '/my-dashboard',
      name: 'My Dashboard',
      rtlName: 'لوحة القيادة',
      icon: 'tim-icons icon-chart-pie-36',
      component: Dashboard,
      layout: '/admin',
    },
    {
      path: '/AddEmployee',
      name: 'Add a New Employee',
      rtlName: 'ل',
      icon: 'tim-icons icon-simple-add',
      component: AddEmployee,
      layout: '/admin',
    },

    {
      path: '/RemoveEmployee',
      name: 'Remove Employee',
      rtlName: 'ل',
      icon: 'tim-icons icon-simple-delete',
      component: RemoveEmployee,
      layout: '/admin',
    },
  ];
} else if (
  user &&
  jwtDecode(user).role === 'Head' &&
  jwtDecode(user).department === 'IT'
) {
  routes = [
    {
      path: '/user-profile',
      name: 'User Profile',
      rtlName: 'ملف تعريفي للمستخدم',
      icon: 'tim-icons icon-single-02',
      component: UserProfile,
      layout: '/admin',
    },
    {
      path: '/change-password',
      name: 'Change Password',
      rtlName: 'تحديث مشروع',
      icon: 'tim-icons icon-key-25',
      component: ChangePassword,
      layout: '/admin',
    },

    {
      path: '/create-project',
      name: 'Create A New Project',
      rtlName: 'إنجاز مشروع',
      icon: 'tim-icons icon-map-big',
      component: CreateProject,
      layout: '/admin',
    },
    {
      path: '/update-project',
      name: 'Request A New Feature',
      rtlName: 'تحديث مشروع',
      icon: 'tim-icons icon-pencil',
      component: UpdateProject,
      layout: '/admin',
    },

    {
      path: '/projects-history-IT',
      name: 'Recieved Projects',
      rtlName: 'أرشيف المشاريع',
      icon: 'tim-icons icon-single-copy-04',
      component: ProjectHistoryIT,
      layout: '/admin',
    },
    // {
    //   path: '/project-info-heads',
    //   name: 'Project Info',
    //   rtlName: 'أرشيف المشاريع',
    //   icon: 'tim-icons icon-notes',
    //   component: ProjectInfoHeads,
    //   layout: '/admin',
    // },
    {
      path: '/ScheduleMeeting',
      name: 'Schedule A Meeting',
      rtlName: 'اجتماع مجدول',
      icon: 'tim-icons icon-time-alarm',
      component: ScheduleMeeting,
      layout: '/admin',
    },
    {
      path: '/my-scheduled-meetings',
      name: 'My Scheduled Meetings',
      rtlName: 'اجتماع مجدول',
      icon: 'tim-icons icon-bullet-list-67',
      component: Meetings,
      layout: '/admin',
    },
    {
      path: '/notifications',
      name: 'Notifications',
      rtlName: 'إخطارات',
      icon: 'tim-icons icon-bell-55',
      component: Notifications,
      layout: '/admin',
    },
    {
      path: '/my-dashboard',
      name: 'My Dashboard',
      rtlName: 'لوحة القيادة',
      icon: 'tim-icons icon-chart-pie-36',
      component: Dashboard,
      layout: '/admin',
    },
  ];
} else if (
  user &&
  jwtDecode(user).role === 'Head' &&
  jwtDecode(user).department === 'Methods'
) {
  routes = [
    {
      path: '/user-profile',
      name: 'User Profile',
      rtlName: 'ملف تعريفي للمستخدم',
      icon: 'tim-icons icon-single-02',
      component: UserProfile,
      layout: '/admin',
    },
    {
      path: '/change-password',
      name: 'Change Password',
      rtlName: 'تحديث مشروع',
      icon: 'tim-icons icon-key-25',
      component: ChangePassword,
      layout: '/admin',
    },

    {
      path: '/create-project',
      name: 'Create A New Project',
      rtlName: 'إنجاز مشروع',
      icon: 'tim-icons icon-map-big',
      component: CreateProject,
      layout: '/admin',
    },
    {
      path: '/update-project',
      name: 'Request A New Feature',
      rtlName: 'تحديث مشروع',
      icon: 'tim-icons icon-pencil',
      component: UpdateProject,
      layout: '/admin',
    },

    {
      path: '/projects-history-methods',
      name: 'Recieved Projects',
      rtlName: 'أرشيف المشاريع',
      icon: 'tim-icons icon-single-copy-04',
      component: ProjectHistoryMethods,
      layout: '/admin',
    },
    // {
    //   path: '/project-info-heads',
    //   name: 'Project Info',
    //   rtlName: 'أرشيف المشاريع',
    //   icon: 'tim-icons icon-notes',
    //   component: ProjectInfoHeads,
    //   layout: '/admin',
    // },
    {
      path: '/ScheduleMeeting',
      name: 'Schedule A Meeting',
      rtlName: 'اجتماع مجدول',
      icon: 'tim-icons icon-time-alarm',
      component: ScheduleMeeting,
      layout: '/admin',
    },
    {
      path: '/my-scheduled-meetings',
      name: 'My Scheduled Meetings',
      rtlName: 'اجتماع مجدول',
      icon: 'tim-icons icon-bullet-list-67',
      component: Meetings,
      layout: '/admin',
    },
    {
      path: '/notifications',
      name: 'Notifications',
      rtlName: 'إخطارات',
      icon: 'tim-icons icon-bell-55',
      component: Notifications,
      layout: '/admin',
    },
    {
      path: '/my-dashboard',
      name: 'My Dashboard',
      rtlName: 'لوحة القيادة',
      icon: 'tim-icons icon-chart-pie-36',
      component: Dashboard,
      layout: '/admin',
    },
  ];
} else if (user && jwtDecode(user).role === 'CEO') {
  routes = [
    {
      path: '/user-profile',
      name: 'User Profile',
      rtlName: 'ملف تعريفي للمستخدم',
      icon: 'tim-icons icon-single-02',
      component: UserProfile,
      layout: '/admin',
    },
    {
      path: '/change-password',
      name: 'Change Password',
      rtlName: 'تحديث مشروع',
      icon: 'tim-icons icon-key-25',
      component: ChangePassword,
      layout: '/admin',
    },

    {
      path: '/projects-history-CEO',
      name: 'Projects Validation',
      rtlName: 'أرشيف المشاريع',
      icon: 'tim-icons icon-single-copy-04',
      component: ProjectHistoryCEO,
      layout: '/admin',
    },
    {
      path: '/ScheduleMeeting',
      name: 'Schedule A Meeting',
      rtlName: 'اجتماع مجدول',
      icon: 'tim-icons icon-time-alarm',
      component: ScheduleMeeting,
      layout: '/admin',
    },
    {
      path: '/my-scheduled-meetings',
      name: 'My Scheduled Meetings',
      rtlName: 'اجتماع مجدول',
      icon: 'tim-icons icon-bullet-list-67',
      component: Meetings,
      layout: '/admin',
    },
    {
      path: '/notifications',
      name: 'Notifications',
      rtlName: 'إخطارات',
      icon: 'tim-icons icon-bell-55',
      component: Notifications,
      layout: '/admin',
    },
    {
      path: '/my-dashboard',
      name: 'My Dashboard',
      rtlName: 'لوحة القيادة',
      icon: 'tim-icons icon-chart-pie-36',
      component: Dashboard,
      layout: '/admin',
    },
    {
      path: '/AddHead',
      name: 'Add Head of Department',
      rtlName: 'ل',
      icon: 'tim-icons icon-simple-add',
      component: AddHead,
      layout: '/admin',
    },
    {
      path: '/RemoveHead',
      name: 'Remove Head of Department',
      rtlName: 'ل',
      icon: 'tim-icons icon-simple-delete',
      component: RemoveHead,
      layout: '/admin',
    },
  ];
} else if (!user) {
  routes = [];
}

export default routes;
