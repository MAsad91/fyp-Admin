import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SideMenu from './SideMenu';
import UserList from './sidebarcomponents/UserList';
import CrimeReport from './sidebarcomponents/CrimeReport';
import SaveLife from './sidebarcomponents/SaveLifeReport';
import LostFound from './sidebarcomponents/LostFoundReport';
import Community from './sidebarcomponents/CommunityReport';
import Certificate from './sidebarcomponents/CertificatesReport';

function AppRoutes () {
  return(
    <Router>
      <SideMenu />
      <Routes>
        <Route path="/userlist" element={<UserList/>} />
        <Route path="/crimereport" element={<CrimeReport/>} />
        <Route path="/savelifereport" element={<SaveLife/>}/>
        <Route path="/lostfoundreport" element={<LostFound/>} />
        <Route path="communityreport" element={<Community/>} />
        <Route path="/certificatereport" element={<Certificate/>} />
      </Routes>
    </Router>
  );
}
export default AppRoutes;