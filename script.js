function calcularModificador(attr) {
    const valorElem = document.getElementById(attr + '-valor');
    const valor = valorElem ? parseInt(valorElem.value) : 10;
    
    const mod = Math.floor((valor - 10) / 2);
    const modElem = document.getElementById(attr + '-mod');
    
    if (modElem) {
        modElem.innerText = (mod >= 0 ? "+" : "") + mod;
    }
    
    // A MÁGICA: Em vez de listar cada perícia aqui, chamamos o atualizarTudo
    // Isso garante que QUALQUER coisa que dependa de atributo (CD, Ataque, Perícia) atualize.
    atualizarTudo();
}

function calcularPericia(pericia, attr) {
  const nivel = parseInt(document.getElementById('nivel-valor').value) || 1;
  
  const modElem = document.getElementById(attr + '-mod');
  const modAtributo = modElem ? parseInt(modElem.innerText.replace('+', '')) : 0;
  
  const outros = parseInt(document.getElementById(pericia + '-outros')?.value) || 0;
  
  const bonusTreinoBase = 1 + Math.ceil(nivel / 4);
  let bonusFinalTreino = 0;
  
  const treinado = document.getElementById(pericia + '-treino')?.checked;
  const mestre = document.getElementById(pericia + '-mestre')?.checked;

  if (mestre) {
    // Regra: 1.5x arredondado para baixo
    bonusFinalTreino = Math.floor(bonusTreinoBase * 1.5);
  } else if (treinado) {
    bonusFinalTreino = bonusTreinoBase;
  }

  const metadeNivel = Math.floor(nivel / 2);
  const total = modAtributo + bonusFinalTreino + metadeNivel + outros;

  const totalElem = document.getElementById(pericia + '-total');
  if (totalElem) {
    totalElem.innerText = (total >= 0 ? "+" : "") + total;
  }
}

function calcularResistencia(res, attr) {
  const treinoElem = document.getElementById(res + '-treino');
  const mestreElem = document.getElementById(res + '-mestre');
  const totalElem = document.getElementById(res + '-total');

  if (!treinoElem || !mestreElem || !totalElem) return;

  const nivel = parseInt(document.getElementById('nivel-valor').value) || 1;
  const modElem = document.getElementById(attr + '-mod');
  const modAtributo = modElem ? parseInt(modElem.innerText.replace('+', '')) : 0;
  const outros = parseInt(document.getElementById(res + '-outros')?.value) || 0;

  const bonusTreinoBase = 1 + Math.ceil(nivel / 4);
  let bonusFinalTreino = 0;

  if (mestreElem.checked) {
    // Aplicando a mesma correção de 1.5x
    bonusFinalTreino = Math.floor(bonusTreinoBase * 1.5);
  } else if (treinoElem.checked) {
    bonusFinalTreino = bonusTreinoBase;
  }

  const metadeNivel = Math.floor(nivel / 2);
  const total = modAtributo + metadeNivel + bonusFinalTreino + outros;

  totalElem.innerText = (total >= 0 ? "+" : "") + total;
}
function calcularDefesa() {
  const nivelElem = document.getElementById('nivel-valor');
  const nivel = nivelElem ? parseInt(nivelElem.value) : 1;
  
  const modDesElem = document.getElementById('des-mod');
  // Se não achar o mod de DES, assume 0
  const modDes = modDesElem ? parseInt(modDesElem.innerText.replace('+', '')) : 0;
  
  // Verifica se os campos de input existem antes de pegar o valor
  const equipoElem = document.getElementById('def-equipo');
  const outrosElem = document.getElementById('def-outros');
  const equipo = equipoElem ? parseInt(equipoElem.value) || 0 : 0;
  const outros = outrosElem ? parseInt(outrosElem.value) || 0 : 0;
  
  const metadeNivel = Math.floor(nivel / 2);
  const baseDefesa = 10 + metadeNivel + modDes;
  const totalDefesa = baseDefesa + equipo + outros;
  
  // ATUALIZAÇÃO SEGURA: Só tenta escrever se o elemento existir
  const totalDisplay = document.getElementById('defesa-total');
  if (totalDisplay) {
    totalDisplay.innerText = totalDefesa;
  }
  
  const formulaDisplay = document.getElementById('defesa-formula');
  if (formulaDisplay) {
    formulaDisplay.innerText = `10 + ${metadeNivel} (Nível) + ${modDes} (DES)`;
  }
}

// Garante que a atenção atualize sempre que a percepção mudar
function calcularAtenção() {
  const pcpTotalElem = document.getElementById('pcp-total');
  // Se a perícia ainda não foi calculada, assume 0
  const pcpBonus = pcpTotalElem ? parseInt(pcpTotalElem.innerText) || 0 : 0;
  const outros = parseInt(document.getElementById('atencao-outros').value) || 0;
  
  const total = 10 + pcpBonus + outros;
  document.getElementById('atencao-total').innerText = total;
}

function calcularIniciativa() {
  const modDesElem = document.getElementById('des-mod');
  const modDes = modDesElem ? parseInt(modDesElem.innerText.replace('+', '')) : 0;
  const outros = parseInt(document.getElementById('iniciativa-outros').value) || 0;
  
  const total = modDes + outros;
  document.getElementById('iniciativa-total').innerText = (total >= 0 ? "+" : "") + total;
}

function atualizarTudo() {
    const nivelElem = document.getElementById('nivel-valor');
    if (!nivelElem) return; 

    // 1. Atualizar Modificadores
    const atributos = ['for', 'des', 'con', 'int', 'sab', 'pre'];
    atributos.forEach(attr => {
        const valor = parseInt(document.getElementById(attr + '-valor').value) || 0;
        const mod = Math.floor((valor - 10) / 2);
        const modElem = document.getElementById(attr + '-mod');
        if (modElem) modElem.innerText = (mod >= 0 ? "+" : "") + mod;
    });

    // 2. Atualizar Perícias
    const listaPericias = [
        {p: 'atl', a: 'for'}, {p: 'acr', a: 'des'}, {p: 'furt', a: 'des'},
        {p: 'prs', a: 'des'}, {p: 'fei', a: 'int'}, {p: 'his', a: 'int'}, {p: 'ofi1', a: 'int'}, {p: 'ofi2', a: 'int'},
        {p: 'tec', a: 'int'}, {p: 'dir', a: 'sab'}, {p: 'intu', a: 'sab'},
        {p: 'med', a: 'sab'}, {p: 'ocu', a: 'sab'}, {p: 'pcp', a: 'sab'},
        {p: 'scia', a: 'sab'}, {p: 'eng', a: 'pre'}, {p: 'inti', a: 'pre'},
        {p: 'pce', a: 'pre'}, {p: 'pao', a: 'pre'}
    ];

    listaPericias.forEach(item => {
        if(document.getElementById(item.p + '-total')) {
            calcularPericia(item.p, item.a);
        }
    });

    // 3. ATUALIZAR ATAQUES (Adicionado aqui)
    calcularAtaque('cac');
    calcularAtaque('dist');
    calcularAtaque('amal');

    // 4. Resto dos cálculos
    calcularDefesa();
    calcularIniciativa();
    calcularAtenção();
    calcularResistencia('ast', 'int');
    calcularResistencia('fort', 'con');
    calcularResistencia('refl', 'des');
    calcularResistencia('vont', 'sab');
    calcularResistencia('intg-res', 'con');
 calcularCDEspecializacao();
    calcularCDAmaldicoado();
    
    try {
        calcularLimiteEspacos();
        calcularCDEspecializacao();
        calcularCDAmaldicoado();
    } catch(e) { console.log("Erro em cálculos secundários."); }

    try {
        recalcularTodasPericiasInv();
    } catch(e) { 
        console.log("Aba de invocações ainda não carregada."); 
    }
}

