# Révision des commandes de base de Git

Table des matières

-   [Créer un dépôt Git](#créer-un-dépôt-git)
-   [Gérer les branches](#gérer-les-branches)
-   [Gérer les commits](#gérer-les-commits)
-   [Gérer les dépôts distants](#gérer-les-dépôts-distants)
-   [Fusion et gestions des conflits](#fusion-et-gestions-des-conflits)
-   [Gérer les tags](#gérer-les-tags)
-   [Travailler à plusieurs sur un même projet](#travailler-à-plusieurs-sur-un-même-projet)

## Créer un dépôt Git

### Initialiser un dépôt Git

Pour initialiser un dépôt Git, on utilise la commande `git init`.

```bash
git init
```

### Ajouter un fichier au suivi Git

Pour ajouter un fichier au suivi Git, on utilise la commande `git add`.

```bash
git add README.md
```

### Créer un commit

Pour créer un commit, on utilise la commande `git commit`.

```bash
git commit -m "Message du commit"
```

## Gérer les branches

### Créer une branche

Pour créer une branche, on utilise la commande `git branch`.

```bash
git branch nom-de-la-branche
```

### Changer de branche

Pour changer de branche, on utilise la commande `git checkout`.

```bash
git checkout nom-de-la-branche
```

### Créer une branche et changer de branche

Pour créer une branche et changer de branche, on utilise la commande `git checkout` avec l'option `-b`.

```bash
git checkout -b nom-de-la-branche
```

### Supprimer une branche

Pour supprimer une branche, on utilise la commande `git branch` avec l'option `-d`.

```bash
git branch -d nom-de-la-branche
```

## Gérer les commits

### Voir l'historique des commits

Pour voir l'historique des commits, on utilise la commande `git log`.

```bash
git log
```

### Voir les différences entre deux commits

Pour voir les différences entre deux commits, on utilise la commande `git diff`.

```bash
git diff `id-du-commit-1` `id-du-commit-2`
```

### Annuler un commit

Pour annuler un commit, on utilise la commande `git reset` avec l'option `--soft`.

```bash
git reset --soft `id-du-commit`
```

### Annuler un commit et supprimer les modifications

Pour annuler un commit et supprimer les modifications, on utilise la commande `git reset` avec l'option `--hard`.

```bash
git reset --hard `id-du-commit`
```

## Gérer les dépôts distants

### Ajouter un dépôt distant

Pour ajouter un dépôt distant, on utilise la commande `git remote add`.

```bash
git remote add origin `url-du-depot`
```

### Envoyer les commits vers un dépôt distant

Pour envoyer les commits vers un dépôt distant, on utilise la commande `git push`.

```bash
git push origin `nom-de-la-branche`
```

### Récupérer les commits d'un dépôt distant

Pour récupérer les commits d'un dépôt distant, on utilise la commande `git pull`.

```bash
git pull origin `nom-de-la-branche`
```

### Récupérer les commits d'un dépôt distant sans fusionner

Pour récupérer les commits d'un dépôt distant sans fusionner, on utilise la commande `git fetch`.

```bash
git fetch origin `nom-de-la-branche`
```

### Voir les dépôts distants

Pour voir les dépôts distants, on utilise la commande `git remote`.

```bash
git remote
```

## Fusion et gestions des conflits

### Fusionner deux branches

Pour fusionner deux branches, on utilise la commande `git merge`.

```bash
git merge nom-de-la-branche
```

### Voir les conflits

Pour voir les conflits, on utilise la commande `git status`.

```bash
git status
```

### Résoudre les conflits

Pour résoudre les conflits, on modifie les fichiers en conflit, on ajoute les fichiers modifiés au suivi Git avec `git add` et on crée un commit avec `git commit`.

```bash
git add README.md
git commit -m "Résolution des conflits"
```

## Gérer les tags

### Créer un tag

Pour créer un tag, on utilise la commande `git tag`. Les tags sont des références vers des commits.

```bash
git tag `nom-du-tag`
```

## Travailler à plusieurs sur un même projet

Lorsqu'on travaille à plusieurs sur un même projet, il est important de bien gérer les branches et les commits. Il est également important de bien communiquer avec les autres membres de l'équipe. Idéalement, on devrait travailler sur des branches différentes et on devrait fusionner les branches régulièrement.

Ex: Je développe une nouvelle fonctionnalité sur une branche `feature-x` et mon/ma collègue développe une autre fonctionnalité sur une branche `feature-y`. Lorsque je termine ma fonctionnalité, je fusionne ma branche `feature` avec la branche `develop`. Lorsque mon/ma collègue termine sa fonctionnalité, il fusionne sa branche `feature` avec la branche `develop`.

Ainsi, on évite les conflits et on peut continuer à travailler sur la branche `develop`.

### Cloner un dépôt

Pour cloner un dépôt, on utilise la commande `git clone`.

```bash
git clone `url-du-depot`
```

### Voir les branches distantes

Pour voir les branches distantes, on utilise la commande `git branch` avec l'option `-r`.

```bash
git branch -r
```
