import { useState, useEffect } from 'react';
import styles from './careers.module.scss';
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

function Careers() {
    return (
        <>
            <section className={styles.sec1}>
                <div className={styles.left}>
                    <div className={styles.ob}>
                        <div className={styles.verh}>
                            <h1>UNLOCK YOUR POTENTIAL IN THE DIGITAL WORLD</h1>
                            <div className={styles.or}>
                                <img src={str} alt="arrow" />
                                <p>START A PROJECT</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.metaBlock}>
                        <p className={styles.brandTitle}>AT NEXGEN</p>
                        <p className={styles.brandText}>
                            We believe in fostering a dynamic and collaborative work environment
                            that empowers our team members to excel in their respective fields. Join
                            us to be part of a passionate and innovative team dedicated to crafting
                            exceptional digital solutions for clients across the globe. We are
                            committed to nurturing talent, encouraging professional growth, and
                            creating a workplace where creativity thrives.
                        </p>
                    </div>
                    <div className={styles.actionBlock}>
                        <button className={styles.knowMoreBtn}>
                            <img src={ss} alt="arrow down" />
                        </button>
                        <span className={styles.knowMoreText}>KNOW MORE</span>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Careers;