function calcularAtaque(tipo) {
    const nivel = parseInt(document.getElementById("nivel-valor").value) || 1;
    const attrSelect = document.getElementById(tipo + "-attr");
    const attr = attrSelect ? attrSelect.value : "for";

    const modElem = document.getElementById(attr + "-mod");
    const modAtributo = modElem ? parseInt(modElem.innerText.replace("+", "")) : 0;

    const treinado = document.getElementById(tipo + "-treino").checked;
    const outros = parseInt(document.getElementById(tipo + "-outros").value) || 0;

    // CÁLCULO DO BÔNUS DE TREINO
    const bonusTreinoBase = 1 + Math.ceil(nivel / 4);
    const bonusTreino = treinado ? bonusTreinoBase : 0;

    // --- ADICIONADO: METADE DO NÍVEL ---
    const metadeNivel = Math.floor(nivel / 2);

    // FÓRMULA FINAL ATUALIZADA
    const total = modAtributo + bonusTreino + metadeNivel + outros;

    const totalElem = document.getElementById(tipo + "-total");
    if (totalElem) {
        totalElem.innerText = (total >= 0 ? "+" : "") + total;
    }
}

// Executa ao carregar a página para preencher os valores iniciais
window.onload = function() {
    atualizarTudo();
    calcularAtaque("cac");
    calcularAtaque("dist");
    calcularAtaque("amal");
    calcularLimiteEspacos();
    calcularCDEspecializacao();
    calcularCDAmaldicoado(); // <--- ADICIONE ESTA LINHA
};

function formatarDeslocamento() {
  const campoMetros = document.getElementById("desloc-valor");
  const campoQuadrados = document.getElementById("desloc-quadrados");
  if (!campoMetros || !campoQuadrados) return;

  // 1. Pega apenas os números do que o usuário digitou
  let valorOriginal = campoMetros.value;
  let apenasNumeros = valorOriginal.replace(/[^0-9]/g, "");

  if (apenasNumeros === "") {
    campoMetros.value = "";
    campoQuadrados.value = "";
    return;
  }

  // 2. Transforma em número para o cálculo
  let metros = parseFloat(apenasNumeros);
  
  // 3. Cálculo: Cada quadrado = 1,5m
  // Usamos Math.floor para não dar "meio quadrado" ou apenas .toFixed(0)
  let quadrados = Math.floor(metros / 1.5);

  // 4. Atualiza os campos com as unidades (m e □)
  // Nota: Não formatamos o valor do input de metros enquanto o usuário digita 
  // para não atrapalhar o cursor, apenas ao perder o foco ou de forma controlada.
  campoMetros.value = apenasNumeros + "m"; 
  campoQuadrados.value = quadrados + "□";
}

function calcularAtaque(tipo) {
  const nivelElem = document.getElementById("nivel-valor");
  const nivel = nivelElem ? parseInt(nivelElem.value) : 1;

  const attrSelect = document.getElementById(tipo + "-attr");
  const attr = attrSelect ? attrSelect.value : "for";

  const modElem = document.getElementById(attr + "-mod");
  const modAtributo = modElem ? parseInt(modElem.innerText.replace("+", "")) : 0;

  const treinado = document.getElementById(tipo + "-treino").checked;
  const outrosElem = document.getElementById(tipo + "-outros");
  const outros = outrosElem ? parseInt(outrosElem.value) || 0 : 0;

  const bonusTreinoBase = 1 + Math.ceil(nivel / 4);
  const bonusTreino = treinado ? bonusTreinoBase : 0;

  // --- AQUI ESTAVA O ERRO: FALTAVA SOMAR ISSO ---
  const metadeNivel = Math.floor(nivel / 2);

  // Soma final agora inclui a metade do nível
  //const total = modAtributo + bonusTreino + metadeNivel + encodeURI; 
  // Nota: Usei 'outros' ali em cima, se der erro de 'encodeURI', apenas use:
  const totalFinal = modAtributo + bonusTreino + metadeNivel + outros;

  const totalElem = document.getElementById(tipo + "-total");
  if (totalElem) {
    totalElem.innerText = (totalFinal >= 0 ? "+" : "") + totalFinal;
  }
}

function mostrarAba(nome) {
  // Adicionamos "invocacoes" e "treinamentos" na lista
  const abas = ["pericias", "habilidades", "registro", "amaldicoado", "invocacoes", "treinamentos"];

  abas.forEach(aba => {
    const elementoAba = document.getElementById("aba-" + aba);
    const botaoAba = document.getElementById("btn-" + aba);
    
    // Verificação de segurança caso o elemento não exista no HTML
    if (elementoAba) elementoAba.style.display = "none";
    if (botaoAba) botaoAba.classList.remove("ativo");
  });

  // Mostra a aba clicada e ativa o botão
  const abaAlvo = document.getElementById("aba-" + nome);
  const btnAlvo = document.getElementById("btn-" + nome);
  
  if (abaAlvo) abaAlvo.style.display = "block";
  if (btnAlvo) btnAlvo.classList.add("ativo");
}

mostrarAba("pericias");

// ===== UPLOAD DE IMAGEM DE APARÊNCIA =====
document.getElementById('upload-aparencia').addEventListener('change', function(e) {
  const file = e.target.files[0];
  
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    
    reader.onload = function(event) {
      const img = document.getElementById('imagem-personagem');
      const placeholder = document.getElementById('placeholder-texto');
      const btnRemover = document.getElementById('btn-remover-imagem');
      
      img.src = event.target.result;
      img.style.display = 'block';
      placeholder.style.display = 'none';
      btnRemover.style.display = 'inline-block';
    };
    
    reader.readAsDataURL(file);
  }
});

// Remover imagem
document.getElementById('btn-remover-imagem').addEventListener('click', function() {
  const img = document.getElementById('imagem-personagem');
  const placeholder = document.getElementById('placeholder-texto');
  const inputFile = document.getElementById('upload-aparencia');
  const btnRemover = document.getElementById('btn-remover-imagem');
  
  img.src = '';
  img.style.display = 'none';
  placeholder.style.display = 'flex';
  btnRemover.style.display = 'none';
  inputFile.value = '';
});

