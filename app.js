const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

const knownIpsPath = path.join(__dirname, 'list_ips.json');

// Função para ler o arquivo de IPs conhecidos
async function readKnownIps() {
  try {
    const data = await fs.readFile(knownIpsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Erro ao ler o arquivo known_ips.json: ${error.message}`);
    return {};
  }
}

// Função para escanear a rede usando o arp-scan
function scanNetwork() {
  return new Promise((resolve, reject) => {
    exec('arp-scan -l', (error, stdout, stderr) => {
      if (error) {
        return reject(`Erro ao executar arp-scan: ${error.message}`);
      }
      if (stderr) {
        return reject(`Erro: ${stderr}`);
      }
      resolve(stdout);
    });
  });
}

// Função para processar a saída do arp-scan
function parseArpScanOutput(output) {
  const lines = output.split('\n');
  const devices = [];

  lines.forEach(line => {
    const parts = line.split('\t');
    if (parts.length >= 3) {
      const ip = parts[0];
      const mac = parts[1];
      devices.push({ ip, mac});
    }
  });

  return devices;
}

// Função para exibir dispositivos conectados e registrar no log
async function displayAndLogDevices(devices, knownIps) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  const timeStr = now.toLocaleTimeString(); // Hora local da máquina
  const logFilePath = path.join(__dirname, `connection_log_${dateStr}.txt`);
  const logEntries = [];

  console.log('Dispositivos conectados à rede:');
  devices.forEach(device => {
    const knownName = knownIps[device.ip] || 'Desconhecido';
    const logEntry = `[${dateStr} ${timeStr}] IP: ${device.ip}, MAC: ${device.mac}, Nome Conhecido: ${knownName}`;
    logEntries.push(logEntry);
    console.log(logEntry);
  });

  await fs.appendFile(logFilePath, logEntries.join('\n') + '\n');
}

// Função principal para monitorar a rede
async function monitorNetwork() {
  try {
    const knownIps = await readKnownIps();
    const output = await scanNetwork();
    const devices = parseArpScanOutput(output);
    await displayAndLogDevices(devices, knownIps);
  } catch (error) {
    console.error(error);
  }
}

// Monitore a rede a cada 60 segundos
setInterval(monitorNetwork, 60000);

// Execute a primeira varredura imediatamente
monitorNetwork();
