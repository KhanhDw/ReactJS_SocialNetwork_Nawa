# Stage 1: Build
FROM node:18-alpine AS builder

# Tạo thư mục app
WORKDIR /app

# Copy package.json và lock file
COPY package*.json ./

# Cài các dependency (chống lỗi peer bằng --legacy-peer-deps)
RUN npm install --legacy-peer-deps

# Copy toàn bộ source code vào container
COPY . .

# Cài TypeScript nếu chưa có (cần cho build)
RUN npm install --save-dev typescript --legacy-peer-deps

# Build TypeScript và Vite
RUN npx tsc -b && npm run build

# Stage 2: Serve app
FROM node:18-alpine

WORKDIR /app

# Chỉ copy những gì cần thiết
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Cài dependencies cần thiết để chạy
RUN npm install --production --legacy-peer-deps

# Cài vite để chạy server
RUN npm install -g vite

# Mở cổng 5173
EXPOSE 5173

# Chạy app bằng vite preview
CMD ["vite", "preview", "--port", "5173", "--host"]
