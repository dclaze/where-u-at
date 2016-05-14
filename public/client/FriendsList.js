function FriendsList(map) {
	this.map = map
	this.friends = []
	this.initControls()
}

FriendsList.prototype.update = function(message) {
	var friend = this.friends.find({id: message.id})
	if(friend)
		friend.update(message)
	else
		this.addFriend(new Friend(this.map, message))
}

FriendsList.prototype.remove = function(message) {
	var friend = this.friends.find({id: message.id})
	if(friend) {
		this.list.removeChild(this.list.querySelector('[data-friend-id='+message.id+']'))
		friend.destroy() //harsh
		this.friends.remove(friend)
	}
}

FriendsList.prototype.addFriend = function(friend) {
	this.friends.push(friend)
	var li = document.createElement('li')

	li.setAttribute('data-friend-id', friend.id)
	li.textContent = friend.name
	this.list.appendChild(li)
	li.addEventListener('click', friend.showWindow.bind(friend))
}

FriendsList.prototype.initControls = function() {
	this.list = document.createElement('ul')

	container = document.createElement('div')
	container.className = 'friends-list-container collapsed'

	container.appendChild(this.list)

	var toggleButton = makeImageButton('icons/User-Profile-32.png')

	toggleButton.addEventListener('click', function() {
		container.classList.toggle('collapsed')
	});

	container.appendChild(toggleButton)
	this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(container)
}
