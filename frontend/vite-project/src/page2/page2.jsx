import { useState, useEffect } from 'react';
import styles from './page2.module.scss';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import str from '../assets/str.png';
import logo from '../assets/Logo.png';
import ic from '../assets/Icon.png';
import ss from '../assets/strp.png';
import instagram from '../assets/instagramm.png';
import twitter from '../assets/twitter.png';
import dribbble from '../assets/dribbble.png';
import behance from '../assets/behance.png';
import { im } from '../Photo.js';
function Page2() {
    const [count, setCount] = useState(0);
    const [advantages, setAdvantages] = useState([]);
    const [services, setServices] = useState([]);
    const [projects, setProjects] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [faq, setFaq] = useState([]);
    const [successStories, setSuccessStories] = useState([]);
    const [activeTabs, setActiveTabs] = useState({});

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
                const [
                    advantagesRes,
                    servicesRes,
                    projectsRes,
                    teamRes,
                    testimonialsRes,
                    faqRes,
                    portfolioCasesRes,
                ] = await Promise.all([
                    axios.get('http://localhost:3001/api/advantages'),
                    axios.get('http://localhost:3001/api/services'),
                    axios.get('http://localhost:3001/api/projects'),
                    axios.get('http://localhost:3001/api/team-members'),
                    axios.get('http://localhost:3001/api/testimonials'),
                    axios.get('http://localhost:3001/api/faq'),
                    axios.get('http://localhost:3001/api/portfolio-cases'),
                ]);

                setAdvantages(advantagesRes.data);
                setServices(servicesRes.data);
                setProjects(projectsRes.data);
                setTeamMembers(teamRes.data);
                setTestimonials(testimonialsRes.data);
                setFaq(faqRes.data);
                setSuccessStories(portfolioCasesRes.data);

                const tabs = {};
                portfolioCasesRes.data.forEach((item) => {
                    tabs[item.case_id] = 'solution';
                });
                setActiveTabs(tabs);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleTabChange = (storyId, tabName) => {
        setActiveTabs((prev) => ({
            ...prev,
            [storyId]: tabName,
        }));
    };
    return (
        <>
            <section className={styles.sec1}>
                <div className={styles.left}>
                    <div className={styles.ob}>
                        <div className={styles.verh}>
                            <h1>OUR COMPREHENSIVE</h1>
                            <div className={styles.or}>
                                <img src={str} alt="arrow" />
                                <p>START A PROJECT</p>
                            </div>
                        </div>
                        <div className={styles.niz}>
                            <h2>DIGITAL SOLUTIONS</h2>
                        </div>
                        <p className={styles.pp}>
                            At NexGen, we believe in the transformative power of digital solutions.
                            Our team of experts is dedicated to helping <br />
                            businesses like yours thrive in the fast-paced digital landscape.
                        </p>
                    </div>

                    <div className={styles.sliderContainer}>
                        <div className={styles.sliderTrack}>
                            {infiniteSliderItems.map((item, index) => (
                                <div key={index} className={styles.sliderItem}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.phot}>
                        <div className={styles.ss}>
                            <button>
                                <img src={ic} />
                            </button>
                            <p>View Blog</p>
                        </div>
                        <div className={styles.ww}>
                            <p>WEB DEVELOPMENT.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.sec4}>
                <div className={styles.servicesContainer}>
                    <div className={styles.servicesHeader}>
                        <p className={styles.serv}>OUR SERVICES</p>
                    </div>

                    <div className={styles.mainGridWrapper}>
                        <div className={styles.servicesGrid}>
                            {services.map((service) => (
                                <div key={service.id} className={styles.serviceCard}>
                                    <div className={styles.book}>
                                        <div className={styles.serviceslearn1}>
                                            {service.icon_url && (
                                                <div className={styles.serviceIcon}>
                                                    <img
                                                        src={service.icon_url}
                                                        alt={service.title}
                                                    />
                                                </div>
                                            )}
                                            <h3 className={styles.serviceTitle}>{service.title}</h3>
                                        </div>

                                        <div className={styles.servicelearn}>
                                            <button className={styles.strel}>
                                                <img src={ic} alt="arrow" />
                                            </button>
                                            <p className={styles.serviceButton}>
                                                {service.button_text}
                                            </p>
                                        </div>
                                    </div>

                                    <p className={styles.serviceDescription}>
                                        {service.description}
                                    </p>
                                    <div className={styles.servicePrice}>{service.price}</div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.projectsContainer}>
                            <div className={styles.projectsRow}>
                                <div className={styles.rowHeader}>
                                    <h4 className={styles.rowTitle}>WEB DESIGN PROJECTS</h4>
                                    <div className={styles.viewAllBlock}>
                                        <button className={styles.rowArrow}>
                                            <img src={ic} alt="arrow" />
                                        </button>
                                        <span className={styles.viewAllText}>VIEW ALL</span>
                                    </div>
                                </div>
                                <div className={styles.imagesGrid}>
                                    <div className={styles.projectImageWrapper}>
                                        <img
                                            src={im.pr1}
                                            alt="Project 1"
                                            className={styles.projectImg}
                                        />
                                    </div>
                                    <div className={styles.projectImageWrapper}>
                                        <img
                                            src={im.pr11}
                                            alt="Project 2"
                                            className={styles.projectImg}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.projectsRow}>
                                <div className={styles.rowHeader}>
                                    <h4 className={styles.rowTitle}>
                                        MOBILE APP DEVELOPMENT PROJECTS
                                    </h4>
                                    <div className={styles.viewAllBlock}>
                                        <button className={styles.rowArrow}>
                                            <img src={ic} alt="arrow" />
                                        </button>
                                        <span className={styles.viewAllText}>VIEW ALL</span>
                                    </div>
                                </div>
                                <div className={styles.imagesGrid}>
                                    <div className={styles.projectImageWrapper}>
                                        <img
                                            src={im.pr2}
                                            alt="Project 3"
                                            className={styles.projectImg}
                                        />
                                    </div>
                                    <div className={styles.projectImageWrapper}>
                                        <img
                                            src={im.pr22}
                                            alt="Project 4"
                                            className={styles.projectImg}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.projectsRow}>
                                <div className={styles.rowHeader}>
                                    <h4 className={styles.rowTitle}>WEB DEVELOPMENT PROJECTS</h4>
                                    <div className={styles.viewAllBlock}>
                                        <button className={styles.rowArrow}>
                                            <img src={ic} alt="arrow" />
                                        </button>
                                        <span className={styles.viewAllText}>VIEW ALL</span>
                                    </div>
                                </div>
                                <div className={styles.imagesGrid}>
                                    <div className={styles.projectImageWrapper}>
                                        <img
                                            src={im.pr3}
                                            alt="Project 5"
                                            className={styles.projectImg}
                                        />
                                    </div>
                                    <div className={styles.projectImageWrapper}>
                                        <img
                                            src={im.pr33}
                                            alt="Project 6"
                                            className={styles.projectImg}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.projectsRow}>
                                <div className={styles.rowHeader}>
                                    <h4 className={styles.rowTitle}>DIGITAL MARKETING PROJECTS</h4>
                                    <div className={styles.viewAllBlock}>
                                        <button className={styles.rowArrow}>
                                            <img src={ic} alt="arrow" />
                                        </button>
                                        <span className={styles.viewAllText}>VIEW ALL</span>
                                    </div>
                                </div>
                                <div className={styles.imagesGrid}>
                                    <div className={styles.projectImageWrapper}>
                                        <img
                                            src={im.pr4}
                                            alt="Project 7"
                                            className={styles.projectImg}
                                        />
                                        <button className={styles.openProjectButton}>
                                            <img src={ic} alt="arrow" className={styles.openIcon} />
                                            OPEN PROJECT
                                        </button>
                                    </div>
                                    <div className={styles.projectImageWrapper}>
                                        <img
                                            src={im.pr44}
                                            alt="Project 8"
                                            className={styles.projectImg}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.successStoriesSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>SUCCESS STORIES</h2>
                    <div className={styles.viewAllBlock}>
                        <button className={styles.viewAllArrow}>
                            <img src={ic} alt="arrow" />
                        </button>
                        <span className={styles.viewAllText}>VIEW ALL</span>
                    </div>
                </div>

                <div className={styles.storiesContainer}>
                    {successStories.map((story) => {
                        const currentTab = activeTabs[story.case_id] || 'solution';

                        let activeText = story.text_solution;
                        if (currentTab === 'challenge') activeText = story.text_challenge;
                        if (currentTab === 'results') activeText = story.text_results;

                        return (
                            <div key={story.case_id} className={styles.storyRow}>
                                <div className={styles.leftInfoCard}>
                                    <div className={styles.cardTopRow}>
                                        <div className={styles.titleWrapper}>
                                            <div className={styles.storyIcon}>
                                                <img src={story.case_badge_icon} alt="" />
                                            </div>
                                            <h3 className={styles.storyTitle}>
                                                {story.case_title}
                                            </h3>
                                        </div>
                                        <div className={styles.visitLinkWrapper}>
                                            <button className={styles.linkArrow}>
                                                <img src={ic} alt="arrow" />
                                            </button>
                                            <a href={story.case_link} className={styles.visitLink}>
                                                VISIT WEBSITE
                                            </a>
                                        </div>
                                    </div>

                                    <div className={styles.metaBadgesWrapper}>
                                        <div className={styles.metaBadge}>
                                            <span className={styles.badgeLabel}>Industry •</span>
                                            <span className={styles.badgeValue}>
                                                {story.case_industry}
                                            </span>
                                        </div>
                                        <div className={styles.metaBadge}>
                                            <span className={styles.badgeLabel}>
                                                Service Utilized •
                                            </span>
                                            <span className={styles.badgeValue}>
                                                {story.case_service}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.rightContentCard}>
                                    <div className={styles.tabsHeader}>
                                        <button
                                            type="button"
                                            className={`${styles.tabButton} ${currentTab === 'challenge' ? styles.activeTab : ''}`}
                                            onClick={() =>
                                                handleTabChange(story.case_id, 'challenge')
                                            }
                                        >
                                            CHALLENGE
                                        </button>
                                        <button
                                            type="button"
                                            className={`${styles.tabButton} ${currentTab === 'solution' ? styles.activeTab : ''}`}
                                            onClick={() =>
                                                handleTabChange(story.case_id, 'solution')
                                            }
                                        >
                                            SOLUTION
                                        </button>
                                        <button
                                            type="button"
                                            className={`${styles.tabButton} ${currentTab === 'results' ? styles.activeTab : ''}`}
                                            onClick={() =>
                                                handleTabChange(story.case_id, 'results')
                                            }
                                        >
                                            RESULTS
                                        </button>
                                    </div>

                                    <div className={styles.tabContentBody}>
                                        <h4 className={styles.contentHeading}>
                                            {currentTab.toUpperCase()}
                                        </h4>
                                        <p className={styles.contentText}>{activeText}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
           
        </>
    );
}
export default Page2;
