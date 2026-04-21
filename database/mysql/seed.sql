USE `eagleleap`;

SET @now = NOW();

INSERT IGNORE INTO roles (code, name, description, is_system) VALUES
  ('super-admin', 'Super Admin', 'Full control across the platform.', 1),
  ('content-manager', 'Content Manager', 'Pages, blogs, testimonials, and CMS management.', 1),
  ('store-manager', 'Store Manager', 'Products, orders, stock, and ecommerce management.', 1),
  ('publication-manager', 'Publication Manager', 'Publications, certificates, and paper submission workflows.', 1),
  ('accounts-admin-support', 'Accounts/Admin Support', 'Payments, reports, and administrative support.', 1),
  ('author', 'Author', 'Author dashboard access.', 1),
  ('buyer', 'Buyer', 'Buyer account access.', 1),
  ('distributor', 'Distributor', 'Distributor account access.', 1);

INSERT IGNORE INTO permissions (code, name, description) VALUES
  ('cms.manage', 'Manage CMS', 'Manage website pages, sections, and footer content.'),
  ('publications.manage', 'Manage Publications', 'Manage publications, certificates, and publication metadata.'),
  ('call_for_papers.manage', 'Manage Call for Paper', 'Manage running titles and call-for-paper campaigns.'),
  ('paper_submissions.manage', 'Manage Paper Submissions', 'Review and publish paper submissions.'),
  ('store.manage', 'Manage Store', 'Manage products, stock, ebooks, and storefront content.'),
  ('orders.manage', 'Manage Orders', 'Manage customer orders and shipping workflows.'),
  ('users.manage', 'Manage Users', 'Manage users, roles, and account status.'),
  ('blogs.manage', 'Manage Blogs', 'Manage blog posts and publishing knowledge content.'),
  ('testimonials.manage', 'Manage Testimonials', 'Manage author and customer testimonials.'),
  ('media.manage', 'Manage Media', 'Upload and organize media library assets.'),
  ('leads.manage', 'Manage Leads', 'Manage contacts, publish requests, and printing enquiries.'),
  ('reports.view', 'View Reports', 'Access dashboard analytics and reports.'),
  ('settings.manage', 'Manage Settings', 'Manage site settings, SEO, and email configuration.'),
  ('author_dashboard.manage', 'Manage Author Dashboard', 'Update author publications, royalty data, and certificates.'),
  ('distributor.manage', 'Manage Distributor Dashboard', 'Manage distributor discounts, approvals, and bulk pricing.');

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p
WHERE
  (r.code = 'super-admin')
  OR (r.code = 'content-manager' AND p.code IN ('cms.manage', 'blogs.manage', 'testimonials.manage', 'media.manage', 'settings.manage'))
  OR (r.code = 'store-manager' AND p.code IN ('store.manage', 'orders.manage', 'media.manage', 'reports.view'))
  OR (r.code = 'publication-manager' AND p.code IN ('publications.manage', 'call_for_papers.manage', 'paper_submissions.manage', 'media.manage', 'author_dashboard.manage'))
  OR (r.code = 'accounts-admin-support' AND p.code IN ('orders.manage', 'leads.manage', 'reports.view', 'distributor.manage'))
ON DUPLICATE KEY UPDATE created_at = created_at;

