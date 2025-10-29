// Holt sich die Leinwand (canvas) aus dem HTML
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// --- Globale Einstellungen ---
const rainFontSize = 16;
const rainCharacters = '💩';
const rainColor = '#964B00'; // Braunton für die Emojis
const rainFadeColor = 'rgba(0, 0, 0, 0.05)'; // Fade-Effekt (Schwarz)

const introMessage = "Danke Achilles";
const introFontSize = 24; // Etwas größer für die Nachricht
const introColor = '#0F0';  // Klassisches Matrix-Grün für die Nachricht
const introSpeed = 20;      // Wie schnell die Nachricht fällt

// --- Animations-Variablen ---
let columns;
let drops = [];
let messageX; // X-Position der Nachricht (wird berechnet)
let messageY = 0; // Start Y-Position der Nachricht
let animationState = 'intro'; // Startet mit dem Intro

/**
 * Diese Funktion initialisiert oder setzt alle Größen-
 * abhängigen Variablen zurück.
 */
function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 1. Berechnungen für den Emoji-Regen
    columns = Math.floor(canvas.width / rainFontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    // 2. Berechnungen für die Intro-Nachricht
    // (Wir müssen die Schriftart setzen, um die Breite zu messen)
    ctx.font = introFontSize + 'px monospace';
    const messageWidth = ctx.measureText(introMessage).width;
    messageX = (canvas.width - messageWidth) / 2; // Zentriert die Nachricht
    
    // Setzt die Intro-Animation zurück, falls das Fenster verkleinert wird
    messageY = 0;
    animationState = 'intro';
}

/**
 * Die Haupt-Animationsschleife
 */
function draw() {
    // Prüft, in welcher Phase wir sind
    if (animationState === 'intro') {
        drawIntro();
    } else if (animationState === 'rain') {
        drawRain();
    }
}

/**
 * Zeichnet die Intro-Nachricht
 */
function drawIntro() {
    // Solider schwarzer Hintergrund, um alte Frames zu löschen
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Setzt Farbe und Schriftart für die Nachricht
    ctx.fillStyle = introColor;
    ctx.font = introFontSize + 'px monospace';

    // Zeichnet die Nachricht
    ctx.fillText(introMessage, messageX, messageY);

    // Bewegt die Nachricht nach unten
    messageY += introSpeed;

    // Wenn die Nachricht den Bildschirm verlassen hat
    if (messageY > canvas.height + introFontSize) {
        animationState = 'rain'; // Wechsle zur Regen-Phase
    }
}

/**
 * Zeichnet den 💩-Regen (der Code, den wir vorher hatten)
 */
function drawRain() {
    // 1. Der "Fade"-Effekt
    ctx.fillStyle = rainFadeColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Schriftfarbe und -stil festlegen
    ctx.fillStyle = rainColor;
    ctx.font = rainFontSize + 'px monospace';

    // 3. Durch alle Spalten (drops) iterieren
    for (let i = 0; i < drops.length; i++) {
        const text = rainCharacters;
        const x = i * rainFontSize;
        const y = drops[i] * rainFontSize;

        ctx.fillText(text, x, y);

        // 4. Den Tropfen zurücksetzen
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // 5. Die y-Position erhöhen
        drops[i]++;
    }
}

// --- Start & Event Listeners ---

// 1. Führt setupCanvas() einmal beim Start aus
setupCanvas();

// 2. Startet die Haupt-Animationsschleife
setInterval(draw, 40); // (Kannst du schneller/langsamer machen, z.B. 33)

// 3. Passt alles an, wenn die Fenstergröße geändert wird
window.addEventListener('resize', setupCanvas);