// ===== CÁLCULO DE ESPAÇOS OCUPADOS =====
function calcularEspacosOcupados() {
  const linhas = document.querySelectorAll('.tabela-inventario tbody tr');
  let totalEspacos = 0;
  
  linhas.forEach(linha => {
    const quantInput = linha.querySelector('.item-quant');
    const pesoInput = linha.querySelector('.item-peso');
    
    if (quantInput && pesoInput) {
      const quantidade = parseInt(quantInput.value) || 0;
      const pesoTexto = pesoInput.value;
      
      // Extrai apenas os números do campo de peso (remove "kg" e outros caracteres)
      const peso = parseFloat(pesoTexto.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
      
      totalEspacos += quantidade * peso;
    }
  });
  
  // Atualiza o campo de espaços ocupados
  const espacosOcupados = document.getElementById('espacos-ocupados');
  if (espacosOcupados) {
    espacosOcupados.value = totalEspacos.toFixed(1);
  }
}

// Calcular espaços ocupados ao carregar a página
window.addEventListener('load', function() {
  calcularEspacosOcupados();
});

// ===== CÁLCULO DO LIMITE DE ESPAÇOS =====
function calcularLimiteEspacos() {
  const modForElem = document.getElementById('for-mod');
  const modFor = modForElem ? parseInt(modForElem.innerText.replace('+', '')) : 0;
  
  // Fórmula: 8 + 2 * mod. Força, mínimo de 8
  const limite = Math.max(8, 8 + (2 * modFor));
  
  const limiteElem = document.getElementById('limite-espacos');
  if (limiteElem) {
    limiteElem.value = limite;
  }
}

// ===== CÁLCULO DO CD DE ESPECIALIZAÇÃO =====
function calcularCDEspecializacao() {
  const nivelElem = document.getElementById('nivel-valor');
  const nivel = nivelElem ? parseInt(nivelElem.value) : 1;
  
  const attrSelect = document.getElementById('cd-espec-attr');
  const attr = attrSelect ? attrSelect.value : 'int';
  
  // Pega o modificador do atributo selecionado
  const modElem = document.getElementById(attr + '-mod');
  const modAtributo = modElem ? parseInt(modElem.innerText.replace('+', '')) : 0;
  
  // Verifica se o checkbox de treino existe
  const treinoElem = document.getElementById('cd-espec-treino');
  const treinado = treinoElem ? treinoElem.checked : false;
  
  const bonusTreinoBase = 1 + Math.ceil(nivel / 4);
  const bonusTreino = treinado ? bonusTreinoBase : 0;
  
  const outrosElem = document.getElementById('cd-espec-outros');
  const outros = outrosElem ? parseInt(outrosElem.value) || 0 : 0;
  
  const metadeNivel = Math.floor(nivel / 2);
  
  // Fórmula: 10 + mod. atributo + treino + 1/2 nível + outros
  const total = 10 + modAtributo + bonusTreino + metadeNivel + outros;
  
  // ATUALIZAÇÃO SEGURA DA TELA
  const totalDisplay = document.getElementById('cd-espec-total');
  if (totalDisplay) totalDisplay.innerText = total;

  const modDisplay = document.getElementById('cd-espec-mod-valor');
  if (modDisplay) modDisplay.innerText = (modAtributo >= 0 ? '+' : '') + modAtributo;

  const treinoDisplay = document.getElementById('cd-espec-treino-valor');
  if (treinoDisplay) treinoDisplay.innerText = bonusTreino;

  const nivelDisplay = document.getElementById('cd-espec-nivel-valor');
  if (nivelDisplay) nivelDisplay.innerText = metadeNivel;
}

// ===== TOGGLE DESCRIÇÃO DA HABILIDADE =====
function toggleHabilidade(header) {
  const card = header.parentElement;
  const descricao = card.querySelector('.habilidade-descricao');
  const btn = header.querySelector('.toggle-btn');
  
  if (descricao.style.display === 'none' || descricao.style.display === '') {
    descricao.style.display = 'block';
    btn.classList.add('rotated');
  } else {
    descricao.style.display = 'none';
    btn.classList.remove('rotated');
  }
}

// ===== ADICIONAR NOVA HABILIDADE =====
function adicionarHabilidade() {
  const lista = document.getElementById('lista-habilidades');
  const botao = lista.querySelector('.btn-adicionar-habilidade');
  
  // Cria o elemento da nova habilidade
  const novaHabilidade = document.createElement('div');
  novaHabilidade.className = 'habilidade-card';
  novaHabilidade.innerHTML = `
    <div class="habilidade-header" onclick="toggleHabilidade(this)">
      <div class="habilidade-info-top">
        <input type="text" class="habilidade-nome" placeholder="Nome da Habilidade" onclick="event.stopPropagation()">
        <div class="habilidade-usos">
          <label>Atual</label>
          <input type="number" min="0" value="0" onclick="event.stopPropagation()">
          <span>/</span>
          <label>Máx.</label>
          <input type="number" min="0" value="0" onclick="event.stopPropagation()">
        </div>
      </div>
      <div class="habilidade-acoes">
        <button class="toggle-btn">▼</button>
        <button class="btn-remover-habilidade" onclick="removerHabilidade(this); event.stopPropagation();">🗑️</button>
      </div>
    </div>
    <div class="habilidade-descricao" style="display: none;">
      <textarea placeholder="Descrição da habilidade..."></textarea>
    </div>
  `;
  
  // Insere a nova habilidade antes do botão
  lista.insertBefore(novaHabilidade, botao);
  
  // Foca no campo de nome
  const inputNome = novaHabilidade.querySelector('.habilidade-nome');
  inputNome.focus();
}

// ===== REMOVER HABILIDADE =====
function removerHabilidade(botao) {
  const card = botao.closest('.habilidade-card');
  
  // Confirmação antes de remover
  if (confirm('Deseja realmente remover esta habilidade?')) {
    card.remove();
  }
}

// ===== CÁLCULO DO CD AMALDIÇOADO =====
function calcularCDAmaldicoado() {
  const nivel = parseInt(document.getElementById('nivel-valor').value) || 1;
  
  const attrSelect = document.getElementById('cd-amal-attr');
  const attr = attrSelect ? attrSelect.value : 'int';
  
  const modElem = document.getElementById(attr + '-mod');
  const modAtributo = modElem ? parseInt(modElem.innerText.replace('+', '')) : 0;
  
  // Treino sempre somado
  const bonusTreinoBase = 1 + Math.ceil(nivel / 4);
  
  const outros = parseInt(document.getElementById('cd-amal-outros').value) || 0;
  
  const metadeNivel = Math.floor(nivel / 2);
  
  // Fórmula: 10 + mod. atributo + treino (sempre) + 1/2 nível + outros
  const total = 10 + modAtributo + bonusTreinoBase + metadeNivel + outros;
  
  // Atualiza valores na tela
  document.getElementById('cd-amal-total').innerText = total;
  document.getElementById('cd-amal-mod-valor').innerText = modAtributo >= 0 ? '+' + modAtributo : modAtributo;
  document.getElementById('cd-amal-treino-valor').innerText = bonusTreinoBase;
  document.getElementById('cd-amal-nivel-valor').innerText = metadeNivel;
}

// ===== TOGGLE DESCRIÇÃO DA APTIDÃO AMALDIÇOADA =====
function toggleAptidaoAmaldicoada(header) {
  const card = header.parentElement;
  const descricao = card.querySelector('.aptidao-descricao');
  const btn = header.querySelector('.toggle-btn');
  
  if (descricao.style.display === 'none' || descricao.style.display === '') {
    descricao.style.display = 'block';
    btn.classList.add('rotated');
  } else {
    descricao.style.display = 'none';
    btn.classList.remove('rotated');
  }
}

// ===== ADICIONAR NOVA APTIDÃO AMALDIÇOADA =====
function adicionarAptidaoAmaldicoada() {
  const lista = document.getElementById('lista-aptidoes-amaldicoadas');
  const botao = lista.querySelector('.btn-adicionar-aptidao');
  
  const novaAptidao = document.createElement('div');
  novaAptidao.className = 'aptidao-card';
  novaAptidao.innerHTML = `
    <div class="aptidao-header" onclick="toggleAptidaoAmaldicoada(this)">
      <input type="text" class="aptidao-nome" placeholder="Nome da Aptidão" onclick="event.stopPropagation()">
      <div class="aptidao-acoes">
        <button class="toggle-btn">▼</button>
        <button class="btn-remover-aptidao" onclick="removerAptidaoAmaldicoada(this); event.stopPropagation();">🗑️</button>
      </div>
    </div>
    <div class="aptidao-descricao" style="display: none;">
      <textarea placeholder="Descrição da aptidão amaldiçoada..."></textarea>
    </div>
  `;
  
  lista.insertBefore(novaAptidao, botao);
  
  const inputNome = novaAptidao.querySelector('.aptidao-nome');
  inputNome.focus();
}

// ===== REMOVER APTIDÃO AMALDIÇOADA =====
function removerAptidaoAmaldicoada(botao) {
  const card = botao.closest('.aptidao-card');
  
  if (confirm('Deseja realmente remover esta aptidão?')) {
    card.remove();
  }
}

// ===== TOGGLE NÍVEL DE FEITIÇO =====
function toggleNivelFeitico(header) {
  const grupo = header.parentElement;
  const conteudo = grupo.querySelector('.nivel-feitico-conteudo');
  const btn = header.querySelector('.toggle-btn-nivel');
  
  if (conteudo.style.display === 'none' || conteudo.style.display === '') {
    conteudo.style.display = 'block';
    btn.classList.add('rotated');
  } else {
    conteudo.style.display = 'none';
    btn.classList.remove('rotated');
  }
}

// ===== TOGGLE FEITIÇO INDIVIDUAL =====
function toggleFeitico(header) {
  const card = header.parentElement;
  const detalhes = card.querySelector('.feitico-detalhes');
  const btn = header.querySelector('.toggle-btn-feitico');
  
  if (detalhes.style.display === 'none' || detalhes.style.display === '') {
    detalhes.style.display = 'block';
    btn.classList.add('rotated');
  } else {
    detalhes.style.display = 'none';
    btn.classList.remove('rotated');
  }
}

// ===== ADICIONAR NOVO FEITIÇO =====
function adicionarFeitico(listaId) {
  const lista = document.getElementById(listaId);
  const botao = lista.querySelector('.btn-adicionar-feitico');
  
  const novoFeitico = document.createElement('div');
  novoFeitico.className = 'feitico-card';
  novoFeitico.innerHTML = `
    <div class="feitico-header" onclick="toggleFeitico(this)">
      <div class="feitico-info-top">
        <input type="text" class="feitico-nome" placeholder="Nome do Feitiço" onclick="event.stopPropagation()">
      </div>
      <div class="feitico-acoes">
        <button class="toggle-btn-feitico">▼</button>
        <button class="btn-remover-feitico" onclick="removerFeitico(this); event.stopPropagation();">🗑️</button>
      </div>
    </div>
    <div class="feitico-detalhes" style="display: none;">
      <div class="feitico-campos-linha">
        <div class="feitico-campo">
          <label>Conjuração</label>
          <input type="text" placeholder="Ex: 1 ação">
        </div>
        <div class="feitico-campo">
          <label>Alcance</label>
          <input type="text" placeholder="Ex: 9m">
        </div>
      </div>
      <div class="feitico-campos-linha">
        <div class="feitico-campo">
          <label>Alvo</label>
          <input type="text" placeholder="Ex: 1 criatura">
        </div>
        <div class="feitico-campo">
          <label>Duração</label>
          <input type="text" placeholder="Ex: Instantânea">
        </div>
      </div>
      <div class="feitico-campo">
        <label>Descrição</label>
        <textarea placeholder="Descrição do feitiço..."></textarea>
      </div>
    </div>
  `;
  
  lista.insertBefore(novoFeitico, botao);
  
  const inputNome = novoFeitico.querySelector('.feitico-nome');
  inputNome.focus();
}

// ===== REMOVER FEITIÇO =====
function removerFeitico(botao) {
  const card = botao.closest('.feitico-card');
  
  if (confirm('Deseja realmente remover este feitiço?')) {
    card.remove();
  }
}

// ===== TOGGLE EXPANSÃO DE DOMÍNIO =====
function toggleDominio(header) {
  const card = header.parentElement;
  const conteudo = card.querySelector('.dominio-conteudo');
  const btn = header.querySelector('.toggle-btn-dominio');
  
  if (conteudo.style.display === 'none' || conteudo.style.display === '') {
    conteudo.style.display = 'flex';
    btn.classList.add('rotated');
  } else {
    conteudo.style.display = 'none';
    btn.classList.remove('rotated');
  }
}

// ===== TOGGLE TÉCNICA MÁXIMA =====
function toggleTecnicaMaxima(header) {
  const card = header.parentElement;
  const conteudo = card.querySelector('.tecnica-maxima-conteudo');
  const btn = header.querySelector('.toggle-btn-tecnica-maxima');
  
  if (conteudo.style.display === 'none' || conteudo.style.display === '') {
    conteudo.style.display = 'flex';
    btn.classList.add('rotated');
  } else {
    conteudo.style.display = 'none';
    btn.classList.remove('rotated');
  }
}


// ===== MODIFICADOR DA INVOCAÇÃO =====
function calcularModInvocacao(input) {
    // 1. Pega o valor digitado
    const valor = parseInt(input.value) || 0;
    
    // 2. Calcula o modificador (mesma lógica do personagem)
    const mod = Math.floor((valor - 10) / 2);
    
    // 3. Encontra a célula de modificador na mesma linha (tr)
    const linha = input.closest('tr');
    const modElem = linha.querySelector('.inv-mod');
    
    if (modElem) {
        modElem.innerText = (mod >= 0 ? "+" : "") + mod;
    }
}

// Inicializa todos os mods ao carregar a página
window.addEventListener('load', () => {
    document.querySelectorAll('.inv-val').forEach(input => {
        calcularModInvocacao(input);
    });
});

function addAcaoInvocacao(botao) {
    // Encontra o container de ações deste card específico
    const container = botao.closest('.card-invocacao').querySelector('.acoes-lista-container');
    
    const acaoId = Date.now(); // ID único simples
    
    const novaAcao = document.createElement('div');
    novaAcao.className = 'item-acao-inv';
    novaAcao.innerHTML = `
        <div class="acao-header-inv">
          <button type="button" class="btn-expand-inv" onclick="toggleDescricaoInv(this)">▼</button>
          <input type="text" placeholder="Nome">
          <div class="uso-contador">
            <input type="number" value="0">
            <span style="color:black">/</span>
            <input type="number" value="0">
          </div>
          <button type="button" style="color:red; font-weight:bold; background:none; border:none; padding:0 5px; cursor:pointer;" onclick="this.closest('.item-acao-inv').remove()">×</button>
        </div>
        <div class="detalhes-acao-inv">
          <textarea placeholder="Descrição..."></textarea>
        </div>
    `;
    
    container.appendChild(novaAcao);
}

function toggleDescricaoInv(btn) {
    const detalhes = btn.closest('.item-acao-inv').querySelector('.detalhes-acao-inv');
    if (detalhes.style.display === "block") {
        detalhes.style.display = "none";
        btn.innerText = "▼";
    } else {
        detalhes.style.display = "block";
        btn.innerText = "▲";
    }
}

function addPericiaInvocacao(botao) {
    const lista = botao.closest('.card-invocacao').querySelector('.pericias-inv-lista');
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
        <td><input type="text" placeholder="Ex: Luta" class="inv-per-nome"></td>
        <td>
            <select class="inv-per-attr" onchange="recalcularPericiaInv(this)">
                <option value="for">FOR</option>
                <option value="des">DES</option>
                <option value="con">CON</option>
                <option value="int">INT</option>
                <option value="sab">SAB</option>
                <option value="pre">PRE</option>
            </select>
        </td>
        <td><input type="number" value="0" class="inv-per-outros" oninput="recalcularPericiaInv(this)"></td>
        <td class="inv-per-total" style="font-weight:bold; color:#00ffcc;">+0</td>
        <td><button type="button" onclick="this.closest('tr').remove()" style="color:red; background:none; border:none; cursor:pointer;">×</button></td>
    `;
    
    lista.appendChild(tr);
    recalcularPericiaInv(tr.querySelector('select'));
}

function recalcularTodasPericiasInv() {
    // Busca todas as linhas de perícias em todos os cards de invocação
    const todasAsLinhas = document.querySelectorAll('.pericias-inv-lista tr');
    
    todasAsLinhas.forEach(tr => {
        const select = tr.querySelector('.inv-per-attr');
        if (select) recalcularPericiaInv(select);
    });
}

// Modifique sua função calcularModInvocacao para também disparar o cálculo das perícias
function calcularModInvocacao(input) {
    const valor = parseInt(input.value) || 0;
    const mod = Math.floor((valor - 10) / 2);
    const linha = input.closest('tr');
    const modElem = linha.querySelector('.inv-mod');
    
    if (modElem) {
        modElem.innerText = (mod >= 0 ? "+" : "") + mod;
    }
    
    // SEMPRE que mudar um atributo da invocação, as perícias dela precisam atualizar
    recalcularTodasPericiasInv();
}

function recalcularPericiaInv(elemento) {
    const tr = elemento.closest('tr');
    const card = elemento.closest('.card-invocacao');
    if (!tr || !card) return;

    // 1. Pegar Atributo da Invocação
    const attrEscolhido = tr.querySelector('.inv-per-attr').value;
    const indices = { 'for':0, 'des':1, 'con':2, 'int':3, 'sab':4, 'pre':5 };
    const modInv = parseInt(card.querySelectorAll('.inv-mod')[indices[attrEscolhido]].innerText) || 0;

    // 2. Dados do Personagem Principal
    const nivel = parseInt(document.getElementById('nivel-valor').value) || 1;
    const metadeNivel = Math.floor(nivel / 2);
    const bonusTreinoBase = 1 + Math.ceil(nivel / 4);

    // 3. Outros
    const outros = parseInt(tr.querySelector('.inv-per-outros').value) || 0;
    
    // Cálculo: Mod Inv + Treino + 1/2 Nível + Outros
    const total = modInv + bonusTreinoBase + metadeNivel + outros;

    const display = tr.querySelector('.inv-per-total');
    if (display) {
        display.innerText = (total >= 0 ? "+" : "") + total;
    }
}

let contadorInvocacoes = 0;

function criarNovoCardInvocacao() {
    contadorInvocacoes++;
    const container = document.getElementById('invocacoes-container');
    if(!container) return;

    const novoCard = document.createElement('div');
    novoCard.className = 'card-invocacao';
    novoCard.innerHTML = `
        <div class="inv-header">
            <div style="display:flex; justify-content: space-between; align-items: center; gap: 5px; padding: 0 5px;">
                <input type="text" class="inv-nome-input" value="Invocação ${contadorInvocacoes}" 
                       style="background:transparent; border:none; color:white; font-weight:bold; font-style:italic; font-size: 1.1rem; width: 85%; outline: none;">
                
                <button onclick="this.closest('.card-invocacao').remove()" 
                        style="background:rgba(0,0,0,0.3); border:none; color:white; cursor:pointer; font-weight:bold; border-radius: 3px; padding: 2px 6px;">X</button>
            </div>
            <select style="width: 95%; margin-top: 5px; background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2);">
                <option>4º Grau</option><option>3º Grau</option>
                <option>2º Grau</option><option>1º Grau</option>
                <option>Grau Especial</option>
            </select>
        </div>

        <div class="inv-stats-topo">
            <div class="stat-box"><span>PV ATUAIS</span><input type="number" value="0"></div>
            <div class="stat-box"><span>PV MÁXIMOS</span><input type="number" value="0"></div>
            <div class="stat-box"><span>DEFESA</span><input type="number" value="0"></div>
            <div class="stat-box"><span>DESLOC.</span><input type="text" value="9m"></div>
        </div>
        <div class="sub-label-vida">ATRIBUTOS E COMBATE</div>

        <table class="inv-tabela">
            <thead><tr><th colspan="3">ATRIBUTOS</th></tr></thead>
            <tbody>
                <tr><td class="attr-nome">Força</td><td><input type="number" class="inv-val" value="8" oninput="calcularModInvocacao(this)"></td><td class="inv-mod">-1</td></tr>
                <tr><td class="attr-nome">Destreza</td><td><input type="number" class="inv-val" value="8" oninput="calcularModInvocacao(this)"></td><td class="inv-mod">-1</td></tr>
                <tr><td class="attr-nome">Constituição</td><td><input type="number" class="inv-val" value="8" oninput="calcularModInvocacao(this)"></td><td class="inv-mod">-1</td></tr>
                <tr><td class="attr-nome">Inteligência</td><td><input type="number" class="inv-val" value="8" oninput="calcularModInvocacao(this)"></td><td class="inv-mod">-1</td></tr>
                <tr><td class="attr-nome">Sabedoria</td><td><input type="number" class="inv-val" value="8" oninput="calcularModInvocacao(this)"></td><td class="inv-mod">-1</td></tr>
                <tr><td class="attr-nome">Presença</td><td><input type="number" class="inv-val" value="8" oninput="calcularModInvocacao(this)"></td><td class="inv-mod">-1</td></tr>
            </tbody>
        </table>

        <div class="inv-secao-titulo">
            Ações e Características 
            <button type="button" class="btn-add-inv" onclick="addAcaoInvocacao(this)">+</button>
        </div>
        <div class="acoes-lista-container"></div>

        <div class="inv-secao-titulo">
            Perícias Treinadas 
            <button type="button" class="btn-add-inv" onclick="addPericiaInvocacao(this)">+</button>
        </div>
        <table class="inv-tabela pericias-dinamicas">
            <thead><tr><th>Nome</th><th>Attr</th><th>Outros</th><th>Total</th></tr></thead>
            <tbody class="pericias-inv-lista"></tbody>
        </table>
    `;

    container.appendChild(novoCard);
    novoCard.querySelectorAll('.inv-val').forEach(input => calcularModInvocacao(input));
}

// Inicialização limpa
window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('invocacoes-container');
    if(container) {
        container.innerHTML = ""; // Limpa lixo residual
        for(let i=0; i<4; i++) { criarNovoCardInvocacao(); }
    }
});





// ===== SISTEMA DE SALVAMENTO =====

// Função para coletar todos os dados da ficha
function coletarDadosFicha() {
  const dados = {
    // Informações Primárias
    nomePersonagem: document.querySelector('.info-primaria input[placeholder="Nome do Personagem"]')?.value || '',
    nomeJogador: document.querySelector('.info-primaria input[placeholder="Seu nome"]')?.value || '',
    especializacao: document.querySelector('.info-primaria input[placeholder="Ex: Combate"]')?.value || '',
    tecnica: document.querySelector('.info-primaria input[placeholder="Sua Técnica"]')?.value || '',
    grau: document.querySelector('.info-primaria input[placeholder="4º"]')?.value || '',
    nivel: document.getElementById('nivel-valor')?.value || 1,
    
    // Atributos
    atributos: {
      for: document.getElementById('for-valor')?.value || 10,
      des: document.getElementById('des-valor')?.value || 10,
      con: document.getElementById('con-valor')?.value || 10,
      int: document.getElementById('int-valor')?.value || 10,
      sab: document.getElementById('sab-valor')?.value || 10,
      pre: document.getElementById('pre-valor')?.value || 10
    },
    
    // Resistências
    resistencias: {},
    
    // PV e PE
    pvAtual: document.getElementById('pv-atual')?.value || 20,
    pvMax: document.getElementById('pv-max')?.value || 20,
    peAtual: document.getElementById('pe-atual')?.value || 20,
    peMax: document.getElementById('pe-max')?.value || 20,
    
    // Combate
    defEquipo: document.getElementById('def-equipo')?.value || 0,
    defOutros: document.getElementById('def-outros')?.value || 0,
    atencaoOutros: document.getElementById('atencao-outros')?.value || 0,
    iniciativaOutros: document.getElementById('iniciativa-outros')?.value || 0,
    
    // Perícias
    pericias: {},
    
    // Ataques
    ataques: {
      cac: {
        treino: document.getElementById('cac-treino')?.checked || false,
        attr: document.getElementById('cac-attr')?.value || 'for',
        outros: document.getElementById('cac-outros')?.value || 0
      },
      dist: {
        treino: document.getElementById('dist-treino')?.checked || false,
        attr: document.getElementById('dist-attr')?.value || 'des',
        outros: document.getElementById('dist-outros')?.value || 0
      },
      amal: {
        treino: document.getElementById('amal-treino')?.checked || false,
        attr: document.getElementById('amal-attr')?.value || 'int',
        outros: document.getElementById('amal-outros')?.value || 0
      }
    },
    
    // Tabela de Ataques
    tabelaAtaques: [],
    
    // Habilidades
    habilidades: [],
    
    // Aparência
    aparencia: {},
    
    // Inventário
    inventario: [],
    
    // CD Especialização
    cdEspec: {
      attr: document.getElementById('cd-espec-attr')?.value || 'int',
      treino: document.getElementById('cd-espec-treino')?.checked || false,
      outros: document.getElementById('cd-espec-outros')?.value || 0
    },
    
    // Amaldiçoado
    cdAmal: {
      attr: document.getElementById('cd-amal-attr')?.value || 'int',
      outros: document.getElementById('cd-amal-outros')?.value || 0
    },
    tecnicaAmaldicoada: {
      nome: document.getElementById('tecnica-nome')?.value || '',
      descricao: document.getElementById('tecnica-descricao')?.value || ''
    },
    tecnicasConhecidas: document.getElementById('tecnicas-conhecidas')?.value || 0,
    
    // Aptidões
    niveisAptidao: {},
    aptidoes: [],
    
    // Feitiços
    feiticos: {},
    
    // Expansão de Domínio
    expansaoDominio: {},
    
    // Técnica Máxima
    tecnicaMaxima: {},
    
    // Data de salvamento
    dataSalvamento: new Date().toISOString()
  };
  
  // Coletar resistências
  ['ast', 'fort', 'refl', 'vont'].forEach(res => {
    dados.resistencias[res] = {
      treino: document.getElementById(res + '-treino')?.checked || false,
      mestre: document.getElementById(res + '-mestre')?.checked || false,
      outros: document.getElementById(res + '-outros')?.value || 0
    };
  });
  
  // Coletar perícias
  const pericias = ['atl', 'acr', 'furt', 'prs', 'fei', 'his', 'ofi1', 'ofi2', 'tec', 'dir', 'intu', 'med', 'ocu', 'pcp', 'scia', 'eng', 'inti', 'pce', 'pao'];
  pericias.forEach(per => {
    dados.pericias[per] = {
      treino: document.getElementById(per + '-treino')?.checked || false,
      mestre: document.getElementById(per + '-mestre')?.checked || false,
      outros: document.getElementById(per + '-outros')?.value || 0
    };
  });
  
  // Coletar tabela de ataques
  document.querySelectorAll('.tabela-ataques tbody tr').forEach(linha => {
    const inputs = linha.querySelectorAll('input');
    if (inputs[0]?.value) {
      dados.tabelaAtaques.push({
        ataque: inputs[0].value,
        bonus: inputs[1].value,
        dano: inputs[2].value,
        crit: inputs[3].value,
        tipo: inputs[4].value,
        alcance: inputs[5].value,
        propriedades: inputs[6].value
      });
    }
  });
  
  // Coletar habilidades
  document.querySelectorAll('.habilidade-card').forEach(card => {
    const nome = card.querySelector('.habilidade-nome')?.value;
    if (nome) {
      dados.habilidades.push({
        nome: nome,
        usoAtual: card.querySelectorAll('.habilidade-usos input')[0]?.value || 0,
        usoMax: card.querySelectorAll('.habilidade-usos input')[1]?.value || 0,
        descricao: card.querySelector('textarea')?.value || ''
      });
    }
  });
  
  // Coletar aparência
  const camposAparencia = document.querySelectorAll('.aparencia-campos .campo-aparencia input');
  dados.aparencia = {
    nome: camposAparencia[0]?.value || '',
    idade: camposAparencia[1]?.value || '',
    altura: camposAparencia[2]?.value || '',
    peso: camposAparencia[3]?.value || '',
    genero: camposAparencia[4]?.value || '',
    cabelos: camposAparencia[5]?.value || '',
    olhos: camposAparencia[6]?.value || '',
    pele: camposAparencia[7]?.value || '',
    roupas: camposAparencia[8]?.value || '',
    marca: camposAparencia[9]?.value || ''
  };
  
  // Coletar inventário
  document.querySelectorAll('.tabela-inventario tbody tr').forEach(linha => {
    const nome = linha.querySelector('.item-nome')?.value;
    if (nome) {
      dados.inventario.push({
        nome: nome,
        quantidade: linha.querySelector('.item-quant')?.value || 1,
        peso: linha.querySelector('.item-peso')?.value || '0kg',
        preco: linha.querySelectorAll('input')[3]?.value || '$0'
      });
    }
  });
  
  // Coletar níveis de aptidão
  document.querySelectorAll('.nivel-aptidao-item').forEach((item, index) => {
    const labels = ['aura', 'leitura', 'barreira', 'dominio', 'reversa'];
    dados.niveisAptidao[labels[index]] = item.querySelector('input')?.value || 0;
  });
  
  // Coletar aptidões
  document.querySelectorAll('.aptidao-card').forEach(card => {
    const nome = card.querySelector('.aptidao-nome')?.value;
    if (nome) {
      dados.aptidoes.push({
        nome: nome,
        descricao: card.querySelector('textarea')?.value || ''
      });
    }
  });
  
  // Coletar feitiços por nível
  for (let i = 0; i <= 5; i++) {
    dados.feiticos[`nivel${i}`] = [];
    document.querySelectorAll(`#feiticos-nivel-${i} .feitico-card`).forEach(card => {
      const nome = card.querySelector('.feitico-nome')?.value;
      if (nome) {
        const inputs = card.querySelectorAll('.feitico-campo input, .feitico-campo textarea');
        dados.feiticos[`nivel${i}`].push({
          nome: nome,
          conjuracao: inputs[0]?.value || '',
          alcance: inputs[1]?.value || '',
          alvo: inputs[2]?.value || '',
          duracao: inputs[3]?.value || '',
          descricao: inputs[4]?.value || ''
        });
      }
    });
  }
  
  // Coletar Expansão de Domínio
  const dominioInputs = document.querySelectorAll('.dominio-campo input, .dominio-campo textarea');
  if (dominioInputs.length > 0) {
    dados.expansaoDominio = {
      nome: dominioInputs[0]?.value || '',
      tipo: dominioInputs[1]?.value || '',
      descricao: dominioInputs[2]?.value || ''
    };
  }
  
  // Coletar Técnica Máxima
  const tecnicaMaxInputs = document.querySelectorAll('.tecnica-maxima-campo input, .tecnica-maxima-campo textarea');
  if (tecnicaMaxInputs.length > 0) {
    dados.tecnicaMaxima = {
      nome: tecnicaMaxInputs[0]?.value || '',
      descricao: tecnicaMaxInputs[1]?.value || ''
    };
  }
  
  return dados;
}

