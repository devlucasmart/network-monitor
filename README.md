# Network-monitor

Este projeto é um sistema em Node.js que monitora quem acessa a mesma rede que você. Ele utiliza a biblioteca `arp-scan` para realizar uma varredura na rede local e identificar dispositivos ativos. Este README fornece uma visão geral do projeto, instruções para instalação e uso, bem como uma explicação sobre como ele funciona.

## Funcionalidades

- Detecta dispositivos conectados à rede local.
- Exibe informações sobre cada dispositivo, como endereço IP e endereço MAC.
- Monitora constantemente a rede para detectar novos dispositivos.
- Cria um arquivo de log do dia da analise.

## Pré-requisitos

- Node.js (versão 12 ou superior)
- NPM (Node Package Manager)
- `arp-scan` instalado no seu sistema

## Instalação do `arp-scan`

### Ubuntu/Debian

```sh
sudo apt-get update
sudo apt-get install arp-scan
