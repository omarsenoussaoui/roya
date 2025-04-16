import React, { useState } from "react";
import { Upload, Button, Input, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import MainDataService from "../../services/MainDataService";

const SheetProfile: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [sheetName, setSheetName] = useState<string>("");
  const [response, setResponse] = useState<any>(null);

  const handleFileChange = (info: any) => {
    const selectedFile = info.fileList?.[0]?.originFileObj || null;
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      return message.error("Please upload a file.");
    }

    try {
      const data = await MainDataService.sheetProfile(
        file,
        sheetName.trim() || undefined
      );
      setResponse(data);
      message.success("Sheet profile retrieved successfully.");
    } catch (error: any) {
      console.error("Error retrieving sheet profile:", error);
      message.error("Failed to retrieve sheet profile.");

      if (error.response?.data) {
        setResponse(error.response.data);
      } else {
        setResponse({ error: error.message });
      }
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h2 style={{ fontSize: 20, marginBottom: 20 }}>Sheet Profile</h2>

      <Upload
        beforeUpload={() => false}
        onChange={handleFileChange}
        maxCount={1}
        fileList={file ? [{ uid: "-1", name: file.name, status: "done" }] : []}
      >
        <Button icon={<UploadOutlined />}>Upload File</Button>
      </Upload>

      <Input
        placeholder="Optional sheet name"
        value={sheetName}
        onChange={(e) => setSheetName(e.target.value)}
        style={{ marginTop: 16 }}
      />

      <Button
        type="primary"
        onClick={handleSubmit}
        style={{ marginTop: 16 }}
        disabled={!file}
      >
        Submit
      </Button>

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

export default SheetProfile;
