import { useState } from "react";
// Make sure to install axios
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../customHook/useAuth";

const Signup = () => {

  const{ signup } = useAuth()
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signup(formData)

    if (result.success) {
      navigate("/book-search")
    } else {
      setError(result.message)
    }

   
  };

  const handleNaviage = () => {
    navigate("/book-search");
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <button onClick={handleNaviage}>seaech book</button>
      <h2>Signup Form</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          required
          style={{
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          style={{
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
          style={{
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.7rem",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Signup
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      
      <p>
        Already have an account?
        <Link to="/login">
        <button
          style={{
            background: "none",
            border: "none",
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >login</button>
        </Link>
    
      </p>
    </div>
  );
};

export default Signup;
