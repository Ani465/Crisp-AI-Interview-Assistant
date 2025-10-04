import { Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCandidate } from "../../store/slices/uiSlice";
import CandidateDetail from "./CandidateDetail";

export default function CandidateTable() {
  const dispatch = useDispatch();
  const { list } = useSelector((s) => s.candidates);
  const { searchQuery, selectedCandidateId } = useSelector((s) => s.ui);

  const data = list
    .filter((c) => {
      const q = (searchQuery || "").toLowerCase();
      return (
        !q || [c.name, c.email].some((v) => (v || "").toLowerCase().includes(q))
      );
    })
    .map((c) => ({
      key: c.id,
      name: c.name || "Unknown",
      email: c.email || "",
      phone: c.phone || "",
      score: c.interview.finalScore ?? "-",
      status: c.status,
    }));

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Score", dataIndex: "score" },
    {
      title: "Status",
      dataIndex: "status",
      render: (s) => (
        <Tag color={s === "completed" ? "green" : "blue"}>{s}</Tag>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => dispatch(setSelectedCandidate(record.key)),
        })}
        pagination={{ pageSize: 8, position: ["bottomCenter"] }}
      />
      {selectedCandidateId && (
        <CandidateDetail candidateId={selectedCandidateId} />
      )}
    </>
  );
}
