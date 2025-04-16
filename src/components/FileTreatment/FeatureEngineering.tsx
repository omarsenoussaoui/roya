// src/components/FileTreatment/FeatureEngineering.tsx
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
  Checkbox,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import MainDataService from "../../services/MainDataService";

const { Option } = Select;
const { Title } = Typography;

const FeatureEngineering: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  // Form values
  const [featureEngineeringOperation, setFeatureEngineeringOperation] = useState<string>();
  const [sheetName, setSheetName] = useState<string>();
  const [columns, setColumns] = useState<string>();
  const [degree, setDegree] = useState<number>(2);
  const [interactionOnly, setInteractionOnly] = useState<boolean>(false);
  const [numerator, setNumerator] = useState<string>();
  const [denominator, setDenominator] = useState<string>();
  const [column1, setColumn1] = useState<string>();
  const [column2, setColumn2] = useState<string>();
  const [bins, setBins] = useState<number>(5);
  const [labels, setLabels] = useState<string>();
  const [column, setColumn] = useState<string>();
  const [method, setMethod] = useState<string>("tokenization");
  const [newColumnName, setNewColumnName] = useState<string>();

  const handleSubmit = async () => {
    if (!file) {
      message.error("Please upload a file first.");
      return;
    }
    if (!featureEngineeringOperation) {
      message.error("Please select a feature engineering operation.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("feature_engineering_operation", featureEngineeringOperation);
    if (sheetName) formData.append("sheet_name", sheetName);
    if (columns) formData.append("columns", columns);
    if (degree) formData.append("degree", degree.toString());
    if (interactionOnly) formData.append("interaction_only", "true");
    if (numerator) formData.append("numerator", numerator);
    if (denominator) formData.append("denominator", denominator);
    if (column1) formData.append("column1", column1);
    if (column2) formData.append("column2", column2);
    if (bins) formData.append("bins", bins.toString());
    if (labels) formData.append("labels", labels);
    if (column) formData.append("column", column);
    if (method) formData.append("method", method);
    if (newColumnName) formData.append("new_column_name", newColumnName);

    try {
      const res = await MainDataService.featureEngineering(formData);
      setResponse(res);
      setError(null);
      message.success("Operation completed successfully!");
    } catch (err: any) {
      console.error("Error:", err);
      setError(err?.response?.data || { error: "Unknown error occurred" });
      setResponse(null);
      message.error("Failed to perform operation");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Feature Engineering</Title>

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
        <Form.Item label="Feature Engineering Operation" required>
          <Select
            value={featureEngineeringOperation}
            onChange={setFeatureEngineeringOperation}
            placeholder="Select operation"
            style={{ width: "100%" }}
          >
            <Option value="create_polynomial_feature">create_polynomial_feature</Option>
            <Option value="create_interaction_terms">create_interaction_terms</Option>
            <Option value="create_ratio_feature">create_ratio_feature</Option>
            <Option value="create_diff_feature">create_diff_feature</Option>
            <Option value="extract_date_components">extract_date_components</Option>
            <Option value="binning">binning</Option>
            <Option value="text_feature_extraction">text_feature_extraction</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Sheet Name">
          <Input
            value={sheetName}
            onChange={(e) => setSheetName(e.target.value)}
            placeholder="Sheet name (optional)"
          />
        </Form.Item>

        {/* Operation-specific fields */}
        {featureEngineeringOperation === "create_polynomial_feature" && (
          <>
            <Form.Item label="Columns">
              <Input
                value={columns}
                onChange={(e) => setColumns(e.target.value)}
                placeholder="col1,col2"
              />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Degree">
                  <InputNumber
                    value={degree}
                    onChange={(value) => setDegree(value ?? 2)}
                    min={1}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Interaction Only">
                  <Checkbox
                    checked={interactionOnly}
                    onChange={(e) => setInteractionOnly(e.target.checked)}
                  >
                    Yes
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </>
        )}

        {featureEngineeringOperation === "create_interaction_terms" && (
          <Form.Item label="Columns">
            <Input
              value={columns}
              onChange={(e) => setColumns(e.target.value)}
              placeholder="col1,col2"
            />
          </Form.Item>
        )}

        {featureEngineeringOperation === "create_ratio_feature" && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Numerator Column">
                <Input
                  value={numerator}
                  onChange={(e) => setNumerator(e.target.value)}
                  placeholder="Numerator column"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Denominator Column">
                <Input
                  value={denominator}
                  onChange={(e) => setDenominator(e.target.value)}
                  placeholder="Denominator column"
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        {featureEngineeringOperation === "create_diff_feature" && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Column 1">
                <Input
                  value={column1}
                  onChange={(e) => setColumn1(e.target.value)}
                  placeholder="First column"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Column 2">
                <Input
                  value={column2}
                  onChange={(e) => setColumn2(e.target.value)}
                  placeholder="Second column"
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        {featureEngineeringOperation === "extract_date_components" && (
          <Form.Item label="Date Column">
            <Input
              value={column}
              onChange={(e) => setColumn(e.target.value)}
              placeholder="Date column name"
            />
          </Form.Item>
        )}

        {featureEngineeringOperation === "binning" && (
          <>
            <Form.Item label="Column">
              <Input
                value={column}
                onChange={(e) => setColumn(e.target.value)}
                placeholder="Column to bin"
              />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Number of Bins">
                  <InputNumber
                    value={bins}
                    onChange={(value) => setBins(value ?? 5)}
                    min={1}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Bin Labels">
                  <Input
                    value={labels}
                    onChange={(e) => setLabels(e.target.value)}
                    placeholder="low,medium,high"
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}

        {featureEngineeringOperation === "text_feature_extraction" && (
          <>
            <Form.Item label="Text Column">
              <Input
                value={column}
                onChange={(e) => setColumn(e.target.value)}
                placeholder="Text column name"
              />
            </Form.Item>
            <Form.Item label="Method">
              <Select
                value={method}
                onChange={setMethod}
                style={{ width: "100%" }}
              >
                <Option value="tokenization">tokenization</Option>
                <Option value="term_frequency">term_frequency</Option>
              </Select>
            </Form.Item>
          </>
        )}

        {(featureEngineeringOperation === "create_ratio_feature" || 
          featureEngineeringOperation === "create_diff_feature" ||
          featureEngineeringOperation === "binning") && (
          <Form.Item label="New Column Name">
            <Input
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="Name for new column"
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

export default FeatureEngineering;