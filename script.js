// Holt sich die Leinwand (canvas) aus dem HTML
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Setzt die Breite und Höhe der Leinwand auf die volle Fenstergröße
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Zeichen, die "regnen" sollen
const characters = '💩'; // Nur das 💩 Emoji

const fontSize = 16;
// Berechnet die Anzahl der Spalten basierend auf der Fensterbreite
const columns = Math.floor(canvas.width / fontSize);

// Erstellt ein Array (drops), um die y-Position jeder Spalte zu speichern
const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

// Die Funktion, die immer wieder aufgerufen wird, um die Animation zu zeichnen
function draw() {
    // 1. Der "Fade"-Effekt:
    // Zeichnet ein halbtransparentes Rechteck in der Hintergrundfarbe über die Leinwand.
    ctx.fillStyle = 'rgba(59, 43, 27, 0.05)'; // Sehr dunkles Braun, halbtransparent
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Schriftfarbe und -stil festlegen
    ctx.fillStyle = '#964B00'; // Ein heller Braunton für die Emojis
    ctx.font = fontSize + 'px monospace';

    // 3. Durch alle Spalten (drops) iterieren
    for (let i = 0; i < drops.length; i++) {
        // Wählt das Zeichen aus (hier gibt es nur eines)
        const text = characters; 
        
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Das Zeichen an die Position (x, y) malen
        ctx.fillText(text, x, y);

        // 4. Den Tropfen zurücksetzen:
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // 5. Die y-Position für den nächsten Frame erhöhen
        drops[i]++;
    }
}

// Startet die Animation
setInterval(draw, 40); // Etwas langsamer für Emojis (kannst du anpassen)

// Optional: Fenstergröße anpassen
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const newColumns = Math.floor(canvas.width / fontSize);
    drops.length = 0; 
    for (let i = 0; i < newColumns; i++) {
        drops[i] = 1;
    }
});
