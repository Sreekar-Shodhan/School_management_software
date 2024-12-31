import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import StudentRegistration from './pages/students/StudentRegistration';
import StudentsList from './pages/students/StudentsList';
import StudentEdit from './pages/students/StudentEdit';
import FeePage from './pages/FeePage';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<StudentsList />} />
          <Route path="/students/new" element={<StudentRegistration />} />
          <Route path="/students/edit/:id" element={<StudentEdit />} />
          <Route path="/fee" element={<FeePage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
