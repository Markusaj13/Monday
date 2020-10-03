const homeIcon = document.getElementById("home-icon")
const diyIcon = document.getElementById("diy-icon")
const purchaseIcon = document.getElementById("purchase-icon")

var activeIcon = null

// A function to activate home icon
activate_home = () => {
    // add active to this one 
    homeIcon.classList.add("navbar-icon-active")

    // Remove normal one
    homeIcon.classList.remove("navbar-icon")

    // Make this one into the active one
    activeIcon = homeIcon
}

// A function to activate diy icon
activate_diy = () => {
    // add active to this one 
    diyIcon.classList.add("navbar-icon-active")

    // Remove normal one
    diyIcon.classList.remove("navbar-icon")

    // Make this one into the active one
    activeIcon = diyIcon
}

activate_purchase = () => {
    // add active to this one 
    purchaseIcon.classList.add("navbar-icon-active")

    // Remove normal one
    purchaseIcon.classList.remove("navbar-icon")

    // Make this one into the active one
    activeIcon = purchaseIcon
}

deactivate_active = () => {
        // Add normal to previous active
        activeIcon.classList.add("navbar-icon")

        // Remove active from previous active
        activeIcon.classList.remove("navbar-icon-active")

        activeIcon = null
}

// Actiavte home in start
activate_home()

homeIcon.onclick = () => {
    deactivate_active()
    activate_home()
}

diyIcon.onclick = () => {
    deactivate_active()
    activate_diy()
}

purchaseIcon.onclick = () => {
    deactivate_active()
    activate_purchase()
}