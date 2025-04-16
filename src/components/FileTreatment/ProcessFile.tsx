import React, { useState } from "react";
import { Upload, Button, Form, Input, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import MainDataService from "../../services/MainDataService";

const { Option } = Select;

const operationOptions = [
  "summary-stats",
  "visualizations",
  "correlation",
  "quality-report",
];
const plotTypes = ["histogram", "boxplot", "scatter", "line", "bar"];
const correlationMethods = ["pearson", "kendall", "spearman"];

const ProcessFile: React.FC = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [operation, setOperation] = useState("summary-stats");
  const [response, setResponse] = useState<any>(null);

  const handleFileChange = (info: any) => {
    const selectedFile = info.fileList?.[0]?.originFileObj || null;
    setFile(selectedFile);
  };
  
  const handleSubmit = async (values: any) => {
    if (!file) return message.error("Please upload a file.");

    const formData = new FormData();
    formData.append("file", file);
    

    for (const key in values) {
      if (values[key] && key !== "file") {
        formData.append(key, values[key]);
      }
    }

    try {
      const data = await MainDataService.processFile(formData);
      setResponse(data);
      console.log(data);
      message.success("File processed successfully!");
    } catch (err) {
      console.error(err);
      message.error("Failed to process file.");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h2 style={{ fontSize: 20, marginBottom: 20 }}>Process File</h2>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Upload File" required>
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            maxCount={1}
            fileList={
              file ? [{ uid: "-1", name: file.name, status: "done" }] : []
            }
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Operation"
          name="operation"
          initialValue="summary-stats"
        >
          <Select onChange={(value) => setOperation(value)}>
            {operationOptions.map((op) => (
              <Option key={op} value={op}>
                {op}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {[
          "summary-stats",
          "visualizations",
          "correlation",
          "quality-report",
        ].includes(operation) && (
          <Form.Item name="sheet_name" label="Sheet Name">
            <Input placeholder="Optional sheet name (Excel files)" />
          </Form.Item>
        )}

        {(operation === "summary-stats" ||
          operation === "visualizations" ||
          operation === "correlation") && (
          <Form.Item name="columns" label="Columns (comma-separated)">
            <Input placeholder="e.g. age, income, salary" />
          </Form.Item>
        )}

        {operation === "summary-stats" && (
          <Form.Item name="stats" label="Stats (comma-separated)">
            <Input placeholder="e.g. mean, median, std" />
          </Form.Item>
        )}

        {operation === "visualizations" && (
          <Form.Item name="plot_type" label="Plot Type">
            <Select placeholder="Select plot type">
              {plotTypes.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {operation === "correlation" && (
          <Form.Item name="method" label="Correlation Method">
            <Select placeholder="Select method">
              {correlationMethods.map((method) => (
                <Option key={method} value={method}>
                  {method}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
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
    </div>
  );
};

export default ProcessFile;
