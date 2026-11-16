# PCP – Planejamento e Controle Semanal

Aplicativo web para o planejamento e controle semanal de tarefas de obra. Ele tem os mesmos campos da planilha PCP: ID, serviço, local, responsável, previsto (P) × executado (E) dia a dia, tempo (S/CH) e % concluído.

O app é feito só de HTML, CSS e JavaScript. Não precisa de servidor nem de instalação e roda direto no **GitHub Pages**.

## Funcionalidades

- **Várias obras**, cada uma com nome e data de término.
- **Planejamentos de duas semanas**, de segunda a sábado. As semanas são numeradas em **contagem regressiva até o término da obra**: a semana do término é a SEMANA 1.
- **Marcação dos dias P e E** com um clique, e o tempo de manhã e de tarde (Sol/Chuva).
- **% concluído calculado automaticamente**: previsto e realizado acumulados de cada serviço.
- **Resumo por semana**: serviços previstos × realizados.
- **Avanço da obra**: % planejado × % executado até hoje, desvio e curva S.
- **⚑ Prioridade**: o serviço não concluído é levado para a semana seguinte. Pode ser feito um por um ou todos de uma vez.
- **Novo planejamento a partir do anterior**: a semana 2 do anterior vira a semana 1 do novo.
- **Impressão em PDF**, A4 retrato, com a fonte Outfit e campos para assinatura.
- **Exportação para Excel**, no modelo original da planilha PCP.
- **Backup e importação** dos dados em arquivo `.json`.
- **Funciona sem internet** depois do primeiro acesso e pode ser instalado no celular como aplicativo.

## Publicar no GitHub Pages

1. Entre em <https://github.com/new> e crie um repositório, por exemplo `pcp-semanal`. Ele pode ser público ou privado; para privado, é preciso um plano pago para usar o Pages.
2. Na página do repositório, clique em **Add file → Upload files**.
3. Arraste **todo o conteúdo desta pasta**: `index.html`, `sw.js`, `manifest.webmanifest`, `.nojekyll` e as pastas `css`, `js`, `assets` e `icons`. Depois clique em **Commit changes**.
   - O arquivo `.nojekyll` começa com ponto e pode ficar oculto no seu computador. Ele não é obrigatório.
4. Vá em **Settings → Pages**. Em *Build and deployment* escolha **Source: Deploy from a branch**, depois **Branch: main** e a pasta **/ (root)**, e clique em **Save**.
5. Depois de 1 a 2 minutos, o app estará em:
   `https://SEU-USUARIO.github.io/pcp-semanal/`

Pela linha de comando:

```bash
cd pcp-semanal
git init -b main
git add .
git commit -m "PCP semanal"
git remote add origin https://github.com/SEU-USUARIO/pcp-semanal.git
git push -u origin main
```

Depois de enviar, ative o Pages como no passo 4.

## Onde os dados ficam salvos

Os dados ficam **no navegador de cada computador ou celular** (IndexedDB). Não existe servidor. Por isso:

- Cada pessoa e cada aparelho tem os próprios dados. O que você marca no computador do escritório não aparece sozinho no celular.
- Para levar os dados de um aparelho para outro, use **⋯ → Fazer backup** e depois **⋯ → Importar backup** no outro aparelho.
  - A importação **junta** os dados: itens iguais são atualizados e o resto é mantido.
- **Faça backups com frequência.** Limpar os dados do navegador apaga as obras. O app avisa quando o último backup tem mais de 7 dias.
- Na janela anônima do navegador, os dados se perdem ao fechar a janela.

## Instalar no celular

Abra o endereço do GitHub Pages no celular:

- **Android (Chrome):** menu ⋮ → **Instalar app** ou **Adicionar à tela inicial**.
- **iPhone (Safari):** botão Compartilhar → **Adicionar à Tela de Início**.

## Estrutura

```
index.html              página do app
css/app.css             estilos (fonte Outfit)
js/app.js               telas, regras e armazenamento
js/export.js            cálculos (% e avanço) e geração do PDF e do Excel
assets/modelo-pcp.xlsx  modelo original da planilha PCP (usado na exportação)
assets/fonts/           fonte Outfit, embutida no PDF
icons/, manifest.webmanifest, sw.js   instalação como app e uso sem internet
```

Bibliotecas carregadas da internet só na hora de exportar: [ExcelJS](https://github.com/exceljs/exceljs) e [jsPDF](https://github.com/parallax/jsPDF).

## Como os percentuais são calculados

- **% previsto e % realizado de cada serviço:** soma dos dias P (ou E) até aquela semana ÷ total de dias P do serviço no planejamento. O realizado vai até no máximo 100%.
- **Serviço realizado na semana:** quando o % realizado alcança o % previsto.
- **Avanço da obra:** junta todos os planejamentos, contando cada semana uma vez só. Vale o planejamento mais recente que inclui aquela semana.
  - % planejado = dias P até hoje ÷ total de dias P da obra.
  - % executado = dias E até hoje ÷ total de dias P da obra.

A fonte Outfit é distribuída pela licença SIL Open Font License 1.1.
