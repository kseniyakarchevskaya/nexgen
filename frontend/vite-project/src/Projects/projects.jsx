import { useState, useEffect } from 'react';
import styles from './projects.module.scss';
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
import { im } from '../Photo.js';

function Projects() {
    const [advantages, setAdvantages] = useState([]);
    const [projects, setProjects] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [advantagesRes, projectsRes, teamRes] = await Promise.all([
                    axios.get('http://localhost:3001/api/project-features-list'),
                    axios.get('http://localhost:3001/api/projects'),
                    axios.get('http://localhost:3001/api/team-members'),
                ]);
                setAdvantages(advantagesRes.data);
                setProjects(projectsRes.data);
                setTeamMembers(teamRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchAllData();
    }, []);

    return (
        <>
            <section className={styles.sec1}>
                <div className={styles.left}>
                    <div className={styles.ob}>
                        <div className={styles.verh}>
                            <h1>EMPOWERING YOUR</h1>
                            <div className={styles.or}>
                                <img src={str} alt="arrow" />
                                <p>START A PROJECT</p>
                            </div>
                        </div>
                        <div className={styles.niz}>
                            <h2>DIGITAL VISION</h2>
                        </div>
                        <p className={styles.pp}>
                            At NexGen, we are committed to empowering your digital vision with
                            innovative solutions tailored to your unique needs. Our team of skilled
                            professionals, coupled with cutting-edge technologies, ensures that we
                            deliver exceptional results that elevate your online presence.
                        </p>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.phot}>
                            <img src={im.Card} alt="phone" />
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.secFeatures}>
                <div className={styles.featuresContainer}>
                    <div className={styles.featuresHeader}>
                        <h2 className={styles.headerTitle}>KEY FEATURES OF OUR PROJECTS</h2>
                    </div>

                    <div className={styles.featuresGrid}>
                        {advantages.map((feature) => (
                            <div key={feature.feature_id} className={styles.featureCard}>
                                <div className={styles.iconBox}>
                                    <img
                                        src={feature.feature_icon_key}
                                        alt={feature.feature_title}
                                        className={styles.iconImg}
                                    />
                                </div>
                                <h3 className={styles.cardTitle}>{feature.feature_title}</h3>
                                <p className={styles.cardText}>{feature.feature_text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.sec5}>
                <div className={styles.worksContainer}>
                    <div className={styles.worksHeader}>
                        <p className={styles.works}>OUR WORKS</p>
                        <div className={styles.worksTabs}>
                            <button>
                                <img src={ic} alt="icon" />
                            </button>
                            <p>ALL WORKS</p>
                        </div>
                    </div>

                    <div className={styles.projectsGrid}>
                        {projects.map((project) => (
                            <div key={project.id} className={styles.projectItem}>
                                <div className={styles.projectRow}>
                                    <div className={styles.projectLeft}>
                                        <div className={styles.projectTitle}>
                                            <div className={styles.projectTitleWrapper}>
                                                {project.icon_url && (
                                                    <div className={styles.projectIcon}>
                                                        <img
                                                            src={project.icon_url}
                                                            alt={project.title}
                                                        />
                                                    </div>
                                                )}
                                                <h3>{project.title}</h3>
                                                <div className={styles.details}>
                                                    <button>
                                                        <img src={ic} alt="icon" />
                                                    </button>
                                                    <p>DETAILS</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.projectInfo}>
                                            <div>
                                                <p>
                                                    <span>Category:</span> {project.category}
                                                </p>
                                            </div>
                                            <div className={styles.taken}>
                                                <p>
                                                    <span>Time Taken:</span> {project.time_taken}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.projectDescription}>
                                            <p>{project.description}</p>
                                        </div>
                                    </div>

                                    <div className={styles.projectCenterImage}>
                                        <img
                                            src={project.center_image_url}
                                            alt={`${project.title} center`}
                                        />
                                    </div>

                                    <div className={styles.projectRight}>
                                        <div className={styles.projectTechnologies}>
                                            <p className={styles.techLabel}>TECHNOLOGIES USED</p>
                                            <div className={styles.techList}>
                                                {project.technologies &&
                                                    project.technologies.map((tech, idx) => (
                                                        <span key={idx} className={styles.techItem}>
                                                            {tech}
                                                        </span>
                                                    ))}
                                            </div>
                                        </div>

                                        <div className={styles.projectTeam}>
                                            <p className={styles.teamLabel}>TEAM MEMBERS</p>
                                            <div className={styles.teamPhotos}>
                                                {teamMembers.map((member, idx) => (
                                                    <div key={idx} className={styles.teamPhoto}>
                                                        <img
                                                            src={member.photo_url}
                                                            alt={`Team member ${idx + 1}`}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <button className={styles.bookCallBtn}>BOOK A CALL</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Projects;
