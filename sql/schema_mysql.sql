CREATE TABLE IF NOT EXISTS portfolio_profile (
  id INT PRIMARY KEY DEFAULT 1,
  email VARCHAR(255), phone VARCHAR(50),
  github VARCHAR(255), linkedin VARCHAR(255),
  hero_photo_url TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  tags JSON,
  live_url TEXT, github_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS portfolio_project_images (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  project_id CHAR(36) NOT NULL,
  image_url TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (project_id) REFERENCES portfolio_projects(id) ON DELETE CASCADE
);
