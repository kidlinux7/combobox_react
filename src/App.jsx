import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import Activities from '../pages/Activities';
import Analytics from '../pages/Analytics';
import Projects from '../pages/Projects';
import Donors from '../pages/Donors';
import Surveys from '../pages/Surveys';
import Schools from '../pages/schools/Schools';
import School_details from '../pages/schools/School_details';
import Universities from '../pages/universities/Universities';
import Univerity_details from '../pages/universities/University_details';
import Centers from '../pages/centers/Centers';
import Center_details from '../pages/centers/Center_details';
import Volunteers from '../pages/Volunteers';
import Ambassadors from '../pages/Ambassadors';
import ProjectDetails from '../pages/ProjectDetails';
import AppSidebar from './components/ui/AppSideBar';
import FormPage from '../pages/FormPage';

const App = () => {
  return (
    <div className='flex'>
      <AppSidebar />
      <div className="ml-64 w-full p-6">
        <Routes>
          <Route path="/" element={<Analytics />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/surveys" element={<Surveys />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/schools/:schoolName" element={<School_details />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/universities/:universityName" element={<Univerity_details />} />
          <Route path="/centers" element={<Centers />} />
          <Route path="/centers/:centerName" element={<Center_details />} />


          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/ambassadors" element={<Ambassadors />} />
        </Routes>

      </div>

    </div>

  );
};

export default App;
