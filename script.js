const panels = document.getElementById("extension-panels");
let count = 0;
fetch("./data.json").then(response => response.json()).then(data => {
    console.log(data);
    for(ext of data) {
        let enabled = ""
        if(ext.isActive) {
            enabled = "checked"
        }
        panels.insertAdjacentHTML("beforeend", 
            `<div class="panel ${enabled}"> <div class="panel__header"> <img src="${ext.logo}" alt="${ext.name} Logo"> <div class="info"> <h3>${ext.name}</h3> <p>${ext.description}</p> </div> </div> <div class="panel__buttons"> <button class="button button--remove">Remove</button> <div class="onoffswitch"> <input type="checkbox" name="onoffswitch-0" class="onoffswitch-checkbox" id="myonoffswitch-${count}" tabindex="0" ${enabled}> <label class="onoffswitch-label" for="myonoffswitch-${count}"></label> </div> </div> </div>`
        )
        count++;
    }
    const extensionPanels = document.querySelector(".extension-panels");
    extensionPanels.querySelectorAll(".panel").forEach(panel => {
        panel.querySelector(".onoffswitch-checkbox").addEventListener("change", function() {
            if(this.checked) {
                panel.classList.add("checked");
            } else {
                panel.classList.remove("checked");
            }
            updateCount()
        });

        panel.querySelector(".button--remove").addEventListener("click", function() {
            panel.remove();
            count--;
            updateCount();
        });

    });

    const allButton = document.getElementById("all");
    const activeButton = document.getElementById("active");
    const inactiveButton = document.getElementById("inactive");

    allButton.addEventListener("click", function() {
        extensionPanels.classList.remove("active");
        extensionPanels.classList.remove("inactive");
        allButton.classList.add("button--active");
        activeButton.classList.remove("button--active");
        inactiveButton.classList.remove("button--active");
        updateCount();
    });

    activeButton.addEventListener("click", function() {
        extensionPanels.classList.add("active");
        extensionPanels.classList.remove("inactive");
        activeButton.classList.add("button--active");
        allButton.classList.remove("button--active");
        inactiveButton.classList.remove("button--active");
        updateCount();
    });

    inactiveButton.addEventListener("click", function() {
        extensionPanels.classList.add("inactive");
        extensionPanels.classList.remove("active");
        inactiveButton.classList.add("button--active");
        allButton.classList.remove("button--active");
        activeButton.classList.remove("button--active");
        updateCount();
    });
    updateCount()
});

function updateCount() {
    let enabled = 0;
    let disabled = 0;
    for(panel of panels.querySelectorAll(".panel")) {
        if(panel.classList.contains("checked")) {
            enabled++;
        } else {
            disabled++;
        }
    }
    document.getElementById("active").querySelector("span").innerHTML = `(${enabled})`;
    document.getElementById("inactive").querySelector("span").innerHTML = `(${disabled})`;
    document.querySelector(".tabs").querySelector("h1").querySelector("span").innerHTML = `(${count})`;
}

document.querySelector(".day-night-mode").addEventListener("click", function() {
    document.body.classList.toggle("night-mode");
});

