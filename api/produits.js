export default async function handler(request, response) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  // Sécurité au cas où les variables Vercel mettraient du temps à se propager
  if (!supabaseUrl || !supabaseKey) {
    return response.status(500).json({ error: "Variables d'environnement Supabase manquantes." });
  }

  try {
    // On va chercher les données directement dans ta table "produits" (ou le nom exact de ta table)
    // Tu peux trier par id ou par date si tu veux
    const result = await fetch(`${supabaseUrl}/rest/v1/produits?select=*`, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!result.ok) {
      throw new Error(`Erreur Supabase: ${result.statusText}`);
    }

    const data = await result.json();
    
    // Le backend renvoie les vraies données reçues de Supabase
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}