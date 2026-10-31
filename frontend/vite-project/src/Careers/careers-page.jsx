import styles from './careers-page.module.scss';
import designIcon from '../assets/bd1.png';
import mobileIcon from '../assets/bd2.png';
import marketingIcon from '../assets/bd4.png';
import str from '../assets/str.png';
const openings = [
    {
        title: 'WEB DESIGNER',
        salary: '$45,000 - $60,000 per year',
        experience: '1+ year',
        deadline: '30/09/2025',
        skills: 'Proficiency in Adobe Creative Suite (Photoshop, Illustrator, etc.), strong understanding of UI/UX design principles, responsive design expertise.',
        icon: designIcon,
    },
    {
        title: 'MOBILE APP DEVELOPER',
        salary: '$55,000 - $75,000 per year',
        experience: '2+ years',
        deadline: '15/10/2025',
        skills: 'Proficiency in iOS or Android development (Swift, Kotlin), knowledge of mobile app design patterns, experience with mobile testing and debugging.',
        icon: mobileIcon,
    },
    {
        title: 'DIGITAL MARKETING SPECIALIST',
        salary: '$50,000 - $65,000 per year',
        experience: '3+ years',
        deadline: '20/11/2025',
        skills: 'Proficiency in SEO, SEM, and social media marketing, experience with analytics tools (Google Analytics, etc.), content marketing expertise.',
        icon: marketingIcon,
    },
    {
        title: 'PROJECT MANAGER',
        salary: '$60,000 - $80,000 per year',
        experience: '5+ years',
        deadline: '05/12/2025',
        skills: 'Strong organizational and communication skills, ability to manage project timelines and resources, experience in Agile project management methodologies.',
        icon: '▰',
    },
];

const applicationSteps = [
    [
        'EXPLORE JOB LISTINGS',
        'Visit our website’s “Careers” page to explore the current job listings. Review the various roles available and select the position that aligns with your skills, experience, and career aspirations.',
    ],
    [
        'REVIEW JOB DESCRIPTION',
        'Click on the desired job title to view the detailed job description. Take your time to read through the responsibilities, requirements, and qualifications to ensure you have a clear understanding of the role.',
    ],
    ['PREPARE YOUR APPLICATION', 'Before applying, ensure you have the following ready:'],
    [
        'COMPLETE THE APPLICATION',
        'Click the “Apply Now” button on the job listing page to access our online application form. Fill in your personal information, contact details, and the position you are applying for.',
    ],
    [
        'UPLOAD YOUR DOCUMENTS',
        'Attach your resume, cover letter, and portfolio (if applicable) in their respective fields on the application form.',
    ],
    [
        'SUBMIT YOUR APPLICATION',
        'Double-check all the information you provided to ensure accuracy and completeness. Once you are satisfied with your application, click the “Submit” button to send it to our HR team.',
    ],
    [
        'APPLICATION REVIEW',
        'After the application deadline, our HR team will carefully review all applications. Shortlisted candidates will be contacted for further evaluation, which may include interviews and assessments.',
    ],
    [
        'INTERVIEW PROCESS',
        'If you are selected for an interview, we will reach out to schedule a suitable date and time. Interviews may be conducted in-person or virtually, depending on the position and your location.',
    ],
];

function CareersPage() {
    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroLeft}>
                    <div className={styles.heroHeading}>
                        <h1>UNLOCK YOUR POTENTIAL</h1>
                        <div className={styles.or}>
                            <img src={str} alt="arrow" />
                            <p>START A PROJECT</p>
                        </div>
                    </div>
                    <h1>IN THE DIGITAL WORLD</h1>
                </div>
                <div className={styles.heroRight}>
                    <h2>AT NEXGEN</h2>
                    <p>
                        We believe in fostering a dynamic and collaborative work environment that
                        empowers our team members to excel in their respective fields. Join us to be
                        part of a passionate and innovative team dedicated to crafting exceptional
                        digital solutions for clients across the globe. We are committed to
                        nurturing talent, encouraging professional growth, and creating a workplace
                        where creativity thrives.
                    </p>
                    <a href="#openings" className={styles.knowMore}>
                        <span>↓</span> KNOW MORE
                    </a>
                </div>
            </section>

            <section className={styles.openings} id="openings">
                <h2 className={styles.sectionTitle}>JOIN OUR TEAM AT NEXGEN</h2>
                <div className={styles.jobsGrid}>
                    {openings.map((job) => (
                        <article className={styles.jobCard} key={job.title}>
                            <div className={styles.jobHeader}>
                                <span className={styles.jobIcon}>
                                    {typeof job.icon === 'string' ? (
                                        job.icon
                                    ) : (
                                        <img src={job.icon} alt="" />
                                    )}
                                </span>
                                <h3>{job.title}</h3>
                                <a href="#application" className={styles.detailsLink}>
                                    <span className={styles.smallArrow}>↗</span>
                                    VIEW DETAILS
                                </a>
                            </div>
                            <div className={styles.jobFacts}>
                                <span>Salary&nbsp; • &nbsp;{job.salary}</span>
                                <span>Experience&nbsp; • &nbsp;{job.experience}</span>
                                <span>Deadline&nbsp; • &nbsp;{job.deadline}</span>
                            </div>
                            <div className={styles.skills}>
                                <h4>SKILLS</h4>
                                <p>{job.skills}</p>
                            </div>
                            <a href="#application" className={styles.applyButton}>
                                APPLY NOW
                            </a>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.application} id="application">
                <h2 className={styles.sectionTitle}>HOW TO APPLY</h2>
                <div className={styles.stepsGrid}>
                    {applicationSteps.map(([title, description], index) => (
                        <article className={styles.stepCard} key={title}>
                            <p className={styles.stepNumber}>
                                Step&nbsp; {String(index + 1).padStart(2, '0')}
                            </p>
                            <div className={styles.stepContent}>
                                <h3>{title}</h3>
                                <p>{description}</p>
                                <span className={styles.knowMore}>
                                    <span>↓</span> KNOW MORE
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default CareersPage;
