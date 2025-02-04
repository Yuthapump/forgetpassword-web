import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tokenFromURL = searchParams.get("token");
    if (!tokenFromURL) {
      setError("Invalid or missing reset token.");
    } else {
      setToken(tokenFromURL);
    }
  }, []);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Please enter your new password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "https://senior-test-deploy-production-1362.up.railway.app/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      const jsonResponse = await response.json();
      if (response.ok && jsonResponse.success) {
        alert("Password reset successfully. You can now login.");
        window.location.href = "/login"; // ✅ ส่งผู้ใช้ไปหน้า Login
      } else {
        alert(jsonResponse.message || "Reset failed.");
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      alert("Something went wrong.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
