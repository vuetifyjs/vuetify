FROM caddy:2.10.0-alpine
COPY ./packages/docs/dist /srv
COPY ./packages/docs/build/Caddyfile /etc/caddy/Caddyfile
