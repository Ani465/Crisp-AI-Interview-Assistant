import { Modal, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setWelcomeBack } from "../store/slices/uiSlice";
import { resume } from "../store/slices/interviewSlice";

export default function WelcomeBackModal() {
  const dispatch = useDispatch();
  const visible = useSelector((s) => s.ui.welcomeBackVisible);
  const interview = useSelector((s) => s.interview);
  const candidateId = interview.activeCandidateId;

  return (
    <Modal
      title="Welcome back"
      open={visible}
      onOk={() => {
        dispatch(setWelcomeBack(false));
        dispatch({ type: "interview/resume" });
      }}
      onCancel={() => dispatch(setWelcomeBack(false))}
    >
      <Typography.Paragraph>
        You have an unfinished interview. We’ll restore your timers and
        progress. Click OK to continue.
      </Typography.Paragraph>
      <Typography.Paragraph>
        Candidate: {candidateId || "—"} | Question {interview.currentIndex + 1}{" "}
        of 6
      </Typography.Paragraph>
    </Modal>
  );
}