INSERT IGNORE INTO users (
  public_id,
  full_name,
  email,
  mobile,
  password_hash,
  primary_account_type,
  status,
  business_name,
  distributor_discount,
  created_at,
  updated_at
) VALUES
  (UUID(), 'Super Admin', 'admin@eagleleap.in', '+91 9876543210', '$2a$10$RjX8UnFS1hESU7SuR0hapOyiRCDvqSL5yJnpUr91JHAb1neY1gOAK', 'admin', 'active', NULL, NULL, @now, @now),
  (UUID(), 'Dr. Priya Kulkarni', 'author@eagleleap.in', '+91 9898911111', '$2a$10$KZDBA6zpM7al9FkY6CpjlOv4XQUnu18aRpXYHeLbBYf/1XL9ClxHO', 'author', 'active', NULL, NULL, @now, @now),
  (UUID(), 'Rohan Joshi', 'buyer@eagleleap.in', '+91 9888822222', '$2a$10$Q1fmrrALvsECP1h7GlABruZjTBiY8Du1DJUB3H/mDFJ9IMXngUyDm', 'buyer', 'active', NULL, NULL, @now, @now),
  (UUID(), 'Campus Distribution Hub', 'distributor@eagleleap.in', '+91 9777733333', '$2a$10$K91N2NwWcJt5hMfJlqiuseAYon1tgYDATdMf2gannURP.VJ7Ylbiu', 'distributor', 'active', 'Campus Distribution Hub', 30.00, @now, @now);

INSERT INTO user_roles (user_id, role_id, is_primary)
SELECT u.id, r.id, 1
FROM users u
JOIN roles r
  ON (
    (u.email = 'admin@eagleleap.in' AND r.code = 'super-admin')
    OR (u.email = 'author@eagleleap.in' AND r.code = 'author')
    OR (u.email = 'buyer@eagleleap.in' AND r.code = 'buyer')
    OR (u.email = 'distributor@eagleleap.in' AND r.code = 'distributor')
  )
ON DUPLICATE KEY UPDATE is_primary = VALUES(is_primary);

INSERT INTO author_profiles (user_id, pen_name, biography, royalty_percentage, account_status)
SELECT u.id, 'Dr. Priya Kulkarni', 'Education researcher and academic contributor.', 12.50, 'approved'
FROM users u
WHERE u.email = 'author@eagleleap.in'
  AND NOT EXISTS (
    SELECT 1 FROM author_profiles ap WHERE ap.user_id = u.id
  );

INSERT INTO distributor_profiles (user_id, business_name, contact_person, margin_percentage, minimum_order_quantity, status)
SELECT u.id, 'Campus Distribution Hub', 'Sales Desk', 30.00, 10, 'approved'
FROM users u
WHERE u.email = 'distributor@eagleleap.in'
  AND NOT EXISTS (
    SELECT 1 FROM distributor_profiles dp WHERE dp.user_id = u.id
  );

INSERT IGNORE INTO settings (setting_group, setting_key, setting_value_json) VALUES
  ('general', 'site_identity', JSON_OBJECT('siteName', 'Eagle Leap Publication', 'location', 'Pune', 'email', 'hello@eagleleap.in', 'phone', '+91 9876543210')),
  ('general', 'social_links', JSON_OBJECT('facebook', '', 'instagram', '', 'linkedin', '', 'youtube', '')),
  ('seo', 'default_meta', JSON_OBJECT('title', 'Eagle Leap Publication', 'description', 'Publishing, journal, store, and printing ecosystem')),
  ('notifications', 'whatsapp', JSON_OBJECT('number', '919876543210', 'enabled', true));

INSERT INTO cms_pages (slug, page_name, status, hero_title, hero_subtitle, seo_title, meta_description, created_by_user_id)
SELECT 'home', 'Home', 'published', 'Publish Smarter. Grow Faster. Reach Wider.', 'Transform your ideas into professionally published books, research papers, and academic works with complete support from manuscript to marketplace.', 'Home | Eagle Leap Publication', 'Publishing, printing, call for paper, journal, and store ecosystem.', u.id
FROM users u
WHERE u.email = 'admin@eagleleap.in'
  AND NOT EXISTS (
    SELECT 1 FROM cms_pages WHERE slug = 'home'
  );

INSERT INTO cms_pages (slug, page_name, status, hero_title, hero_subtitle, seo_title, meta_description, created_by_user_id)
SELECT 'about', 'About', 'published', 'About Eagle Leap Publication', 'Empowering authors, researchers, and institutions through professional ISBN book publishing and ISSN journal publication.', 'About | Eagle Leap Publication', 'About Eagle Leap Publication and its mission, vision, and journey.', u.id
FROM users u
WHERE u.email = 'admin@eagleleap.in'
  AND NOT EXISTS (
    SELECT 1 FROM cms_pages WHERE slug = 'about'
  );

