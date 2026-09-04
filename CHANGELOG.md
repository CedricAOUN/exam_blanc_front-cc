# Journal des modifications

## Version 1.1.0

### Corrections

#### Frontend

- Affichage des erreurs de validation dans les formulaires de connexion et d’inscription.
- Mise à jour de la liste des tâches après l’ajout d’une nouvelle tâche.
- Mise à jour des dépendances pouvant être corrigées automatiquement à la suite d’un audit npm. (npm audit fix)
Une migration total vers VITE devrait être effectuée, puisque Create React App n’est plus maintenu, et introduit 33 vulnérabilités de sécurité dans les dépendances.
- Redirection vers la page de connexion après la déconnexion.

#### Backend

- Amélioration des messages d’erreur de validation du formulaire de création de tâches.
- Vérification que l’utilisateur est bien l’auteur d’une tâche avant d’autoriser sa modification ou sa suppression.

### Fonctionnalités

#### Frontend

- Ajout d’un bouton « Créer un compte » permettant d’accéder plus facilement à la page d’inscription (`/register`).
- Ajout de la possibilité de modifier une tâche existante.

#### Backend

- Ajout d’une variable d’environnement permettant de configurer le domaine autorisé par la politique CORS.
