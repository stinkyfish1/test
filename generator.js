document.getElementById("hentRetter").addEventListener("click", async () => {
    try {
        const response = await fetch("mat.json");
        if (!response.ok) throw new Error("Kunne ikke hente data");
        const data = await response.json();

        const retterDiv = document.getElementById("retter");
        retterDiv.innerHTML = "";

        // Hent valgte kategorier
        const valgteKategorier = [];
        document.querySelectorAll('input[name="kategori"]:checked').forEach((checkbox) => {
            valgteKategorier.push(checkbox.value);
        });

        // Hent valgte sultnivå og måltidstype
        const sultnivå = document.getElementById("sultnivå").value;
        const måltidstype = document.getElementById("måltidstype").value;

        // Filtrer retter basert på alle kriterier
        const filtrerteRetter = data.filter((rett) =>
            (valgteKategorier.length === 0 || valgteKategorier.includes(rett.kategori)) &&
            rett.sultnivå.includes(sultnivå) &&
            rett.måltidstype.includes(måltidstype)
        );

        if (filtrerteRetter.length === 0) {
            retterDiv.innerHTML = "<p>Ingen retter funnet for de valgte kriteriene.</p>";
            return;
        }

        // Velg en tilfeldig rett fra filtrerte retter
        const tilfeldigRett = filtrerteRetter[Math.floor(Math.random() * filtrerteRetter.length)];

        // Vis den tilfeldige retten
        const rettDiv = document.createElement("div");
        rettDiv.className = "rett";
        rettDiv.innerHTML = `
            <h3>${tilfeldigRett.navn}</h3>
            <p>Kategori: ${tilfeldigRett.kategori}</p>
            <p>Proteiner: ${tilfeldigRett.proteiner}g</p>
            <p>Karbohydrater: ${tilfeldigRett.karbohydrater}g</p>
            <p>Fett: ${tilfeldigRett.fett}g</p>
            <p>Kalorier: ${tilfeldigRett.kalorier} kcal</p>
            <p>Allergier: ${tilfeldigRett.allergier.length > 0 ? tilfeldigRett.allergier.join(", ") : "Ingen"}</p>
        `;
        retterDiv.appendChild(rettDiv);
    } catch (error) {
        console.error("Feil ved henting av data:", error);
        document.getElementById("retter").innerHTML =
            "<p>Kunne ikke hente retter. Prøv igjen senere.</p>";
    }
});
