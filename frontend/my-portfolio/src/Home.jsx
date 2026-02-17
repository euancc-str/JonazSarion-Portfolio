import { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Testimonials from './Testimonials'; // Add this line
import { useNavigate } from 'react-router-dom'; // Add this
function Home({ toProfile }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: ' ', email: ' ' });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    useEffect(() => {
        fetch('http://localhost:8080/api/user-info', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.name) {
                    setUser(data);
                    setIsLoggedIn(true);
                    setFormData(prev => ({
                        ...prev,
                        name: data.name,
                        email: data.email
                    }));
                } else {
                    setIsLoggedIn(false);
                }
            })
            .catch(err => {
                console.log("Error ", err);
                setIsLoggedIn(false);
            });
    }, []);


    useEffect(() => {
        const handleScroll = () => {

            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (elementTop < windowHeight - 100) {
                    element.classList.add('visible');
                }
            });


            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const barTop = bar.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (barTop < windowHeight - 100) {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                }
            });


            const sections = document.querySelectorAll('section');
            const navItems = document.querySelectorAll('.nav-links a');
            let scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === `#${sectionId}`) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);



    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            return;
        }

        const payload = {
            name: formData.name,
            email: formData.email,
            message: formData.message
        };
        fetch('http://localhost:8080/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            credentials: 'include'
        })
            .then(async (res) => {
                const text = await res.text();
                if (res.ok) {
                    alert("✅ " + text);
                    setFormData(prev => ({ ...prev, message: '' }));
                } else {
                    alert("❌ Error: " + text);
                }
            })
            .catch(err => {
                console.error("Fetch error:", err);
                alert("Could not connect to the server.");
            });
    };

    const handleRatingSubmit = (e) => {
        e.preventDefault();


        if (!isLoggedIn) {
            navigate('/profile');
            return;
        }

        if (rating === 0) {
            alert("DEBUG: Rating is 0. Did you click a star?");
            return;
        }
        const payload = {
            rating: rating,
        };
        fetch('http://localhost:8080/rating', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            credentials: 'include'
        })
            .then((res) => {
                if (res.ok) {
                    alert("✅ Thank you for rating me!");
                    setRating(0);
                } else {
                    alert("❌ Rating failed. You might need to log in again.");
                }
            })
            .catch(err => console.log("Error : ", err));
    };
    return (
        <div className="portfolio-wrapper">
            {/* Header / Navigation Bar */}
            <header>
                <div className="container">
                    <nav className="navbar">
                        <a href="#home" className="logo">
                            <i className="fas fa-leaf" style={{ color: 'var(--primary-color)' }}></i> Jonaz<span>Sarion</span>
                        </a>

                        {/* Mobile Menu Toggle */}
                        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                            <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
                            <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About Me</a></li>
                            <li><a href="#personal-info" onClick={() => setIsMenuOpen(false)}>Personal Info</a></li>
                            <li><a href="#education" onClick={() => setIsMenuOpen(false)}>Education</a></li>
                            <li><a href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</a></li>
                            <li><a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
                            <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>

                            {/* BUTTON TO SWITCH TO PROFILE CARD */}
                            <li> {isLoggedIn ? <Link to="/profile" className="profile-nav-btn" style={{ textDecoration: 'none' }}>
                                <i className="fas fa-id-card"></i> Your Profile
                            </Link> : <Link to="/profile" className="profile-nav-btn" style={{ textDecoration: 'none' }}>
                                <i className="fas fa-id-card"></i> Log in
                            </Link>}

                            </li>
                        </ul>

                        <button className="hamburger" onClick={toggleMenu}>
                            <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
                        </button>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero" id="home">
                <div className="container">
                    <div className="hero-content fade-in">
                        <h1>Jonaz Euan A. Sarion</h1>
                        <p className="title">2nd Year BSIT Student & Aspiring Developer</p>
                        <p>Passionate about creating elegant solutions to complex problems through code.
                            Currently expanding my expertise in full-stack development and system design.</p>
                        <div className="hero-btns">
                            <a href="#projects" className="btn">
                                <i className="fas fa-rocket"></i> View Projects
                            </a>
                            <a href="#contact" className="btn btn-outline">
                                <i className="fas fa-envelope"></i> Get In Touch
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Me Section */}
            <section id="about">
                <div className="container">
                    <div className="section-title fade-in">
                        <h2>About Me</h2>
                        <p>Learn more about my journey, passions, and aspirations in technology</p>
                    </div>
                    <div className="about-content">
                        <div className="about-text fade-in">
                            <p>Hello! I'm Jonaz Euan A. Sarion, a dedicated 2nd-year BSIT student with a
                                strong passion for technology and problem-solving. My journey in Information
                                Technology began with curiosity about how software and systems work, and it
                                has grown into a commitment to building efficient and user-friendly applications.</p>
                            <p>My interests span across web development, system design, and database
                                management. I enjoy creating clean, functional interfaces and robust
                                back-end systems. I'm particularly fascinated by how different technologies
                                can be integrated to solve real-world problems.</p>
                            <p>When I'm not coding, I enjoy reading tech blogs and exploring new frameworks and tools that can
                                enhance my development skills.</p>
                        </div>
                        <div className="about-image fade-in">
                            <div className="profile-image">
                                {/* Make sure 'jonaz.jpg' is in your public folder */}
                                <img src="jonaz.jpg" alt="Jonaz Sarion" className="my-photo" />
                                <div className="student-badge">
                                    <i className="fas fa-graduation-cap"></i> BSIT Student
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Personal Info Section */}
            <section id="personal-info" className="section-bg">
                <div className="container">
                    <div className="section-title fade-in">
                        <h2>Personal Information</h2>
                        <p>Get to know more about me personally and professionally</p>
                    </div>
                    <div className="personal-info-container">
                        <div className="info-card card fade-in">
                            <div className="info-icon">
                                <i className="fas fa-user-circle"></i>
                            </div>
                            <h3>Basic Details</h3>
                            <ul className="info-list">
                                <li><span className="info-label">Age:</span><span className="info-value">20</span></li>
                                <li><span className="info-label">Location:</span><span className="info-value">Philippines</span></li>
                                <li><span className="info-label">Email:</span><span className="info-value">jonazesarion03012005@gmail.com</span></li>
                                <li><span className="info-label">Phone:</span><span className="info-value">+63 9634470406</span></li>
                                <li><span className="info-label">Status:</span><span className="info-value">BSIT Student</span></li>
                            </ul>
                        </div>

                        <div className="info-card card fade-in">
                            <div className="info-icon"><i className="fas fa-star"></i></div>
                            <h3>Interests</h3>
                            <ul className="info-list">
                                <li>Web Development</li>
                                <li>System Architecture</li>
                                <li>Database Design</li>
                            </ul>
                        </div>

                        <div className="info-card card fade-in">
                            <div className="info-icon"><i className="fas fa-language"></i></div>
                            <h3>Languages</h3>
                            <ul className="info-list">
                                <li><span className="info-label">English:</span><span className="info-value">Fluent</span></li>
                                <li><span className="info-label">Filipino:</span><span className="info-value">Native</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section id="education">
                <div className="container">
                    <div className="section-title fade-in">
                        <h2>Education</h2>
                        <p>My academic journey and achievements</p>
                    </div>
                    <div className="education-timeline">
                        <div className="education-item fade-in">
                            <div className="education-year">2023 - Present</div>
                            <div className="card">
                                <h3>Bachelor of Science in Information Technology</h3>
                                <p><strong>Camarines Norte State College</strong></p>
                                <p><strong>Year Level:</strong> 2nd Year</p>
                                <p><strong>Relevant Coursework:</strong> Web Development, Database Management, Object-Oriented Programming, Systems Analysis and Design, Data Structures</p>
                            </div>
                        </div>
                        <div className="education-item fade-in">
                            <div className="education-year">2021 - 2023</div>
                            <div className="card">
                                <h3>Senior High School - STEM Track</h3>
                                <p><strong>La Consolacion College of Daet</strong></p>
                                <p><strong>Achievements:</strong> With Honors</p>
                                <p><strong>Focus:</strong> Mathematics, Physics, Research Methodology</p>
                            </div>
                        </div>
                        <div className="education-item fade-in">
                            <div className="education-year">2018 - 2022</div>
                            <div className="card">
                                <h3>Junior High School</h3>
                                <p><strong>La Consolacion College of Daet</strong></p>
                                <p><strong>Achievements:</strong> Completed Junior High School Education</p>
                            </div>
                        </div>
                        <div className="education-item fade-in">
                            <div className="education-year">2012 - 2018</div>
                            <div className="card">
                                <h3>Elementary School</h3>
                                <p><strong>CNSC - Abaño Campus</strong></p>
                                <p><strong>Achievements:</strong> Completed Elementary School Education</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="section-bg">
                <div className="container">
                    <div className="section-title fade-in">
                        <h2>My Skills</h2>
                        <p>Technologies and tools I work with</p>
                    </div>
                    <div className="skills-grid">
                        {/* Programming */}
                        <div className="skill-category card fade-in">
                            <h3><i className="fas fa-code"></i> Programming</h3>
                            <div className="skill-item">
                                <div className="skill-header"><span className="skill-name">Java</span><span className="skill-level">Intermediate</span></div>
                                <div className="skill-bar"><div className="skill-progress" data-width="75"></div></div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-header"><span className="skill-name">PHP</span><span className="skill-level">Beginner</span></div>
                                <div className="skill-bar"><div className="skill-progress" data-width="30"></div></div>
                            </div>
                            <div className="accent-line"></div>
                            <div className="skill-list">
                                <p><i className="fas fa-check-circle" style={{ color: 'var(--primary-color)' }}></i> OOP</p>
                                <p><i className="fas fa-check-circle" style={{ color: 'var(--primary-color)' }}></i> Data Structures & Algorithms</p>
                            </div>
                        </div>

                        {/* Web Technologies */}
                        <div className="skill-category card fade-in">
                            <h3><i className="fas fa-globe"></i> Web Technologies</h3>
                            <div className="skill-item">
                                <div className="skill-header"><span className="skill-name">HTML/CSS</span><span className="skill-level">Intermediate</span></div>
                                <div className="skill-bar"><div className="skill-progress" data-width="60"></div></div>
                            </div>
                            <div className="accent-line"></div>
                            <div className="skill-list">
                                <p><i className="fas fa-check-circle" style={{ color: 'var(--primary-color)' }}></i> Responsive Web Design</p>
                                <p><i className="fas fa-check-circle" style={{ color: 'var(--primary-color)' }}></i> CSS Grid & Flexbox</p>
                            </div>
                        </div>

                        {/* Database */}
                        <div className="skill-category card fade-in">
                            <h3><i className="fas fa-database"></i> Database</h3>
                            <div className="skill-item">
                                <div className="skill-header"><span className="skill-name">MySQL</span><span className="skill-level">Intermediate</span></div>
                                <div className="skill-bar"><div className="skill-progress" data-width="70"></div></div>
                            </div>
                            <div className="accent-line"></div>
                            <div className="skill-list">
                                <p><i className="fas fa-check-circle" style={{ color: 'var(--primary-color)' }}></i> Database Design</p>
                                <p><i className="fas fa-check-circle" style={{ color: 'var(--primary-color)' }}></i> SQL Queries</p>
                            </div>
                        </div>

                        {/* Tools */}
                        <div className="skill-category card fade-in">
                            <h3><i className="fas fa-tools"></i> Tools & Software</h3>
                            <div className="skill-item">
                                <div className="skill-header"><span className="skill-name">VS Code</span><span className="skill-level">Intermediate</span></div>
                                <div className="skill-bar"><div className="skill-progress" data-width="70"></div></div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-header"><span className="skill-name">Figma</span><span className="skill-level">Beginner</span></div>
                                <div className="skill-bar"><div className="skill-progress" data-width="60"></div></div>
                            </div>
                        </div>

                        {/* Soft Skills */}
                        <div className="skill-category card fade-in">
                            <h3><i className="fas fa-users"></i> Soft Skills</h3>
                            <div className="skill-item">
                                <div className="skill-header"><span className="skill-name">Problem Solving</span><span className="skill-level">Advanced</span></div>
                                <div className="skill-bar"><div className="skill-progress" data-width="85"></div></div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-header"><span className="skill-name">Team Collaboration</span><span className="skill-level">Intermediate</span></div>
                                <div className="skill-bar"><div className="skill-progress" data-width="80"></div></div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-header"><span className="skill-name">Communication</span><span className="skill-level">Intermediate</span></div>
                                <div className="skill-bar"><div className="skill-progress" data-width="75"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects">
                <div className="container">
                    <div className="section-title fade-in">
                        <h2>My Projects</h2>
                        <p>Some of my recent work and personal projects</p>
                    </div>
                    <div className="projects-grid">
                        {/* Project 1 */}
                        <div className="project-card card fade-in">
                            <div className="project-img">
                                <img src="learnmmw.jpg" alt="Learn MMW" />
                            </div>
                            <div className="project-info">
                                <h3>Learn MMW App</h3>
                                <p>An educational application built in Java designed to help students master "Mathematics in the Modern World."</p>
                                <div className="project-tags">
                                    <span className="project-tag">Java</span>
                                    <span className="project-tag">OOP</span>
                                    <span className="project-tag">Education</span>
                                </div>
                            </div>
                        </div>

                        {/* Project 2 */}
                        <div className="project-card card fade-in">
                            <div className="project-img"><i className="fas fa-running"></i></div>
                            <div className="project-info">
                                <h3>Emergency Escape</h3>
                                <p>A pathfinding strategy game where players navigate obstacles to reach the "Teacher" safe zone.</p>
                                <div className="project-tags">
                                    <span className="project-tag">Java</span>
                                    <span className="project-tag">Pathfinding</span>
                                    <span className="project-tag">Logic</span>
                                </div>
                            </div>
                        </div>

                        {/* Project 3 */}
                        <div className="project-card card fade-in">
                            <div className="project-img">
                                <img src="unggoy.png" alt="Unggoy Unggoyan" />
                            </div>
                            <div className="project-info">
                                <h3>Unggoy Unggoyan</h3>
                                <p>A digital recreation of the classic Filipino card game (Old Maid) with AI opponents.</p>
                                <div className="project-tags">
                                    <span className="project-tag">Java Swing</span>
                                    <span className="project-tag">Game Dev</span>
                                </div>
                            </div>
                        </div>

                        {/* Project 4 */}
                        <div className="project-card card fade-in">
                            <div className="project-img">
                                <img src="queue.png" alt="Queue Game" />
                            </div>
                            <div className="project-info">
                                <h3>Queue Cashier Game</h3>
                                <p>A simulation game using Queue data structures to manage fans getting tickets.</p>
                                <div className="project-tags">
                                    <span className="project-tag">Java</span>
                                    <span className="project-tag">DS & Algo</span>
                                </div>
                            </div>
                        </div>

                        {/* Project 5 */}
                        <div className="project-card card fade-in">
                            <div className="project-img">
                                <img src="lib.png" alt="Library System" />
                            </div>
                            <div className="project-info">
                                <h3>Library Management System</h3>
                                <p>A robust system for tracking books using `BufferedWriter` for secure file handling.</p>
                                <div className="project-tags">
                                    <span className="project-tag">Java</span>
                                    <span className="project-tag">File I/O</span>
                                </div>
                            </div>
                        </div>

                        {/* Project 6 */}
                        <div className="project-card card fade-in">
                            <div className="project-img">
                                <img src="brgysystem.png" alt="Barangay System" />
                            </div>
                            <div className="project-info">
                                <h3>Barangay Management System</h3>
                                <p>A record-keeping system for local barangays using Java Swing.</p>
                                <div className="project-tags">
                                    <span className="project-tag">Java Swing</span>
                                    <span className="project-tag">CRUD</span>
                                </div>
                            </div>
                        </div>

                        {/* Project 7 */}
                        <div className="project-card card fade-in">
                            <div className="project-img">
                                <img src="ecomm.png" alt="E-commerce" />
                            </div>
                            <div className="project-info">
                                <h3>E-commerce Platform</h3>
                                <p>A fully functional online shopping system built from scratch with PHP & MySQL.</p>
                                <div className="project-tags">
                                    <span className="project-tag">PHP</span>
                                    <span className="project-tag">MySQL</span>
                                    <span className="project-tag">Web Dev</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Testimonials />
            {/* Rate Me Section */}
            <section id="rate-me" className="section-bg" style={{ textAlign: 'center', padding: '50px 0' }}>
                <div className="container">
                    <div className="section-title fade-in">
                        <h2>Rate My Work</h2>
                        <p>How would you rate my portfolio?</p>
                    </div>

                    <div className="rating-wrapper fade-in" style={{ background: 'white', padding: '30px', borderRadius: '15px', display: 'inline-block', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>

                        {/* 5-Star Logic */}
                        <div style={{ fontSize: '2.5rem', marginBottom: '20px', cursor: 'pointer' }}>
                            {[...Array(5)].map((star, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <i
                                        key={index}
                                        className="fas fa-star"
                                        style={{
                                            color: ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9',
                                            marginRight: '10px',
                                            transition: 'color 0.2s'
                                        }}
                                        onClick={() => setRating(ratingValue)}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                    ></i>
                                );
                            })}
                        </div>

                        <p style={{ marginBottom: '15px', fontWeight: 'bold', color: '#555' }}>
                            {rating > 0 ? `You rated ${rating} Stars!` : "Click a star to rate"}
                        </p>

                        <button
                            className="btn"
                            onClick={handleRatingSubmit}
                            style={{ opacity: isLoggedIn ? 1 : 1 }} /* Make it fully visible */
                        >

                            <i className="fas fa-check-circle"></i> {isLoggedIn ? " Submit Rating" : "Hey Log in first!"}
                        </button>

                        {!isLoggedIn && (
                            <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#dc3545' }}>
                                * You must be logged in to rate.
                            </p>
                        )}
                    </div>
                </div>
            </section>
            {/* Contact Section */}
            <section id="contact" className="section-bg">
                <div className="container">
                    <div className="section-title fade-in">
                        <h2>Contact Me</h2>
                        <p>Let's connect and build something amazing together</p>
                    </div>
                    <div className="contact-container">
                        <div className="contact-form fade-in">
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    disabled={!isLoggedIn}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={!isLoggedIn}
                                    required />
                                <textarea name="message"
                                    placeholder={isLoggedIn ? "Your Message" : "Please Log in to send a message"}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    disabled={!isLoggedIn}
                                    required></textarea>
                                {isLoggedIn ? (

                                    <button type="submit" className="btn">
                                        <i className="fas fa-paper-plane"></i> Send Message
                                    </button>
                                ) : (

                                    <a
                                        href="http://localhost:5173/profile"
                                        className="btn"
                                        style={{ textAlign: 'center', textDecoration: 'none', display: 'inline-block' }}
                                    >
                                        <i className="fas fa-sign-in-alt"></i> Login to Send Message
                                    </a>
                                )}
                            </form>
                        </div>
                        <div className="contact-info fade-in">
                            <div className="contact-item">
                                <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                                <div>
                                    <h3>Email</h3>
                                    <p>jonazesarion03012005@gmail.com</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon"><i className="fas fa-phone"></i></div>
                                <div>
                                    <h3>Phone</h3>
                                    <p>+63 963 447 0406</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                                <div>
                                    <h3>Location</h3>
                                    <p>Philippines</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon"><i className="fas fa-clock"></i></div>
                                <div>
                                    <h3>Availability</h3>
                                    <p>Open for internships, projects, and collaborations</p>
                                </div>
                            </div>
                            <div className="social-links">
                                <a href="https://www.facebook.com/jonaz.sarion" className="social-link">
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a href="https://github.com/euancc-str" className="social-link">
                                    <i className="fab fa-github"></i>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-about">
                            <div className="footer-logo">
                                <i className="fas fa-leaf" style={{ color: 'var(--primary-lighter)', marginRight: '8px' }}></i>JonazSarion
                            </div>
                            <p style={{ color: '#e5e7eb' }}>A passionate BSIT student focused on creating meaningful digital experiences through code and design.</p>
                        </div>
                        <div className="footer-links">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><a href="#home">Home</a></li>
                                <li><a href="#about">About Me</a></li>
                                <li><a href="#projects">Projects</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </div>
                        <div className="footer-contact">
                            <h3>Contact Info</h3>
                            <p style={{ color: '#e5e7eb' }}><i className="fas fa-envelope "></i> jonazesarion03012005@gmail.com</p>
                            <p style={{ color: '#e5e7eb' }}><i className="fas fa-map-marker-alt"></i> Philippines</p>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p style={{ color: '#e5e7eb' }}>&copy; 2025 Jonaz Euan A. Sarion. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;