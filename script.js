// 1. Deine Daten
const reports = [
    {
        ticker: "MSFT",
        name: "Microsoft Corp.",
        date: "17.04.2026",
        file: "MSFT_Report.html"
    }
    // Weitere hier einfügen...
];

// 2. Die Logik
function renderReports() {
    const grid = document.getElementById('report-grid');
    
    // Sicherheitscheck: Existiert das Grid überhaupt?
    if (!grid) {
        console.error("Fehler: Element 'report-grid' wurde in der HTML nicht gefunden!");
        return;
    }

    grid.innerHTML = ""; 

    reports.forEach(report => {
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
        grid.innerHTML += card;
    });
}

// 3. Starten
document.addEventListener('DOMContentLoaded', renderReports);
