import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SkillCard from "../components/SkillCard";
import { getSkills } from "../api/skillApi";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";
import Toast from "../components/Toast";
import { sendSkillRequest } from "../api/requestApi";
import bgBrowser from "../assets/bgbrowse.png"; 

export default function Browse() {
  const [skills, setSkills] = useState([]);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    (async () => {
      try {
        const data = await getSkills(search);
        setSkills(data);
      } catch {
        setToast({ type: "error", message: "Failed to load skills" });
      }
    })();
  }, [search]);

  const requestSkill = (skill) => {
    if (!user) {
      setToast({ type: "error", message: "Please login to request a skill." });
      return;
    }
    setSelected(skill);
  };

  const sendRequest = async () => {
    try {
      await sendSkillRequest(selected._id);
      setToast({ type: "success", message: "Request sent!" });
      setSelected(null);
    } catch {
      setToast({ type: "error", message: "Request failed" });
    }
  };

  return (
    <section className="browse" style={{
            backgroundImage: `url(${bgBrowser})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }} >
      <h2>{search ? `Results for "${search}"` : "Available Skill Swaps"}</h2>

      <div className="grid">
        {skills.length ? (
          skills.map((s) => (
            <SkillCard
              key={s._id}
              skill={s}
              onRequest={requestSkill}
            />
          ))
        ) : (
          <p>No skills found.</p>
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        <h3>Request: {selected?.title}</h3>
        <p>Contact the user to arrange the skill exchange.</p>
        <button onClick={sendRequest}>Send Request</button>
      </Modal>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
