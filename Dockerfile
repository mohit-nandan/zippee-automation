FROM cypress/included:13.6.2

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENTRYPOINT ["npx", "cypress", "run", "--browser", "chrome", "--headless"]
