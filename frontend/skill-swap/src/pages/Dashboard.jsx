import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMySkills, deleteSkill } from "../api/skillApi";
import {
  getMyRequests,
  getMySentRequests,
  updateRequestStatus,
} from "../api/requestApi";
import {
  getMyContracts,
  completeContract,
  requestCompletion,
  cancelContract,
} from "../api/contractApi";
import { useNavigate, Link } from "react-router-dom";
import ContractCard from "../components/ContractCard";
import Avatar from "../components/Avatar";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [mySkills, setMySkills] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD DASHBOARD DATA ================= */
  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const skills = await getMySkills();
        const incoming = await getMyRequests();
        const sent = await getMySentRequests();
        const activeContracts = await getMyContracts();

        setMySkills(skills || []);
        setIncomingRequests(incoming || []);
        setSentRequests(sent || []);
        setContracts(activeContracts || []);
      } catch (err) {
        console.error("Dashboard load error", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  /* ================= ACCEPT / REJECT REQUEST ================= */
  const handleDecision = async (id, status) => {
    try {
      await updateRequestStatus(id, status);
      setIncomingRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status } : r
        )
      );
    } catch {
      alert("Action could not be completed");
    }
  };

  /* ================= DELETE SKILL ================= */
  const handleDeleteSkill = async (id) => {
    if (!window.confirm("Are you sure you want to remove this skill offering?")) return;
    try {
      await deleteSkill(id);
      setMySkills((prev) => prev.filter((s) => s._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  /* ================= COMPLETE CONTRACT ================= */
  const handleComplete = async (id) => {
    try {
      await completeContract(id);
      setContracts((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, status: "completed" } : c
        )
      );
    } catch {
      alert("Failed to complete contract");
    }
  };

  /* ================= REQUEST COMPLETION ================= */
  const handleRequestCompletion = async (id) => {
    try {
      await requestCompletion(id);
      setContracts((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, status: "completionRequested" } : c
        )
      );
    } catch {
      alert("Failed to request completion");
    }
  };

  /* ================= CANCEL CONTRACT ================= */
  const handleCancel = async (id) => {
    try {
      await cancelContract(id);
      setContracts((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, status: "cancelled" } : c
        )
      );
    } catch {
      alert("Failed to cancel contract");
    }
  };

  if (!user) {
    return (
      <div className="page-container" style={{ textAlign: "center", padding: "5rem 1rem" }}>
        <p style={{ color: "var(--color-text-secondary)", marginBottom: "1rem" }}>Please sign in to access your learning dashboard.</p>
        <Link to="/login" className="btn-primary">Sign in</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-container">
        <div style={{ height: "40px", width: "240px", marginBottom: "1.5rem" }} className="skeleton" />
        <div style={{ height: "120px", width: "100%", marginBottom: "2rem" }} className="skeleton" />
        <div style={{ height: "200px", width: "100%" }} className="skeleton" />
      </div>
    );
  }

  const activeContractsCount = contracts.filter((c) => c.status === "active").length;
  const pendingRequestsCount = incomingRequests.filter((r) => r.status === "pending").length;

  return (
    <div className="page-container">
      {/* Welcome Banner */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
          paddingBottom: "2rem",
          marginBottom: "2rem",
          borderBottom: "1px solid var(--color-border-subtle)",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-accent-emerald)",
              display: "block",
              marginBottom: "0.25rem",
            }}
          >
            Overview
          </span>
          <h1 className="page-title" style={{ margin: 0 }}>
            Welcome back, {user.name}
          </h1>
          <p className="page-subtitle" style={{ margin: 0, marginTop: "0.25rem" }}>
            Here is what requires your attention across your active skill trades.
          </p>
        </div>

        <button
          onClick={() => navigate("/post")}
          className="btn-primary"
          style={{ padding: "0.65rem 1.25rem" }}
        >
          + Post New Skill
        </button>
      </div>

      {/* Metrics Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2.5rem",
        }}
      >
        <div className="card" style={{ padding: "1.25rem" }}>
          <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", display: "block", marginBottom: "0.4rem" }}>
            Active Exchanges
          </span>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--color-brand-primary)" }}>
            {activeContractsCount}
          </div>
        </div>

        <div className="card" style={{ padding: "1.25rem" }}>
          <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", display: "block", marginBottom: "0.4rem" }}>
            Pending Proposals
          </span>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--color-accent-emerald)" }}>
            {pendingRequestsCount}
          </div>
        </div>

        <div className="card" style={{ padding: "1.25rem" }}>
          <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", display: "block", marginBottom: "0.4rem" }}>
            Published Skills
          </span>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
            {mySkills.length}
          </div>
        </div>

        <div className="card" style={{ padding: "1.25rem" }}>
          <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", display: "block", marginBottom: "0.4rem" }}>
            Total Completed
          </span>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--color-text-secondary)" }}>
            {contracts.filter((c) => c.status === "completed").length}
          </div>
        </div>
      </div>

      {/* ================= INCOMING REQUESTS ================= */}
      <section style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
              Incoming Swap Proposals
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
              Peers who want to learn a skill you teach.
            </p>
          </div>
          {incomingRequests.length > 0 && (
            <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
              {incomingRequests.length} total
            </span>
          )}
        </div>

        {incomingRequests.length > 0 ? (
          <div className="grid">
            {incomingRequests.map((r) => {
              const isPending = r.status === "pending";
              const isAccepted = r.status === "accepted";
              const isRejected = r.status === "rejected";

              return (
                <div
                  className="card"
                  key={r._id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderLeft: `3px solid ${
                      isAccepted
                        ? "var(--color-accent-emerald)"
                        : isRejected
                        ? "var(--color-danger-border)"
                        : "var(--color-warning-border)"
                    }`,
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          color: "var(--color-accent-emerald)",
                        }}
                      >
                        Target Skill
                      </span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          padding: "0.2rem 0.5rem",
                          borderRadius: "var(--radius-pill)",
                          backgroundColor: isAccepted
                            ? "var(--color-success-bg)"
                            : isRejected
                            ? "var(--color-danger-bg)"
                            : "var(--color-warning-bg)",
                          color: isAccepted
                            ? "var(--color-success-text)"
                            : isRejected
                            ? "var(--color-danger-text)"
                            : "var(--color-warning-text)",
                        }}
                      >
                        {r.status}
                      </span>
                    </div>

                    <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "0.75rem" }}>
                      {r.skill?.title || "Skill Offering"}
                    </h4>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                      <Avatar name={r.requester?.name || "Member"} size={32} />
                      <div>
                        <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "block" }}>
                          Requested by
                        </span>
                        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                          {r.requester?.name || "Learner"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ paddingTop: "0.75rem", borderTop: "1px solid var(--color-border-subtle)" }}>
                    {isPending && (
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => handleDecision(r._id, "accepted")}
                          className="btn-primary"
                          style={{ flex: 1, padding: "0.45rem 0.75rem", fontSize: "0.8125rem" }}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDecision(r._id, "rejected")}
                          className="btn-danger"
                          style={{ padding: "0.45rem 0.75rem", fontSize: "0.8125rem" }}
                        >
                          Decline
                        </button>
                      </div>
                    )}

                    {isAccepted && (
                      <button
                        onClick={() => navigate(`/chat/${r._id}`)}
                        className="btn-secondary"
                        style={{ width: "100%", padding: "0.45rem 0.75rem", fontSize: "0.8125rem" }}
                      >
                        Open Coordination Chat
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📥</div>
            <h3 className="empty-state-title">No incoming proposals</h3>
            <p className="empty-state-desc">
              When peers request to swap skills for something you offer, they will appear here.
            </p>
          </div>
        )}
      </section>

      {/* ================= SENT REQUESTS ================= */}
      <section style={{ marginBottom: "3rem" }}>
        <div style={{ marginBottom: "1.25rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
            Sent Swap Requests
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
            Skill offerings you have proposed to learn from peers.
          </p>
        </div>

        {sentRequests.length > 0 ? (
          <div className="grid">
            {sentRequests.map((r) => (
              <div
                className="card"
                key={r._id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                      Target Skill
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        padding: "0.2rem 0.5rem",
                        borderRadius: "var(--radius-pill)",
                        backgroundColor: r.status === "accepted" ? "var(--color-success-bg)" : "var(--color-bg-subtle)",
                        color: r.status === "accepted" ? "var(--color-success-text)" : "var(--color-text-secondary)",
                      }}
                    >
                      {r.status}
                    </span>
                  </div>

                  <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>
                    {r.skill?.title || "Skill"}
                  </h4>
                  <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
                    Teacher: <strong>{r.owner?.name || "Peer"}</strong>
                  </p>
                </div>

                {r.status === "accepted" && (
                  <button
                    onClick={() => navigate(`/chat/${r._id}`)}
                    className="btn-primary"
                    style={{ width: "100%", padding: "0.45rem 0.75rem", fontSize: "0.8125rem" }}
                  >
                    Open Chat
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📤</div>
            <h3 className="empty-state-title">No sent requests</h3>
            <p className="empty-state-desc">
              Browse available community skills and send requests to begin exchanging.
            </p>
            <Link to="/browse" className="btn-secondary">
              Browse Skills
            </Link>
          </div>
        )}
      </section>

      {/* ================= ACTIVE CONTRACTS ================= */}
      <section style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
              Structured Exchange Agreements
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
              Active and completed barter contracts with tracked milestone completion.
            </p>
          </div>
          {contracts.length > 0 && (
            <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
              {contracts.length} agreements
            </span>
          )}
        </div>

        {contracts.length > 0 ? (
          <div className="grid">
            {contracts.map((c) => (
              <ContractCard
                key={c._id}
                contract={c}
                onComplete={handleComplete}
                onRequestCompletion={handleRequestCompletion}
                onCancel={handleCancel}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🤝</div>
            <h3 className="empty-state-title">No exchange agreements yet</h3>
            <p className="empty-state-desc">
              Once an exchange request is accepted, an accountable contract will be generated here.
            </p>
          </div>
        )}
      </section>

      {/* ================= MY SKILLS ================= */}
      <section style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
              My Published Skills
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
              Expertise you have published for other learners to discover.
            </p>
          </div>
          <button
            onClick={() => navigate("/post")}
            className="btn-ghost"
            style={{ fontSize: "0.85rem" }}
          >
            + Add Another
          </button>
        </div>

        {mySkills.length > 0 ? (
          <div className="grid">
            {mySkills.map((s) => (
              <div
                className="card"
                key={s._id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "var(--color-accent-emerald)",
                      display: "block",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {s.category || "Skill"}
                  </span>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>
                    {s.title}
                  </h4>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.5, marginBottom: "1rem" }}>
                    {s.description}
                  </p>
                </div>

                <div style={{ paddingTop: "0.75rem", borderTop: "1px solid var(--color-border-subtle)", display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => handleDeleteSkill(s._id)}
                    className="btn-danger"
                    style={{ fontSize: "0.78rem", padding: "0.35rem 0.75rem" }}
                  >
                    Delete Offering
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">💡</div>
            <h3 className="empty-state-title">No skills posted yet</h3>
            <p className="empty-state-desc">
              List what you know to begin matching with learners who can teach you in return.
            </p>
            <button onClick={() => navigate("/post")} className="btn-primary">
              Post Your First Skill
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

