import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import styles from './blog-article.module.scss';
import ic from '../assets/Icon.png';
import avat3 from '../assets/avat3.png';
import twitter from '../assets/twitter.png';

export default function BlogArticle() {
	const { id } = useParams();
	const [article, setArticle] = useState(null);
	const [recommended, setRecommended] = useState([]);
	const [error, setError] = useState('');
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		const fetchArticle = async () => {
			try {
				setError('');
				const [articleResponse, blogsResponse] = await Promise.all([
					axios.get(`http://localhost:3001/api/blogs/${id}`),
					axios.get('http://localhost:3001/api/blogs'),
				]);
				setArticle(articleResponse.data);
				setRecommended(blogsResponse.data.filter((blog) => !blog.is_featured).slice(0, 3));
			} catch (requestError) {
				console.error('Error fetching blog article:', requestError);
				setError('Unable to load this blog article. Please check the database connection.');
			}
		};

		fetchArticle();
	}, [id]);

	const handleShare = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1800);
		} catch (shareError) {
			console.error('Unable to copy blog link:', shareError);
		}
	};

	if (!article) {
		return <main className={styles.articlePage}>{error && <p className={styles.loadError}>{error}</p>}</main>;
	}

	return (
		<main className={styles.articlePage}>
			<section className={styles.articleHero}>
				<div className={styles.heroTitleBlock}>
					<div className={styles.titleLine}>
						<h1>{article.blog_title}</h1>
						<Link to="/projects" className={styles.projectLink}>
							<span className={styles.projectArrow}>↗</span>
							START A PROJECT
						</Link>
					</div>
				</div>
				<div className={styles.articleMeta}>
					<div><span>AUTHOR</span><strong>{article.blog_author}</strong></div>
					<div><span>Published Date</span><strong>{article.blog_published_date}</strong></div>
					<div><span>Category</span><strong>{article.blog_category}</strong></div>
					<div><span>Read Time</span><strong>{article.blog_read_time}</strong></div>
				</div>
			</section>

			<img className={styles.coverImage} src={article.blog_image_url} alt={article.blog_title} />

			<section className={styles.articleBodyLayout}>
				<aside className={styles.socialRail} aria-label="Share article">
					<button type="button" onClick={handleShare} aria-label="Share article on Twitter">
						<img src={twitter} alt="" />
					</button>
					<button type="button" onClick={handleShare} aria-label="Copy article link">
						<img src={ic} alt="" />
					</button>
					<button type="button" onClick={handleShare} aria-label="Copy article link">f</button>
				</aside>

				<article className={styles.articleContent}>
					{article.sections.length > 0 ? article.sections.map((section) => (
						<section className={styles.articleSection} key={`${section.article_title}-${section.display_order}`}>
							<h2>{section.section_title}</h2>
							{section.section_text.split('\n\n').map((paragraph, index) => (
								<p key={`${section.display_order}-${index}`}>{paragraph}</p>
							))}
						</section>
					)) : (
						<p className={styles.noArticleText}>Article content is not available yet.</p>
					)}
				</article>

				<aside className={styles.articleSidebar}>
					<div className={styles.authorCard}>
						<div className={styles.authorInfo}>
							<img src={avat3} alt={article.blog_author} />
							<div>
								<h2>{article.blog_author}</h2>
								<p>Blog Author</p>
							</div>
						</div>
						<p className={styles.authorDescription}>{article.blog_description}</p>
						<button type="button" className={styles.authorLink} onClick={handleShare}>
							<img src={twitter} alt="" />
							<span>@{article.blog_author.replace(/\s+/g, '').toLowerCase()}</span>
							<img className={styles.authorArrow} src={ic} alt="" />
						</button>
					</div>
					<div className={styles.articleActions}>
						<div><span className={styles.actionIcon}>♥</span><span>{copied ? 'LINK COPIED' : 'SHARE ARTICLE'}</span><strong>↗</strong></div>
						<button type="button" onClick={handleShare}><span className={styles.actionIcon}>↗</span><span>{copied ? 'COPIED' : 'COPY LINK'}</span><strong>↗</strong></button>
					</div>
				</aside>
			</section>

			<section className={styles.relatedBlogs}>
				<div className={styles.relatedHeader}>
					<h2>RELATED BLOGS</h2>
					<Link to="/blog"><span>↗</span> ALL BLOGS</Link>
				</div>
				<div className={styles.relatedGrid}>
					{recommended.map((blog) => (
						<article className={styles.blogCard} key={blog.blog_id}>
							<img className={styles.blogImage} src={blog.blog_image_url} alt={blog.blog_title} />
							<h3>{blog.blog_title}</h3>
							<p>{blog.blog_description}</p>
							<Link to={`/blog/${blog.blog_id}`} className={styles.readLink}>
								<span className={styles.linkArrow}><img src={ic} alt="" /></span>
								<span>READ FULL BLOG</span>
							</Link>
						</article>
					))}
				</div>
			</section>
		</main>
	);
}
