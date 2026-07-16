# Automatic production deployment

Every push to `main` starts the `Build and deploy production website` GitHub
Actions workflow. It installs the locked dependencies, creates the Angular
production build, and mirrors `dist/business-portfolio/browser/` to the web
server over FTPS.

The remote directory is cleared before upload. This removes obsolete Angular
files with hashes in their names, such as old `main-*.js`, `chunk-*.js`, and
`styles-*.css` files. For that reason, `FTP_SERVER_DIR` must point to a directory
dedicated to this website. Do not point it at a directory containing email,
backups, another website, or other files that need to be preserved.

## One-time GitHub setup

Open the GitHub repository, then go to **Settings > Secrets and variables >
Actions**.

Create these **repository secrets**:

- `FTP_SERVER`: hostname only, for example `ftp.example.com`
- `FTP_USERNAME`: the FTPS account username
- `FTP_PASSWORD`: the FTPS account password

Create these **repository variables** as required by the hosting provider:

- `FTP_SERVER_DIR`: remote web root, including a trailing slash, for example
  `public_html/`. If omitted, it defaults to `./` (the FTPS account root).
- `FTP_PORT`: defaults to `21`.
- `FTP_PROTOCOL`: defaults to `ftps` (explicit FTPS). Use `ftps-legacy` for
  implicit FTPS, which commonly uses port `990`. Use `ftp` only if the provider
  has no encrypted option.

The workflow uses a GitHub environment named `production`. It works without
extra environment configuration, but deployment approvals or protected
branches can be added under **Settings > Environments > production**.

After the secrets and any necessary variables are set, deploy with:

```shell
git push origin main
```

The push finishes before the remote build and upload finish. Deployment status
and logs are shown on the repository's **Actions** tab. A failed build never
starts the FTPS upload.

The workflow can also be started manually from **Actions > Build and deploy
production website > Run workflow**.
