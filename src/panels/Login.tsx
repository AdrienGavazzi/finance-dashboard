import React from "react";
import { login } from "../utils/API";
import { setToken } from "../utils/utils";

export default function Login() {
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  async function handleSubmit(event: any) {
    event.preventDefault();
    if (name && password) {
      var response: any = await login({ name, password });
      if (response.status === 200) {
        setToken(response.data.token);
        window.location.href = "/dashboard";
      }
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="Name"
            value={name}
            required
            onChange={(evt) => setName(evt.currentTarget.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="Password"
            value={password}
            required
            onChange={(evt) => setPassword(evt.currentTarget.value)}
          />
        </div>
        <input type="submit" value="Connect" />
      </form>
    </div>
  );
}
