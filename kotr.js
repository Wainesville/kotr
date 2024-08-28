 // JavaScript to handle adding players and assigning them to users

   // JavaScript to handle user login, player entry, and assigning players to users

   const loginForm = document.getElementById('loginForm');
   const playerList = document.getElementById('playerList');
   const completedUsersList = document.getElementById('completedUsersList');
   const assignPlayersBtn = document.getElementById('assignPlayersBtn');
   
   let loggedInUser = null;
   let players = [];
   const userAssignments = {};
   const completedUsers = [];
   
   // Event listener for the login form
   loginForm.addEventListener('submit', (event) => {
       event.preventDefault();
       loggedInUser = document.getElementById('username').value;
   
       if (loggedInUser) {
           document.querySelector('.banner h1').textContent = `Welcome, ${loggedInUser}`;
           document.getElementById('loginForm').style.display = 'none';
           enablePlayerEntry();
       }
   });
   
   // Enable the logged-in user to enter player names
   function enablePlayerEntry() {
       const playerEntryForm = document.createElement('form');
       playerEntryForm.id = 'playerEntryForm';
   
       const playerInput = document.createElement('input');
       playerInput.type = 'text';
       playerInput.className = 'form-control';
       playerInput.placeholder = 'Enter player name';
       playerInput.required = true;
   
       const addPlayerBtn = document.createElement('button');
       addPlayerBtn.type = 'submit';
       addPlayerBtn.className = 'btn btn-primary mt-2';
       addPlayerBtn.textContent = 'Add Player';
   
       playerEntryForm.appendChild(playerInput);
       playerEntryForm.appendChild(addPlayerBtn);
       document.querySelector('.container').prepend(playerEntryForm);
   
       // Handle player submission
       playerEntryForm.addEventListener('submit', (event) => {
           event.preventDefault();
           const playerName = playerInput.value.trim();
           if (playerName) {
               players.push(playerName);
               updatePlayerList();
               playerInput.value = '';
           }
       });
   }
   
   // Update the display of players in the list
   function updatePlayerList() {
       playerList.innerHTML = '';
       players.forEach((player) => {
           const li = document.createElement('li');
           li.className = 'list-group-item';
           li.textContent = player;
           playerList.appendChild(li);
       });
   }
   
   // Assign players to users randomly
   assignPlayersBtn.addEventListener('click', () => {
       if (players.length === 0 || !loggedInUser) return;
   
       users.push(loggedInUser);
       userAssignments[loggedInUser] = [];
   
       while (players.length > 0) {
           const randomIndex = Math.floor(Math.random() * players.length);
           const selectedPlayer = players.splice(randomIndex, 1)[0];
           const user = users[Math.floor(Math.random() * users.length)];
   
           userAssignments[user].push(selectedPlayer);
   
           if (userAssignments[user].length === 3) {
               completedUsers.push({ user, players: userAssignments[user].slice(0, 2) });
               users.splice(users.indexOf(user), 1);
           }
       }
   
       displayCompletedUsers();
   });
   
   function displayCompletedUsers() {
       completedUsersList.innerHTML = '';
       completedUsers.forEach(({ user, players }) => {
           const li = document.createElement('li');
           li.className = 'list-group-item';
           li.innerHTML = `<strong>${user}:</strong> ${players.join(', ')}`;
           completedUsersList.appendChild(li);
       });
   }