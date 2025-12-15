# ShopFood Project

## Giới thiệu

**ShopFood** là **ứng dụng đặt đồ ăn và thức uống trong quán** (mô hình _Order-in-Store_), giúp khách hàng **gọi món trực tiếp qua ứng dụng mà không cần chờ phục vụ**.  
Khách có thể:

- Xem **menu điện tử** đầy đủ (món ăn, đồ uống, combo, khuyến mãi),
- Đặt món và **thanh toán trực tuyến hoặc tại quầy**,
- Nhận thông báo về **thời gian dự kiến hoàn thành đơn hàng**,
- Giảm tối đa **thời gian chờ**, đặc biệt trong giờ cao điểm.

Đối với chủ quán, **ShopFood** giúp:

- Quản lý **đơn hàng, doanh thu, sản phẩm, nhân viên** trong cùng một hệ thống.
- Theo dõi **tình trạng bếp, thống kê bán hàng theo thời gian thực (real-time dashboard)**.
- Phân quyền chi tiết giữa **Admin** và **Staff** để tránh nhầm lẫn trong quản lý.

Ứng dụng hướng đến việc **tối ưu quy trình phục vụ** và **nâng cao trải nghiệm khách hàng** cho các **quán ăn, quán cà phê nhỏ và chuỗi cửa hàng**.

---

**ShopFood** là một hệ thống bán đồ ăn vặt trực tuyến, được xây dựng theo mô hình **Fullstack Web Application**.  
Dự án bao gồm 3 phần chính:

1. **Frontend** – Giao diện dành cho khách hàng mua hàng
2. **Admin** – Giao diện quản lý dành cho **Admin** và **Staff**
3. **Backend** – Máy chủ API xử lý dữ liệu, xác thực, và phân quyền người dùng

---

### Frontend & Admin

