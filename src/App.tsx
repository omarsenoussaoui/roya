import { Header, Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import "./App.css";
import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidBar from "./components/Layout/SidBar";
import NavBar from "./components/Layout/NavBar";

import ProcessFilePage from "./pages/FileTreatment/ProcessFilePage";
import DataOverviewPage from "./pages/FileTreatment/DataOverviewPage";
import SheetProfilePage from "./pages/FileTreatment/SheetProfilePage";
import CleaningPage from "./pages/FileTreatment/CleaningPage";
import TransformationPage from "./pages/FileTreatment/TransformationPage";
import FeatureEngineeringPage from "./pages/FileTreatment/FeatureEngineeringPage";
import DataReductionPage from "./pages/FileTreatment/DataReductionPage";
import DataValidationPage from "./pages/FileTreatment/DataValidationPage";

function App() {
  return (
    <Router>
      <Layout>
        <Header
          style={{
            padding: "0 0px",
            background: "#fff",
            borderBottom: "1px solid #e8e8e8",
          }}
        >
          <NavBar />
        </Header>

        <Layout>
          <Sider width={250} style={{ background: "#f8f9fa" }}>
            <SidBar />
          </Sider>

          <Content
            style={{
              margin: "10px",
              background: "#fff",
              padding: "24px",
              minHeight: "calc(100vh - 128px)",
            }}
          >
            <Routes>
              <Route path="/" element={<ProcessFilePage />} />
              <Route path="/process-file" element={<ProcessFilePage />} />
              <Route path="/data-overview" element={<DataOverviewPage />} />
              <Route path="/sheet-profile" element={<SheetProfilePage />} />
              <Route path="/cleaning" element={<CleaningPage />} />
              <Route path="/transformation" element={<TransformationPage />} />
              <Route path="/feature-engineering" element={<FeatureEngineeringPage />} />
              <Route path="/data-reduction" element={<DataReductionPage />} />
              <Route path="/data-validation" element={<DataValidationPage />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
