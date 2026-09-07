# Deployment Guide

Full deliverable checklist in `docs/phases/phase-13-deployment.md`. This is the runbook.

---

## Read this first: the Hostinger constraint

**Hostinger shared hosting (Premium / Business web hosting) runs PHP and MySQL only. It cannot run
a Node.js process.** A server-rendered Next.js application will not work there. This is not a
configuration problem to solve — it is what those plans are.

**Production therefore needs Hostinger VPS (KVM 1, ~₹400–500/month)**, which is a real Ubuntu server.

Free alternatives that *do* run Node, ranked, if a VPS is not possible:

| Option | Free tier | Notes |
| --- | --- | --- |
| **Render** | 750h/mo web service | Sleeps when idle; cold start ~30s. Fine for a portfolio link. |
| **Railway** | Trial credit | Simplest deploy of the four. |
| **Fly.io** | Small free allowance | Global, more configuration. |
| **Koyeb** | One free service | Simple, generous enough. |

Last resort — static-export the public site (`output: 'export'`) onto Hostinger shared hosting and
run the application elsewhere. This splits the product and breaks shared navigation and session.
Avoid unless there is no alternative.

---

## Stage 1 — Local development (and the hackathon demo)

```bash
cd kaushalsetu/app
npm install
cp .env.example .env          # fill in the values
npm run db:reset              # migrate + seed the full demo world
npm run dev                   # http://localhost:3000
```

**The demo runs here.** SQLite file, no network dependency, nothing on venue wifi to fail.

Reset to a clean demo state at any time:
```bash
npm run db:reset && npm run db:seed:demo
```

LAN access (to show it on a phone):
```bash
npm run dev -- --hostname 0.0.0.0
# then http://<your-lan-ip>:3000
# Windows: allow Node through the firewall on the private network when prompted
```

## Stage 2 — Public URL, free, in five seconds

```bash
# once
winget install --id Cloudflare.cloudflared

# every time
cloudflared tunnel --url http://localhost:3000
```

Prints a public HTTPS URL serving the real app off your machine. No account, no card, no signup.
Ideal for submission forms, mentor reviews and sharing before production exists.

Set `NEXT_PUBLIC_SITE_URL` to the tunnel URL while using it, or canonicals and OG images will point
at `localhost`.

## Stage 3 — Hostinger VPS

### 3.1 Server preparation

```bash
# as root, first login
adduser deploy && usermod -aG sudo deploy
# copy your SSH key, then disable password auth:
#   /etc/ssh/sshd_config -> PasswordAuthentication no
systemctl restart ssh

apt update && apt upgrade -y
apt install -y ufw fail2ban nginx mysql-server git build-essential
ufw allow OpenSSH && ufw allow 'Nginx Full' && ufw enable
```

