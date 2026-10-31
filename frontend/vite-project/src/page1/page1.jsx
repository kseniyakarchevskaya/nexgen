 import { useState, useEffect } from 'react'
import styles from './page1.module.scss'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

import logo from '../assets/Logo.png'
import str from '../assets/str.png'
import ph from '../assets/ph.png'
import ic from '../assets/Icon.png'
import ss from '../assets/strp.png'
import instagram from '../assets/instagramm.png'
import twitter from '../assets/twitter.png'
import dribbble from '../assets/dribbble.png'
import behance from '../assets/behance.png'
function Page1() {
    const [advantages, setAdvantages] = useState([])
    const [services, setServices] = useState([])
    const [projects, setProjects] = useState([])
    const [teamMembers, setTeamMembers] = useState([])
    const [testimonials, setTestimonials] = useState([])
    const [faq, setFaq] = useState([])

    const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: ''
    })

    const sliderItems = [
        'MARKETING',
        'WEBSITE DESIGN',
        'BRANDING',
        'WEBSITE DEVELOPMENT',
        'MOBILE APP DEVELOPMENT',
        'DIGITAL'
    ];

    const footerSlider = [
    'FOLLOW US ON SOCIAL MEDIA',
    'FOLLOW US ON SOCIAL MEDIA',
    'FOLLOW US ON SOCIAL MEDIA',
    'FOLLOW US ON SOCIAL MEDIA',
    'FOLLOW US ON SOCIAL MEDIA',
    'FOLLOW US ON SOCIAL MEDIA'
    ]

    const infiniteFooterSlider = [
        ...footerSlider,
        ...footerSlider,
        ...footerSlider
    ]

    const toggleFaq = (id) => {

    setFaq((prev) =>
        prev.map((item) =>
            item.id === id
                ? { ...item, is_open: !item.is_open }
                : item
        )
    )
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

const handleSubmit = async (e) => {

    e.preventDefault()

    try {

        await axios.post(
            'http://localhost:3001/api/contact-question',
            formData
        )

        alert('Message sent successfully!')

        setFormData({
            name: '',
            email: '',
            question: ''
        })

    } catch (error) {

        console.error(error)

        alert('Error sending message')

    }

}

    const infiniteSliderItems = [...sliderItems, ...sliderItems, ...sliderItems];

  
     useEffect(() => {
        const fetchData = async () => {
            try {
                const [advantagesRes, servicesRes, projectsRes, teamRes, testimonialsRes, faqRes] = await Promise.all([
                    axios.get('http://localhost:3001/api/advantages'),
                    axios.get('http://localhost:3001/api/services'),
                    axios.get('http://localhost:3001/api/projects'),
                    axios.get('http://localhost:3001/api/team-members'),
                    axios.get('http://localhost:3001/api/testimonials'),
                    axios.get('http://localhost:3001/api/faq')
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
            
            <section className={styles.sec1}>
                <div className={styles.left}>
                    <div className={styles.ob}>
                        <div className={styles.verh}>
                            <h1>DIGITAL SOLUTIONS</h1>
                            <div className={styles.or}>
                                <img src={str} alt="arrow"/>
                                <p>START A PROJECT</p>
                            </div>
                        </div>
                        <div className={styles.niz}>
                            <h2>THAT DRIVE SUCCESS</h2>
                        </div>
                        <p className={styles.pp}>At NexGen, we believe in the transformative power of digital solutions. Our team of experts is dedicated to helping <br />businesses like yours thrive in the fast-paced digital landscape.</p>
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
                        <img src={ph} alt="phone"/>
                    </div>
                    <div className={styles.tt}>
                        <p>Estatein Real Estate</p>
                        <span>Web Development.</span>
                    </div>
                </div>
            </section>
            
            <section className={styles.sec2}>
              <div className={styles.sec2obs}>
                <div className={styles.jj}>
                    <p>CLIENTS</p>
                    <span>200+</span>
                </div>
                <div className={styles.jj}>
                    <p>PROJECTS</p>
                    <span>280+</span>
                </div>
                <div className={styles.jj}>
                    <p>HAPPY CLIENTS</p>
                    <span>100%</span>
                </div>
                <div className={styles.jj}>
                    <p>FOLLOWER</p>
                    <span>420K</span>
                </div>
                <div className={styles.jj}>
                    <p>Years Of Experience</p>
                    <span>10+</span>
                </div>
                <div className={styles.kn}>
                    <button><img src={ic} alt="icon"/></button>
                    <p>KNOW MORE</p>
                </div>
              </div>
                
            </section>
            
          
            <section className={styles.sec3}>
              <div className={styles.sec3obs}>
                
                  <div className={styles.sec3Header}>
                    <h4>REASONS TO CHOSE NEXGEN FOR YOUR DIGITAL JOURNEY</h4>
                  </div>
                  
                  <div className={styles.advantagesGrid}>
                      {advantages.map((advantage) => (
                          <div key={advantage.id} className={styles.advantageCard}>
                            <p className={styles.cardTitle}>{advantage.title}</p>
                            <p className={styles.cardDescription}>{advantage.description}</p>
                            <div className={styles.learnMoreBtn}>
                              <button><img src={ic}/></button>
                              <p>Learn More</p>
                            </div>
                            
                          </div>
                      ))}
                  </div>
                  
                
              </div>
                
            </section>
            <section className={styles.sec4}>
                <div className={styles.servicesContainer}>
                    <div className={styles.servicesHeader}>
                        <p className={styles.serv}>OUR SERVICES</p>
                    </div>
                    
                    <div className={styles.servicesGrid}>
                        {services.map((service) => (
                            <div key={service.id} className={styles.serviceCard}>
                                <div className={styles.book}>
                                    <div className={styles.serviceslearn1}>
                                        {service.icon_url && (
                                        <div className={styles.serviceIcon}>
                                            <img src={service.icon_url} alt={service.title} />
                                        </div>
                                        )}
                                        <h3 className={styles.serviceTitle}>{service.title}</h3> 
                                    </div>
                                    
                                    <div className={styles.servicelearn}>
                                        <button className={styles.strel}><img src={ic}/></button>
                                        <p className={styles.serviceButton}>{service.button_text}</p>
                                    </div>
                                    
                                </div>
                                
                                
                                <p className={styles.serviceDescription}>{service.description}</p>
                                <div className={styles.servicePrice}>{service.price}</div>
                               
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
                            <button><img src={ic} alt="icon"/></button>
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
                                                        <img src={project.icon_url} alt={project.title} />
                                                    </div>
                                                )}
                                                <h3>{project.title}</h3>
                                                <div className={styles.details}>
                                                    <button><img src={ic} alt="icon"/></button>
                                                    <p>DETAILS</p>
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                        <div className={styles.projectInfo}>
                                            <div><p><span>Category:</span> {project.category}</p></div>
                                            <div className={styles.taken}><p><span>Time Taken:</span> {project.time_taken}</p></div>
                                        </div>
                                        <div className={styles.projectDescription}>
                                            <p>{project.description}</p>
                                        </div>
                                    </div>
                                    
                                    <div className={styles.projectCenterImage}>
                                        <img src={project.center_image_url} alt={`${project.title} center`} />
                                    </div>
                                    
                                    <div className={styles.projectRight}>
                                        <div className={styles.projectTechnologies}>
                                            <p className={styles.techLabel}>TECHNOLOGIES USED</p>
                                            <div className={styles.techList}>
                                                {project.technologies && project.technologies.map((tech, idx) => (
                                                    <span key={idx} className={styles.techItem}>{tech}</span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className={styles.projectTeam}>
                                            <p className={styles.teamLabel}>TEAM MEMBERS</p>
                                            <div className={styles.teamPhotos}>
                                                {teamMembers.map((member, idx) => (
                                                    <div key={idx} className={styles.teamPhoto}>
                                                        <img src={member.photo_url} alt={`Team member ${idx + 1}`} />
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
    )
}

export default Page1
