import { Tabs } from "antd";
import Chat from "./Interviewee/Chat";
import Dashboard from "./Interviewer/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../store/slices/uiSlice";

export default function TabsLayout() {
  const dispatch = useDispatch();
  const activeTab = useSelector((s) => s.ui.activeTab);
  return (
    <Tabs
      activeKey={activeTab}
      onChange={(k) => dispatch(setActiveTab(k))}
      items={[
        { key: "interviewee", label: "Interviewee", children: <Chat /> },
        {
          key: "interviewer",
          label: "Interviewer",
          children: <Dashboard />,
        },
      ]}
    />
  );
}
