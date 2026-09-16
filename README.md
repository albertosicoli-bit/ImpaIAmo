# ImparaIA

Prototipo PWA educativo per bambini e ragazzi (9–11 anni) che insegna a usare l'intelligenza artificiale in modo critico.

## Pubblicazione rapida su GitHub Pages

1. Crea un nuovo repository pubblico su GitHub.
2. Carica **tutti i file contenuti nella cartella `dist`** nella cartella principale del repository.
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

## Nota importante

Il tutor è simulato e non invia dati a servizi esterni. Per collegare un modello AI reale servirà un backend protetto: una chiave API non deve mai essere inserita nel codice pubblico del sito.