// Função para preencher a ficha com os dados salvos
function preencherFicha(dados) {
  if (!dados) return;
  
  // Informações Primárias
  if (dados.nomePersonagem) document.querySelector('.info-primaria input[placeholder="Nome do Personagem"]').value = dados.nomePersonagem;
  if (dados.nomeJogador) document.querySelector('.info-primaria input[placeholder="Seu nome"]').value = dados.nomeJogador;
  if (dados.especializacao) document.querySelector('.info-primaria input[placeholder="Ex: Combate"]').value = dados.especializacao;
  if (dados.tecnica) document.querySelector('.info-primaria input[placeholder="Sua Técnica"]').value = dados.tecnica;
  if (dados.grau) document.querySelector('.info-primaria input[placeholder="4º"]').value = dados.grau;
  if (dados.nivel) document.getElementById('nivel-valor').value = dados.nivel;
  
  // Atributos
  if (dados.atributos) {
    Object.keys(dados.atributos).forEach(attr => {
      const elem = document.getElementById(attr + '-valor');
      if (elem) {
        elem.value = dados.atributos[attr];
        calcularModificador(attr);
      }
    });
  }
  
  // PV e PE
  if (dados.pvAtual) document.getElementById('pv-atual').value = dados.pvAtual;
  if (dados.pvMax) document.getElementById('pv-max').value = dados.pvMax;
  if (dados.peAtual) document.getElementById('pe-atual').value = dados.peAtual;
  if (dados.peMax) document.getElementById('pe-max').value = dados.peMax;
  
  // Combate
  if (dados.defEquipo) document.getElementById('def-equipo').value = dados.defEquipo;
  if (dados.defOutros) document.getElementById('def-outros').value = dados.defOutros;
  if (dados.atencaoOutros) document.getElementById('atencao-outros').value = dados.atencaoOutros;
  if (dados.iniciativaOutros) document.getElementById('iniciativa-outros').value = dados.iniciativaOutros;
  
  // Resistências
  if (dados.resistencias) {
    Object.keys(dados.resistencias).forEach(res => {
      const r = dados.resistencias[res];
      if (document.getElementById(res + '-treino')) document.getElementById(res + '-treino').checked = r.treino;
      if (document.getElementById(res + '-mestre')) document.getElementById(res + '-mestre').checked = r.mestre;
      if (document.getElementById(res + '-outros')) document.getElementById(res + '-outros').value = r.outros;
    });
  }
  
  // Perícias
  if (dados.pericias) {
    Object.keys(dados.pericias).forEach(per => {
      const p = dados.pericias[per];
      if (document.getElementById(per + '-treino')) document.getElementById(per + '-treino').checked = p.treino;
      if (document.getElementById(per + '-mestre')) document.getElementById(per + '-mestre').checked = p.mestre;
      if (document.getElementById(per + '-outros')) document.getElementById(per + '-outros').value = p.outros;
    });
  }
  
  // Ataques
  if (dados.ataques) {
    ['cac', 'dist', 'amal'].forEach(tipo => {
      if (dados.ataques[tipo]) {
        if (document.getElementById(tipo + '-treino')) document.getElementById(tipo + '-treino').checked = dados.ataques[tipo].treino;
        if (document.getElementById(tipo + '-attr')) document.getElementById(tipo + '-attr').value = dados.ataques[tipo].attr;
        if (document.getElementById(tipo + '-outros')) document.getElementById(tipo + '-outros').value = dados.ataques[tipo].outros;
      }
    });
  }
  
  // Tabela de Ataques
  if (dados.tabelaAtaques && dados.tabelaAtaques.length > 0) {
    const linhas = document.querySelectorAll('.tabela-ataques tbody tr');
    dados.tabelaAtaques.forEach((ataque, index) => {
      if (linhas[index]) {
        const inputs = linhas[index].querySelectorAll('input');
        inputs[0].value = ataque.ataque || '';
        inputs[1].value = ataque.bonus || '';
        inputs[2].value = ataque.dano || '';
        inputs[3].value = ataque.crit || '';
        inputs[4].value = ataque.tipo || '';
        inputs[5].value = ataque.alcance || '';
        inputs[6].value = ataque.propriedades || '';
      }
    });
  }
  
  // Habilidades (remover existentes e adicionar as salvas)
  if (dados.habilidades && dados.habilidades.length > 0) {
    const listaHabilidades = document.getElementById('lista-habilidades');
    // Remove todas as habilidades existentes exceto o botão
    listaHabilidades.querySelectorAll('.habilidade-card').forEach(card => card.remove());
    
    // Adiciona as habilidades salvas
    dados.habilidades.forEach(hab => {
      adicionarHabilidade();
      const cards = listaHabilidades.querySelectorAll('.habilidade-card');
      const ultimoCard = cards[cards.length - 1];
      ultimoCard.querySelector('.habilidade-nome').value = hab.nome;
      const usosInputs = ultimoCard.querySelectorAll('.habilidade-usos input');
      usosInputs[0].value = hab.usoAtual;
      usosInputs[1].value = hab.usoMax;
      ultimoCard.querySelector('textarea').value = hab.descricao;
    });
  }
  
  // Aparência
  if (dados.aparencia) {
    const campos = document.querySelectorAll('.aparencia-campos .campo-aparencia input');
    const valores = [
      dados.aparencia.nome, dados.aparencia.idade, dados.aparencia.altura,
      dados.aparencia.peso, dados.aparencia.genero, dados.aparencia.cabelos,
      dados.aparencia.olhos, dados.aparencia.pele, dados.aparencia.roupas,
      dados.aparencia.marca
    ];
    campos.forEach((campo, index) => {
      if (valores[index]) campo.value = valores[index];
    });
  }
  
  // Inventário
  if (dados.inventario && dados.inventario.length > 0) {
    const linhas = document.querySelectorAll('.tabela-inventario tbody tr');
    dados.inventario.forEach((item, index) => {
      if (linhas[index]) {
        linhas[index].querySelector('.item-nome').value = item.nome || '';
        linhas[index].querySelector('.item-quant').value = item.quantidade || 1;
        linhas[index].querySelector('.item-peso').value = item.peso || '0kg';
        linhas[index].querySelectorAll('input')[3].value = item.preco || '$0';
      }
    });
  }
  
  // CD Especialização
  if (dados.cdEspec) {
    if (document.getElementById('cd-espec-attr')) document.getElementById('cd-espec-attr').value = dados.cdEspec.attr;
    if (document.getElementById('cd-espec-treino')) document.getElementById('cd-espec-treino').checked = dados.cdEspec.treino;
    if (document.getElementById('cd-espec-outros')) document.getElementById('cd-espec-outros').value = dados.cdEspec.outros;
  }
  
  // Amaldiçoado
  if (dados.cdAmal) {
    if (document.getElementById('cd-amal-attr')) document.getElementById('cd-amal-attr').value = dados.cdAmal.attr;
    if (document.getElementById('cd-amal-outros')) document.getElementById('cd-amal-outros').value = dados.cdAmal.outros;
  }
  if (dados.tecnicaAmaldicoada) {
    if (document.getElementById('tecnica-nome')) document.getElementById('tecnica-nome').value = dados.tecnicaAmaldicoada.nome;
    if (document.getElementById('tecnica-descricao')) document.getElementById('tecnica-descricao').value = dados.tecnicaAmaldicoada.descricao;
  }
  if (dados.tecnicasConhecidas) {
    if (document.getElementById('tecnicas-conhecidas')) document.getElementById('tecnicas-conhecidas').value = dados.tecnicasConhecidas;
  }
  
  // Níveis de Aptidão
  if (dados.niveisAptidao) {
    const items = document.querySelectorAll('.nivel-aptidao-item');
    const labels = ['aura', 'leitura', 'barreira', 'dominio', 'reversa'];
    labels.forEach((label, index) => {
      if (items[index] && dados.niveisAptidao[label]) {
        items[index].querySelector('input').value = dados.niveisAptidao[label];
      }
    });
  }
  
  // Aptidões
  if (dados.aptidoes && dados.aptidoes.length > 0) {
    const listaAptidoes = document.getElementById('lista-aptidoes-amaldicoadas');
    listaAptidoes.querySelectorAll('.aptidao-card').forEach(card => card.remove());
    
    dados.aptidoes.forEach(apt => {
      adicionarAptidaoAmaldicoada();
      const cards = listaAptidoes.querySelectorAll('.aptidao-card');
      const ultimoCard = cards[cards.length - 1];
      ultimoCard.querySelector('.aptidao-nome').value = apt.nome;
      ultimoCard.querySelector('textarea').value = apt.descricao;
    });
  }
  
  // Feitiços
  if (dados.feiticos) {
    for (let i = 0; i <= 5; i++) {
      const nivel = `nivel${i}`;
      if (dados.feiticos[nivel] && dados.feiticos[nivel].length > 0) {
        const listaId = `feiticos-nivel-${i}`;
        const lista = document.getElementById(listaId);
        lista.querySelectorAll('.feitico-card').forEach(card => card.remove());
        
        dados.feiticos[nivel].forEach(feit => {
          adicionarFeitico(listaId);
          const cards = lista.querySelectorAll('.feitico-card');
          const ultimoCard = cards[cards.length - 1];
          ultimoCard.querySelector('.feitico-nome').value = feit.nome;
          const inputs = ultimoCard.querySelectorAll('.feitico-campo input, .feitico-campo textarea');
          if (inputs[0]) inputs[0].value = feit.conjuracao;
          if (inputs[1]) inputs[1].value = feit.alcance;
          if (inputs[2]) inputs[2].value = feit.alvo;
          if (inputs[3]) inputs[3].value = feit.duracao;
          if (inputs[4]) inputs[4].value = feit.descricao;
        });
      }
    }
  }
  
  // Expansão de Domínio
  if (dados.expansaoDominio) {
    const inputs = document.querySelectorAll('.dominio-campo input, .dominio-campo textarea');
    if (inputs[0]) inputs[0].value = dados.expansaoDominio.nome || '';
    if (inputs[1]) inputs[1].value = dados.expansaoDominio.tipo || '';
    if (inputs[2]) inputs[2].value = dados.expansaoDominio.descricao || '';
  }
  
  // Técnica Máxima
  if (dados.tecnicaMaxima) {
    const inputs = document.querySelectorAll('.tecnica-maxima-campo input, .tecnica-maxima-campo textarea');
    if (inputs[0]) inputs[0].value = dados.tecnicaMaxima.nome || '';
    if (inputs[1]) inputs[1].value = dados.tecnicaMaxima.descricao || '';
  }
  
  // Recalcular tudo
  atualizarTudo();
}

