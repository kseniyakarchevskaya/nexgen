const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: 5432,
});

const port = 3001;
app.get('/api/advantages', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, title, description, display_order FROM company_advantages ORDER BY display_order ASC'
        );
        res.json(result.rows);
    } catch (e) {
        console.error('Database error:', e);
        res.status(500).json({ error: 'database error' });
    }
});


app.get('/api/advantages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT id, title, description FROM company_advantages WHERE id = $1',
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'advantage not found' });
        }
        
        res.json(result.rows[0]);
    } catch (e) {
        console.error('Database error:', e);
        res.status(500).json({ error: 'database error' });
    }
});

app.get('/api/services', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, title, description, price, button_text, icon_url, display_order FROM services WHERE is_active = true ORDER BY display_order ASC'
        );
        res.json(result.rows);
    } catch (e) {
        console.error('Database error:', e);
        res.status(500).json({ error: 'database error' });
    }
});

app.get('/api/team-members', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT photo_url FROM team_members ORDER BY display_order'
        );
        res.json(result.rows);
    } catch (e) {
        console.error('Database error:', e);
        res.status(500).json({ error: 'database error' });
    }
});

app.get('/api/projects', async (req, res) => {
    try {
        const projectsResult = await pool.query(
            'SELECT id, title, category, time_taken, description, main_image_url, center_image_url, icon_url, book_call_link FROM projects ORDER BY id'
        );
        
        const projects = await Promise.all(projectsResult.rows.map(async (project) => {
            const technologies = await pool.query(
                'SELECT technology_name FROM project_technologies WHERE project_id = $1 ORDER BY id',
                [project.id]
            );
            
            return {
                ...project,
                technologies: technologies.rows.map(t => t.technology_name)
            };
        }));
        
        res.json(projects);
    } catch (e) {
        console.error('Database error:', e);
        res.status(500).json({ error: 'database error' });
    }
});

app.get('/api/testimonials', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT 
                id,
                title,
                description,
                client_name,
                client_position,
                client_photo_url,
                display_order
             FROM testimonials
             WHERE is_active = true
             ORDER BY display_order ASC`
        );

        res.json(result.rows);

    } catch (e) {
        console.error('Database error:', e);
        res.status(500).json({ error: 'database error' });
    }
});

app.get('/api/faq', async (req, res) => {
    try {

        const result = await pool.query(
            `SELECT 
                id,
                question,
                answer,
                is_open,
                display_order
             FROM faq
             WHERE is_active = true
             ORDER BY display_order ASC`
        );

        res.json(result.rows);

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.post('/api/contact-question', async (req, res) => {
    try {

        const { name, email, question } = req.body;

        await pool.query(
            `INSERT INTO contact_questions
            (name, email, question)
            VALUES ($1, $2, $3)`,
            [name, email, question]
        );

        res.json({ success: true });

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.post('/api/contact-page-messages', async (req, res) => {
	try {
		const { firstName, lastName, email, phoneNumber, message, termsAccepted } = req.body;

		await pool.query(
			`INSERT INTO contact_page_messages
			(first_name, last_name, email, phone_number, message, terms_accepted)
			VALUES ($1, $2, $3, $4, $5, $6)`,
			[firstName, lastName, email, phoneNumber, message, termsAccepted]
		);

		res.json({ success: true });
	} catch (e) {
		console.error('Database error:', e);
		res.status(500).json({ error: 'database error' });
	}
});

app.get('/api/success-stories', async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT
                id,
                title,
                industry,
                service,
                website_url,
                icon_url,
                challenge,
                solution,
                results
            FROM success_stories
            ORDER BY display_order
        `);

        res.json(result.rows);

    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: 'database error'
        });
    }
});

app.get('/api/portfolio-cases', async (req, res) => {
	try {
		const result = await pool.query(
			`SELECT 
				case_id,
				case_title,
				case_industry,
				case_service,
				case_link,
				case_badge_icon,
				text_challenge,
				text_solution,
				text_results
			 FROM case_studies_portfolio
			 ORDER BY sorting_index ASC`
		);
		res.json(result.rows);
	} catch (e) {
		console.error(e);
		res.status(500).json({ error: 'database error' });
	}
});

app.get('/api/project-features-list', async (req, res) => {
	try {
		const result = await pool.query(
			`SELECT 
				feature_id,
				feature_title,
				feature_text,
				feature_icon_key
			 FROM project_features
			 ORDER BY display_order ASC`
		);
		res.json(result.rows);
	} catch (e) {
		console.error('Database error:', e);
		res.status(500).json({ error: 'database error' });
	}
});

app.get('/api/blogs', async (req, res) => {
	try {
		const result = await pool.query(
			`SELECT 
				blog_id, blog_title, blog_category, blog_read_time, 
				blog_author, blog_published_date, blog_description, blog_image_url, is_featured
			 FROM academy_blogs
			 ORDER BY display_order ASC`
		);
		res.json(result.rows);
	} catch (e) {
		console.error('Database error:', e);
		res.status(500).json({ error: 'database error' });
	}
});

app.get('/api/blogs/:id', async (req, res) => {
	try {
		const blogResult = await pool.query(
			`SELECT blog_id, blog_title, blog_category, blog_read_time,
				blog_author, blog_published_date, blog_description, blog_image_url
			 FROM academy_blogs WHERE blog_id = $1`,
			[req.params.id]
		);

		if (blogResult.rows.length === 0) {
			return res.status(404).json({ error: 'blog not found' });
		}

		const sectionsResult = await pool.query(
			`SELECT article_title, section_title, section_text, display_order
			 FROM blog_article_sections
			 WHERE article_title = $1
			 ORDER BY display_order ASC`,
			[blogResult.rows[0].blog_title]
		);

		res.json({ ...blogResult.rows[0], sections: sectionsResult.rows });
	} catch (e) {
		console.error('Database error:', e);
		res.status(500).json({ error: 'database error' });
	}
});
app.listen(port, () => console.log(`Server running on port ${port}`));
