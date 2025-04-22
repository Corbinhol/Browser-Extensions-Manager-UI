const panels = document.getElementById("extension-panels");
fetch("./data.json").then(response => response.json()).then(data => {
    let count = 0;
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
            console.log("Checked");
            if(this.checked) {
                panel.classList.add("checked");
            } else {
                panel.classList.remove("checked");
            }
        });
    });
});

