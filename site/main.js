let hours = [1,2,3,4,5,6];
let grade = {
    "A": 4.00,
    "A-": 3.75,
    "B+": 3.50,
    "B": 3.00,
    "B-": 2.75,
    "C+": 2.50,
    "C": 2.00,
    "C-": 1.75,
    "D+": 1.50,
    "D": 1.00,
    "D-": 0.75,
    "F*": 0.50
}

// To track number of added subject
let num = 0;

document.addEventListener("DOMContentLoaded", () => {
    let add_sub = document.getElementById("add-subject-btn");
    add_sub.addEventListener("click", () => addSubject())
    
    let calculateBtn = document.getElementById("calculate-button");
    calculateBtn.addEventListener("click", () => calculate_gpa());

    let darkBtn = document.getElementById("dark-button");
    let lightBtn = document.getElementById("light-button");
    darkBtn.addEventListener("click", () => darkTheme("dark"));
    lightBtn.addEventListener("click", () => darkTheme("light"));
})

function addSubject(){
    // Define id and assign it to num to use it for passing argument
    let id = num;

    let li = document.createElement("li");
    li.setAttribute("class", "list-group-item mt-3 border-1 rounded-2 bg-parent");
    li.setAttribute("id", `item${num}`);

    let row = document.createElement("div");
    row.setAttribute("class", "row bg-parent");
    li.appendChild(row);



    // The block responsible of create subject hours div
    let hoursDiv = document.createElement("div")
    hoursDiv.setAttribute("class", "col-6 col-md-3 bg-parent")


    let hoursSelect = document.createElement("select");
    hoursSelect.setAttribute("class", "form-select form-select-sm bg-parent");
    hoursSelect.setAttribute("id", `hours-select${num}`);
    let option = [];
    option[0] = document.createElement("option");
    option[0].setAttribute("selected", "true");
    option[0].setAttribute("disabled", "true");
    option[0].innerHTML = "ساعات المادة";
    option[0].value = 0;
    hoursSelect.appendChild(option[0]);
    for(let i=1; i<=hours.length; i++){
        option[i] = document.createElement("option");
        option[i].setAttribute("value", `${i}`);
        option[i].innerHTML = `${i}`;
        hoursSelect.appendChild(option[i]);
    }
    hoursDiv.appendChild(hoursSelect);


    // The block responsible of create repeated subject grade div
    let repeatedGradeDiv = document.createElement("div");
    repeatedGradeDiv.setAttribute("class", "col-6 col-md-3 mt-2 mt-md-0");

    let rGradeSelect = document.createElement("select");
    rGradeSelect.setAttribute("class", "form-select form-select-sm bg-parent");
    rGradeSelect.setAttribute("id", `repeated-hours-select${num}`);
    rGradeSelect.setAttribute("disabled", "true");
    
    var rGradeOption = [];
    rGradeOption[0] = document.createElement("option")
    rGradeOption[0].setAttribute("selected", "true");
    rGradeOption[0].setAttribute("disabled", "true");
    rGradeOption[0].innerHTML = "العلامة السابقة";
    rGradeOption[0].value = 0;
    rGradeSelect.appendChild(rGradeOption[0]);
    repeatedGradeDiv.appendChild(rGradeSelect);


    // The block responsible of create current grade of the subject div + option of repeated subject grade select
    let gradeDiv = document.createElement("div");
    gradeDiv.setAttribute("class", "col-6 col-md-3");

    let gradeSelect = document.createElement("select");
    gradeSelect.setAttribute("class", "form-select form-select-sm bg-parent");
    gradeSelect.setAttribute("id", `grade-select${num}`);
    let symbol = Object.keys(grade);
    let gradesOption = [];
    gradesOption[0] = document.createElement("option");
    gradesOption[0].setAttribute("selected", "true");
    gradesOption[0].setAttribute("disabled", "true");
    gradesOption[0].innerHTML = "العلامة المتوقعة";
    gradesOption[0].value = 0;
    gradeSelect.appendChild(gradesOption[0]);
    for(let j=1; j<=symbol.length; j++){
        gradesOption[j] = document.createElement("option");
        gradesOption[j].setAttribute("value", `${grade[symbol[j-1]]}`);
        gradesOption[j].innerHTML = symbol[j-1];
        gradeSelect.appendChild(gradesOption[j]);
    
        rGradeOption[j] = document.createElement("option");
        rGradeOption[j].setAttribute("value", `${grade[symbol[j-1]]}`);
        rGradeOption[j].innerHTML = symbol[j-1];
        rGradeSelect.appendChild(rGradeOption[j]);
    }
    gradeDiv.appendChild(gradeSelect);


    // The block responsible of create checkbox of repeated subject
    let repeatedSubject = document.createElement("div");
    repeatedSubject.setAttribute("class", "col-6 col-md-2 mt-2 mt-md-0");

    let formDiv = document.createElement("div");
    formDiv.setAttribute("class", "form-check");
    repeatedSubject.appendChild(formDiv);

    let checkboxLabel = document.createElement("label");
    checkboxLabel.setAttribute("class", "form-check-label bg-parent");
    checkboxLabel.setAttribute("for", `checkbox${num}`);
    checkboxLabel.innerHTML = "المادة معادة:";
    formDiv.appendChild(checkboxLabel);

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "form-check-input bg-parent");
    checkbox.setAttribute("id", `checkbox${num}`);
    formDiv.appendChild(checkbox);

    // Function to enable add grade for repeated subjects
    checkbox.addEventListener("click", () => {
        if(checkbox.checked == true){
            checkbox.setAttribute("checked", "true")
            rGradeSelect.removeAttribute("disabled")
        }else{
            checkbox.removeAttribute("checked");
            rGradeSelect.setAttribute("disabled", "true")        
        }
    });


    // The block responsible of create remove subject button 
    let removeDiv = document.createElement("div");
    removeDiv.setAttribute("class", "col-12 col-md-1 mt-2 mt-md-0");

    let removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "btn btn-sm btn-outline-danger col-12");
    removeDiv.appendChild(removeBtn);

    let icon = document.createElement("i");
    icon.setAttribute("class", "bi bi-trash");
    removeBtn.appendChild(icon);

    removeBtn.addEventListener("click", () => removeSubject(id));


    // The block responsible of adding all element in order to the parent div
    row.appendChild(hoursDiv);
    row.appendChild(gradeDiv);
    row.appendChild(repeatedSubject);
    row.appendChild(repeatedGradeDiv);
    row.appendChild(removeDiv);

    // The block responsible of adding parent div to the document
    let listGroup = document.getElementById("subject-list");
    listGroup.appendChild(li);
    num += 1;
}

