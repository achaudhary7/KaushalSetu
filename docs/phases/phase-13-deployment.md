# Phase 13 — Deployment & Operations

| | |
| --- | --- |
| **Status** | ⬜ Not Started |
| **Depends on** | Phase 12 |
| **Blocks** | Nothing |
| **Estimate** | 4 focused hours |

## Objective

Get the application running somewhere real, repeatably, without Vercel and without surprises on the
day. The full runbook lives in `docs/DEPLOYMENT.md`; this phase produces and verifies it.

## The three environments

| Stage | Where | Database | Cost | Purpose |
| --- | --- | --- | --- | --- |
| **Development** | `localhost:3000` | SQLite file | Free | Daily work. **This is also the hackathon demo environment** — no network dependency, nothing to fail on venue wifi. |
| **Preview / sharing** | Cloudflare Tunnel over localhost | SQLite file | Free | A public HTTPS URL in seconds for teammates, mentors, and submission forms. No account, no card. |
| **Production** | Hostinger VPS (KVM 1) | MySQL 8 | ~₹400–500/mo | The real deployment. |

### The Hostinger warning, stated plainly

Hostinger's **shared** web hosting plans (Premium, Business) run PHP and MySQL only. They **cannot
run a Node.js process**, so a server-rendered Next.js application will not work on them. Production
therefore requires Hostinger's **VPS** tier — a real Ubuntu server you control.

*Fallbacks if a VPS is not viable:* Render, Railway, Fly.io or Koyeb all have free tiers that run
Node and are a better option than splitting the app. The last resort — a static export of the
public site on shared hosting with the application hosted elsewhere — works but fragments the
product; avoid unless forced.

## Deliverables

### Build & configuration
- [ ] Production `next.config.ts`: compression, security headers, image config, `output: 'standalone'`
- [ ] Environment matrix documented — every variable, per environment, with which are secret
- [ ] Prisma provider switch to MySQL, with the migration path from SQLite documented and tested
- [ ] Seed strategy for production: reference data yes, demo data no
- [ ] `npm run build` verified clean from a fresh clone

### Local & tunnel
- [ ] `README.md` quick start that works on a machine with nothing installed but Node
- [ ] `npm run db:reset` for a clean demo state in one command
- [ ] Cloudflare Tunnel recipe documented and tested end to end
- [ ] LAN access instructions (`--hostname 0.0.0.0`) plus the Windows firewall note

### Hostinger VPS runbook — `docs/DEPLOYMENT.md`
- [ ] Provision Ubuntu 24.04; create a non-root sudo user; SSH keys only, password auth disabled
- [ ] `ufw` allowing 22, 80, 443 only; fail2ban installed
- [ ] Node 22 LTS via nvm; pnpm or npm; build tools
- [ ] MySQL 8 installed, secured (`mysql_secure_installation`), application user with least privilege
- [ ] Application deployed to `/var/www/kaushalsetu`, `.env` with 600 permissions
- [ ] PM2: cluster mode, `pm2 startup`, `pm2 save`, log rotation configured
- [ ] Nginx reverse proxy: gzip and brotli, static asset caching headers, client body size limit,
      correct proxy headers, HTTP→HTTPS redirect
- [ ] Certbot TLS with auto-renewal verified by a dry run
- [ ] Domain and DNS: A record, `www` handling, and the canonical host decision (with or without
      `www`) reflected in `NEXT_PUBLIC_SITE_URL` so canonicals and the sitemap agree
- [ ] Uploaded documents stored outside the web root, served only through the authorised route
- [ ] **Backups:** nightly `mysqldump` plus the uploads directory, retained 7 days, and a
      **restore that has actually been tested** — an untested backup is not a backup
- [ ] Zero-downtime deploy script: pull, install, migrate, build, `pm2 reload`
- [ ] Rollback procedure, verified, under two minutes

### CI & monitoring
- [ ] GitHub Actions: install, typecheck, lint, unit tests, build on every push
- [ ] Playwright e2e in CI against a seeded SQLite database
- [ ] Uptime monitoring on `/api/health` (UptimeRobot free tier)
- [ ] Error and access log locations documented; PM2 log rotation confirmed

### Post-deploy SEO
- [ ] Verify the property in Google Search Console; submit `sitemap.xml`
- [ ] Confirm `robots.txt` serves correctly in production and does not block the site
- [ ] Confirm canonicals resolve to the production host, not localhost — the classic launch bug
- [ ] Request indexing on the home page; check the favicon is picked up
      (per `../SEO IMPs/Fevicon.txt`, this can take days to weeks — do it early)
- [ ] Re-run Lighthouse against production, not just localhost

## Acceptance criteria

1. A fresh clone builds and runs following only the README.
2. The tunnel produces a working public URL with the full app behind it.
3. The VPS deploy completes by following `docs/DEPLOYMENT.md` with no undocumented steps.
4. A backup has been restored into a scratch database and verified.
5. A rollback has been performed and timed.
6. Production canonicals, sitemap and robots all reference the production domain.

## Notes

- **Do the deployment work before you need it.** Discovering that shared hosting cannot run Node the
  night before a submission deadline is the single most predictable failure mode in this project,
  and it is already documented here so it cannot happen.
- Keep localhost as the demo path regardless of what production exists. Venue wifi is not a
  dependency you want on the critical path.

---

## Phase Summary

> **Fill this in before starting Phase 14. Mandatory.**

**What was built:**

**Environments as actually deployed, with URLs:**

**Deploy and rollback commands:**

**Backup schedule and verified restore date:**

**Deviations from the spec above, and why:**

**Anything the next phase must know:**

**Verified by:**
