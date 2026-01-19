import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSkills } from "../api/skillApi";
import SkillCard from "../components/SkillCard";
import bgHome from "../assets/bghome.png"; // your image
import "./Home.css";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const all = await getSkills();
        setFeatured(all.slice(0, 3));
      } catch (err) {
        console.error("Failed to load skills");
      }
    })();
  }, []);

  return (
    <section
      className="home"
      style={{
        backgroundImage: `url(${bgHome})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2>Exchange Skills. Learn Together. 🚀</h2>

      <p>
        Find people who can teach what you want to learn — and share your skills
        in return.
      </p>

      <Link to="/browse">
        <button className="cta-btn">Browse Skills</button>
      </Link>

      <h3 style={{ marginTop: 24 }}>Featured Skills</h3>

      <div className="scroll-wrapper">
  <div className="scroll-track">
    {[...featured, ...featured].map((s, i) => (
      <div className="scroll-card" key={`${s._id || s.id}-${i}`}>
        <SkillCard skill={s} />
      </div>
    ))}
  </div>
</div>

    </section>
  );
}
