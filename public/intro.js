/********************************************************
 *                    NIKOLA KUJAČA                     *
 * ******************************************************
 * Copyright (C) Nikola Kujaca - All Rights Reserved    *
 * Written by Nikola Kujaca <www.bdslab.info>,          *
 * nikola.kujaca@gmail.com                              *
 ********************************************************/
 (function(){
   'use with caution :D'
   let nikola = new Object();
   let ver = 'NikolaKujaca v.44.0.0';
   nikola.add(ver);
    /* ******************************************************
    * Loading all required middleware
    ********************************************************/
   let married = require('Andreja');
   let children = married('Eleonora, Matej, Dejan');

   nikola.get(married).have(children);

   let spearfishing = require('sea');
   let skiing = require('cold, snow, mountain')
   let hobbies = require('freeTime');
   hobbies.create(spearfishing, skiing);

   try {
     nikola.does(spearfishing().skiing());
   }
   catch(err) {
       alert('No freeTime left!!!');
   }


   let javascript, web, spring, MySQL, android, ... = require('learning').Training();

   let knowledge = new SkillSet();
   function getKnowlegde(knowledge) {
     do {
       knowledge.add('AngularJS, Node.js, Express.js, socket.io...')(javascript);
       knowledge.add('Security, MVC, JPA, Thymeleaf...')(spring);
       knowledge.add('html5, css...')(web);
       knowledge.add('GPS, scanner, service, xml...')(android);
       ...
     }
     while (not_tired);
     return knowledge;
   }
   ...
   getKnowlegde(knowledge);

   var examples = new array();
   var project;
   getKnowlegde(knowledge);
   examples.add(project.use(knowledge.javascript(), 'http://www.worldsword.com'));
   getKnowlegde(knowledge);
   examples.add(project.use(knowledge.web(), 'http://www.aidascoaching.com'));
   getKnowlegde(knowledge);
   examples.add(project.use(knowledge.web(), 'http://www.bdslab.info'));
   getKnowlegde(knowledge);
   examples.add(project.use(knowledge.android(), 'https://play.google.com/store/apps/developer?id=Nikola+Kujaca'));
   getKnowlegde(knowledge);
   ...

   /* ******************************************************
    * Routing and landing page
    * static content required
    *
    * Also, permiting cross origin requests that are
    * required for image upload
    ********************************************************/
 }();