function removeSubject(id){
    let li = document.getElementById(`item${id}`);
    li.remove();
}

function calculate_gpa(){
    let list = document.getElementById("subject-list");
    let subjects = list.children;
    let totalPoints;
    let totalHours;
    let hoursPassedInput = document.getElementById("hours-passed-input");
    let totalGpaInput = document.getElementById("total-gpa-input");
    let alertContent = document.getElementById("alert-content");
    let alert = document.getElementById("zero-subject-alert");

    if(hoursPassedInput.value > 200){
        alertContent.innerHTML = "يرجى ادخال عدد الساعات المقطوعة بشكل صحيح!";
        alert.removeAttribute("hidden");
        setTimeout(() => {
            alert.setAttribute("hidden", "");
        }, 5000)
    }else if(totalGpaInput.value > 4){
        alertContent.innerHTML = "يرجى ادخال المعدل التراكمي بشكل صحيح!";
        alert.removeAttribute("hidden");
        setTimeout(() => {
            alert.setAttribute("hidden", "");
        }, 5000)
    }else{
        if(subjects.length == 0){
            alertContent.innerHTML =  "يجب إضافة مواد قبل حساب المعدل, لإضافة مواد اضغط على زر اضافة مادة.";
            alert.removeAttribute("hidden");
            setTimeout(() => {
                alert.setAttribute("hidden", "");
            }, 5000)
        }else{
            if(hoursPassedInput.value == "" && totalGpaInput.value == "" || hoursPassedInput.value == 0 && totalGpaInput.value == 0){
                totalPoints = 0;
                totalHours = 0;
            }else{
                totalHours = Number(hoursPassedInput.value);
                totalPoints = Number(Number(totalGpaInput.value) * Number(hoursPassedInput.value));
            }
            for(let i=0; i<subjects.length; i++){
                let hoursSelect = subjects[i].querySelectorAll("select")[0].value;
                let gradeSelect = subjects[i].querySelectorAll("select")[1].value;
                let checkbox = subjects[i].querySelectorAll("input")[0];
                if(checkbox.checked == true){
                    let rGrade = subjects[i].querySelectorAll("select")[2].value;
                    totalPoints -= (Number(rGrade) * Number(hoursSelect));
                    totalHours -= Number(hoursSelect);
                }
                totalHours += Number(hoursSelect);
                totalPoints += Number(Number(gradeSelect) * Number(hoursSelect));
            }

            let hoursPassed = document.getElementById("hours-passed");
            let totalGpa = document.getElementById("total-gpa");

            hoursPassed.value = Number(totalHours);
            totalGpa.value = Number(Number(totalPoints) / Number(totalHours)).toFixed(3);
        }
    }
}


function darkTheme(theme){
    let body = document.getElementsByTagName("body")[0];
    let lightBtn = document.getElementById("light-button");
    let darkBtn = document.getElementById("dark-button");
    let dropdonwIcon = document.getElementById("dropdown-icon");

    if(theme == "dark"){
        body.setAttribute("data-bs-theme", "dark");
        darkBtn.setAttribute("class", "dropdown-item text-end rounded-2 active");
        lightBtn.setAttribute("class", "dropdown-item text-end rounded-2");
        dropdonwIcon.setAttribute("class", "bi bi-moon-stars-fill");
        saveTheme(theme);
    }else{
        body.removeAttribute("data-bs-theme");
        lightBtn.setAttribute("class", "dropdown-item text-end rounded-2 active");
        darkBtn.setAttribute("class", "dropdown-item text-end rounded-2");
        dropdonwIcon.setAttribute("class", "bi bi-brightness-high-fill");
        saveTheme(theme);
    }
}

function saveTheme(theme){
    localStorage.setItem("theme", `${theme}`);
}

function showTheme(){
    if(localStorage.getItem("theme") == "light"){
        darkTheme("light");
    }else{
        darkTheme("dark");
    }
}

showTheme();
