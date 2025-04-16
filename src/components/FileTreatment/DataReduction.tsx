// src/components/FileTreatment/DataReduction.tsx
import React, { useState } from "react";
import {
  Button,
  Upload,
  Input,
  InputNumber,
  Form,
  Typography,
  message,
  Row,
  Col,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import MainDataService from "../../services/MainDataService";

const { Option } = Select;
const { Title } = Typography;

const DataReduction: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  // Form values
  const [dataReductionOperation, setDataReductionOperation] = useState<string>();
  const [sheetName, setSheetName] = useState<string>();
  const [columns, setColumns] = useState<string>();
  const [nComponents, setNComponents] = useState<number>();
  const [targetColumn, setTargetColumn] = useState<string>();
  const [scoreFunc, setScoreFunc] = useState<string>();
  const [nFeatures, setNFeatures] = useState<number>();
  const [threshold, setThreshold] = useState<number>();
  const [nFeaturesToSelect, setNFeaturesToSelect] = useState<number>();

  const handleSubmit = async () => {
    if (!file) {
      message.error("Please upload a file first.");
      return;
    }
    if (!dataReductionOperation) {
      message.error("Please select a data reduction operation.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("data_reduction_operation", dataReductionOperation);
    if (sheetName) formData.append("sheet_name", sheetName);
    if (columns) formData.append("columns", columns);
    if (nComponents) formData.append("n_components", nComponents.toString());
    if (targetColumn) formData.append("target_column", targetColumn);
    if (scoreFunc) formData.append("score_func", scoreFunc);
    if (nFeatures) formData.append("n_features", nFeatures.toString());
    if (threshold) formData.append("threshold", threshold.toString());
    if (nFeaturesToSelect) formData.append("n_features_to_select", nFeaturesToSelect.toString());

    try {
      const res = await MainDataService.dataReduction(formData);
      setResponse(res);
      setError(null);
      message.success("Data reduction completed successfully!");
    } catch (err: any) {
      console.error("Data reduction error:", err);
      setError(err?.response?.data || { error: "Unknown error occurred" });
      setResponse(null);
      message.error("Failed to perform data reduction");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Data Reduction</Title>

      <Upload
        beforeUpload={(file) => {
          setFile(file);
          return false;
        }}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>

      {file && <div style={{ marginTop: 8 }}>Selected file: {file.name}</div>}

      <Form layout="vertical" style={{ marginTop: 24 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Data Reduction Operation" required>
              <Select
                value={dataReductionOperation}
                onChange={setDataReductionOperation}
                placeholder="Select operation"
                style={{ width: "100%" }}
              >
                <Option value="feature_reduction_pca">Principal Component Analysis (PCA)</Option>
                <Option value="feature_reduction_tsne">t-SNE Dimensionality Reduction</Option>
                <Option value="feature_selection_kbest">SelectKBest Feature Selection</Option>
                <Option value="feature_selection_correlation">Remove Correlated Features</Option>
                <Option value="feature_selection_mutual_info">Mutual Information Feature Selection</Option>
                <Option value="feature_selection_rfe">Recursive Feature Elimination (RFE)</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Sheet Name">
              <Input
                value={sheetName}
                onChange={(e) => setSheetName(e.target.value)}
                placeholder="Sheet name (optional)"
              />
            </Form.Item>
          </Col>
        </Row>

        {(dataReductionOperation === "feature_reduction_pca" || 
          dataReductionOperation === "feature_reduction_tsne") && (
          <>
            <Form.Item label="Columns">
              <Input
                value={columns}
                onChange={(e) => setColumns(e.target.value)}
                placeholder="col1,col2"
              />
            </Form.Item>
            <Form.Item label="Number of Components">
              <InputNumber
                value={nComponents}
                onChange={(value) => setNComponents(value ?? undefined)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </>
        )}

        {(dataReductionOperation === "feature_selection_kbest" || 
          dataReductionOperation === "feature_selection_mutual_info") && (
          <>
            <Form.Item label="Target Column">
              <Input
                value={targetColumn}
                onChange={(e) => setTargetColumn(e.target.value)}
                placeholder="Target column name"
              />
            </Form.Item>
            <Form.Item label="Score Function">
              <Select
                value={scoreFunc}
                onChange={setScoreFunc}
                style={{ width: "100%" }}
              >
                <Option value="f_classif">F-test (f_classif)</Option>
                <Option value="mutual_info_classif">Mutual Information (mutual_info_classif)</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Number of Features">
              <InputNumber
                value={nFeatures}
                onChange={(value) => setNFeatures(value ?? undefined)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </>
        )}

        {dataReductionOperation === "feature_selection_correlation" && (
          <>
            <Form.Item label="Correlation Threshold">
              <InputNumber
                value={threshold}
                onChange={(value) => setThreshold(value ?? undefined)}
                min={0}
                max={1}
                step={0.01}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </>
        )}

        {dataReductionOperation === "feature_selection_rfe" && (
          <>
            <Form.Item label="Target Column">
              <Input
                value={targetColumn}
                onChange={(e) => setTargetColumn(e.target.value)}
                placeholder="Target column name"
              />
            </Form.Item>
            <Form.Item label="Number of Features to Select">
              <InputNumber
                value={nFeaturesToSelect}
                onChange={(value) => setNFeaturesToSelect(value ?? undefined)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Execute
          </Button>
        </Form.Item>
      </Form>

      {response && (
        <div style={{ marginTop: 24 }}>
          <pre
            style={{
              background: "#f5f5f5",
              padding: 16,
              borderRadius: 4,
              maxHeight: 400,
              overflow: "auto",
            }}
          >
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: 24 }}>
          <pre
            style={{
              background: "#fff0f0",
              padding: 16,
              borderRadius: 4,
              maxHeight: 400,
              overflow: "auto",
              color: "#d32f2f",
            }}
          >
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DataReduction;