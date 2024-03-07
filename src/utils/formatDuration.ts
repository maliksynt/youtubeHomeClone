// Définit un formateur pour ajouter un zéro devant les nombres inférieurs à 10.
const LEADING_ZERO_FORMATTER = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

// Exporte une fonction pour formater une durée donnée en secondes.
export function formatDuration(duration: number) {
  // Calcule le nombre d'heures en divisant la durée par 3600 (60 secondes * 60 minutes).
  const hours: number = Math.floor(duration / 60 / 60);
  // Calcule le nombre de minutes en soustrayant les heures converties en secondes de la durée,
  // puis en divisant par 60.
  const minutes: number = Math.floor((duration - hours * 60 * 60) / 60);
  // Calcule le nombre de secondes restantes en utilisant le modulo de la durée par 60.
  const seconds: number = duration % 60;
  // Si il y a des heures, formate la chaîne pour inclure les heures, minutes et secondes,
  // avec des zéros devant les minutes et les secondes si nécessaire.
  if (hours > 0) {
    return `${hours}:${LEADING_ZERO_FORMATTER.format(
      minutes
    )}:${LEADING_ZERO_FORMATTER.format(seconds)}`;
  }
  // Si il n'y a pas d'heures, formate la chaîne pour inclure seulement les minutes et les secondes,
  // avec un zéro devant les secondes si nécessaire.
  return `${minutes}:${LEADING_ZERO_FORMATTER.format(seconds)}`;
}
