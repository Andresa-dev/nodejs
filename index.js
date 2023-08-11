const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function readAndProcessFile(filePath) {
  const start = new Date();

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      rl.close();
      return;
    }

    const lines = data.split('\n');
    let sumNumbers = 0;
    let textLineCount = 0;

    lines.forEach(line => {
      if (/^\d+$/.test(line)) {
        sumNumbers += parseInt(line, 10);
      } else if (line.trim() !== '') {
        textLineCount++;
      }
    });

    const end = new Date();
    const executionTime = end - start;

    console.log('Resumo:');
    console.log('---');
    console.log('Soma dos números dentro do arquivo:', sumNumbers);
    console.log('Quantidade de linhas com texto:', textLineCount);
    console.log('Tempo de execução:', executionTime + 'ms');
    console.log('---');

    rl.question('Deseja executar novamente? (s/n): ', answer => {
      if (answer.toLowerCase() === 's') {
        rl.question('Digite o caminho do arquivo: ', readAndProcessFile);
      } else {
        rl.close();
      }
    });
  });
}

rl.question('Digite o caminho do arquivo: ', readAndProcessFile);
