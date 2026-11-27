# WanderLust – Travel & Accommodation Platform

WanderLust is a full-stack travel accommodation platform inspired by Airbnb. It allows users to explore different places to stay, create and manage property listings, upload property images, and share their experiences through reviews.

The project focuses on building a practical web application with authentication, database management, image storage, and location-based features.

# Features

- **User Authentication:** Secure user registration and login using Passport.js.
- **Property Listings:** Create, view, edit, and delete accommodation listings.
- **Image Uploads:** Upload and manage property images using Cloudinary.
- **Reviews & Ratings:** Users can share their experiences by adding and managing reviews.
- **Location Mapping:** Display property locations using Mapbox.
- **Session Management:** Maintain user sessions with MongoDB session storage.
- **Authorization:** Restrict listing and review management to authorized users.
- **Responsive UI:** User-friendly interface built with EJS and Bootstrap.

# Tech Stack

**Frontend**
- HTML5
- CSS3
- JavaScript
- Bootstrap
- EJS

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Authentication & Storage**
- Passport.js
- Express-session
- Connect-Mongo
- Cloudinary
- Multer

**APIs & Deployment**
- Mapbox Geocoding API
- Render

# Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/tanzy77/WanderLust.git
```

2. Navigate to the project directory:

```bash
cd WanderLust
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and configure the following environment variables:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret

MAP_TOKEN=your_mapbox_access_token

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

5. Start the application:

```bash
node app.js
```

For development with Nodemon:

```bash
nodemon app.js
```

6. Open your browser:

```text
http://localhost:8080
```

# Environment Variables

Make sure to configure your MongoDB Atlas, Mapbox, and Cloudinary credentials before running the application.

**Important:** Never commit your `.env` file or expose your API credentials publicly.

# Deployment

The application is deployed using Render.

Deployment requires configuring the environment variables in the Render dashboard and connecting the GitHub repository.

# Learning Outcomes

Through this project, I gained practical experience in:

- Building RESTful routes using Express.js.
- Working with MongoDB and Mongoose.
- Implementing authentication and authorization.
- Handling file uploads and cloud image storage.
- Integrating third-party APIs.
- Managing sessions and application errors.
- Deploying a Node.js application.

# Author

**Tanmay Chavan**

GitHub: [@tanzy77](https://github.com/tanzy77)

---

⭐ If you find this project interesting, feel free to explore the repository!
