import { useState } from 'react';
import axios from 'axios';
import styles from './contact.module.scss';
import icon from '../assets/Icon.png';
import str from '../assets/str.png'
const contactTabs = {
    'PHONE NUMBER': [
        ['General Inquiries', 'Contact our team to request a phone number'],
        ['Business Collaborations', 'Contact our team to request a phone number'],
        ['Job Opportunities', 'Contact our team to request a phone number'],
    ],
    EMAILS: [
        ['General Inquiries', 'INFO@NEXGEN.COM'],
        ['Business Collaborations', 'PARTNERSHIPS@NEXGEN.COM'],
        ['Job Opportunities', 'CAREERS@NEXGEN.COM'],
    ],
    'OFFICE LOCATIONS': [
        ['General Inquiries', 'Contact our team for office location details'],
        ['Business Collaborations', 'Contact our team for office location details'],
        ['Job Opportunities', 'Contact our team for office location details'],
    ],
};

const metrics = [
    ['CLIENTS', '200+'],
    ['PROJECTS', '280+'],
    ['HAPPY CLIENTS', '100%'],
    ['FOLLOWER', '420K'],
    ['Years Of Experience', '10+'],
];

const sliderItems = [
    'MARKETING',
    'WEBSITE DESIGN',
    'BRANDING',
    'WEBSITE DEVELOPMENT',
    'MOBILE APP DEVELOPMENT',
    'DIGITAL',
];
const infiniteSliderItems = [...sliderItems, ...sliderItems, ...sliderItems];

export default function Contact() {
    const [activeTab, setActiveTab] = useState('EMAILS');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
        termsAccepted: false,
    });
    const [formMessage, setFormMessage] = useState('');

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        setFormData((currentData) => ({
            ...currentData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormMessage('');

        try {
            await axios.post('http://localhost:3001/api/contact-page-messages', formData);
            setFormMessage('Your message has been sent. Thank you!');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                message: '',
                termsAccepted: false,
            });
        } catch (error) {
            console.error('Error sending contact message:', error);
            setFormMessage('Unable to send your message. Please try again later.');
        }
    };

    return (
        <main>
            <section className={styles.contactHero}>
                <div className={styles.heroMain}>
                    <div className={styles.heroCopy}>
                        <div className={styles.heroTitleRow}>
                            <h1>GET IN TOUCH</h1>
                            <div className={styles.or}>
                                <img src={str} alt="arrow" />
                                <p>START A PROJECT</p>
                            </div>
                        </div>
                        <h1>WITH US TODAY!</h1>
                        <p>
                            At NexGen, we value your inquiries, feedback, and collaborations.
                            Whether you are interested in our digital services, have questions about
                            our projects, or want to explore potential partnerships, we encourage
                            you to reach out to our dedicated team.
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
                <div className={styles.metricsPanel}>
                    <div className={styles.metricsGrid}>
                        {metrics.map(([label, value]) => (
                            <div className={styles.metricCard} key={label}>
                                <span>{label}</span>
                                <strong>{value}</strong>
                            </div>
                        ))}
                        <a href="#contactForm" className={styles.reachUs}>
                            <span>↓</span> REACH US
                        </a>
                    </div>
                </div>
            </section>

            <section className={styles.contactContent}>
                <div className={styles.contactDetails}>
                    <div className={styles.tabs}>
                        {Object.keys(contactTabs).map((tab) => (
                            <button
                                type="button"
                                key={tab}
                                className={activeTab === tab ? styles.activeTab : ''}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className={styles.contactList}>
                        {contactTabs[activeTab].map(([label, value]) => (
                            <div className={styles.contactItem} key={label}>
                                <p>{label}</p>
                                <a
                                    href={
                                        activeTab === 'EMAILS'
                                            ? `mailto:${value.toLowerCase()}`
                                            : '#contactForm'
                                    }
                                >
                                    <span>{value}</span>
                                    <img src={icon} alt="" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                <form className={styles.contactForm} id="contactForm" onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <label>
                            <span>FIRST NAME</span>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            <span>LAST NAME</span>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Enter Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            <span>EMAIL</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            <span>PHONE NUMBER</span>
                            <div className={styles.phoneInput}>
                                <span className={styles.countryCode}>
                                    🇮🇳 <i>⌄</i>
                                </span>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="Enter Phone Number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </label>
                        <label className={styles.messageField}>
                            <span>MESSAGE</span>
                            <textarea
                                name="message"
                                placeholder="Enter your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div className={styles.formBottom}>
                        <label className={styles.terms}>
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                checked={formData.termsAccepted}
                                onChange={handleChange}
                                required
                            />
                            <span>I agree with Terms of Use and Privacy Policy</span>
                        </label>
                        <button type="submit">
                            SEND YOUR MESSAGE 
                        </button>
                    </div>
                    {formMessage && <p className={styles.formMessage}>{formMessage}</p>}
                </form>
            </section>
        </main>
    );
}
