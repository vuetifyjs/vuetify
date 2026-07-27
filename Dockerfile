FROM caddy:2.10.2-alpine
COPY ./packages/docs/dist /srv
COPY ./packages/docs/build/Caddyfile /etc/caddy/Caddyfile
