// Konfiguration: Deine Berichte als Array von Objekten
const reports = [
    {
        ticker: "MSFT",
        name: "Microsoft Corp.",
        date: "17.04.2026",
        file: "MSFT_Report.html"
    }
    // Wenn du einen neuen Report hast, einfach hier oben kopieren und einfügen:
];

// Funktion, die die Kacheln generiert
function renderReports() {
    const grid = document.getElementById('report-grid');
    grid.innerHTML = ""; // Container leeren

    reports.forEach(report => {
        // HTML-Struktur für eine einzelne Kachel bauen
        const card = `
            <a href="reports/${report.file}" class="report-card">
                <div class="ticker-info">
                    <div class="ticker-symbol">${report.ticker}</div>
                    <div class="report-meta">
                        <span class="report-title">${report.name} Analyse</span>
                        <span class="report-date">Aktualisiert am ${report.date}</span>
                    </div>
                </div>
                <div class="open-btn">Analyse öffnen &rarr;</div>
            </a>
        `;
        // In das Grid einfügen
        grid.innerHTML += card;
    });
}

// Ausführen, sobald die Seite geladen ist
document.addEventListener('DOMContentLoaded', renderReports);
