// 1. Database dei capi (array di memoria)
let memoriaArmadio = [];

// 2. Definizione delle sottocategorie
const opzioniSottoCategorie = {
  sopra: ["Top", "Maniche Corte", "Maglione", "Giacca", "Felpa", "Giubbotto"],
  sotto: ["Jeans", "Tuta", "Pantaloni Eleganti", "Pantaloncini", "Gonna"],
  scarpe: ["Sneakers", "Stivali", "Sandali", "Tacchi"]
};

// 3. Funzione per aggiornare il menu a tendina delle sottocategorie
function aggiornaSottoCategorie() {
  const main = document.getElementById('categoria-main').value;
  const sotto = document.getElementById('sotto-categoria');
  
  // Svuota il menu attuale
  sotto.innerHTML = "";
  
  // Aggiunge le nuove opzioni in base alla scelta (Sopra, Sotto o Scarpe)
  opzioniSottoCategorie[main].forEach(opt => {
    let el = document.createElement('option');
    el.value = opt.toLowerCase().replace(/ /g, "-");
    el.innerText = opt;
    sotto.appendChild(el);
  });
}

// 4. Funzione per aggiungere un capo all'armadio
function aggiungiCapo() {
  const catMain = document.getElementById('categoria-main').value;
  const catSotto = document.getElementById('sotto-categoria').value;
  const nome = document.getElementById('nome-capo').value;
  const url = document.getElementById('url-immagine').value;

  // Controllo errori: URL vuoto o già presente
  if (!url) {
    alert("Per favore, inserisci il link di un'immagine!");
    return;
  }
  if (memoriaArmadio.includes(url)) {
    alert("Questo capo è già presente nel tuo armadio!");
    return;
  }

  // Aggiunge l'URL alla memoria per evitare duplicati
  memoriaArmadio.push(url);

  // Cerca la sezione della sottocategoria, se non esiste la crea
  let idSezione = `sezione-${catSotto}`;
  let containerSezione = document.getElementById(idSezione);
  
  if (!containerSezione) {
    const mainArmadio = document.getElementById('armadio');
    const wrapper = document.createElement('div');
    // Crea il titolo della sottocategoria (es. JEANS)
    wrapper.innerHTML = `
      <h3 style="margin: 20px 15px 5px; color: #6d6875; border-bottom: 2px solid #e5989b; display: inline-block;">
        ${catSotto.toUpperCase().replace(/-/g, " ")}
      </h3>
      <div class="items-grid" id="${idSezione}" style="display: flex; gap: 15px; overflow-x: auto; padding: 15px;"></div>
    `;
    mainArmadio.appendChild(wrapper);
    containerSezione = document.getElementById(idSezione);
  }

  // Crea la card del vestito
  const div = document.createElement('div');
  div.style.textAlign = "center";
  div.innerHTML = `
    <img src="${url}" onclick="seleziona('${catMain}', '${url}')" 
         style="width: 100px; height: 100px; object-fit: contain; border-radius: 12px; background: white; box-shadow: 0 2px 5px rgba(0,0,0,0.1); cursor: pointer;">
    <p style="font-size: 10px; margin-top: 5px;">${nome}</p>
  `;
  containerSezione.appendChild(div);

  // Pulisce i campi input dopo l'aggiunta
  document.getElementById('nome-capo').value = "";
  document.getElementById('url-immagine').value = "";
}

// 5. Funzione per mettere il capo nell'anteprima outfit
function seleziona(cat, url) {
  const slot = document.getElementById(`preview-${cat}`);
  slot.innerHTML = `<img src="${url}" style="width: 100%; height: 100%; object-fit: contain;">`;
}

// 6. Esegue la funzione una volta all'avvio per popolare il primo menu
aggiornaSottoCategorie();