### 3.2 Node & PM2

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 22 && nvm use 22 && nvm alias default 22
npm i -g pm2
```

### 3.3 MySQL

```bash
mysql_secure_installation
mysql -u root -p
```
```sql
CREATE DATABASE kaushalsetu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'kaushal'@'localhost' IDENTIFIED BY '<strong-password>';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX, REFERENCES ON kaushalsetu.* TO 'kaushal'@'localhost';
FLUSH PRIVILEGES;
```
Least privilege: no `DROP`, no `GRANT`.

### 3.4 Application

```bash
sudo mkdir -p /var/www/kaushalsetu && sudo chown deploy:deploy /var/www/kaushalsetu
git clone <repo> /var/www/kaushalsetu && cd /var/www/kaushalsetu/app
npm ci
cp .env.example .env && chmod 600 .env      # edit: DATABASE_URL, NEXTAUTH_SECRET, NEXT_PUBLIC_SITE_URL
npx prisma migrate deploy
npm run db:seed:reference                   # reference data only — never demo data in production
npm run build
pm2 start npm --name kaushalsetu -- start
pm2 startup && pm2 save
pm2 install pm2-logrotate
```

Switch the Prisma provider to `mysql` in `schema.prisma` before the first production migration.

### 3.5 Nginx

`/etc/nginx/sites-available/kaushalsetu`:

```nginx
server {
  listen 80;
  server_name kaushalsetu.in www.kaushalsetu.in;

  gzip on;
  gzip_types text/plain text/css application/json application/javascript
             image/svg+xml application/xml;
  gzip_min_length 1000;

  client_max_body_size 10M;   # document uploads

  location /_next/static/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_cache_valid 200 365d;
    add_header Cache-Control "public, max-age=31536000, immutable";
  }

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
  }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/kaushalsetu /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 3.6 TLS

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d kaushalsetu.in -d www.kaushalsetu.in
sudo certbot renew --dry-run     # confirm auto-renewal actually works
```

### 3.7 Domain

A record `@` and `www` → the VPS IP. **Decide the canonical host** (with or without `www`), redirect
the other, and set `NEXT_PUBLIC_SITE_URL` to match — canonicals, sitemap and OG URLs all derive from
it. A mismatch here is the single most common post-launch SEO bug.

### 3.8 Backups — and a restore you have actually run

`/usr/local/bin/backup-kaushalsetu.sh`:

```bash
#!/bin/bash
set -euo pipefail
DATE=$(date +%F)
DEST=/var/backups/kaushalsetu
mkdir -p "$DEST"
mysqldump -u kaushal -p"$DB_PASS" kaushalsetu | gzip > "$DEST/db-$DATE.sql.gz"
tar czf "$DEST/uploads-$DATE.tar.gz" /var/www/kaushalsetu/uploads
find "$DEST" -mtime +7 -delete
```

```bash
sudo chmod +x /usr/local/bin/backup-kaushalsetu.sh
sudo crontab -e   # 0 2 * * * /usr/local/bin/backup-kaushalsetu.sh
```

**Then restore one into a scratch database and verify it.** An untested backup is not a backup.

### 3.9 Deploy & rollback

```bash
# deploy
cd /var/www/kaushalsetu && git pull
cd app && npm ci && npx prisma migrate deploy && npm run build && pm2 reload kaushalsetu

# rollback (target: under two minutes)
git checkout <previous-good-sha>
cd app && npm ci && npm run build && pm2 reload kaushalsetu
```

Practise the rollback once before you need it.

---

## Environment variables

| Variable | Dev | Production | Secret |
| --- | --- | --- | --- |
| `DATABASE_URL` | `file:./dev.db` | `mysql://kaushal:...@localhost:3306/kaushalsetu` | ✅ |
| `NEXTAUTH_SECRET` | any random string | `openssl rand -base64 32` | ✅ |
| `NEXTAUTH_URL` | `http://localhost:3000` | `https://kaushalsetu.in` | — |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | `https://kaushalsetu.in` | — |
| `SMTP_*` | unset (console transport) | Hostinger SMTP or Brevo free tier | ✅ |
| `UPLOAD_DIR` | `./uploads` | `/var/www/kaushalsetu/uploads` (outside web root) | — |
| `AI_ENABLED` | `false` | `false` until Phase 14 | — |
| `ANTHROPIC_API_KEY` | unset | set only when `AI_ENABLED=true` | ✅ |

`src/lib/env.ts` validates all of these at boot and fails loudly, by name, if one is missing.

## Post-deploy checklist

- [ ] `https://` loads, HTTP redirects to it, certificate valid
- [ ] `/api/health` returns 200; UptimeRobot configured against it
- [ ] `robots.txt` in production does **not** disallow the site (check twice)
- [ ] Canonicals resolve to the production host, not localhost
- [ ] `sitemap.xml` valid; submitted in Google Search Console
- [ ] Favicon served and crawlable
- [ ] Lighthouse re-run against production
- [ ] A backup has been taken *and restored*
- [ ] A rollback has been performed and timed
