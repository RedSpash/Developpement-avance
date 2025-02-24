# iut-project

## Description

Ce projet est une application web permettant de gérer une bibliothèque de films avec un système d'authentification basé
sur les rôles (admin, utilisateur), un service de messagerie pour l'envoi de notifications et un message broker pour le
traitement asynchrone des tâches.

## Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/) (pour RabbitMQ si nécessaire)

## Installation

Clonez le projet et installez les dépendances :

```bash
npm install
```

Si RabbitMQ n'est pas encore installé sur votre machine, vous pouvez utiliser Docker pour le lancer :

```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
```

Accédez ensuite au dashboard RabbitMQ via :
[http://localhost:15672/](http://localhost:15672/)

Identifiants par défaut :

- **Utilisateur** : guest
- **Mot de passe** : guest

## Configuration des variables d'environnement

Un fichier `.env` est requis à la racine du projet pour assurer son bon fonctionnement. Vous devez y renseigner les
variables suivantes :

```
# Configuration de la base de données
DB_HOST=adresse_du_serveur_mysql
DB_USER=utilisateur_mysql
DB_PASSWORD=mot_de_passe_mysql
DB_DATABASE=nom_de_la_base_de_donnees
DB_PORT=port_mysql

# Configuration de Nodemailer
NODEMAILER_HOST=hote_pour_nodemailer
NODEMAILER_PORT=port_pour_nodemailer
NODEMAILER_USER=adresse_email_nodemailer
NODEMAILER_PASS=mot_de_passe_nodemailer
NODEMAILER_USERNAME=pseudo_nodemailer

# Configuration de RabbitMQ
RABBITMQ_URL=amqp://localhost
QUEUE_NAME=nom_de_la_queue
```

## Fonctionnalités principales

- **Gestion des utilisateurs** : Création, authentification et rôles (admin/utilisateur)
- **Gestion des films** : Création, modification, suppression par les admins
- **Liste de favoris** : Ajout/Suppression de films pour les utilisateurs
- **Envoi de mails** :
    - Mail de bienvenue à la création d'un utilisateur
    - Notification par mail lorsqu'un film est ajouté ou modifié
    - Export CSV des films envoyé par mail via un message broker

## Exécution du projet

### Lancer le serveur et le worker séparément

```bash
npm run start  # Démarre le serveur
npm run workers # Démarre les workers
```