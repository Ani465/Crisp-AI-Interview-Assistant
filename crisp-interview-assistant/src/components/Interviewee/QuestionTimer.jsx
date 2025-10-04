import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tick } from "../../store/slices/interviewSlice";
import { Typography } from "antd";

export default function QuestionTimer({ remainingMs, duration }) {
  const dispatch = useDispatch();
  const stage = useSelector((s) => s.interview.stage);

  useEffect(() => {
    if (stage !== "questions") return;
    const id = setInterval(() => dispatch(tick()), 250);
    return () => clearInterval(id);
  }, [stage, dispatch]);

  // Show seconds remaining
  const seconds = Math.ceil((remainingMs || 0) / 1000);
  const totalSeconds = Math.round((duration || 0) / 1000);
  return (
    <Typography.Text
      type={seconds === 0 ? "danger" : undefined}
      style={{ fontSize: 18 }}
    >
      Time Remaining: {seconds}s / {totalSeconds}s
    </Typography.Text>
  );
}
