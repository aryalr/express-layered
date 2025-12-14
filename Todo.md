# TODO LIST

## Database

### Prisma

1. Tambahkan model baru di prisma dengan nama user, dan admin
2. Buat relational database 1 to many dengan id user yang terhubung ke id product
3. Buat relational database 1 to many
dengan id admin yang terhubung ke user dan produk

## Authentication dan Authorization

### Authentication

1. Buat login user.
2. Buat login admin.

### Authorization

1. User hanya dapat CRUD produk yang dibuat oleh user itu sendiri.
Namun dapat melihat produk yang dibuat oleh user lainya.
2. Admin dapat mengubah dan melihat semua user dan produk
