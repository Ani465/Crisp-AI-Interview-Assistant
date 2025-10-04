import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Typography } from "antd";
import ResumeUpload from "./ResumeUpload";
import ConfirmationModal from "./ConfirmationModal";
import logo from "../../assets/file.png";
import { updateCandidate } from "../../store/slices/candidatesSlice";

export default function ResumeUploadWithConfirmation({ onReady }) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [fields, setFields] = useState(null);
  const [candidateId, setCandidateId] = useState(null);

  // Called after resume is parsed, before dispatching to Redux
  function handleResumeParsed(id, extractedFields) {
    setCandidateId(id);
    setFields(extractedFields);
    setModalVisible(true);
  }

  function handleConfirm(updatedFields) {
    setModalVisible(false);
    if (candidateId && updatedFields) {
      dispatch(updateCandidate({ id: candidateId, patch: updatedFields }));
    }
    onReady(candidateId, updatedFields);
  }

  function handleCancel() {
    setModalVisible(false);
    // Optionally, allow re-upload or reset
  }

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img src={logo} height={40} alt="File" />
      </div>
      <Typography.Title
        level={5}
        style={{
          textAlign: "center",
          width: "100%",
          fontWeight: "bold",
          fontSize: 24,
          marginBottom: 5,
        }}
      >
        Welcome to Crisp AI Interview
      </Typography.Title>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginBottom: 5,
        }}
      >
        <Typography.Text
          level={5}
          style={{ textAlign: "center", fontSize: 16 }}
        >
          Upload your resume to begin your AI-powered technical interview
        </Typography.Text>
      </div>
      <ResumeUpload onReady={handleResumeParsed} />
      <ConfirmationModal
        visible={modalVisible}
        extracted={fields || {}}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Card>
  );
}
