// src/components/FileTreatment/Transformation.tsx

import React, { useState } from "react";
import {
  Button,
  Upload,
  Select,
  Input,
  Form,
  Typography,
  message,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import MainDataService from "../../services/MainDataService";

const { Option } = Select;
const { Title } = Typography;

const Transformation: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const [transformationOperation, setTransformationOperation] = useState<string>();
  const [sheetName, setSheetName] = useState<string>();
  const [columns, setColumns] = useState<string>();
  const [method, setMethod] = useState<string>();

  const handleSubmit = async () => {
    if (!file || !transformationOperation) {
      message.error("File and transformation operation are required.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("transformation_operation", transformationOperation);
    if (sheetName) formData.append("sheet_name", sheetName);
    if (columns) formData.append("columns", columns);
    if (method) formData.append("method", method);

    try {
      const res = await MainDataService.transformation(formData);
      setResponse(res);
      setError(null);
    } catch (err: any) {
      console.error("Transformation error:", err);
      setError(err?.response?.data || { error: "Unknown error occurred" });
      setResponse(null);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Transformation</Title>

      <Upload
        beforeUpload={(file) => {
          setFile(file);
          return false;
        }}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Upload CSV or Excel</Button>
      </Upload>

      {file && <div style={{ marginTop: 8 }}>Selected file: {file.name}</div>}

      <Form layout="vertical" style={{ marginTop: 24 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Transformation Operation" required>
              <Select
                value={transformationOperation}
                onChange={setTransformationOperation}
                placeholder="Select transformation"
              >
                <Option value="normalisation">
                  Normalisation (0-1 scaling)
                </Option>
                <Option value="standardization">
                  Standardization (zero mean, unit variance)
                </Option>
                <Option value="one-hot-encoding">
                  One-Hot Encoding (categorical to binary)
                </Option>
                <Option value="label-encoding">
                  Label Encoding (categorical to numerical)
                </Option>
                <Option value="skewness-correction">
                  Skewness Correction (fix skewed data)
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Sheet Name">
              <Input
                value={sheetName}
                onChange={(e) => setSheetName(e.target.value)}
                placeholder="Optional"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Columns">
              <Input
                value={columns}
                onChange={(e) => setColumns(e.target.value)}
                placeholder="e.g. col1,col2"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Method (if applicable)">
              <Input
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                placeholder="Optional method name"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>

      {response && (
        <div style={{ marginTop: 24 }}>
          <h3>Response</h3>
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
          <h3 style={{ color: "red" }}>Error</h3>
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

export default Transformation;
