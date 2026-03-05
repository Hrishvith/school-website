import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Welcome to Our School</h1>
          <p>Excellence in Education | Building Future Leaders</p>
          <div className="quick-links">
            <Link to="/gallery">View Gallery</Link>
            <Link to="/notes">Access Notes</Link>
            <Link to="/about">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="intro">
        <div className="container">
          <h2>About Our Institution</h2>
          <p>
            We are dedicated to providing quality education to students from 8th to 10th standard.
            Our experienced faculty and modern infrastructure create an ideal learning environment.
          </p>
          <div className="features">
            <div className="feature">
              <h3>Expert Teachers</h3>
              <p>Experienced educators committed to student success</p>
            </div>
            <div className="feature">
              <h3>Modern Facilities</h3>
              <p>State-of-the-art classrooms and learning resources</p>
            </div>
            <div className="feature">
              <h3>Digital Learning</h3>
              <p>Access study materials and notes anytime, anywhere</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