INSERT INTO cms_pages (slug, page_name, status, hero_title, hero_subtitle, seo_title, meta_description, created_by_user_id)
SELECT 'store', 'Store', 'published', 'Explore Our Book Store', 'Browse academic, research, and general books available in digital and printed formats.', 'Store | Eagle Leap Publication', 'Academic and research bookstore with ebooks and hard copy books.', u.id
FROM users u
WHERE u.email = 'admin@eagleleap.in'
  AND NOT EXISTS (
    SELECT 1 FROM cms_pages WHERE slug = 'store'
  );

INSERT INTO cms_sections (page_id, section_key, heading, body_text, sort_order, settings_json)
SELECT p.id, 'hero', 'Home Hero', 'Primary homepage hero content block.', 1, JSON_OBJECT('ctaPrimary', 'Start Publishing', 'ctaSecondary', 'Submit Paper')
FROM cms_pages p
WHERE p.slug = 'home'
  AND NOT EXISTS (
    SELECT 1 FROM cms_sections s WHERE s.page_id = p.id AND s.section_key = 'hero'
  );

INSERT INTO call_for_papers (public_id, title, submission_deadline, publication_date, publication_fee, publication_type, mode, status, description, created_by_user_id)
SELECT UUID(), 'Emerging Trends in Multidisciplinary Research 2026', '2026-05-30', '2026-06-20', 1499.00, 'ISBN', 'Online Publication / ISBN Edited Book', 'active', 'Monthly running title for multidisciplinary academic submissions.', u.id
FROM users u
WHERE u.email = 'admin@eagleleap.in'
  AND NOT EXISTS (
    SELECT 1 FROM call_for_papers WHERE title = 'Emerging Trends in Multidisciplinary Research 2026'
  );

INSERT IGNORE INTO journals (public_id, journal_name, issn, journal_type, description, website_url, current_issue_url, status) VALUES
  (UUID(), 'BODHIVRUKSHA JOURNAL OF DIVERSE DISCIPLINE', '3139-1486', 'Peer-Reviewed | Open Access | Multidisciplinary', 'A peer-reviewed, open-access, multidisciplinary journal providing a platform for researchers and academicians.', 'https://journal.example.com', 'https://journal.example.com/current-issue', 'active'),
  (UUID(), 'ARTHAVRUKSHA', 'COMING-SOON', 'Commerce, Finance & Management', 'Upcoming commerce and management journal.', NULL, NULL, 'coming_soon');

INSERT INTO publications (
  public_id,
  slug,
  title,
  author_name,
  author_user_id,
  publication_type,
  category,
  isbn,
  edition,
  publication_date,
  publication_year,
  description,
  featured,
  seo_title,
  meta_description,
  created_by_user_id
)
SELECT UUID(), 'multidisciplinary-perspectives-on-learning', 'Multidisciplinary Perspectives on Learning', 'Dr. Priya Kulkarni', au.id, 'Edited Book', 'Edited Books', '978-93-00000-11-1', 'First Edition', '2026-03-14', 2026, 'A curated edited volume featuring multidisciplinary research on education, management, and humanities.', 1, 'Multidisciplinary Perspectives on Learning', 'Edited book publication detail page.', admin.id
FROM users au
JOIN users admin ON admin.email = 'admin@eagleleap.in'
WHERE au.email = 'author@eagleleap.in'
  AND NOT EXISTS (
    SELECT 1 FROM publications WHERE slug = 'multidisciplinary-perspectives-on-learning'
  );

