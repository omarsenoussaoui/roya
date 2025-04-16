// src/components/FileTreatment/Cleaning.tsx

import React, { useState } from "react";
import {
  Button,
  Upload,
  Select,
  Input,
  InputNumber,
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

const Cleaning: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  // Form values
  const [sheetName, setSheetName] = useState<string>();
  const [subset, setSubset] = useState<string>();
  const [strategy, setStrategy] = useState<string>();
  const [columns, setColumns] = useState<string>();
  const [fillValue, setFillValue] = useState<string>();
  const [threshold, setThreshold] = useState<number>();
  const [axis, setAxis] = useState<0 | 1>();
  const [column, setColumn] = useState<string>();
  const [operation, setOperation] = useState<string>();
  const [method, setMethod] = useState<string>();
  const [cleaningOperation, setCleaningOperation] = useState<string>();

  const handleSubmit = async () => {
    if (!file) {
      message.error("Please upload a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    if (cleaningOperation)
      formData.append("cleaning_operation", cleaningOperation);
    if (sheetName) formData.append("sheet_name", sheetName);
    if (subset) formData.append("subset", subset);
    if (strategy) formData.append("strategy", strategy);
    if (columns) formData.append("columns", columns);
    if (fillValue) formData.append("fill_value", fillValue);
    if (threshold !== undefined)
      formData.append("threshold", threshold.toString());
    if (axis !== undefined) formData.append("axis", axis.toString());
    if (column) formData.append("column", column);
    if (operation) formData.append("operation", operation);
    if (method) formData.append("method", method);

    try {
      const res = await MainDataService.cleaning(formData);
      setResponse(res);
      setError(null);
    } catch (err: any) {
      console.error("Cleaning error:", err);
      setError(err?.response?.data || { error: "Unknown error occurred" });
      setResponse(null);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Cleaning</Title>

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
            <Form.Item label="Cleaning Operation">
              <Select
                allowClear
                value={cleaningOperation}
                onChange={setCleaningOperation}
                placeholder="Select cleaning operation"
              >
                <Option value="remove-duplicates">Remove Duplicates</Option>
                <Option value="handle-missing-values">
                  Handle Missing Values
                </Option>
                <Option value="drop-rows-columns">Drop Rows/Columns</Option>
                <Option value="clean-text">Clean Text</Option>
                <Option value="remove-outliers">Remove Outliers</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Method">
              <Select
                allowClear
                value={method}
                onChange={setMethod}
                placeholder="Method for handling"
              >
                <Option value="mean">Mean</Option>
                <Option value="median">Median</Option>
                <Option value="mode">Mode</Option>
                <Option value="constant">Constant</Option>
                <Option value="drop">Drop</Option>
                <Option value="z-score">Z-Score</Option>
                <Option value="iqr">IQR</Option>
                <Option value="isolation-forest">Isolation Forest</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Sheet Name">
              <Input
                value={sheetName}
                onChange={(e) => setSheetName(e.target.value)}
                placeholder="Optional"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Subset (columns for duplicate removal)">
              <Input
                value={subset}
                onChange={(e) => setSubset(e.target.value)}
                placeholder="e.g. col1,col2"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Strategy (missing values)">
              <Select
                allowClear
                value={strategy}
                onChange={setStrategy}
                placeholder="Select strategy"
              >
                <Option value="mean">Mean</Option>
                <Option value="median">Median</Option>
                <Option value="mode">Mode</Option>
                <Option value="constant">Constant</Option>
                <Option value="drop">Drop</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Columns (to apply cleaning)">
              <Input
                value={columns}
                onChange={(e) => setColumns(e.target.value)}
                placeholder="e.g. col1,col2"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Fill Value">
              <Input
                value={fillValue}
                onChange={(e) => setFillValue(e.target.value)}
                placeholder="Used with constant fill strategy"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Threshold">
              <InputNumber
                placeholder="Threshold"
                value={threshold}
                onChange={(value) => setThreshold(value ?? undefined)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Axis (0 = rows, 1 = columns)">
              <Select
                allowClear
                value={axis}
                onChange={(value) => setAxis(value)}
                placeholder="Select axis"
              >
                <Option value={0}>0 - Rows</Option>
                <Option value={1}>1 - Columns</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Column (for single-column operations)">
              <Input
                value={column}
                onChange={(e) => setColumn(e.target.value)}
                placeholder="e.g. column_name"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Operation (text cleaning)">
              <Select
                allowClear
                value={operation}
                onChange={setOperation}
                placeholder="Select operation"
              >
                <Option value="lowercase">Lowercase</Option>
                <Option value="remove_punctuation">Remove Punctuation</Option>
                <Option value="remove_numbers">Remove Numbers</Option>
                <Option value="remove_whitespace">Remove Whitespace</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Method">
              <Select
                allowClear
                value={method}
                onChange={setMethod}
                placeholder="Method for handling"
              >
                <Option value="mean">Mean</Option>
                <Option value="median">Median</Option>
                <Option value="mode">Mode</Option>
                <Option value="constant">Constant</Option>
                <Option value="drop">Drop</Option>
                <Option value="z-score">Z-Score</Option>
                <Option value="iqr">IQR</Option>
                <Option value="isolation-forest">Isolation Forest</Option>
              </Select>
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

export default Cleaning;
