
# 💸 Billing System

A full-stack **Billing Software** solution with real-time payment integration and cloud-based storage.

## 📌 Overview

This project is a comprehensive billing system built with a modern tech stack to handle invoicing, secure payments, and file storage.

- **Frontend**: Vite + React.js + TypeScript
- **Backend**: Spring Boot (REST API) + MySQL
- **Payment Gateway**: Razorpay
- **Cloud Storage**: AWS S3

🎥 A [demo video](https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7340967285064429568?compact=1) is available to showcase the complete workflow.

---

## 📁 Project Structure

```
billingsoftware/
├── client/                 # Frontend: React + TypeScript (Vite)
│   └── src/
│       └── components/
│       └── pages/
│       └── services/
├── billingsoftware/                 # Backend: Spring Boot
│   └── src/
│       └── main/
│           └── java/
│           └── resources/
├── README.md
└── ...
```

---

## ⚙️ Features

✅ User-friendly UI for managing bills  
✅ Secure payment integration with Razorpay  
✅ Upload/download invoices to AWS S3  
✅ MySQL database for persistent billing records  
✅ Modular frontend with React + Vite  
✅ Robust REST API with Spring Boot

---

## 🚀 Getting Started

### 🧑‍💻 Frontend (React + Vite)

```bash
cd billingsoftware/client
npm install
npm run dev
```

### 🛠️ Backend (Spring Boot)

Make sure MySQL is running and update the `application.properties` file accordingly.

```bash
cd billingsoftware/billingsoftware
./mvnw spring-boot:run
```

---

## 🗃️ Database Setup

1. Create a database named `billing_system`.
2. Import the provided schema (if available).
3. Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/billing_system
spring.datasource.username=your_mysql_user
spring.datasource.password=your_mysql_password
```

---

## 🔐 Razorpay Integration

- Create a Razorpay account and generate `KEY_ID` and `KEY_SECRET`.
- Configure these in your backend environment (via properties or `.env`).

---

## ☁️ AWS S3 Setup

- Create an AWS S3 bucket.
- Store the bucket name and credentials securely (e.g., environment variables).
- Update the backend to read from AWS credentials for file upload/download.

---

## 🧪 Future Enhancements

- JWT-based authentication
- Role-based access (Admin/User)
- Downloadable PDF invoices
- Stripe or PayPal integration (optional)

---

## 📽️ Demo

➡️ [Click to watch the video demo](https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7340967285064429568?compact=1)

---

## 🧑‍💻 Author

**Pavan Kumar Mistry**  
📍 Glassboro, NJ  
📧 mistrypavankumar2304@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/pavan-kumar-mistry-5067b21b1) | [GitHub](https://github.com/mistrypavankumar) | [Portfolio](https://pavankumarmistry-portfolio.vercel.app)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).


---

## 🔐 Environment Configuration

Update your `application.properties` file in the backend (`server/src/main/resources/`) with the following template:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/billingdb
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update

# Server Context Path
server.servlet.context-path=/api/v1.0

# AWS S3 Configuration
aws.access.key=${AWS_ACCESS_KEY}
aws.secret.key=${AWS_SECRET_KEY}
aws.region=${AWS_REGION}
aws.bucket.name=${AWS_BUCKET_NAME}

# JWT Configuration
jwt.secret.key=${JWT_SECRET_KEY}

# Razorpay Configuration
razorpay.key.id=${RAZORPAY_KEY_ID}
razorpay.key.secret=${RAZORPAY_KEY_SECRET}
```
