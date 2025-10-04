import { Layout, Typography } from "antd";
import TabsLayout from "./components/TabsLayout";
import WelcomeBackModal from "./modals/WelcomeBackModal";
import logo from "./assets/logo.png";

export default function App() {
  return (
    <Layout style={{ minHeight: "100vh", background: "azure" }}>
      <Layout.Header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          paddingLeft: 28,
        }}
      >
        <img src={logo} height={40} alt="Crisp" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography.Title
            level={4}
            style={{ color: "#fff", margin: 0, fontWeight: "bold" }}
          >
            Crisp Interview Assistant
          </Typography.Title>
          <Typography.Text style={{ color: "#fff", margin: 0, fontSize: 12 }}>
            Powered by AI
          </Typography.Text>
        </div>
      </Layout.Header>
      <Layout.Content style={{ padding: 16, background: "azure" }}>
        <TabsLayout />
        <WelcomeBackModal />
      </Layout.Content>
    </Layout>
  );
}
