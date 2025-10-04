import { Upload, Button, Space, Typography } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { parsePDF, parseDOCX } from "../../utils/resumeParser";
import { useDispatch } from "react-redux";
import {
  addCandidate,
  updateCandidate,
} from "../../store/slices/candidatesSlice";

export default function ResumeUpload({ onReady }) {
  const dispatch = useDispatch();

  async function handleFiles({ file }) {
    const f = file.originFileObj || file;
    if (!f) return;
    const ext = f.name.toLowerCase().split(".").pop();
    if (!["pdf", "docx"].includes(ext)) {
      // friendly error handled by Upload component
      return;
    }
    try {
      const fields = ext === "pdf" ? await parsePDF(f) : await parseDOCX(f);
      const action = addCandidate({
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        resumeMeta: { filename: f.name, type: ext, size: f.size },
      });
      dispatch(action);
      onReady(action.payload.id, fields);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Upload.Dragger
        multiple={false}
        accept=".pdf,.docx"
        showUploadList={false}
        customRequest={({ file, onSuccess }) => {
          handleFiles({ file });
          setTimeout(() => onSuccess("ok"), 0);
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p
          className="ant-upload-text"
          style={{ fontWeight: 600, marginBottom: 0 }}
        >
          Drag & drop your resume here
        </p>
        <p className="ant-upload-text">or click to browse files</p>
        <span
          style={{
            backgroundColor: "lightgray",
            borderRadius: 5,
            padding: "2px 10px",
            marginRight: 8,
          }}
        >
          PDF
        </span>
        <span
          style={{
            backgroundColor: "lightgray",
            borderRadius: 5,
            padding: "2px 10px",
          }}
        >
          DOCX
        </span>
      </Upload.Dragger>
      <div>
        <h2>What happens next?</h2>
        <ul className="ant-upload-hint" style={{ paddingLeft: 20 }}>
          <li>AI will extract your name, email, and phone number.</li>
          <li>You'll be asked to fill any missing information.</li>
          <li>Technical interview begins with 6 timed questions.</li>
          <li>Receive instant AI feedback and scoring.</li>
        </ul>
      </div>
    </Space>
  );
}
