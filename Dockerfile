# Use a imagem base do Node.js
FROM node:18.16.0-alpine3.17

# Crie o diretório de trabalho dentro do container
RUN mkdir -p /opt/app

# Defina o diretório de trabalho
WORKDIR /opt/app

# Copie os arquivos package.json e package-lock.json para o diretório de trabalho do container
COPY package.json package-lock.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos e diretórios do diretório atual para o diretório de trabalho do container
COPY . .

# Exponha a porta que a aplicação vai usar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]