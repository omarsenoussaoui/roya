// src/components/FileTreatment/DataValidation.tsx
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

const DataValidation: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  // Form values
  const [validationOperation, setValidationOperation] = useState<string>();
  const [sheetName, setSheetName] = useState<string>();
  const [columns, setColumns] = useState<string>();
  const [rules, setRules] = useState<string>();
  const [column, setColumn] = useState<string>();
  const [minVal, setMinVal] = useState<number>();
  const [maxVal, setMaxVal] = useState<number>();
  const [pattern, setPattern] = useState<string>();
  const [typeMapping, setTypeMapping] = useState<string>();

  const handleSubmit = async () => {
    if (!file) {
      message.error("Please upload a file first.");
      return;
    }
    if (!validationOperation) {
      message.error("Please select a validation operation.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("validation_operation", validationOperation);
    if (sheetName) formData.append("sheet_name", sheetName);
    if (columns) formData.append("columns", columns);
    if (rules) formData.append("rules", rules);
    if (column) formData.append("column", column);
    if (minVal) formData.append("min_val", minVal.toString());
    if (maxVal) formData.append("max_val", maxVal.toString());
    if (pattern) formData.append("pattern", pattern);
    if (typeMapping) formData.append("type_mapping", typeMapping);

    try {
      const res = await MainDataService.dataValidation(formData);
      setResponse(res);
      setError(null);
      message.success("Data validation completed successfully!");
    } catch (err: any) {
      console.error("Data validation error:", err);
      setError(err?.response?.data || { error: "Unknown error occurred" });
      setResponse(null);
      message.error("Failed to perform data validation");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Data Validation</Title>

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
            <Form.Item label="Validation Operation" required>
              <Select
                value={validationOperation}
                onChange={setValidationOperation}
                placeholder="Select operation"
                style={{ width: "100%" }}
              >
                <Option value="validate_non_negative">Validate Non-Negative</Option>
                <Option value="validate_range">Validate Range</Option>
                <Option value="validate_integrity">Validate Integrity</Option>
                <Option value="validate_pattern">Validate Pattern</Option>
                <Option value="validate_types">Validate Types</Option>
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

        {validationOperation === "validate_non_negative" && (
          <Form.Item label="Columns">
            <Input
              value={columns}
              onChange={(e) => setColumns(e.target.value)}
              placeholder="col1,col2"
            />
          </Form.Item>
        )}

        {validationOperation === "validate_range" && (
          <>
            <Form.Item label="Column">
              <Input
                value={column}
                onChange={(e) => setColumn(e.target.value)}
                placeholder="Column name"
              />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Minimum Value">
                  <InputNumber
                    value={minVal}
                    onChange={(value) => setMinVal(value ?? undefined)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Maximum Value">
                  <InputNumber
                    value={maxVal}
                    onChange={(value) => setMaxVal(value ?? undefined)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}

        {validationOperation === "validate_pattern" && (
          <>
            <Form.Item label="Column">
              <Input
                value={column}
                onChange={(e) => setColumn(e.target.value)}
                placeholder="Column name"
              />
            </Form.Item>
            <Form.Item label="Regex Pattern">
              <Input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="^[A-Za-z0-9]+$"
              />
            </Form.Item>
          </>
        )}

        {validationOperation === "validate_types" && (
          <Form.Item label="Type Mapping (JSON)">
            <Input.TextArea
              value={typeMapping}
              onChange={(e) => setTypeMapping(e.target.value)}
              placeholder='{"column1": "int", "column2": "string"}'
              rows={4}
            />
          </Form.Item>
        )}

        {validationOperation === "validate_integrity" && (
          <Form.Item label="Validation Rules (JSON)">
            <Input.TextArea
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              placeholder='{"rule1": "value1", "rule2": "value2"}'
              rows={4}
            />
          </Form.Item>
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

export default DataValidation;