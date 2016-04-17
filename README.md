# Présentation de l'application "Citizen Engagement"

<a name="top"></a>

Ce répertoire explique le fonctionnement général de l'application "Citizen Engagement". Celle-ci permet d'identifier des problèmes dans une ville et de les répertorier dans une base de donnée grâce à l'application. Ces problèmes sont décrits avec une photo, du texte, une position sur une carte ainsi qu'un status pour dire si le problème est résolu ou est encore à faire. 

1. [Liste des fonctionnalités](#features)
2. [Conception de l'interface utilisateur](#ui)
3. [Page de connexion et déconnexion](#loginLogout)
4. [Page d'un utilisateur](#profil)
5. [Page d'accueil](#mainPage)
6. [Page d'un nouveau problème](#newIssue)
7. [Page de la liste des problèmes](#listofIssues)
8. [Page d'un problème](#detailsofIssue)


<a name="features"></a>
## 1. Liste des fonctionnalités

Cette application permet aux utilisateurs de faires les choses suivantes:

* [S'authentifier](#login)
* [Voir les détails du profil utilisateur](#profil)
* [Ajouter un nouveau problème](#newIssue):
  * Le problème doit avoir un type, une description
  * Il doit pouvoir être localisé et donner la position géographique du problème
  * Il doit prendre une photo de celui-ci.
* [Lister les problèmes existants] (#listofIssues)
  * Les problèmes sont listés par ordre chronologique du plus récent au plus ancien.
* [Voir les détails d'un problème](#detailsofIssue)
  * Date de création
  * Photo
  * Description
  * Auteur 
  * Etat
  * La position sur une carte
  * Les commentaires
* [Ajouter des commentaires à un problème](#detailsofIssue) 

<a href="#top">Haut de la page</a>



<a name="ui"></a>
## 2. Conception de l'interface utilisateur

Avant de concevoir notre application, nous avons réalisé des mockups des pages utiles pour chacune de nos fonctionnalités afin de visualiser une structure de base et être clair sur le travail à fournir.

Pour le faire, nous avons utilisé [Fluid UI](https://www.fluidui.com).

[Cliquez ici pour voir un aperçu de nos mockups](https://www.fluidui.com/editor/live/preview/p_onGAuhWggwgJk9UxFvpbrlUqWxlmfde8.1460667315369)

![UI Design](setup/mockup.JPG)

Comme vous pouvez le voir, l'application a 6 interfaces différentes:

* La page login / inscription;
* La page des donnés de l'utilsateur;
* La page d'accueil avec un carte répertoriant les problèmes les plus proches de la position de l'utilisateur au moment de l'utilisation;
* La page de création d'un nouveau problème;
* La page de la liste de tous les problèmes ordrés du plus récent au plus vieux;
* La page d'un problème en particulier.

Une fois que nous avions terminés nos mockups, nous sommes passés à la réalisation.

<a href="#top">Haut de la page</a>

<a name="login"></a>
## 3. Page de connexion

Pour pouvoir utiliser les fonctionnalités de l'application, l'utilisateur doit commencer par s'enregistrer ou se loguer par son nom et son prénom. Tant qu'il n'a pas complété les deux champs, le bouton reste pas cliquable. 

![Login](setup/login.JPG)![LoginValidated](setup/login2.JPG)



<a href="#top">Haut de la page</a>

<a name="profil"></a>
## 4. Page d'un utilisateur et déconnexion

L'utilisateur peut à tout moment voir ses coordonnées depuis l'onglet "profil" facilement accessible en bas de l'interface. C'est dans cette page que l'utilisateur pourra se déconnecter, ce qui le ramènera directement à la page de login. 

![Profil](setup/profil.JPG)

<a href="#top">Haut de la page</a>

<a name="mainPage"></a>
## 5. Page d'accueil

Une fois connecté, l'utilisateur arrivera sur la page d'accueil. Cette page donne l'emplacement de l'utilisateur, ainsi que tous les problèmes répertoriés dans un rayon prédéfini. Si l'utilisateur clique sur un des marqueurs, une bulle s'ouvre avec la description et la photo du problème.

Sur cette page d'accueil, il y a des onglets en haut et en bas. En haut, de gauche à droite, se trouve le lien pour aller voir la liste des problèmes, puis la possibilité de créer un problème. En bas, se trouve l'onglet "issues" qui permet de revenir chaque fois à la page d'accueil et "profil" qui donne les coordonnées de l'utilisateur. 

<a href="#top">Haut de la page</a>

<a name="newIssue"></a>
## 6. Page d'un nouveau problème

Lorsque l'on veut créer un nouveau problème, il faut dans un premier temps donner une description du problème. L'adresse est complétée directement avec la position de l'utilisateur. S'il le désire, il peut éditer l'adresse du problème grâce à l'onglet "Edit address" qui le dirige sur une carte où il peut placer le marqueur à l'adresse qu'il veut. Revenu sur la page, il faut sélectionner le type du problème pour le catégoriser, et prendre une photo de celui-ci. C'est en cliquant sur "create" que le problème sera enregistré dans la base de donnée.  

<a href="#top">Haut de la page</a>

<a name="listofIssues"></a>
## 7. Page de la liste des problèmes



<a href="#top">Haut de la page</a>

<a name="detailsofIssue"></a>
## 8. Page d'un problème

<a href="#top">Haut de la page</a>


