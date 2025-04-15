import {
  FileOutlined,
  TableOutlined,
  ProfileOutlined,
  DeleteOutlined,
  RetweetOutlined,
  ToolOutlined,
  FilterOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import ProcessFilePage from "../pages/FileTreatment/ProcessFilePage";
import CleaningPage from "../pages/FileTreatment/CleaningPage";
import DataOverviewPage from "../pages/FileTreatment/DataOverviewPage";
import DataReductionPage from "../pages/FileTreatment/DataReductionPage";
import DataValidationPage from "../pages/FileTreatment/DataValidationPage";
import FeatureEngineeringPage from "../pages/FileTreatment/FeatureEngineeringPage";
import SheetProfilePage from "../pages/FileTreatment/SheetProfilePage";
import TransformationPage from "../pages/FileTreatment/TransformationPage";

export const sidebarMenuItems = [
  {
    key: "/process-file",
    label: "Process File",
    icon: <FileOutlined />,
    component: <ProcessFilePage />,
  },
  {
    key: "/data-overview",
    label: "Data Overview",
    icon: <TableOutlined />,
    component: <DataOverviewPage />,
  },
  {
    key: "/sheet-profile",
    label: "Sheet Profile",
    icon: <ProfileOutlined />,
    component: <SheetProfilePage />,
  },
  {
    key: "/cleaning",
    label: "Cleaning",
    icon: <DeleteOutlined />,
    component: <CleaningPage />,
  },
  {
    key: "/transformation",
    label: "Transformation",
    icon: <RetweetOutlined />,
    component: <TransformationPage />,
  },
  {
    key: "/feature-engineering",
    label: "Feature Engineering",
    icon: <ToolOutlined />,
    component: <FeatureEngineeringPage />,
  },
  {
    key: "/data-reduction",
    label: "Data Reduction",
    icon: <FilterOutlined />,
    component: <DataReductionPage />,
  },
  {
    key: "/data-validation",
    label: "Data Validation",
    icon: <CheckCircleOutlined />,
    component: <DataValidationPage />,
  },
];
