export function formatCarboneCatalogueItem(item: any) {
  return `${item.nom_base_français} ${item.nom_attribut_français} ${item.nom_frontière_français} : ${item.total_poste_non_décomposé} ${item.unité_français}`;
}
