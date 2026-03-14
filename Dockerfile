FROM cypress/included:15.10.0

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENTRYPOINT ["npx", "cypress", "run", "--browser", "chrome"]
