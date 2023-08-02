# Tortue

> Un compagnon pour l'écologie au quotidien

## Prérequis

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node Version Manager](https://github.com/nvm-sh/nvm)
- [EditorConfig](https://editorconfig.org/)

## Bien commencer

- Installer la bonne version de Node.js

```shell
$ nvm use
```

- Installer les dépendances du projet

```shell
$ npm clean-install
```

- Démarrer l'application en mode développement

```shell
$ npm run start:dev
```

## TODO

- [ ] Feature(catalogue) : When removing duplicated items, keep the highest impact item instead of the first item found
- [ ] Idea(catalogue) : Keep only elements measured in coe2?
- [ ] Feature : Make a simpler version of catalogue/comparator based of average of similar elements
- [ ] Style : améliorer l'UI/UX du catalogue et du comparateur
- [ ] Test : Do some frontend testing
- [ ] CI : Ajout de la génération du changelog
- [ ] Refactor : Passer à EJS (ou autre moteur de template) plus largement maintenu
- [ ] CI : Mettre en place GreenFrame pour monitorer l'impact eco
- [ ] CI : Docker containers pour faciliter le setup
- [ ] Infra : Utiliser une solution de persistance
- [ ] Infra : Câbler un ElasticSearch-like (minio ?)
- [ ] Infra : Câbler une solution de monitoring
- [ ] Docs : Automatiser le déploiement d'une solution de documentation
