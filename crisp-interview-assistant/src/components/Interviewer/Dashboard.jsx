import { Card, Space, Input, Button } from "antd";
import CandidateTable from "./CandidateTable";
import { useDispatch } from "react-redux";
import { sortByScore } from "../../store/slices/candidatesSlice";
import { setSearchQuery } from "../../store/slices/uiSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <div>
        <h1 style={{ fontWeight: "bold", fontSize: 26, marginBottom: 5 }}>
          Interviewer Dashboard
        </h1>
        <p>Manage and review your candidates here.</p>
      </div>
      <Card>
        <Space>
          <Input.Search
            placeholder="Search by name or email"
            onSearch={(q) => dispatch(setSearchQuery(q))}
            allowClear
          />
          <Button onClick={() => dispatch(sortByScore())}>Sort by score</Button>
        </Space>
      </Card>
      <CandidateTable />
    </Space>
  );
}
