import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './about.module.scss';
import avat1 from '../assets/avat1.png';
import avat2 from '../assets/avat2.png';
import avat3 from '../assets/avat3.png';
import avat4 from '../assets/avat4.png';
import avat5 from '../assets/avat5.png';
import twitter from '../assets/twitter.png';
import awardIcon from '../assets/zvezim.png';

const teamFallback = [
    { name: 'JOHN SMITH', position: 'Co-Founder & CEO', photo: avat1 },
    { name: 'SARAH ADAMS', position: 'Head of Design', photo: avat5 },
    { name: 'EMILY JOHNSON', position: 'Lead Web Developer', photo: avat4 },
    { name: 'WILLIAM LEE', position: 'Lead Backend Developer', photo: avat2 },
];

const achievements = [
    {
        date: 'September 2023',
        title: 'GLOBAL RECOGNITION FOR INNOVATION',
        text: 'In 2023, our digital agency gained global acclaim for innovative solutions, setting new standards in the ever-evolving digital landscape.',
    },
    {
        date: 'March 2019',
        title: 'INDUSTRY LEADERSHIP ACKNOWLEDGED',
        text: 'Recognized as an industry leader in 2019, our agency received prestigious awards, affirming our commitment to excellence and client satisfaction.',
    },
    {
        date: 'August 2015',
        title: 'EXPANSION INTO INTERNATIONAL MARKETS',
        text: 'Expanding horizons in 2015, our agency successfully entered international markets, establishing a global presence and serving clients on a broader scale.',
    },
    {
        date: 'January 2010',
        title: 'PIONEERING THE DIGITAL FRONTIER',
        text: 'In 2010, our agency was born, pioneering the digital frontier and establishing core principles that have guided us through a decade of innovation.',
    },
];

const awards = [
    {
        date: 'October 2017',
        title: 'DIGITAL EXCELLENCE AWARD',
        text: 'Recognition for outstanding contributions to the digital industry, celebrating our ability to deliver exceptional web design and development solutions.',
    },
    {
        date: 'March 2019',
        title: 'TOP MOBILE APP DEVELOPMENT AGENCY',
        text: 'Recognized as a top mobile app development agency by industry experts, highlighting our proficiency in delivering seamless and user-centric mobile applications.',
    },
    {
        date: 'July 2022',
        title: 'BEST DIGITAL MARKETING CAMPAIGN',
        text: 'Awarded for an exceptional digital marketing campaign with outstanding results, showcasing our data-driven strategies and targeted marketing efforts.',
    },
    {
        date: 'November 2024',
        title: 'INNOVATIVE TECH STARTUP AWARD',
        text: 'Recognition of our pioneering efforts as a technology startup, acknowledging our commitment to exploring and implementing cutting-edge technologies.',
    },
];

function About() {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/team-members');
                setTeam(response.data);
            } catch (error) {
                console.error('Error loading team members:', error);
            }
        };

        fetchTeam();
    }, []);

    const teamMembers = teamFallback.map((member, index) => ({
        ...member,
        photoUrl: team[index]?.photo_url || member.photo,
    }));

    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroCopy}>
                    <h1>ELEVATING BRANDS</h1>
                    <div className={styles.heroSecondLine}>
                        <h1>IN THE DIGITAL AGE</h1>
                        <a href="#team" className={styles.projectLink}>
                            <span className={styles.arrowCircle}>↗</span>
                            START A PROJECT
                        </a>
                    </div>
                </div>

                <div className={styles.statsPanel}>
                    <div className={styles.statsGrid}>
                        <article>
                            <p>CLIENTS</p>
                            <span>200+</span>
                        </article>
                        <article>
                            <p>PROJECTS</p>
                            <span>280+</span>
                        </article>
                        <article>
                            <p>HAPPY CLIENTS</p>
                            <span>100%</span>
                        </article>
                        <article>
                            <p>FOLLOWER</p>
                            <span>420K</span>
                        </article>
                    </div>
                    <a href="#team" className={styles.knowMore}>
                        <span>↓</span> KNOW MORE
                    </a>
                </div>
            </section>

            <section className={styles.teamSection} id="team">
                <div className={styles.sectionTitle}>
                    <h2>MEET THE BRILLIANT MINDS BEHIND NEXGEN</h2>
                    <a href="#achievements" className={styles.viewAll}>
                        <span>↗</span> ALL MEMBERS
                    </a>
                </div>

                <div className={styles.teamGrid}>
                    {teamMembers.map((member, index) => (
                        <article className={styles.teamCard} key={member.name}>
                            <div className={styles.memberInfo}>
                                <h3>{member.name}</h3>
                                <p>{member.position}</p>
                            </div>
                            <div className={styles.memberPhoto}>
                                <img src={member.photoUrl} alt={member.name} />
                            </div>
                            <div className={styles.socialLinks}>
                                <a href="#team" aria-label={`${member.name} on Facebook`}>f</a>
                                <a href="#team" aria-label={`${member.name} on Twitter`}>
                                    <img src={twitter} alt="" />
                                </a>
                                <a href="#team" aria-label={`${member.name} on LinkedIn`}>in</a>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.achievements} id="achievements">
                <h2 className={styles.sectionTitle}>OUR ACHIEVEMENTS</h2>
                <div className={styles.achievementGrid}>
                    {achievements.map((achievement) => (
                        <article className={styles.achievementCard} key={achievement.title}>
                            <p className={styles.date}>{achievement.date}</p>
                            <div>
                                <h3>{achievement.title}</h3>
                                <p>{achievement.text}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.awards}>
                <h2 className={styles.sectionTitle}>AWARDS &amp; RECOGNITIONS</h2>
                <div className={styles.awardGrid}>
                    {awards.map((award) => (
                        <article className={styles.awardCard} key={award.title}>
                            <div className={styles.awardDate}>
                                <p>Date&nbsp; • &nbsp;{award.date}</p>
                                <span><img src={awardIcon} alt="" /></span>
                            </div>
                            <h3>{award.title}</h3>
                            <p>{award.text}</p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default About;
