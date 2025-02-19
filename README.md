# Kashvi Creation - Premium Saree E-commerce Platform

![Kashvi Creation](https://github.com/Hitarth1810/KashviCreation/blob/1ca10cef291dc7f8abc0ea5c8a1dd84c4b2a4453/frontend/public/logo1.jpg)

## 🌟 Overview

Kashvi Creation is a modern e-commerce platform specialized in premium saree collections. Built with Next.js and a robust tech stack, this project delivers a seamless shopping experience with secure authentication, responsive design, and an intuitive admin dashboard.

## ✨ Features

- **Elegant UI/UX** - Crafted with Tailwind CSS, Framer Motion, and shadcn components
- **Secure Authentication** - JWT-based user authentication and authorization
- **Responsive Design** - Optimized shopping experience across all devices
- **Admin Dashboard** - Comprehensive sales analytics and inventory management
- **Order Management** - Real-time order tracking and processing
- **Invoice Generation** - Automated PDF invoice creation and download functionality
- **Image Optimization** - Cloudinary integration for efficient image delivery
- **Database Integration** - MongoDB with Prisma ORM for reliable data management
- **Customer Reviews** - Detailed product review system with ratings
- **Advanced Filters** - Multi-parameter search and filtering capabilities
- **Wishlist System** - Personalized product saving for future purchases

## 🛠️ Tech Stack

### Frontend
- **Next.js** - React framework with server-side rendering
- **Tailwind CSS** - Utility-first CSS framework for custom designs
- **Framer Motion** - Smooth animations and transitions
- **shadcn/ui** - High-quality UI components
- **React Hook Form** - Form validation and handling

### Backend
- **Next.js Server** - Server components and App Router for backend functionality
- **Server Actions** - Direct database mutations with built-in validation
- **API Routes** - RESTful endpoint handling for client-side requests
- **Prisma** - Type-safe database client and ORM
- **MongoDB** - NoSQL database for flexible data storage
- **JWT Authentication** - Secure user sessions and protected routes
- **Cloudinary** - Cloud-based image management

## 🖥️ Frontend Architecture

The frontend showcases an elegant design philosophy with attention to detail:

- **Micro-interactions** - Subtle animations enhance user engagement
- **Accessibility** - WCAG-compliant components for inclusive shopping
- **Performance Optimization** - Code splitting and lazy loading for fast page loads
- **Custom Theme** - Branded color scheme and typography
- **Product Galleries** - High-resolution image carousels with zoom functionality
- **Filter System** - Intuitive product filtering by category, price, color, fabric, and more
- **Search Functionality** - Real-time search with auto-suggestions
- **Wishlist UI** - Seamless saving and management of favorite products
- **Review Interface** - Star ratings and detailed review submission forms

## ⚙️ Backend Implementation

The backend leverages Next.js Server capabilities for a unified application architecture:

- **Server Components** - Database queries executed directly on the server
- **Server Actions** - Form submissions and mutations without API endpoints
- **Route Handlers** - Efficient API endpoints for client-side operations
- **Middleware** - Request authentication and processing using Next.js middleware
- **Data Validation** - Server-side validation using Zod schema validation
- **Error Handling** - Comprehensive error boundary implementation
- **Database Schema** - Optimized MongoDB schema design with Prisma
- **Search Indexing** - Efficient product search with MongoDB text indexing
- **Review System** - Secure storage and retrieval of customer reviews
- **Wishlist Management** - User-specific product collections

## 📊 Admin Dashboard

The administrative dashboard provides powerful business insights:

- **Sales Analytics** - Visual representations of sales trends
- **Inventory Management** - Real-time stock tracking and alerts
- **Order Processing** - Streamlined workflow for order fulfillment
- **Customer Management** - Customer data and purchase history
- **Invoice System** - Automated PDF invoice generation and delivery
- **Product Management** - Easy product catalog maintenance
- **Review Moderation** - Tools to approve and respond to customer reviews
- **Search Analytics** - Insights into customer search patterns

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- MongoDB instance
- Cloudinary account
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/kashvi-creation.git
cd kashvi-creation
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```
# Create a .env.local file with the following variables
DATABASE_URL="your_mongodb_connection_string"
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXT_PUBLIC_BASE_URL="your_base_url"
```

4. Run Prisma migrations
```bash
npx prisma generate
npx prisma db push
```

5. Start the development server
```bash
npm run dev
# or
yarn dev
```

## 📱 Responsive Design

The application is fully responsive across devices:
- **Mobile-first approach** - Optimized for smartphones
- **Tablet optimization** - Adjusted layouts for medium screens
- **Desktop experience** - Enhanced features for larger displays

## 🔍 Search and Filter System

The platform features a sophisticated search and filter system:
- **Full-text search** - Finds products based on keywords and descriptions
- **Category filtering** - Browse by saree type, occasion, or collection
- **Price range filters** - Shop within specific budget constraints
- **Material filters** - Find sarees by fabric type (silk, cotton, etc.)
- **Color selection** - Browse by preferred colors
- **Sorting options** - Arrange by popularity, price, or newest arrivals
- **Combined filters** - Apply multiple filters simultaneously

## 💫 Wishlist Functionality

The wishlist system allows customers to:
- **Save favorites** - Add products to personal collections
- **Sync across devices** - Access wishlist from any device when logged in
- **Quick add-to-cart** - Move wishlist items to shopping cart
- **Share wishlists** - Generate shareable links for friends and family
- **Stock notifications** - Receive alerts when wishlist items go on sale

## ⭐ Review System

The comprehensive review system includes:
- **Star ratings** - 1-5 star product evaluation
- **Verified purchase badges** - Highlights reviews from confirmed buyers
- **Photo uploads** - Customers can share product images
- **Helpful voting** - Community can mark reviews as helpful
- **Review management** - Admin tools for monitoring and responding

## 🔒 Security Features

- **Next.js middleware** for route protection
- **HTTP-only cookies** for secure token storage
- **CSRF protection** built into Next.js forms
- **Input sanitization** for XSS prevention
- **Role-based access control** for administrative functions


## 👥 Contributors

- Kuruv Patel - Fullstack Developer
- Hitarth Shah - Fullstack Developer
- Harshvardhan Gupta - Fronted Developer
- Utkarsh Pandey - Frontend Developer

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
