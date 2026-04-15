# Bilim Merkezi - Backend API

## Gurnamak

```bash
cd server
npm install
```

## .env faýlyny düzet

```
MONGO_URI=mongodb://localhost:27017/bilim_merkezi
JWT_SECRET=gizlin_açar_bunu_üýtget
PORT=5000
```

## Işletmek

```bash
# Önümçilik
npm start

# Ösüş (auto-reload)
npm run dev
```

## API Endpoint-ler

### Auth
| Method | URL | Düşündiriş |
|--------|-----|-----------|
| POST | /api/auth/register | Hasaba al |
| POST | /api/auth/login | Giriş |
| GET | /api/auth/me | Öz maglumatym |

### Ulanyjy
| Method | URL | Düşündiriş |
|--------|-----|-----------|
| GET | /api/users/me | Profil |
| PUT | /api/users/me | Profil täzele |

### Ýazylmalar
| Method | URL | Düşündiriş |
|--------|-----|-----------|
| POST | /api/enrollments | Kursa ýazyl |
| GET | /api/enrollments/my | Meniň ýazylmalarym |
| PUT | /api/enrollments/:id/progress | Progress täzele |

### Kurslar
| Method | URL | Düşündiriş |
|--------|-----|-----------|
| GET | /api/courses | Ähli kurslar |
| GET | /api/courses/categories | Kategoriýalar |
| GET | /api/courses/:id | Bir kurs |

### Admin (diňe admin token bilen)
| Method | URL | Düşündiriş |
|--------|-----|-----------|
| GET | /api/admin/stats | Statistika |
| GET | /api/admin/users | Ähli ulanyjylar |
| DELETE | /api/admin/users/:id | Ulanyjy öçür |
| GET | /api/admin/enrollments | Ähli ýazylmalar |
| PUT | /api/admin/users/:id/toggle-admin | Admin et/aýyr |

## Admin ulanyjy döretmek

MongoDB-de ilkinji admin ulanyjyny döretmek üçin:

```js
// mongo shell ýa Compass-da:
db.users.updateOne({ email: "admin@email.com" }, { $set: { isAdmin: true } })
```
