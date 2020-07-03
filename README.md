1. Explain why and how a cors extension for the browser should be used;
2. Explain why there is lot's of additional unnessessary things in the Table component;
3. If you have time - breake the Table component into three separate;
4. Update comments in the common Table component

## KGB-app

This app is created for you, my dear comrade, to easily and fast detect and reveal communism
enemies.

To run the app you need to fork or clone this repositore and run `yarn | npm install` and
`yarn start | npm start` in the root folder of the project.

# Attention!

Please, take into consideration the next several notions regarding the project:

1. There is some troubles with client-server connection, due to external server specifities, thus in
   order to use the project successfully, before you start one, you need to add cors extension for
   your browser and enable it.
   Here you may find an extension for GoogleChrome - https://mybrowseraddon.com/access-control-allow-origin.html .
   You are free to use any analogue, for this or other browser.

2. Some parts of the common Table component functional are beyond the scope of this test assignment. That my
   own common component, which I've been using in some test assgnments before, and which I successfully apadted
   for TypeScript and used here.

3. There were no any specific requirement to the client-server data flow into this assignment, however, the data
   , incoming from server should be stored, while switching the pages. Thus, I've decided to create next flow:

- After an api request, the client checked, if the incoming data has been saved in the LocalStorage previously,
  and if - so it uses the previously stored one (since there is always the same data from the server, I decided to
  keep that in this way);
- After the cards page is unmounted (and all the work with families cards is over) - the data is saved to the LocalStorage for subsequent usage. The idea of storing business data (except for something like auth token) in LocalStorage is bad and unwelcome. However, as a temporary decision in the scope of the test assignment, I've decided
  to keep it in this way.

# Happy hunting for the enemies of the people, glory to soviets!