- **ReactJS (Vite)** – Framework chính cho giao diện web
- **React Router** – Điều hướng trang
- **Axios** – Gửi yêu cầu HTTP đến Backend
- **Redux / Zustand / React Query** – Quản lý trạng thái (tùy chọn theo cách bạn triển khai)
- **TailwindCSS / SCSS** – Thiết kế giao diện
- **React Hook Form /** – Xử lý form và validate dữ liệu
- **Chart.js / Recharts** – Biểu đồ thống kê doanh thu, đơn hàng

---

## Công nghệ sử dụng

### Frontend & Admin

- **ReactJS (Vite)** – Xây dựng giao diện web nhanh và tối ưu
- **React Router** – Điều hướng trang
- **Axios** – Giao tiếp với Backend qua REST API
- **React Query / Zustand /** – Quản lý dữ liệu toàn cục
- **/ CSS thuan** – Thiết kế hiện đại, responsive
- **React Hook Form /** – Xử lý form và kiểm tra dữ liệu
- **Recharts / Chart.js** – Biểu đồ thống kê doanh thu, đơn hàng

### 🖥️ Backend

- **Node.js + Express.js** – Xây dựng API RESTful
- **MongoDB + Mongoose** – Cơ sở dữ liệu NoSQL
- **JWT Authentication** – Đăng nhập, phân quyền bảo mật
- **RBAC (Role-Based Access Control)** – Phân quyền Admin, Staff, Customer
- **Multer /** – Upload hình ảnh món ăn
- **dotenv / bcrypt / cors** – Bảo mật & logging hệ thống

---

## 🔐 Phân quyền hệ thống (RBAC)

| Vai trò           | Quyền hạn                                                              |
| ----------------- | ---------------------------------------------------------------------- |
| **Admin**         | Quản lý toàn bộ hệ thống, phân quyền người dùng, xem báo cáo doanh thu |
| **Staff Product** | Quản lý sản phẩm, danh mục, tồn kho                                    |
| **Staff Blogs**   | Quản lý các bài viết, theo dõi trạng thái bài viết                     |
| **Customer**      | Đặt hàng, theo dõi đơn, đánh giá món ăn, cập nhật thông tin cá nhân    |

---

## 🚀 Hướng dẫn cài đặt

### 1️⃣ Clone dự án

```bash
git clone https://github.com/luachs/ShopFood
cd shopfood
```

### 2️⃣ Cài đặt thư viện cho từng phần

```bash
cd backend && npm install
cd frontend && npm install
cd admin && npm install
```

### 3️⃣ Cấu hình môi trường (.env trong backend, frontent, admin)
<<<<<<< HEAD

**backend**

```
PORT=4000

#momo test keys (example public test)
MOMO_PARTNER_CODE=MOMO
MOMO_ACCESS_KEY=F8BBA842ECF85
MOMO_SECRET_KEY=K951B6PE1waDMi640xX08PD3vg6EkVlz
MOMO_REDIRECT_URL=http://localhost:3000
MOMO_IPN_URL=http://localhost:4000/payment/momo/ipn

# VNPay (sandbox/test)
VNP_TMN_CODE=BSCUX7JA
VNP_HASH_SECRET=L45F2XVKM9IH35BY127PP9M5AAJ8J4YY
VNP_RETURN_URL=http://localhost:3000
VNP_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html

# Bank info (for manual transfer)
BANK_ACCOUNT_NAME=ShopFood
BANK_ACCOUNT_NUMBER=123456789
BANK_NAME=Vietcombank

# mongoDB
MONGO_URI=mongodb://localhost:27017/shopfood
JWT_SECRET=super_secret_access
JWT_REFRESH_SECRET=super_secret_refresh
ADMIN_URL=http://localhost:5173
FRONTEND_URL=http://localhost:3000
COOKIE_DOMAIN=localhost

```

**frontend, admin**

```
VITE_ADMIN_URL=http://localhost:5173
VITE_FRONTEND_URL=http://localhost:3000
VITE_BACKEND_URL=http://localhost:4000
=======
**backend**
>>>>>>> 1bc30afe52c1428e4bed4d92c49396ff967ad3c1
```
PORT=4000

#momo test keys (example public test)
MOMO_PARTNER_CODE=MOMO
MOMO_ACCESS_KEY=F8BBA842ECF85
MOMO_SECRET_KEY=K951B6PE1waDMi640xX08PD3vg6EkVlz
MOMO_REDIRECT_URL=http://localhost:3000/payment-success
MOMO_IPN_URL=http://your-server.com/api/payment/momo/ipn

# VNPay (sandbox/test)
VNP_TMNCODE=YOUR_VNP_TMNCODE
VNP_HASHSECRET=YOUR_VNP_HASHSECRET
VNP_RETURN_URL=http://localhost:3000/payment-success
VNP_PAYMENT_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html

# Bank info (for manual transfer)
BANK_ACCOUNT_NAME=ShopFood
BANK_ACCOUNT_NUMBER=123456789
BANK_NAME=Vietcombank

# mongoDB 
MONGO_URI=mongodb://localhost:27017/shopfood
JWT_SECRET=super_secret_access
JWT_REFRESH_SECRET=super_secret_refresh
ADMIN_URL=http://localhost:5173
FRONTEND_URL=http://localhost:3000
COOKIE_DOMAIN=localhost
```
**frontend, admin** 
```
VITE_ADMIN_URL=http://localhost:5173
VITE_FRONTEND_URL=http://localhost:3000
VITE_BACKEND_URL=http://localhost:4000
```
### 4️⃣ Chạy từng phần

#### Backend

```bash
cd backend
npm run dev
```

#### Frontend (Trang khách hàng)

```bash
cd frontend
npm run dev
```

#### Admin (Trang quản trị)

```bash
cd admin
npm run dev
```

---

## 👨‍💻 Tác giả & Liên hệ

**Tác giả:** Nguyễn Phát  
**Dự án:** ShopFood – Ứng dụng đặt đồ ăn trong quán, tối ưu phục vụ & quản lý  
**Email:** phatnt1408@ut.edu.vn
