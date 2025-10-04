import { Drawer, List, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCandidate } from "../../store/slices/uiSlice";

export default function CandidateDetail({ candidateId }) {
  const dispatch = useDispatch();
  const c = useSelector((s) =>
    s.candidates.list.find((x) => x.id === candidateId)
  );

  return (
    <Drawer
      title={`Candidate: ${c?.name || "Unknown"}`}
      open={Boolean(c)}
      onClose={() => dispatch(setSelectedCandidate(null))}
      width={520}
    >
      <Typography.Paragraph>
        Email: {c?.email || "—"} | Phone: {c?.phone || "—"}
      </Typography.Paragraph>
      <Typography.Paragraph>
        Final Score: {c?.interview.finalScore ?? "—"}
      </Typography.Paragraph>
      <Typography.Paragraph>
        Summary: {c?.interview.summary || "—"}
      </Typography.Paragraph>
      <List
        header="Chat history"
        dataSource={(c?.interview.questions || []).map((q, i) => ({
          q: q.q,
          a: c?.interview.answers[i] || "—",
          s: c?.interview.perQuestionScores[i] ?? "—",
        }))}
        renderItem={(item, idx) => (
          <List.Item>
            <List.Item.Meta
              title={`Q${idx + 1}: ${item.q}`}
              description={`Answer: ${item.a}`}
            />
            <div>Score: {item.s}</div>
          </List.Item>
        )}
      />
    </Drawer>
  );
}
