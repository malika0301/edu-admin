let path = new URLSearchParams(location.search);
let id = path.get("teacherId");

let teacherContent = document.getElementById("single-teacher");

async function getSingleTeacher(id) {
    try {
        let res = await axios.get(`https://6921f0ae512fb4140be1d12d.mockapi.io/teachers/${id}`);
        renderTeacher(res.data);
        initTabs();     
        loadStudents();  
    } catch (err) {
        console.log(err);
    }
}

function renderTeacher(el) {
    teacherContent.innerHTML = `
        <div class="max-w-[500px] mx-auto p-[20px] w-full rounded-[20px] border border-gray-400 shadow-2xl mb-5">
            <div class="flex justify-center">
                <img class="w-[120px] h-[120px] rounded-full object-cover border-[5px] border-blue-200" src="${el.avatar}">
            </div>
            <h1 class="text-center text-[25px] font-bold mt-[15px]">${el.name}</h1>
            <p class="text-center text-gray-500">${el.profession}</p>
            <div class="mt-[20px] flex flex-col gap-[10px] text-gray-700">
                <p>Age: ${el.age}</p>
                <p>Experience: ${el.experience} years</p>
                <p>Rating: ${el.raiting}⭐</p>

                 <div class="mb-[15px]"><div class="flex gap-[20px] text-gray-700">
                    <div class="w-full h-[4px] rounded-[50px] bg-[red] mb-[30px] overflow-hidden">
                        <div style="width: ${el.raiting}%" class="h-[4px] rounded-[50px] bg-[blue]"></div>
                           <div class="flex justify-between items-center mt-[10px]">
                            
                    </div></div>
            </div>
            <button onclick="history.back()" class="mt-[20px] w-full py-[10px] bg-gradient-to-r from-blue-500 text-white to-purple-600 hover:from-purple-600 hover:to-blue-500 font-bold rounded-[10px]">Previous</button>
        </div>
        </div></div>

        <div class="max-w-[500px] mx-auto p-[20px] rounded-[20px] w-full h-auto border border-gray-400 shadow-2xl">
            <div class="flex justify-center gap-4 py-1.5 rounded-xl mb-5">
                <button id="btn1" class="px-4 py-1 text-gray-500 rounded">Contact Info</button>
                <button id="btn2" class="px-4 py-1 text-gray-500 rounded">Assigned Students</button>
            </div>

            <div id="contact-info" class="grid grid-cols-1 text-gray-800 sm:grid-cols-2 gap-4">
                <p>Phone: ${el.number}</p>
                <p>Email: ${el.email}</p>
                <p>Telegram: ${el.username}</p>
                <p>LinkedIn: ${el.linkedin}</p>
            </div>

            <div id="single-students" class="grid gap-[20px] mt-5 hidden"></div>
        </div>
    `;
}

function initTabs() {
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const contactInfo = document.getElementById("contact-info");
    const assignedStudents = document.getElementById("single-students");

    btn1.addEventListener("click", () => {
        contactInfo.classList.remove("hidden");
        assignedStudents.classList.add("hidden");

        btn1.classList.remove("text-gray-500");
        btn2.classList.remove("text-white");
        btn2.classList.add("text-gray-500");
    });

    btn2.addEventListener("click", () => {
        contactInfo.classList.add("hidden");
        assignedStudents.classList.remove("hidden");

        btn2.classList.remove("text-gray-500");
        btn1.classList.remove("text-white");
        btn1.classList.add("text-gray-500");
    });
}

async function loadStudents() {
    try {
        let assignedStudents = document.getElementById("single-students");
        let res2 = await axios.get(`https://6921f0ae512fb4140be1d12d.mockapi.io/teachers/${id}/students`);
        assignedStudents.innerHTML = "";

        res2.data.forEach((el) => {
            assignedStudents.innerHTML += `
                <a href="../pages/single-students.html?studentId=${el.id}" class="p-[15px] w-full bg-gray-300 rounded-[20px]">
                    <div class="flex items-center justify-between gap-[10px]">
                        <div class="flex items-center gap-[7px]">
                            <img class="w-[70px] h-[70px] object-cover rounded-[50%] border border-blue-200 border-[5px]" src=${el.avatar} alt="">
                            <div>
                                <h1>${el.name}</h1>
                                <div class="flex items-center gap-[5px]">
                                    <p class="text-[gray]">${el.age} years</p>
                                    <p class="text-[gray]">Grade-${el.grade}</p>
                                </div>
                            </div> 
                        </div>
                        <div class="flex gap-[5px] items-center"><p>${el.rating}</p>⭐</div>
                    </div>
                </a>
            `;
        });
    } catch (err) {
        console.log(err);
    }
}

getSingleTeacher(id);
