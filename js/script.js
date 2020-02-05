document.addEventListener("DOMContentLoaded", function(){
  var navItems = document.getElementsByClassName('Nav-item');
  for (var i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", navOnClickListener);
  }

  function navOnClickListener(event) {
    event.preventDefault();
    if (this.classList.contains('Nav-item--active')) {
      return;
    }
    var activeItem = document.getElementsByClassName('Nav-item--active');
    if (activeItem.length > 0) {
      for (var i = 0; i < activeItem.length; i++) {
        activeItem[i].classList.remove("Nav-item--active");
      }
    }
    this.classList.add("Nav-item--active");
  }// End Nav Click Listener

  
});
