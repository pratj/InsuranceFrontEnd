FROM node:10-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build




FROM nginx:1.15.2-alpine
COPY ./build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
# ARG REACT_APP_STRIPE_KEY_ARG
# ENV REACT_APP_STRIPE_KEY=$REACT_APP_STRIPE_KEY_ARG
# ARG REACT_APP_BASE_URL_ARG
# ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL_ARG
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
