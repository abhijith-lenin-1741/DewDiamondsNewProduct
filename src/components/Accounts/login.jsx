import { Card, Input, Button, Form } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DashBoard from "../DashBoard";
const Login = () => {
  const [form] = Form.useForm();
  const url = import.meta.env.VITE_API_URL;

  const handleSubmit = async (values) => {
    try {
      console.log("Form Values: ", values);
      const response = await axios.post(`${url}/auth/login`, {
        email: values.email,
        password: values.password,
      });
      console.log("Login response:", response.data.token);

      Cookies.set("authToken", response.data.token, { expires: 1 });

      window.location.reload(); 
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div
      className="login_card"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        hoverable
        style={{
          width: 300,
          padding: "20px",
          textAlign: "center",
        }}
      >
        <img
          alt="login illustration"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          style={{ width: "100%", marginBottom: "15px" }}
        />
        <h3>Login</h3>

        <Form
          form={form}
          name="login_form"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
