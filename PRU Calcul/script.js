// Fonction pour calculer le PRU
function calculatePRU() {
    // Récupérer les quantités de chaque crypto-monnaie
    var ethQuantity = parseFloat(document.getElementById('ethQuantity').value);
    var btcQuantity = parseFloat(document.getElementById('btcQuantity').value);
    var bethQuantity = parseFloat(document.getElementById('bethQuantity').value);
    var depositAmount = parseFloat(document.getElementById('depositAmount').value);

    // Récupérer les prix de chaque crypto-monnaie
    var ethPrice = parseFloat(document.getElementById('ethPrice').value);
    var btcPrice = parseFloat(document.getElementById('btcPrice').value);
    var bethPrice = parseFloat(document.getElementById('bethPrice').value);

    // Vérifier si les valeurs sont valides
    if (isNaN(ethQuantity) || isNaN(btcQuantity) || isNaN(bethQuantity) || isNaN(ethPrice) || isNaN(btcPrice) || isNaN(bethPrice) || isNaN(depositAmount) || ethQuantity < 0 || btcQuantity < 0 || bethQuantity < 0 || ethPrice < 0 || btcPrice < 0 || bethPrice < 0 || depositAmount < 0) {
        alert('Veuillez entrer des valeurs valides.');
        return;
    }

    // Calculer la valeur totale du portefeuille
    var totalValue = (ethQuantity * ethPrice) + (btcQuantity * btcPrice) + (bethQuantity * bethPrice);

    var pourcentageETH = (ethQuantity * ethPrice) / totalValue;
    var pourcentageBTC = (btcQuantity * btcPrice) / totalValue;
    var pourcentageBETH = (bethQuantity * bethPrice) / totalValue;

    console.log("Pourcentage");
    console.log(pourcentageETH);
    console.log(pourcentageBTC);
    console.log(pourcentageBETH);

    // Calculer le PRU pour chaque crypto-monnaie
    // var ethPRU = (ethQuantity * ethPrice) / totalValue;
    // var btcPRU = (btcQuantity * btcPrice) / totalValue;
    // var bethPRU = (bethQuantity * bethPrice) / totalValue;
    var ethPRU = (depositAmount * pourcentageETH) / ethQuantity;
    var btcPRU = (depositAmount * pourcentageBTC) / btcQuantity;
    var bethPRU = (depositAmount * pourcentageBETH) / bethQuantity;

    console.log("PRU");
    console.log(ethPRU);
    console.log(btcPRU);
    console.log(bethPRU);

    // Afficher les résultats
    document.getElementById('ethPRU').innerText = ethPRU.toFixed(2);
    document.getElementById('btcPRU').innerText = btcPRU.toFixed(2);
    document.getElementById('bethPRU').innerText = bethPRU.toFixed(2);
}

// Fonction pour charger les prix des cryptos depuis CoinGecko
async function loadCryptoPrices() {
    try {
        // Récupérer les prix de l'ETH, du BTC et du BETH depuis CoinGecko
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,bethereum&vs_currencies=eur');
        const data = await response.json();

        // Mettre à jour les champs de prix dans le formulaire avec les données de CoinGecko
        document.getElementById('ethPrice').value = data.ethereum.eur;
        document.getElementById('btcPrice').value = data.bitcoin.eur;
        document.getElementById('bethPrice').value = data.ethereum.eur;
    } catch (error) {
        console.error('Erreur lors du chargement des prix :', error);
    }
}

// Charger les prix au chargement de la page
window.addEventListener('load', loadCryptoPrices);