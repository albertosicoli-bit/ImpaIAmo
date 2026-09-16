# ImparaIA

Prototipo PWA educativo per bambini e ragazzi (9–11 anni) che insegna a usare l'intelligenza artificiale in modo critico.

## Pubblicazione rapida su GitHub Pages

1. Crea un nuovo repository pubblico su GitHub.
2. Estrai lo ZIP e carica **tutti i file dell’app e le cartelle `assets` e `icons`** nella cartella principale del repository. `index.html` deve essere nella cartella principale, non dentro un’altra cartella. Nel progetto sorgente questi file si trovano in `dist`.
3. Apri **Settings → Pages**.
4. In **Build and deployment**, scegli **Deploy from a branch**.
5. Seleziona il branch **main**, cartella **/(root)** e premi **Save**.
6. Dopo uno o due minuti, GitHub mostrerà l'indirizzo pubblico dell'app.

Non servono database, account o chiavi API. I progressi sono memorizzati nel browser con `localStorage`.

## Funzioni incluse

- Missione interattiva con tre domande e feedback.
- Laboratorio che valuta la qualità di un prompt.
- Punti XP, badge e progressi persistenti.
- Navigazione responsive per telefono, tablet e computer.
- Installazione come PWA e utilizzo offline dopo la prima apertura.
- Coordinatore che instrada le richieste verso cinque agenti educativi.
- Tutor socratico, esercizi interattivi, correzione e analisi dei progressi.
- Controllo locale dei dati personali e delle richieste non sicure.

## Personaggio e nuova schermata iniziale

Al primo accesso puoi creare un profilo **locale** con soprannome inventato, percorso scolastico, avatar illustrato e colore. Sono disponibili volpe, robot, gufo e draghetto. Non è una registrazione online: nessuna email, password o data di nascita viene raccolta, e non c’è sincronizzazione tra dispositivi. Non inserire dati personali. La casella dell’adulto è un promemoria, non un sistema di verifica del consenso o di autenticazione.

Un nuovo personaggio comincia con **0 XP e 0 missioni**. Per modificarlo usa il pulsante con il soprannome nella barra superiore: i progressi vengono conservati.

### Ricominciare da zero

- **Inizia la missione da zero:** chiede “Sei sicuro di voler iniziare da zero?”, torna alla prima domanda e rimuove solo il premio della missione, se già completata. Conserva personaggio e progressi delle altre attività.
- **Azzera tutti i progressi:** stessa conferma, azzera XP, missioni, badge e bonus. Conserva il personaggio.
- **No, continua** oppure Escape: nessuna modifica.

### Aggiornamento GitHub

Lo ZIP scaricabile contiene i file **già nella posizione corretta**, senza cartella `dist`. Carica nuovamente tutto nella cartella principale del repository, inclusa la cartella `assets`. La nuova versione del service worker aggiorna i file e mantiene l’uso offline. Dopo la pubblicazione, riapri l’app con connessione internet; se era già aperta, ricaricala per vedere la nuova schermata.

### Illustrazioni

`dist/assets/characters.png`: atlas originale generato con ImageGen (strumento integrato), prompt: quattro mascotte in una griglia 2×2, volpe arancione/scialle blu, robot turchese, gufo viola/scialle giallo e piccolo drago verde menta; illustrazione 3D da libro per bambini, sfondo azzurro chiaro, nessun testo. L’app usa le quattro aree dell’immagine come avatar.

La squadra multi-agente opera in modalità dimostrativa e non invia dati a servizi esterni. Il file `agents.js` contiene il coordinatore e i cinque agenti basati su scenari didattici. Per collegare un modello AI reale servirà un backend protetto: una chiave API non deve mai essere inserita nel codice pubblico del sito.
