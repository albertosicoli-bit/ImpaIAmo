# ImparaIA — versione corretta

## Cosa è cambiato

Immagini dei quattro personaggi, fogli di stile e codice JavaScript sono ora incorporati in `index.html`. Non devi più caricare `assets` o i singoli file JavaScript e CSS per vedere i personaggi e creare il profilo. Il service worker non richiede più immagini esterne per installarsi.

## GitHub Pages

1. Estrai lo ZIP.
2. Nella cartella principale del repository sostituisci `index.html` e `sw.js` con i nuovi file. Carica anche `manifest.json` e `icons` per l’installazione PWA.
3. Attendi la spunta verde della pubblicazione in Actions.
4. Riapri l’app con connessione internet e ricarica. Su PC usa Ctrl+Shift+R; se la pagina era già aperta sul telefono, chiudila e riaprila dopo la pubblicazione.

Non serve cancellare profili o dati del browser. Eventuali vecchi file CSS e JS possono rimanere: questa pagina non li usa più.

## Creazione del profilo

Inserisci un soprannome senza spazi (es. AstroBlu), seleziona percorso, personaggio e colore, spunta “Sto creando il profilo insieme a un adulto” e premi “Crea il personaggio e inizia”. Se la casella non è spuntata, il browser impedisce l’invio del modulo.

Il profilo rimane locale al dispositivo; non è un account online. Le risposte degli agenti rimangono una demo guidata senza API esterne.