INSERT INTO products (
  public_id,
  slug,
  title,
  author_name,
  publication_id,
  category,
  format,
  price,
  description,
  isbn,
  publication_year,
  stock_quantity,
  featured,
  new_arrival,
  popular,
  viewer_access_enabled,
  download_disabled,
  watermark_enabled,
  purchase_required,
  created_by_user_id
)
SELECT UUID(), 'research-methods-for-applied-scholarship', 'Research Methods for Applied Scholarship', 'Prof. Sandesh D. Pahulakr', NULL, 'Academic Books', 'Both', 699.00, 'Printed and secure ebook format with academic-ready presentation.', '978-93-00000-08-1', 2025, 28, 1, 0, 1, 1, 1, 1, 1, admin.id
FROM users admin
WHERE admin.email = 'admin@eagleleap.in'
  AND NOT EXISTS (
    SELECT 1 FROM products WHERE slug = 'research-methods-for-applied-scholarship'
  );

INSERT INTO blogs (
  public_id,
  author_user_id,
  title,
  slug,
  content,
  seo_title,
  meta_description,
  category,
  status,
  publish_date
)
SELECT UUID(), admin.id, 'How ISBN Publication Helps First-Time Authors', 'how-isbn-publication-helps-first-time-authors', 'A practical guide to ISBN publishing, reader trust, and first-time author readiness.', 'ISBN Publication Guide for First-Time Authors', 'ISBN publishing checklist and benefits for first-time authors.', 'Publishing Tips', 'published', '2026-04-12 09:00:00'
FROM users admin
WHERE admin.email = 'admin@eagleleap.in'
  AND NOT EXISTS (
    SELECT 1 FROM blogs WHERE slug = 'how-isbn-publication-helps-first-time-authors'
  );

INSERT INTO testimonials (
  public_id,
  author_name,
  designation,
  review_text,
  rating,
  show_on_home,
  show_on_about,
  show_on_packages,
  is_active
)
SELECT UUID(), 'Anil Deshmukh', 'Author', 'Smooth publishing process and great support.', 5, 1, 1, 0, 1
WHERE NOT EXISTS (
  SELECT 1 FROM testimonials WHERE author_name = 'Anil Deshmukh'
);

INSERT INTO contacts (
  public_id,
  source,
  name,
  email,
  mobile,
  subject,
  message,
  status
)
SELECT UUID(), 'contact', 'Ritika Shah', 'ritika@example.com', '+91 9555511111', 'Book publishing enquiry', 'Need help with an academic title.', 'new'
WHERE NOT EXISTS (
  SELECT 1 FROM contacts WHERE email = 'ritika@example.com'
);

INSERT INTO publish_requests (
  public_id,
  full_name,
  mobile,
  email,
  book_title,
  number_of_pages,
  language,
  book_type,
  selected_package,
  message,
  status,
  assigned_to_user_id
)
SELECT UUID(), 'Sandesh Kulkarni', '+91 9011122222', 'sandesh@example.com', 'Modern Academic Publishing', 164, 'English', 'Academic', 'Academic Plus', 'Need ISBN and listing support.', 'contacted', admin.id
FROM users admin
WHERE admin.email = 'admin@eagleleap.in'
  AND NOT EXISTS (
    SELECT 1 FROM publish_requests WHERE email = 'sandesh@example.com'
  );

INSERT INTO printing_enquiries (
  public_id,
  name,
  organization_name,
  mobile,
  service_type,
  quantity,
  message,
  status,
  assigned_to_user_id
)
SELECT UUID(), 'Pragati College', 'Pragati College', '+91 9000011111', 'College Magazine', 600, 'Annual magazine with premium finish.', 'quoted', admin.id
FROM users admin
WHERE admin.email = 'admin@eagleleap.in'
  AND NOT EXISTS (
    SELECT 1 FROM printing_enquiries WHERE mobile = '+91 9000011111'
  );

