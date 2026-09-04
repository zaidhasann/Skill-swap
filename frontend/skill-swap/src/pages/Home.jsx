import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSkills } from "../api/skillApi";
import SkillCard from "../components/SkillCard";
import "./Home.css";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const all = await getSkills();
        setFeatured(all.slice(0, 3));
      } catch (err) {
        console.error("Failed to load skills", err);
      }
    })();
  }, []);

  return (
    <div className="home-page-root">
      {/* ================= SECTION 1: HERO ================= */}
      <section className="home-hero-section">
        {/* Subtle architectural ambient background */}
        <div className="hero-ambient-layer" aria-hidden="true">
          <div className="ambient-radial-glow" />
          <div className="ambient-shape-tl" />
          <div className="ambient-shape-br" />
          <div className="ambient-dot-grid" />

          {/* Faint elegant connection trajectory from left to hero card */}
          <svg
            className="hero-subtle-trajectory"
            viewBox="0 0 1200 600"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 60 220 C 300 160, 520 280, 820 240"
              stroke="#14532D"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              strokeOpacity="0.22"
            />
            <circle cx="60" cy="220" r="4" fill="#238B57" fillOpacity="0.4" />
            <circle cx="440" cy="225" r="3.5" fill="#14532D" fillOpacity="0.3" />
            <circle cx="820" cy="240" r="5" fill="#238B57" fillOpacity="0.6" />
          </svg>
        </div>

        <div className="hero-container">
          <div className="hero-text-col">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              <span>Peer-to-Peer Knowledge Exchange</span>
            </div>

            <h1 className="hero-heading">
              Swap Skills.<br />Grow Together.
            </h1>

            <p className="hero-lead">
              Teach what you know, learn what you desire. SkillSwap connects motivated individuals for direct, reciprocal skill sharing without monetary friction.
            </p>

            <div className="hero-actions">
              <Link to="/browse" className="btn-primary hero-btn-main">
                Find Your Skill Swap
              </Link>
              <Link to="/signup" className="btn-secondary hero-btn-sub">
                Explore Platform
              </Link>
            </div>

            <div className="hero-credibility-row">
              <span><strong>100%</strong> barter-based</span>
              <span className="credibility-divider">•</span>
              <span><strong>Zero</strong> platform fees</span>
              <span className="credibility-divider">•</span>
              <span><strong>Direct</strong> collaborative learning</span>
            </div>
          </div>

          {/* Active Exchange Flow Card */}
          <div className="hero-card-col">
            <div className="exchange-flow-card">
              <div className="flow-card-header">
                <span className="flow-card-title">Active Exchange Flow</span>
                <span className="flow-card-badge">
                  <span className="compat-dot" />
                  98% Compatible
                </span>
              </div>

              <div className="flow-pair">
                {/* Node: You Teach */}
                <div className="flow-node flow-teach">
                  <div className="flow-node-role">YOU TEACH</div>
                  <div className="flow-node-title">Product Design</div>
                  <div className="flow-node-meta">UI/UX · Figma · Design Systems</div>
                </div>

                {/* Flow Bridge */}
                <div className="flow-bridge">
                  <span className="flow-arrow">↓</span>
                  <span className="flow-bridge-text">DIRECT RECIPROCAL EXCHANGE</span>
                  <span className="flow-arrow">↓</span>
                </div>

                {/* Node: You Learn */}
                <div className="flow-node flow-learn">
                  <div className="flow-node-role">YOU LEARN</div>
                  <div className="flow-node-title">Fullstack Development</div>
                  <div className="flow-node-meta">React · Node.js · APIs</div>
                </div>
              </div>

              <div className="flow-card-footer">
                <span className="flow-partner-info">
                  Matched partner: <strong>Alex Chen</strong>
                </span>
                <Link to="/browse" className="flow-link">
                  View details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: FEATURED OFFERINGS ================= */}
      {featured.length > 0 && (
        <section className="home-section offerings-section">
          <div className="section-container">
            <div className="section-header">
              <span className="section-eyebrow">Explore Network</span>
              <h2 className="section-title">Featured Skill Offerings</h2>
              <p className="section-subtitle">
                Discover verified expertise shared by peers in our learning network.
              </p>
            </div>

            <div className="featured-skills-grid">
              {featured.map((skill) => (
                <div key={skill._id || skill.id} className="featured-card-wrapper">
                  <SkillCard skill={skill} />
                </div>
              ))}
            </div>

            <div className="browse-all-wrap">
              <Link to="/browse" className="btn-secondary">
                View All Skills
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ================= SECTION 3: HOW IT WORKS ================= */}
      <section className="home-section how-it-works-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">Process</span>
            <h2 className="section-title">How SkillSwap Operates</h2>
            <p className="section-subtitle">
              A structured model designed for accountable, mutual educational growth.
            </p>
          </div>

          <div className="process-steps-grid">
            <div className="process-step-card">
              <span className="step-counter">01</span>
              <h3 className="step-card-title">Publish Capabilities</h3>
              <p className="step-card-text">
                List the skills you have mastery in and want to teach others, along with what you wish to master.
              </p>
            </div>

            <div className="process-step-card">
              <span className="step-counter">02</span>
              <h3 className="step-card-title">Discover &amp; Connect</h3>
              <p className="step-card-text">
                Filter by topics, find peer matches with complementary learning goals, and send structured swap proposals.
              </p>
            </div>

            <div className="process-step-card">
              <span className="step-counter">03</span>
              <h3 className="step-card-title">Exchange &amp; Verify</h3>
              <p className="step-card-text">
                Collaborate across structured exchange milestones and confirm completed knowledge sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: IN-DEMAND DISCIPLINES ================= */}
      <section className="home-section disciplines-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">Categories</span>
            <h2 className="section-title">In-Demand Disciplines</h2>
            <p className="section-subtitle">
              Popular areas of reciprocal study across our community.
            </p>
          </div>

          <div className="disciplines-pill-cloud">
            {[
              "Fullstack Engineering",
              "Interface Architecture",
              "Growth Strategy",
              "Data Analytics",
              "Technical Writing",
              "Cloud Infrastructure",
              "Motion Design",
              "Applied Machine Learning",
              "Brand Strategy",
              "API Architecture",
            ].map((topic) => (
              <Link
                to={`/browse?search=${encodeURIComponent(topic)}`}
                key={topic}
                className="discipline-tag-pill"
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: RECIPROCAL VALUE PRINCIPLES ================= */}
      <section className="home-section principles-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">Foundation</span>
            <h2 className="section-title">Built on Reciprocal Value</h2>
            <p className="section-subtitle">
              Why direct skill exchange produces deeper learning than passive courses.
            </p>
          </div>

          <div className="principles-grid">
            <div className="principle-card">
              <div className="principle-header">
                <span className="principle-indicator forest" />
                <h4 className="principle-title">No Financial Friction</h4>
              </div>
              <p className="principle-text">
                Trade purely on intellectual capital. High-value skills remain completely accessible.
              </p>
            </div>

            <div className="principle-card">
              <div className="principle-header">
                <span className="principle-indicator gold" />
                <h4 className="principle-title">1-on-1 Mentorship</h4>
              </div>
              <p className="principle-text">
                Receive tailored guidance and real feedback rather than generic video tutorials.
              </p>
            </div>

            <div className="principle-card">
              <div className="principle-header">
                <span className="principle-indicator forest" />
                <h4 className="principle-title">Accountable Progress</h4>
              </div>
              <p className="principle-text">
                Track exchange agreements with clear timelines and milestone confirmations.
              </p>
            </div>

            <div className="principle-card">
              <div className="principle-header">
                <span className="principle-indicator gold" />
                <h4 className="principle-title">High-Trust Network</h4>
              </div>
              <p className="principle-text">
                Connect with serious professionals and passionate practitioners focused on mutual growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: FINAL CTA ================= */}
      <section className="home-final-cta-section">
        <div className="section-container">
          <div className="cta-banner-card">
            <div className="cta-banner-ambient" aria-hidden="true" />
            <div className="cta-banner-content">
              <h2 className="cta-banner-heading">Ready to Expand Your Capabilities?</h2>
              <p className="cta-banner-subtext">
                Join an international network of practitioners exchanging real-world knowledge today.
              </p>
              <div className="cta-banner-action">
                <Link to="/signup" className="btn-cta-white">
                  Create Your Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
