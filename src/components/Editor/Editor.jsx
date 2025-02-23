import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./Editor.css";

const socket = io("http://localhost:5000");

const Editor = () => {
  const [code, setCode] = useState("");
  const [users, setUsers] = useState([]);
  const [cursors, setCursors] = useState({});
  const editorRef = useRef(null);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    socket.emit("join", { token });

    socket.on("receive-code", (data) => {
      setCode(data.code);
    });

    socket.on("update-users", (data) => {
      setUsers(data.users);
    });

    socket.on("cursor-update", ({ username, position }) => {
      setCursors((prev) => ({
        ...prev,
        [username]: position || null,
      }));
    });

    return () => {
      socket.off("receive-code");
      socket.off("update-users");
      socket.off("cursor-update");
    };
  }, [token]);

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    socket.emit("send-code", { code: newCode });
  };

  const handleMouseMove = (e) => {
    if (editorRef.current) {
      const rect = editorRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      socket.emit("cursor-move", { x, y });
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-wrapper" ref={editorRef} onMouseMove={handleMouseMove}>
        <textarea
          className="code-editor"
          value={code}
          onChange={handleCodeChange}
          placeholder="Start typing your code..."
        />
        {Object.entries(cursors).map(([user, pos]) =>
          pos ? (
            <div key={user} className="cursor-tooltip" style={{ left: pos.x, top: pos.y }}>
              {user}
            </div>
          ) : null
        )}
      </div>
      <div className="active-users" style={{ position: "fixed", bottom: "10px", right: "10px", background: "rgba(0, 0, 0, 0.7)", color: "white", padding: "5px 10px", borderRadius: "5px" }}>
        Active Users: {users.join(", ")}
      </div>
    </div>
  );
};

export default Editor;
