import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="container">
          <h1>About Our School</h1>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              To provide a nurturing and rigorous educational environment that empowers students
              to become innovative thinkers, responsible citizens, and lifelong learners prepared
              to make meaningful contributions to society.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Vision</h2>
            <p>
              We envision a school where every student reaches their full potential through
              quality education, mentorship, and character development in a safe, inclusive
              and inspiring community.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Values</h2>
            <ul className="values-list">
              <li><strong>Excellence:</strong> Striving for the highest standards in academics and conduct</li>
              <li><strong>Integrity:</strong> Promoting honesty, fairness, and ethical behavior</li>
              <li><strong>Innovation:</strong> Encouraging creativity and forward-thinking solutions</li>
              <li><strong>Inclusivity:</strong> Celebrating diversity and ensuring equal opportunities</li>
              <li><strong>Respect:</strong> Fostering a culture of mutual respect and cooperation</li>
            </ul>
          </div>

          <div className="about-section">
            <h2>Our Programs</h2>
            <p>
              We offer comprehensive programs from 8th to 10th standard covering:
            </p>
            <div className="programs">
              <div className="program-card">
                <h3>Academic Excellence</h3>
                <p>In-depth curriculum with focus on science, mathematics, and humanities</p>
              </div>
              <div className="program-card">
                <h3>Skill Development</h3>
                <p>Practical training and hands-on learning experiences</p>
              </div>
              <div className="program-card">
                <h3>Sports & Activities</h3>
                <p>Comprehensive extracurricular programs for holistic development</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
