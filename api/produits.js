export default async function handler(request, response) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return response.status(500).json({ error: "Variables d'environnement Supabase manquantes." });
  }

  // --- CAS DU GET : Lecture des articles ---
  if (request.method === 'GET') {
    try {
      const result = await fetch(`${supabaseUrl}/rest/v1/produits?select=*`, {
        method: 'GET',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!result.ok) throw new Error(`Erreur Supabase: ${result.statusText}`);
      const data = await result.json();
      return response.status(200).json(data);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  // --- CAS DU POST : Ajout d'un nouvel article ---
  if (request.method === 'POST') {
    try {
      const nouveauProduit = request.body; // Récupère l'objet envoyé depuis le formulaire

      const result = await fetch(`${supabaseUrl}/rest/v1/produits`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation' // Demande à Supabase de renvoyer l'objet créé
        },
        body: JSON.stringify(nouveauProduit)
      });

      if (!result.ok) throw new Error(`Erreur d'insertion Supabase: ${result.statusText}`);
      const data = await result.json();
      return response.status(201).json(data);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  // Si une autre méthode est utilisée (PUT, DELETE, etc.)
  return response.status(405).json({ error: "Méthode non autorisée" });
}