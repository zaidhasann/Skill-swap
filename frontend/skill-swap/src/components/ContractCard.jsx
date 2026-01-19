export default function ContractCard({ contract, onComplete }) {
  return (
    <div className="card">
      <h4>{contract.skill.title}</h4>

      <p>
        <strong>Learner:</strong> {contract.learner.name}
      </p>

      <p>
        <strong>Duration:</strong> {contract.durationDays} days
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <span
          style={{
            color:
              contract.status === "completed" ? "green" : "#4f46e5",
          }}
        >
          {contract.status}
        </span>
      </p>

      {contract.status === "active" && (
        <button onClick={() => onComplete(contract._id)}>
          Mark as Completed
        </button>
      )}
    </div>
  );
}
