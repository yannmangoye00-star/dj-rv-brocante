// C'est une fonction Backend "Serverless"
export default function handler(request, response) {
    // Pour l'instant, on simule une petite base de données avec 2 produits d'exemple
    const catalogueSimulation = [
        {
            id: 1,
            nom: "Canapé en cuir d'Europe",
            prix: "250 000 FCFA",
            statut: "Disponible"
        },
        {
            id: 2,
            nom: "Réfrigérateur Double Porte",
            prix: "180 000 FCFA",
            statut: "Réservé"
        }
    ];

    // Le Backend répond en renvoyant ces données au format JSON avec un statut 200 (Succès)
    return response.status(200).json(catalogueSimulation);
}


