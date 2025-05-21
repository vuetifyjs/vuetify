FROM nginx:alpine
EXPOSE 80
COPY ./packages/docs/dist /usr/share/nginx/html
COPY ./packages/docs/build/nginx.conf /etc/nginx/nginx.conf
