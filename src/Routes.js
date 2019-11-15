import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RouteWithLayout } from './Components/RouteWithLayout/index';
import { DriveLayout , EmailLayout, MinimalLayout , OrganizationLayout,InstituteLayout,StudentLayout,TeacherLayout } from './Layout/index';

import {
  MyDrive as MyDriveView,
  Shared as SharedView,
  Recent as RecentView,
  Trash as TrashView,
  SignUp as SignUpView,
  SignIn as SignInView,
  InboxMail as InboxMailView,
  DraftMail as DraftMailView,
  SentMail as SentMailView,
  OrganizationDash as OrganizationDashView,
  InstituteDash as InstituteDashView,
  StudentDash as StudentDashView,
  TeacherDash as TeacherDashView
} from './Views/index';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/signin"
      />
      <RouteWithLayout
        component={MyDriveView}
        exact
        layout={DriveLayout}
        path="/mydrive"
      />
      <RouteWithLayout
        component={SharedView}
        exact
        layout={DriveLayout}
        path="/shared"
      />
      <RouteWithLayout
        component={RecentView}
        exact
        layout={DriveLayout}
        path="/recent"
      />
     
      <RouteWithLayout
        component={TrashView}
        exact
        layout={DriveLayout}
        path="/trash"
      />
      <RouteWithLayout
        component={OrganizationDashView}
        exact
        layout={OrganizationLayout}
        path="/orgdash"
      />
      <RouteWithLayout
        component={InstituteDashView}
        exact
        layout={InstituteLayout}
        path="/instdash"
      />
      <RouteWithLayout
        component={StudentDashView}
        exact
        layout={StudentLayout}
        path="/studentdash"
      />
      <RouteWithLayout
        component={InboxMailView}
        exact
        layout={EmailLayout}
        path="/inbox"
      />
            <RouteWithLayout
        component={DraftMailView}
        exact
        layout={EmailLayout}
        path="/draft"
      />
            <RouteWithLayout
        component={SentMailView}
        exact
        layout={EmailLayout}
        path="/sent"
      />
            <RouteWithLayout
        component={TeacherDashView}
        exact
        layout={TeacherLayout}
        path="/teacherdash"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/signup"
      />
       <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/signin"
      /> 
      
      </Switch>
  ); 
  
};

export default Routes;