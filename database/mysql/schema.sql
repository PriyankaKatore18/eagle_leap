CREATE DATABASE IF NOT EXISTS `eagleleap`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `eagleleap`;

CREATE TABLE IF NOT EXISTS roles (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  code VARCHAR(64) NOT NULL,
  name VARCHAR(120) NOT NULL,
  description VARCHAR(255) NULL,
  is_system TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_roles_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS permissions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  code VARCHAR(128) NOT NULL,
  name VARCHAR(120) NOT NULL,
  description VARCHAR(255) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_permissions_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(191) NOT NULL,
  mobile VARCHAR(20) NULL,
  password_hash VARCHAR(255) NOT NULL,
  primary_account_type ENUM('admin', 'author', 'buyer', 'distributor') NOT NULL,
  status ENUM('pending', 'active', 'disabled', 'rejected') NOT NULL DEFAULT 'pending',
  profile_photo_url VARCHAR(255) NULL,
  bio TEXT NULL,
  business_name VARCHAR(191) NULL,
  distributor_discount DECIMAL(5,2) NULL,
  last_login_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_public_id (public_id),
  UNIQUE KEY uq_users_email (email),
  UNIQUE KEY uq_users_mobile (mobile),
  KEY idx_users_account_status (primary_account_type, status),
  KEY idx_users_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id BIGINT UNSIGNED NOT NULL,
  permission_id BIGINT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (role_id, permission_id),
  CONSTRAINT fk_role_permissions_role
    FOREIGN KEY (role_id) REFERENCES roles(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_role_permissions_permission
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS user_roles (
  user_id BIGINT UNSIGNED NOT NULL,
  role_id BIGINT UNSIGNED NOT NULL,
  is_primary TINYINT(1) NOT NULL DEFAULT 0,
  assigned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, role_id),
  KEY idx_user_roles_role (role_id),
  CONSTRAINT fk_user_roles_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_user_roles_role
    FOREIGN KEY (role_id) REFERENCES roles(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS media_library (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  folder_name VARCHAR(120) NOT NULL DEFAULT 'general',
  file_name VARCHAR(191) NOT NULL,
  original_name VARCHAR(191) NOT NULL,
  mime_type VARCHAR(120) NOT NULL,
  file_extension VARCHAR(20) NULL,
  file_size_bytes BIGINT UNSIGNED NOT NULL DEFAULT 0,
  storage_path VARCHAR(255) NOT NULL,
  public_url VARCHAR(255) NULL,
  alt_text VARCHAR(255) NULL,
  uploaded_by_user_id BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_media_public_id (public_id),
  KEY idx_media_folder_name (folder_name),
  KEY idx_media_uploaded_by_user (uploaded_by_user_id),
  CONSTRAINT fk_media_uploaded_by_user
    FOREIGN KEY (uploaded_by_user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS settings (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  setting_group VARCHAR(80) NOT NULL,
  setting_key VARCHAR(120) NOT NULL,
  setting_value_json JSON NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_settings_group_key (setting_group, setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cms_pages (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(120) NOT NULL,
  page_name VARCHAR(120) NOT NULL,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'published',
  hero_title VARCHAR(255) NOT NULL,
  hero_subtitle TEXT NULL,
  hero_image_media_id BIGINT UNSIGNED NULL,
  seo_title VARCHAR(255) NULL,
  meta_description VARCHAR(255) NULL,
  og_media_id BIGINT UNSIGNED NULL,
  created_by_user_id BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_cms_pages_slug (slug),
  KEY idx_cms_pages_status (status),
  CONSTRAINT fk_cms_pages_hero_image
    FOREIGN KEY (hero_image_media_id) REFERENCES media_library(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_cms_pages_og_image
    FOREIGN KEY (og_media_id) REFERENCES media_library(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_cms_pages_created_by_user
    FOREIGN KEY (created_by_user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cms_sections (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  page_id BIGINT UNSIGNED NOT NULL,
  section_key VARCHAR(120) NOT NULL,
  heading VARCHAR(255) NULL,
  subheading TEXT NULL,
  body_text LONGTEXT NULL,
  cta_label VARCHAR(120) NULL,
  cta_url VARCHAR(255) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  settings_json JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_cms_sections_page_key (page_id, section_key),
  KEY idx_cms_sections_sort_order (page_id, sort_order),
  CONSTRAINT fk_cms_sections_page
    FOREIGN KEY (page_id) REFERENCES cms_pages(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS call_for_papers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  submission_deadline DATE NOT NULL,
  publication_date DATE NOT NULL,
  publication_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  publication_type ENUM('ISBN', 'ISSN') NOT NULL DEFAULT 'ISBN',
  mode VARCHAR(150) NOT NULL,
  brochure_media_id BIGINT UNSIGNED NULL,
  status ENUM('active', 'closed') NOT NULL DEFAULT 'active',
  description TEXT NULL,
  created_by_user_id BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_call_for_papers_public_id (public_id),
  KEY idx_call_for_papers_status_deadline (status, submission_deadline),
  KEY idx_call_for_papers_publication_date (publication_date),
  CONSTRAINT fk_call_for_papers_brochure_media
    FOREIGN KEY (brochure_media_id) REFERENCES media_library(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_call_for_papers_created_by_user
    FOREIGN KEY (created_by_user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS journals (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  journal_name VARCHAR(255) NOT NULL,
  issn VARCHAR(50) NOT NULL,
  journal_type VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  website_url VARCHAR(255) NULL,
  current_issue_url VARCHAR(255) NULL,
  cover_media_id BIGINT UNSIGNED NULL,
  status ENUM('active', 'coming_soon') NOT NULL DEFAULT 'active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_journals_public_id (public_id),
  UNIQUE KEY uq_journals_name (journal_name),
  KEY idx_journals_status (status),
  CONSTRAINT fk_journals_cover_media
    FOREIGN KEY (cover_media_id) REFERENCES media_library(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS publications (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  slug VARCHAR(160) NOT NULL,
  title VARCHAR(255) NOT NULL,
  author_name VARCHAR(191) NOT NULL,
  author_user_id BIGINT UNSIGNED NULL,
  journal_id BIGINT UNSIGNED NULL,
  publication_type ENUM('Book', 'ISBN Paper', 'Edited Book') NOT NULL,
  category ENUM('Books', 'Edited Books', 'Articles', 'Chapters', 'Papers') NOT NULL,
  isbn VARCHAR(50) NOT NULL,
  edition VARCHAR(80) NULL,
  publication_date DATE NOT NULL,
  publication_year YEAR NOT NULL,
  description LONGTEXT NULL,
  cover_media_id BIGINT UNSIGNED NULL,
  pdf_media_id BIGINT UNSIGNED NULL,
  certificate_media_id BIGINT UNSIGNED NULL,
  featured TINYINT(1) NOT NULL DEFAULT 0,
  seo_title VARCHAR(255) NULL,
  meta_description VARCHAR(255) NULL,
  created_by_user_id BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_publications_public_id (public_id),
  UNIQUE KEY uq_publications_slug (slug),
  KEY idx_publications_featured_date (featured, publication_date),
  KEY idx_publications_type_category (publication_type, category),
  KEY idx_publications_author_name (author_name),
  FULLTEXT KEY ft_publications_title_description (title, description),
  CONSTRAINT fk_publications_author_user
    FOREIGN KEY (author_user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_publications_journal
    FOREIGN KEY (journal_id) REFERENCES journals(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_publications_cover_media
    FOREIGN KEY (cover_media_id) REFERENCES media_library(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_publications_pdf_media
    FOREIGN KEY (pdf_media_id) REFERENCES media_library(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_publications_certificate_media
    FOREIGN KEY (certificate_media_id) REFERENCES media_library(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_publications_created_by_user
    FOREIGN KEY (created_by_user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS certificates (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  publication_id BIGINT UNSIGNED NOT NULL,
  recipient_user_id BIGINT UNSIGNED NULL,
  certificate_type ENUM('publication', 'author', 'editor', 'review') NOT NULL DEFAULT 'publication',
  certificate_number VARCHAR(80) NULL,
  file_media_id BIGINT UNSIGNED NULL,
  issued_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_certificates_public_id (public_id),
  KEY idx_certificates_publication (publication_id),
  CONSTRAINT fk_certificates_publication
    FOREIGN KEY (publication_id) REFERENCES publications(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_certificates_recipient_user
    FOREIGN KEY (recipient_user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_certificates_file_media
    FOREIGN KEY (file_media_id) REFERENCES media_library(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS products (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  slug VARCHAR(160) NOT NULL,
  title VARCHAR(255) NOT NULL,
  author_name VARCHAR(191) NOT NULL,
  publication_id BIGINT UNSIGNED NULL,
  category VARCHAR(120) NOT NULL,
  format ENUM('Ebook', 'Hard Copy', 'Both') NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  description LONGTEXT NULL,
  cover_media_id BIGINT UNSIGNED NULL,
  ebook_media_id BIGINT UNSIGNED NULL,
  isbn VARCHAR(50) NULL,
  publication_year YEAR NULL,
  stock_quantity INT NOT NULL DEFAULT 0,
  featured TINYINT(1) NOT NULL DEFAULT 0,
  new_arrival TINYINT(1) NOT NULL DEFAULT 0,
  popular TINYINT(1) NOT NULL DEFAULT 0,
  viewer_access_enabled TINYINT(1) NOT NULL DEFAULT 1,
  download_disabled TINYINT(1) NOT NULL DEFAULT 1,
  watermark_enabled TINYINT(1) NOT NULL DEFAULT 1,
  purchase_required TINYINT(1) NOT NULL DEFAULT 1,
  seo_title VARCHAR(255) NULL,
  meta_description VARCHAR(255) NULL,
  created_by_user_id BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_products_public_id (public_id),
  UNIQUE KEY uq_products_slug (slug),
  KEY idx_products_category_format (category, format),
  KEY idx_products_featured_flags (featured, new_arrival, popular),
  KEY idx_products_stock_quantity (stock_quantity),
  CONSTRAINT fk_products_publication
    FOREIGN KEY (publication_id) REFERENCES publications(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_products_cover_media
    FOREIGN KEY (cover_media_id) REFERENCES media_library(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_products_ebook_media
    FOREIGN KEY (ebook_media_id) REFERENCES media_library(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_products_created_by_user
    FOREIGN KEY (created_by_user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS user_addresses (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  address_label VARCHAR(80) NOT NULL DEFAULT 'primary',
  recipient_name VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  line_1 VARCHAR(191) NOT NULL,
  line_2 VARCHAR(191) NULL,
  city VARCHAR(120) NOT NULL,
  state VARCHAR(120) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  country VARCHAR(120) NOT NULL DEFAULT 'India',
  is_default TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_user_addresses_user_default (user_id, is_default),
  CONSTRAINT fk_user_addresses_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS carts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  status ENUM('active', 'ordered', 'abandoned') NOT NULL DEFAULT 'active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_carts_user_status (user_id, status),
  CONSTRAINT fk_carts_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cart_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  cart_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  format_selected ENUM('Ebook', 'Hard Copy') NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_cart_items_cart_product_format (cart_id, product_id, format_selected),
  KEY idx_cart_items_product (product_id),
  CONSTRAINT fk_cart_items_cart
    FOREIGN KEY (cart_id) REFERENCES carts(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_cart_items_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS wishlists (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_wishlists_user_product (user_id, product_id),
  KEY idx_wishlists_product (product_id),
  CONSTRAINT fk_wishlists_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_wishlists_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS publish_requests (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  requester_user_id BIGINT UNSIGNED NULL,
  full_name VARCHAR(150) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  email VARCHAR(191) NOT NULL,
  book_title VARCHAR(255) NOT NULL,
  number_of_pages INT NOT NULL DEFAULT 0,
  language VARCHAR(80) NULL,
  book_type VARCHAR(80) NOT NULL,
  selected_package VARCHAR(120) NOT NULL,
  manuscript_media_id BIGINT UNSIGNED NULL,
  message TEXT NULL,
  status ENUM('new', 'contacted', 'in_discussion', 'payment_pending', 'in_process', 'completed') NOT NULL DEFAULT 'new',
  assigned_to_user_id BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_publish_requests_public_id (public_id),
  KEY idx_publish_requests_status_created (status, created_at),
  KEY idx_publish_requests_email_mobile (email, mobile),
  KEY idx_publish_requests_book_title (book_title),
  CONSTRAINT fk_publish_requests_requester_user
    FOREIGN KEY (requester_user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_publish_requests_manuscript_media
    FOREIGN KEY (manuscript_media_id) REFERENCES media_library(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_publish_requests_assigned_user
    FOREIGN KEY (assigned_to_user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS printing_enquiries (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  name VARCHAR(150) NOT NULL,
  organization_name VARCHAR(191) NULL,
  mobile VARCHAR(20) NOT NULL,
  service_type ENUM('ID Card', 'College Magazine', 'Practical Books', 'Momento & Awards') NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  message TEXT NULL,
  attachment_media_id BIGINT UNSIGNED NULL,
  status ENUM('new', 'quoted', 'approved', 'in_production', 'delivered') NOT NULL DEFAULT 'new',
  assigned_to_user_id BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_printing_enquiries_public_id (public_id),
  KEY idx_printing_enquiries_status_created (status, created_at),
  KEY idx_printing_enquiries_service_type (service_type),
  CONSTRAINT fk_printing_enquiries_attachment_media
    FOREIGN KEY (attachment_media_id) REFERENCES media_library(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_printing_enquiries_assigned_user
    FOREIGN KEY (assigned_to_user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS paper_submissions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  call_for_paper_id BIGINT UNSIGNED NOT NULL,
  author_user_id BIGINT UNSIGNED NULL,
  author_name VARCHAR(150) NOT NULL,
  paper_title VARCHAR(255) NOT NULL,
  email VARCHAR(191) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  subject_area VARCHAR(120) NOT NULL,
  uploaded_media_id BIGINT UNSIGNED NULL,
  message TEXT NULL,
  payment_status ENUM('pending', 'paid') NOT NULL DEFAULT 'pending',
  publication_status ENUM('submitted', 'under_review', 'accepted', 'rejected', 'payment_pending', 'published') NOT NULL DEFAULT 'submitted',
  publication_id BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_paper_submissions_public_id (public_id),
  KEY idx_paper_submissions_statuses (publication_status, payment_status),
  KEY idx_paper_submissions_call_for_paper (call_for_paper_id),
  KEY idx_paper_submissions_author_email (author_name, email),
  CONSTRAINT fk_paper_submissions_call_for_paper
    FOREIGN KEY (call_for_paper_id) REFERENCES call_for_papers(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_paper_submissions_author_user
    FOREIGN KEY (author_user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_paper_submissions_uploaded_media
    FOREIGN KEY (uploaded_media_id) REFERENCES media_library(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_paper_submissions_publication
    FOREIGN KEY (publication_id) REFERENCES publications(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS orders (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  order_number VARCHAR(40) NOT NULL,
  buyer_user_id BIGINT UNSIGNED NOT NULL,
  distributor_user_id BIGINT UNSIGNED NULL,
  address_id BIGINT UNSIGNED NULL,
  customer_name VARCHAR(150) NOT NULL,
  customer_email VARCHAR(191) NULL,
  customer_mobile VARCHAR(20) NULL,
  shipping_line_1 VARCHAR(191) NOT NULL,
  shipping_line_2 VARCHAR(191) NULL,
  shipping_city VARCHAR(120) NOT NULL,
  shipping_state VARCHAR(120) NOT NULL,
  shipping_postal_code VARCHAR(20) NOT NULL,
  shipping_country VARCHAR(120) NOT NULL DEFAULT 'India',
  subtotal_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  discount_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  shipping_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  tax_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  total_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  payment_status ENUM('pending', 'paid', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
  shipping_status ENUM('new_order', 'processing', 'packed', 'shipped', 'delivered', 'cancelled') NOT NULL DEFAULT 'new_order',
  tracking_id VARCHAR(120) NULL,
  payment_reference VARCHAR(120) NULL,
  ordered_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  shipped_at DATETIME NULL,
  delivered_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_orders_public_id (public_id),
  UNIQUE KEY uq_orders_order_number (order_number),
  KEY idx_orders_buyer_created (buyer_user_id, created_at),
  KEY idx_orders_statuses (payment_status, shipping_status),
  KEY idx_orders_tracking_id (tracking_id),
  CONSTRAINT fk_orders_buyer_user
    FOREIGN KEY (buyer_user_id) REFERENCES users(id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_orders_distributor_user
    FOREIGN KEY (distributor_user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_orders_address
    FOREIGN KEY (address_id) REFERENCES user_addresses(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS order_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  format_selected ENUM('Ebook', 'Hard Copy') NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  line_total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_order_items_order (order_id),
  KEY idx_order_items_product (product_id),
  CONSTRAINT fk_order_items_order
    FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_order_items_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ebook_access_sessions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  order_id BIGINT UNSIGNED NULL,
  session_token VARCHAR(191) NOT NULL,
  watermark_text VARCHAR(191) NULL,
  ip_address VARCHAR(64) NULL,
  user_agent VARCHAR(255) NULL,
  last_viewed_at DATETIME NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_ebook_access_sessions_public_id (public_id),
  UNIQUE KEY uq_ebook_access_sessions_token (session_token),
  KEY idx_ebook_access_sessions_user_product (user_id, product_id),
  KEY idx_ebook_access_sessions_expires_at (expires_at),
  CONSTRAINT fk_ebook_access_sessions_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_ebook_access_sessions_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_ebook_access_sessions_order
    FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS author_profiles (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  pen_name VARCHAR(150) NULL,
  biography TEXT NULL,
  royalty_percentage DECIMAL(5,2) NOT NULL DEFAULT 10.00,
  bank_details_json JSON NULL,
  account_status ENUM('pending', 'approved', 'suspended') NOT NULL DEFAULT 'approved',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_author_profiles_user (user_id),
  CONSTRAINT fk_author_profiles_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS royalty_statements (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  author_profile_id BIGINT UNSIGNED NOT NULL,
  publication_id BIGINT UNSIGNED NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  units_sold INT NOT NULL DEFAULT 0,
  gross_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  royalty_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  statement_media_id BIGINT UNSIGNED NULL,
  generated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_royalty_statements_public_id (public_id),
  KEY idx_royalty_statements_profile_period (author_profile_id, period_start, period_end),
  CONSTRAINT fk_royalty_statements_author_profile
    FOREIGN KEY (author_profile_id) REFERENCES author_profiles(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_royalty_statements_publication
    FOREIGN KEY (publication_id) REFERENCES publications(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_royalty_statements_media
    FOREIGN KEY (statement_media_id) REFERENCES media_library(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS distributor_profiles (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  business_name VARCHAR(191) NOT NULL,
  contact_person VARCHAR(150) NULL,
  gst_number VARCHAR(30) NULL,
  margin_percentage DECIMAL(5,2) NOT NULL DEFAULT 30.00,
  minimum_order_quantity INT NOT NULL DEFAULT 10,
  bulk_pricing_json JSON NULL,
  status ENUM('pending', 'approved', 'rejected', 'suspended') NOT NULL DEFAULT 'pending',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_distributor_profiles_user (user_id),
  CONSTRAINT fk_distributor_profiles_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blogs (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  author_user_id BIGINT UNSIGNED NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(160) NOT NULL,
  featured_image_media_id BIGINT UNSIGNED NULL,
  content LONGTEXT NOT NULL,
  seo_title VARCHAR(255) NULL,
  meta_description VARCHAR(255) NULL,
  category VARCHAR(120) NOT NULL,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  publish_date DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_blogs_public_id (public_id),
  UNIQUE KEY uq_blogs_slug (slug),
  KEY idx_blogs_category_status_date (category, status, publish_date),
  FULLTEXT KEY ft_blogs_title_content (title, content),
  CONSTRAINT fk_blogs_author_user
    FOREIGN KEY (author_user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_blogs_featured_image_media
    FOREIGN KEY (featured_image_media_id) REFERENCES media_library(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS testimonials (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  user_id BIGINT UNSIGNED NULL,
  author_name VARCHAR(150) NOT NULL,
  designation VARCHAR(150) NULL,
  review_text TEXT NOT NULL,
  photo_media_id BIGINT UNSIGNED NULL,
  rating TINYINT UNSIGNED NOT NULL DEFAULT 5,
  show_on_home TINYINT(1) NOT NULL DEFAULT 1,
  show_on_about TINYINT(1) NOT NULL DEFAULT 0,
  show_on_packages TINYINT(1) NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_testimonials_public_id (public_id),
  KEY idx_testimonials_active_placements (is_active, show_on_home, show_on_about, show_on_packages),
  CONSTRAINT fk_testimonials_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_testimonials_photo_media
    FOREIGN KEY (photo_media_id) REFERENCES media_library(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contacts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  source ENUM('contact', 'publish_my_book', 'call_for_paper', 'printing') NOT NULL DEFAULT 'contact',
  name VARCHAR(150) NOT NULL,
  email VARCHAR(191) NULL,
  mobile VARCHAR(20) NULL,
  subject VARCHAR(255) NULL,
  message TEXT NULL,
  status ENUM('new', 'contacted', 'closed') NOT NULL DEFAULT 'new',
  follow_up_reminder_at DATETIME NULL,
  assigned_to_user_id BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_contacts_public_id (public_id),
  KEY idx_contacts_source_status_created (source, status, created_at),
  KEY idx_contacts_email_mobile (email, mobile),
  CONSTRAINT fk_contacts_assigned_user
    FOREIGN KEY (assigned_to_user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contact_notes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  contact_id BIGINT UNSIGNED NOT NULL,
  noted_by_user_id BIGINT UNSIGNED NULL,
  note_text TEXT NOT NULL,
  reminder_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_contact_notes_contact_created (contact_id, created_at),
  CONSTRAINT fk_contact_notes_contact
    FOREIGN KEY (contact_id) REFERENCES contacts(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_contact_notes_noted_by_user
    FOREIGN KEY (noted_by_user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS notifications (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  user_id BIGINT UNSIGNED NULL,
  role_id BIGINT UNSIGNED NULL,
  channel ENUM('dashboard', 'email', 'whatsapp') NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  delivery_status ENUM('queued', 'sent', 'read', 'failed') NOT NULL DEFAULT 'queued',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  sent_at DATETIME NULL,
  read_at DATETIME NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_notifications_public_id (public_id),
  KEY idx_notifications_channel_status_created (channel, delivery_status, created_at),
  CONSTRAINT fk_notifications_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_notifications_role
    FOREIGN KEY (role_id) REFERENCES roles(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS dashboard_activities (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  actor_user_id BIGINT UNSIGNED NULL,
  activity_type VARCHAR(80) NOT NULL,
  entity_type VARCHAR(80) NOT NULL,
  entity_id BIGINT UNSIGNED NULL,
  message VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_dashboard_activities_created_at (created_at),
  KEY idx_dashboard_activities_entity (entity_type, entity_id),
  CONSTRAINT fk_dashboard_activities_actor_user
    FOREIGN KEY (actor_user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS analytics_page_views (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  page_slug VARCHAR(160) NOT NULL,
  page_path VARCHAR(255) NOT NULL,
  view_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  unique_view_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  last_viewed_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_analytics_page_views_slug (page_slug),
  KEY idx_analytics_page_views_view_count (view_count),
  KEY idx_analytics_page_views_last_viewed_at (last_viewed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
