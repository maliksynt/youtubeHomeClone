import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

// Définition des styles de base et des variantes pour le bouton en utilisant cva (class-variance-authority)
export const buttonStyles = cva(
  // Styles de base appliqués à tous les boutons
  ["hover:bg-secondary-hover", "transition-colors"],
  {
    // Définition des variantes de style
    variants: {
      // Variante 'variant' avec les options 'default' et 'ghost'
      variant: {
        default: ["bg-secondary", "hover:background-secondary-hover"], // Style par défaut
        ghost: ["hover:bg-gray-100"], // Style pour la variante 'ghost'
        dark: [
          "bg-secondary-dark",
          "hover:bg-secondary-dark-hover",
          "text-secondary",
        ], // Style pour la variante 'dark'
      },
      // Variante 'size' avec les options 'default' et 'icon'
      size: {
        default: ["rounded", "p-2"], // Taille par défaut
        icon: [
          // Taille pour les boutons icônes
          "rounded-full",
          "w-10",
          "h-10",
          "p-2.5",
          "flex",
          "items-center",
          "justify-center",
        ],
      },
    },
    // Variantes par défaut si aucune n'est spécifiée
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Définition des props du bouton, incluant les variantes de style et les props standards d'un bouton HTML
type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

export default function Button({
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  // Rendu du bouton avec les styles appliqués et fusionnés avec d'éventuelles classes personnalisées
  return (
    <button
      {...props} // Props standards du bouton HTML
      className={twMerge(buttonStyles({ variant, size }), className)} // Fusion des styles cva et des classes personnalisées
    />
  );
}
