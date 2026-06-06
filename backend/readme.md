# VendorBridge Backend

## Setup

### Clone Repository

```bash
git clone <repository-url>
cd server
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create `.env` from `.env.example`

```env
PORT=5000
MONGODB_URI=
JWT_SECRET=
```

### Run Development Server

```bash
npm run dev
```

---

## Project Structure

```text
src/
├── config/
├── middleware/
├── modules/
├── routes/
├── utils/
├── app.js
└── server.js
```

---

## Branch Naming

```text
feature/vendor-management
feature/rfq-module
feature/auth-system
fix/login-bug
```

---

## Commit Convention

```text
feat: add vendor registration
fix: resolve rfq validation bug
docs: update readme
refactor: simplify auth service
```

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

---

## Development Workflow

1. Pull latest main branch
2. Create feature branch
3. Implement feature
4. Push branch
5. Create Pull Request
6. Request review

```
```
