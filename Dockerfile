FROM node:10-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build




FROM nginx:1.17.1-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
# ARG REACT_APP_STRIPE_KEY_ARG
# ENV REACT_APP_STRIPE_KEY=$REACT_APP_STRIPE_KEY_ARG
# ARG REACT_APP_BASE_URL_ARG
# ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL_ARG
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
