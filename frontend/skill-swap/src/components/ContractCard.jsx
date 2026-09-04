import Avatar from "./Avatar";

const getStatusConfig = (status) => {
  switch (status) {
    case "active":
      return {
        bg: "var(--color-success-bg)",
        text: "var(--color-success-text)",
        border: "var(--color-success-border)",
        label: "Active Exchange",
      };
    case "completionRequested":
      return {
        bg: "var(--color-warning-bg)",
        text: "var(--color-warning-text)",
        border: "var(--color-warning-border)",
        label: "Pending Verification",
      };
    case "completed":
      return {
        bg: "var(--color-accent-soft)",
        text: "var(--color-brand-primary)",
        border: "var(--color-accent-border)",
        label: "Completed",
      };
    case "cancelled":
      return {
        bg: "var(--color-danger-bg)",
        text: "var(--color-danger-text)",
        border: "var(--color-danger-border)",
        label: "Cancelled",
      };
    default:
      return {
        bg: "var(--color-bg-subtle)",
        text: "var(--color-text-secondary)",
        border: "var(--color-border-subtle)",
        label: status,
      };
  }
};

export default function ContractCard({
  contract,
  onComplete,
  onRequestCompletion,
  onCancel,
}) {
  const statusConfig = getStatusConfig(contract.status);
  const createdDate = new Date(contract.createdAt);
  const endDate = new Date(
    createdDate.getTime() + (contract.durationDays || 14) * 24 * 60 * 60 * 1000
  );
  const today = new Date();
  const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
  const totalDays = contract.durationDays || 14;
  const progressPercent = Math.max(
    0,
    Math.min(100, ((totalDays - Math.max(0, daysRemaining)) / totalDays) * 100)
  );

  return (
    <div
      className="card"
      style={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderTop: `3px solid ${statusConfig.border}`,
      }}
    >
      <div>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1rem",
            gap: "0.75rem",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                margin: "0 0 0.35rem 0",
              }}
            >
              {contract.skill?.title || "Skill Exchange"}
            </h3>
            {contract.goal && (
              <p
                style={{
                  margin: 0,
                  color: "var(--color-text-secondary)",
                  fontSize: "0.875rem",
                  lineHeight: 1.4,
                }}
              >
                {contract.goal}
              </p>
            )}
          </div>

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.3rem 0.65rem",
              backgroundColor: statusConfig.bg,
              color: statusConfig.text,
              border: `1px solid ${statusConfig.border}`,
              borderRadius: "var(--radius-pill)",
              fontSize: "0.75rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {statusConfig.label}
          </span>
        </div>

        {/* Exchange Participants Connection Visualizer */}
        <div
          style={{
            padding: "0.875rem",
            backgroundColor: "var(--color-bg-page)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border-subtle)",
            marginBottom: "1.25rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Avatar name={contract.owner?.name || "Teacher"} size={32} />
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", display: "block" }}>Teacher</span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                  {contract.owner?.name || "Member"}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                color: "var(--color-accent-emerald)",
                fontSize: "0.8rem",
                fontWeight: 600,
                padding: "0.2rem 0.5rem",
                backgroundColor: "var(--color-accent-soft)",
                borderRadius: "var(--radius-pill)",
              }}
            >
              <span>⇄</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", textAlign: "right" }}>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", display: "block" }}>Learner</span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                  {contract.learner?.name || "Learner"}
                </span>
              </div>
              <Avatar name={contract.learner?.name || "Learner"} size={32} />
            </div>
          </div>
        </div>

        {/* Timeline & Progress */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
              fontSize: "0.8125rem",
            }}
          >
            <span style={{ color: "var(--color-text-muted)" }}>Exchange Timeline</span>
            <span
              style={{
                fontWeight: 600,
                color: daysRemaining >= 0 ? "var(--color-accent-emerald)" : "var(--color-danger-text)",
              }}
            >
              {daysRemaining >= 0 ? `${daysRemaining} days left` : "Period ended"}
            </span>
          </div>

          <div
            style={{
              width: "100%",
              height: "6px",
              backgroundColor: "var(--color-border-subtle)",
              borderRadius: "var(--radius-pill)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressPercent}%`,
                backgroundColor: "var(--color-accent-emerald)",
                borderRadius: "var(--radius-pill)",
                transition: "width var(--transition-base)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          paddingTop: "0.75rem",
          borderTop: "1px solid var(--color-border-subtle)",
        }}
      >
        {contract.status === "active" && (
          <>
            <button
              onClick={() => onRequestCompletion?.(contract._id)}
              className="btn-primary"
              style={{ flex: "1 1 auto", fontSize: "0.8125rem", padding: "0.5rem 0.75rem" }}
            >
              Request Completion
            </button>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to terminate this contract?")) {
                  onCancel?.(contract._id);
                }
              }}
              className="btn-ghost"
              style={{ fontSize: "0.8125rem", padding: "0.5rem 0.75rem" }}
            >
              Cancel
            </button>
          </>
        )}

        {contract.status === "completionRequested" && (
          <>
            <button
              onClick={() => onComplete?.(contract._id)}
              className="btn-primary"
              style={{
                flex: "1 1 auto",
                fontSize: "0.8125rem",
                padding: "0.5rem 0.75rem",
                backgroundColor: "var(--color-accent-emerald)",
              }}
            >
              Confirm Completed
            </button>
            <button
              onClick={() => onCancel?.(contract._id)}
              className="btn-ghost"
              style={{ fontSize: "0.8125rem", padding: "0.5rem 0.75rem" }}
            >
              Reject
            </button>
          </>
        )}

        {contract.status === "completed" && (
          <div
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "var(--color-accent-soft)",
              color: "var(--color-brand-primary)",
              textAlign: "center",
              fontSize: "0.8125rem",
              fontWeight: 500,
            }}
          >
            ✓ Exchanged on {contract.completedAt ? new Date(contract.completedAt).toLocaleDateString() : "Record"}
          </div>
        )}
      </div>
    </div>
  );
}

