import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './blog.module.scss';
import { im } from '../Photo.js';
import ic from '../assets/Icon.png'
import { Link } from 'react-router-dom';
export default function Blog() {
	const [blogs, setBlogs] = useState([]);
	const [activeBlogCategory, setActiveBlogCategory] = useState('DESIGN');

	useEffect(() => {
		const fetchBlogsData = async () => {
			try {
				const res = await axios.get('http://localhost:3001/api/blogs');
				setBlogs(res.data);
			} catch (error) {
				console.error('Error fetching blogs:', error);
			}
		};
		fetchBlogsData();
	}, []);

	return (
        <>
		<section className={styles.blogsSection}>
			<div className={styles.sectionHeader}>
				<h2 className={styles.sectionTitle}>OUR BLOGS</h2>
				<div className={styles.tabsHeader}>
					<button 
						type="button" 
						className={`${styles.tabButton} ${activeBlogCategory === 'BUSINESS' ? styles.activeTab : ''}`}
						onClick={() => setActiveBlogCategory('BUSINESS')}
					>
						BUSINESS
					</button>
					<button 
						type="button" 
						className={`${styles.tabButton} ${activeBlogCategory === 'DESIGN' ? styles.activeTab : ''}`}
						onClick={() => setActiveBlogCategory('DESIGN')}
					>
						DESIGN
					</button>
					<button 
						type="button" 
						className={`${styles.tabButton} ${activeBlogCategory === 'DEVELOPMENT' ? styles.activeTab : ''}`}
						onClick={() => setActiveBlogCategory('DEVELOPMENT')}
					>
						DEVELOPMENT
					</button>
				</div>
			</div>

			<div className={styles.blogsContainer}>
				{blogs.filter(b => b.is_featured && (b.blog_category === activeBlogCategory)).map((mainBlog) => (
					<div key={mainBlog.blog_id} className={styles.featuredRow}>
						<div className={styles.featuredImageBlock}>
							<img src={mainBlog.blog_image_url} alt="" />
						</div>
						<div className={styles.featuredContentCard}>
							<h3 className={styles.featuredTitle}>{mainBlog.blog_title}</h3>
							<div className={styles.metaBadgesWrapper}>
								<div className={styles.metaBadge}>
									<span className={styles.badgeLabel}>Category</span>
									<span className={styles.badgeValue}>{mainBlog.blog_category}</span>
								</div>
								<div className={styles.metaBadge}>
									<span className={styles.badgeLabel}>Read Time</span>
									<span className={styles.badgeValue}>{mainBlog.blog_read_time}</span>
								</div>
								<div className={styles.metaBadge}>
									<span className={styles.badgeLabel}>Author</span>
									<span className={styles.badgeValue}>{mainBlog.blog_author}</span>
								</div>
							</div>
							<p className={styles.featuredDescription}>{mainBlog.blog_description}</p>
							<div className={styles.cardFooterRow}>
								<div className={styles.readLinkWrapper}>
									<Link to={`/blog/${mainBlog.blog_id}`} className={styles.linkArrow}><img src={ic} alt="arrow" /></Link>
									<span className={styles.readLink}>READ FULL BLOG</span>
								</div>
								<div className={styles.dateBlock}>
									<span className={styles.dateLabel}>Published Date</span>
									<span className={styles.dateValue}>{mainBlog.blog_published_date}</span>
								</div>
							</div>
						</div>
					</div>
				))}

				<div className={styles.blogsGrid}>
					{blogs.filter(b => !b.is_featured && (b.blog_category === activeBlogCategory)).map((blog) => (
						<div key={blog.blog_id} className={styles.blogCard}>
							<div className={styles.cardImageBlock}>
								<img src={blog.blog_image_url} alt="" />
							</div>
							<h4 className={styles.cardTitle}>{blog.blog_title}</h4>
							<p className={styles.cardText}>{blog.blog_description}</p>
							<div className={styles.cardFooterWrapper}>
								<Link to={`/blog/${blog.blog_id}`} className={styles.linkArrow}><img src={ic} alt="arrow" /></Link>
								<span className={styles.readLink}>READ FULL BLOG</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
        </>
	);
}
