import { useState, useEffect } from 'react';
import styles from './footer.module.scss';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/Logo.png';
import str from '../assets/str.png';
import ph from '../assets/ph.png';
import ic from '../assets/Icon.png';
import ss from '../assets/strp.png';
import instagram from '../assets/instagramm.png';
import twitter from '../assets/twitter.png';
import dribbble from '../assets/dribbble.png';
import behance from '../assets/behance.png';
function Footer() {
    const [advantages, setAdvantages] = useState([]);
    const [services, setServices] = useState([]);
    const [projects, setProjects] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [faq, setFaq] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        question: '',
    });

    const sliderItems = [
        'MARKETING',
        'WEBSITE DESIGN',
        'BRANDING',
        'WEBSITE DEVELOPMENT',
        'MOBILE APP DEVELOPMENT',
        'DIGITAL',
    ];

    const footerSlider = [
        'FOLLOW US ON SOCIAL MEDIA',
        'FOLLOW US ON SOCIAL MEDIA',
        'FOLLOW US ON SOCIAL MEDIA',
        'FOLLOW US ON SOCIAL MEDIA',
        'FOLLOW US ON SOCIAL MEDIA',
        'FOLLOW US ON SOCIAL MEDIA',
    ];

    const infiniteFooterSlider = [...footerSlider, ...footerSlider, ...footerSlider];

    const toggleFaq = (id) => {
        setFaq((prev) =>
            prev.map((item) => (item.id === id ? { ...item, is_open: !item.is_open } : item))
        );
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3001/api/contact-question', formData);

            alert('Message sent successfully!');

            setFormData({
                name: '',
                email: '',
                question: '',
            });
        } catch (error) {
            console.error(error);

            alert('Error sending message');
        }
    };

    const infiniteSliderItems = [...sliderItems, ...sliderItems, ...sliderItems];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [advantagesRes, servicesRes, projectsRes, teamRes, testimonialsRes, faqRes] =
                    await Promise.all([
                        axios.get('http://localhost:3001/api/advantages'),
                        axios.get('http://localhost:3001/api/services'),
                        axios.get('http://localhost:3001/api/projects'),
                        axios.get('http://localhost:3001/api/team-members'),
                        axios.get('http://localhost:3001/api/testimonials'),
                        axios.get('http://localhost:3001/api/faq'),
                    ]);

                setAdvantages(advantagesRes.data);
                setServices(servicesRes.data);
                setProjects(projectsRes.data);
                setTeamMembers(teamRes.data);
                setTestimonials(testimonialsRes.data);
                setFaq(faqRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <section className={styles.sec6}>
                <div className={styles.testimonialsContainer}>
                    <div className={styles.testimonialsHeader}>
                        <p className={styles.testimonialsTitle}>TESTIMONIALS</p>
                        <div className={styles.testimonialsBtn}>
                            <button>
                                <img src={ic} alt="icon" />
                            </button>
                            <p>ALL TESTIMONIALS</p>
                        </div>
                    </div>
                    <div className={styles.testimonialsGrid}>
                        {testimonials.map((item) => (
                            <div key={item.id} className={styles.testimonialCard}>
                                <div className={styles.testimonialContent}>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <div className={styles.testimonialFooter}>
                                    <div className={styles.clientInfo}>
                                        <img src={item.client_photo_url} alt={item.client_name} />
                                        <div className={styles.clientText}>
                                            <h4>{item.client_name}</h4>
                                            <span>{item.client_position}</span>
                                        </div>
                                    </div>
                                    <button>
                                        <img src={ss} alt="icon" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className={styles.sec7}>
                <div className={styles.faqContainer}>
                    <div className={styles.faqHeader}>
                        <p className={styles.faqTitle}>FREQUENTLY ASKED QUESTIONS</p>

                        <div className={styles.viewAll}>
                            <button>
                                <img src={ic} alt="icon" />
                            </button>

                            <span>VIEW ALL</span>
                        </div>
                    </div>

                    <div className={styles.faqContent}>
                        <div className={styles.faqLeft}>
                            {faq.map((item) => (
                                <div key={item.id} className={styles.faqItem}>
                                    <div
                                        className={styles.faqQuestion}
                                        onClick={() => toggleFaq(item.id)}
                                    >
                                        <p>{item.question}</p>

                                        <button>{item.is_open ? '-' : '+'}</button>
                                    </div>

                                    {item.is_open && (
                                        <div className={styles.faqAnswer}>
                                            <p>{item.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className={styles.faqRight}>
                            <h3>ASK YOUR QUESTION</h3>

                            <form onSubmit={handleSubmit}>
                                <div className={styles.inputBlock}>
                                    <label>NAME</label>

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={styles.inputBlock}>
                                    <label>EMAIL</label>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={styles.inputBlock}>
                                    <label>YOUR QUESTION</label>

                                    <textarea
                                        name="question"
                                        placeholder="Enter Your Question Here ....."
                                        value={formData.question}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button type="submit" className={styles.sendBtn}>
                                    SEND YOUR MESSAGE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.sec8}>
                <div className={styles.readyBlock}>
                    <div className={styles.readyText}>
                        <h2>READY TO TRANSFORM YOUR DIGITAL PRESENCE?</h2>

                        <p>
                            Take the first step towards digital success with NexGen by your side.
                            Our team of experts is eager to craft tailored solutions that drive
                            growth for your business.
                        </p>
                    </div>

                    <button className={styles.touchBtn}>
                        GET IN TOUCH
                        <img src={ic} alt="icon" />
                    </button>
                </div>
            </section>
            <section className={styles.sec9}>
                <div className={styles.sliderContainerFooter}>
                    <div className={styles.sliderTrackFooter}>
                        {infiniteFooterSlider.map((item, index) => (
                            <div key={index} className={styles.sliderItemFooter}>
                                {item}

                                <span>•</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer>
                <div className={styles.footerLeft}>
                    <div className={styles.socialCard}>
                        <div className={styles.socialTop}>
                            <div className={styles.socialIcon}>
                                <img src={instagram} alt="" />
                            </div>

                            <button className={styles.socialArrow}>
                                <img src={ic} alt="" />
                            </button>
                        </div>

                        <h3>INSTAGRAM</h3>

                        <p>Share visually appealing snippets of our latest web projects.</p>
                    </div>

                    <div className={styles.socialCard}>
                        <div className={styles.socialTop}>
                            <div className={styles.socialIcon}>
                                <img src={twitter} alt="" />
                            </div>

                            <button className={styles.socialArrow}>
                                <img src={ic} alt="" />
                            </button>
                        </div>

                        <h3>TWITTER</h3>

                        <p>Tweet about interesting coding challenges you've overcome.</p>
                    </div>

                    <div className={styles.socialCard}>
                        <div className={styles.socialTop}>
                            <div className={styles.socialIcon}>
                                <img src={dribbble} alt="" />
                            </div>

                            <button className={styles.socialArrow}>
                                <img src={ic} alt="" />
                            </button>
                        </div>

                        <h3>DRIBBBLE</h3>

                        <p>Showcase design elements of our web projects.</p>
                    </div>

                    <div className={styles.socialCard}>
                        <div className={styles.socialTop}>
                            <div className={styles.socialIcon}>
                                <img src={behance} alt="" />
                            </div>

                            <button className={styles.socialArrow}>
                                <img src={ic} alt="" />
                            </button>
                        </div>

                        <h3>BEHANCE</h3>

                        <p>Create detailed presentations for our projects.</p>
                    </div>
                </div>

                <div className={styles.footerRight}>
                    <div className={styles.footerLinks}>
                        <div className={styles.linkColumn}>
                            <h4>Home</h4>

                            <a href="">Why Us</a>
                            <a href="">About Us</a>
                            <a href="">Testimonials</a>
                            <a href="">FAQ's</a>
                        </div>

                        <div className={styles.linkColumn}>
                            <h4>Services</h4>

                            <a href="">Web Development</a>
                            <a href="">App Development</a>
                            <a href="">Web Design</a>
                            <a href="">Digital Marketing</a>
                        </div>

                        <div className={styles.linkColumn}>
                            <h4>Projects</h4>

                            <a href="">Klothink</a>
                            <a href="">Zenith</a>
                            <a href="">Novus</a>
                            <a href="">Apex</a>
                        </div>

                        <div className={styles.linkColumn}>
                            <h4>Blogs</h4>

                            <a href="">Business</a>

                            <div className={styles.soon}>Soon</div>

                            <a href="">Design</a>

                            <div className={styles.soon}>Soon</div>
                        </div>
                    </div>

                    <div className={styles.newsletter}>
                        <div className={styles.newsletterText}>
                            <span>NEWSLETTER</span>

                            <h3>SUBSCRIBE TO OUR NEWSLETTER</h3>
                        </div>

                        <div className={styles.newsletterInput}>
                            <input type="email" placeholder="Enter your email" />

                            <button>
                                <img src={ss} alt="" />
                            </button>
                        </div>
                    </div>

                    <div className={styles.footerBottom}>
                        <p>© 2024 NextGen. All rights reserved.</p>

                        <div className={styles.bottomLinks}>
                            <a href="">Terms & Conditions</a>

                            <a href="">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