// Salvar ficha no LocalStorage
function salvarFicha() {
  const dados = coletarDadosFicha();
  localStorage.setItem('fichaRPG', JSON.stringify(dados));
  mostrarStatus('✅ Ficha salva com sucesso!');
  console.log('Ficha salva:', dados);
}

// Carregar ficha do LocalStorage
function carregarFicha() {
  const dadosSalvos = localStorage.getItem('fichaRPG');
  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);
    preencherFicha(dados);
    mostrarStatus('✅ Ficha carregada!');
    console.log('Ficha carregada:', dados);
  } else {
    mostrarStatus('⚠️ Nenhuma ficha salva encontrada');
  }
}

// Exportar ficha como arquivo JSON
function exportarFicha() {
  const dados = coletarDadosFicha();
  const nomePersonagem = dados.nomePersonagem || 'personagem';
  const nomeArquivo = `ficha_${nomePersonagem.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
  
  const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = nomeArquivo;
  link.click();
  URL.revokeObjectURL(url);
  
  mostrarStatus('📥 Ficha exportada!');
}

// Importar ficha de arquivo JSON
function importarFicha(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const dados = JSON.parse(e.target.result);
      preencherFicha(dados);
      localStorage.setItem('fichaRPG', JSON.stringify(dados));
      mostrarStatus('📤 Ficha importada e salva!');
    } catch (error) {
      mostrarStatus('❌ Erro ao importar ficha');
      console.error('Erro:', error);
    }
  };
  reader.readAsText(file);
  
  // Limpar o input para permitir reimportar o mesmo arquivo
  event.target.value = '';
}

// Resetar ficha (voltar ao em branco)
function resetarFicha() {
  if (confirm('⚠️ Tem certeza que deseja criar uma nova ficha? Isso apagará todos os dados atuais!\n\nDica: Exporte sua ficha atual antes de resetar.')) {
    localStorage.removeItem('fichaRPG');
    location.reload();
  }
}

// Mostrar status de salvamento
function mostrarStatus(mensagem) {
  const status = document.getElementById('status-salvamento');
  if (status) {
    status.textContent = mensagem;
    setTimeout(() => {
      status.textContent = '';
    }, 3000);
  }
}

// Auto-salvar a cada 2 minutos
/*setInterval(() => {
  salvarFicha();
  mostrarStatus('💾 Auto-salvamento');
}, 120000); // 120000ms = 2 minutos*/

// Carregar ficha automaticamente ao abrir a página
/*window.addEventListener('load', function() {
  const dadosSalvos = localStorage.getItem('fichaRPG');
  if (dadosSalvos) {
    carregarFicha();
  }
});*/

// Salvar antes de fechar a página
let resetandoFicha = false;
window.addEventListener('beforeunload', function() {
  salvarFicha();
});