INSERT INTO paper_submissions (
  public_id,
  call_for_paper_id,
  author_name,
  paper_title,
  email,
  mobile,
  subject_area,
  message,
  payment_status,
  publication_status
)
SELECT UUID(), cfp.id, 'Dr. Neha Patil', 'Digital Learning Models in Higher Education', 'neha@example.com', '+91 9666644444', 'Education', 'Interested in current running title publication.', 'paid', 'under_review'
FROM call_for_papers cfp
WHERE cfp.title = 'Emerging Trends in Multidisciplinary Research 2026'
  AND NOT EXISTS (
    SELECT 1 FROM paper_submissions WHERE email = 'neha@example.com'
  );

INSERT INTO user_addresses (
  user_id,
  address_label,
  recipient_name,
  phone,
  line_1,
  city,
  state,
  postal_code,
  country,
  is_default
)
SELECT u.id, 'primary', 'Rohan Joshi', '+91 9888822222', 'Shivajinagar', 'Pune', 'Maharashtra', '411005', 'India', 1
FROM users u
WHERE u.email = 'buyer@eagleleap.in'
  AND NOT EXISTS (
    SELECT 1 FROM user_addresses ua WHERE ua.user_id = u.id
  );

INSERT INTO orders (
  public_id,
  order_number,
  buyer_user_id,
  customer_name,
  customer_email,
  customer_mobile,
  shipping_line_1,
  shipping_city,
  shipping_state,
  shipping_postal_code,
  shipping_country,
  subtotal_amount,
  discount_amount,
  shipping_amount,
  tax_amount,
  total_amount,
  payment_status,
  shipping_status,
  tracking_id
)
SELECT UUID(), 'ELP-ORDER-1001', buyer.id, 'Rohan Joshi', 'buyer@eagleleap.in', '+91 9888822222', 'Shivajinagar', 'Pune', 'Maharashtra', '411005', 'India', 1398.00, 0.00, 80.00, 0.00, 1478.00, 'paid', 'shipped', 'ELP-TRACK-1001'
FROM users buyer
WHERE buyer.email = 'buyer@eagleleap.in'
  AND NOT EXISTS (
    SELECT 1 FROM orders WHERE order_number = 'ELP-ORDER-1001'
  );

INSERT INTO order_items (order_id, product_id, format_selected, quantity, unit_price, line_total)
SELECT o.id, p.id, 'Hard Copy', 2, 699.00, 1398.00
FROM orders o
JOIN products p ON p.slug = 'research-methods-for-applied-scholarship'
WHERE o.order_number = 'ELP-ORDER-1001'
  AND NOT EXISTS (
    SELECT 1 FROM order_items oi WHERE oi.order_id = o.id AND oi.product_id = p.id
  );

INSERT IGNORE INTO analytics_page_views (page_slug, page_path, view_count, unique_view_count, last_viewed_at) VALUES
  ('home', '/', 1200, 940, @now),
  ('store', '/store', 940, 760, @now),
  ('call-for-paper', '/call-for-paper', 810, 670, @now);

INSERT INTO dashboard_activities (actor_user_id, activity_type, entity_type, entity_id, message)
SELECT admin.id, 'seed', 'publish_request', pr.id, 'New book enquiry received'
FROM users admin
JOIN publish_requests pr ON pr.email = 'sandesh@example.com'
WHERE admin.email = 'admin@eagleleap.in'
  AND NOT EXISTS (
    SELECT 1 FROM dashboard_activities WHERE message = 'New book enquiry received'
  );

INSERT INTO dashboard_activities (actor_user_id, activity_type, entity_type, entity_id, message)
SELECT admin.id, 'seed', 'paper_submission', ps.id, 'New paper submitted'
FROM users admin
JOIN paper_submissions ps ON ps.email = 'neha@example.com'
WHERE admin.email = 'admin@eagleleap.in'
  AND NOT EXISTS (
    SELECT 1 FROM dashboard_activities WHERE message = 'New paper submitted'
  );

INSERT INTO notifications (public_id, channel, title, message, delivery_status)
SELECT UUID(), 'dashboard', 'Seed Completed', 'Initial roles, content, products, and leads inserted.', 'sent'
WHERE NOT EXISTS (
  SELECT 1 FROM notifications WHERE title = 'Seed Completed'
);
